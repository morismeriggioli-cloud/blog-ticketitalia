/**
 * Pipeline agenti: Scout → Redattore → SEO
 *
 * Uso:
 *   tsx agents/orchestrator.ts            # pipeline completa
 *   tsx agents/orchestrator.ts --scout    # solo Scout
 */

import { config } from "dotenv";
config({ override: false });

console.log("ENV CHECK:", {
  hasKey: !!process.env.ANTHROPIC_API_KEY,
  keyStart: process.env.ANTHROPIC_API_KEY?.slice(0, 10),
  allEnvKeys: Object.keys(process.env).filter(k => k.includes("ANTHROPIC"))
});

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendArticleNotification, sendPublishedNotification } from "./mailer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const MODEL = "claude-sonnet-4-5";
const SITEMAP_URL =
  "https://ticketitalia.com//index.php?route=feed/advanced_sitemap";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readPrompt(agentDir: string, filename: string): string {
  return fs.readFileSync(
    path.join(__dirname, agentDir, filename),
    "utf-8"
  );
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// Fingerprint normalizzata: lowercase + strip accenti (NFD + combining marks)
// + rimozione caratteri non alfanumerici + collapse spazi. Rende confronti
// immuni a formattazione, punteggiatura, accenti, separatori.
function normalizeFingerprint(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// Claude call con prompt caching sul system prompt
// ---------------------------------------------------------------------------

const CLAUDE_MAX_RETRIES = 3;
const CLAUDE_RETRY_DELAY_MS = 30_000;

async function callClaude(
  systemPrompt: string,
  userMessage: string,
  label: string
): Promise<string> {
  console.log(`[${label}] Chiamata a Claude (${MODEL})…`);

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY ?? "",
  });

  const request = {
    model: MODEL,
    max_tokens: 8192,
    system: [
      {
        type: "text" as const,
        text: systemPrompt,
        cache_control: { type: "ephemeral" as const },
      },
    ],
    messages: [{ role: "user" as const, content: userMessage }],
  };

  let response: Awaited<ReturnType<typeof client.messages.create>> | undefined;
  let attempt = 0;
  while (true) {
    try {
      response = await client.messages.create(request);
      break;
    } catch (err) {
      const status = (err as { status?: number; statusCode?: number })?.status
        ?? (err as { statusCode?: number })?.statusCode;
      if (status === 529 && attempt < CLAUDE_MAX_RETRIES) {
        attempt++;
        console.warn(`[claude] Overloaded, retry ${attempt}/${CLAUDE_MAX_RETRIES} tra 30s...`);
        await new Promise((r) => setTimeout(r, CLAUDE_RETRY_DELAY_MS));
        continue;
      }
      throw err;
    }
  }

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("\n");

  console.log(
    `[${label}] Completato — input tokens: ${response.usage.input_tokens}, output: ${response.usage.output_tokens}`
  );
  return text;
}

// ---------------------------------------------------------------------------
// Agente Scout
// ---------------------------------------------------------------------------

export async function runScout(): Promise<{ opportunities: unknown[] }> {
  const systemPrompt = readPrompt("scout", "scout-prompt.md");

  const userMessage = `Analizza la sitemap di Ticket Italia e produci il report opportunità.

URL sitemap: ${SITEMAP_URL}
Data di oggi: ${today()}

Rispondi SOLO con il JSON puro del report (nessun markdown, nessun testo aggiuntivo).
Il JSON deve rispettare esattamente il formato definito nel tuo system prompt.`;

  const raw = await callClaude(systemPrompt, userMessage, "scout");

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("[scout] Risposta non contiene JSON valido");

  const report = JSON.parse(jsonMatch[0]);
  const opportunities = report.opportunities ?? [];
  console.log(`[scout] Report generato: ${opportunities.length} opportunità`);

  return { opportunities };
}

// ---------------------------------------------------------------------------
// Fetch immagine evento dalla pagina ticketitalia.com
// ---------------------------------------------------------------------------

async function fetchEventImage(eventUrl: string): Promise<string> {
  try {
    const res = await fetch(eventUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TicketItaliaBlog/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return "";
    const html = await res.text();

    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1]) return ogMatch[1];

    const imgMatch = html.match(/<img[^>]+src=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i);
    if (imgMatch?.[1]) return imgMatch[1];

    return "";
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// Agente Redattore
// ---------------------------------------------------------------------------

export async function runRedattore(
  opportunity: Record<string, unknown>
): Promise<{ slug: string; rawContent: string }> {
  const systemPrompt = readPrompt("redattore", "redattore-prompt.md");

  const eventUrl = opportunity.ticketitalia_url as string | undefined;
  const eventImage = eventUrl ? await fetchEventImage(eventUrl) : "";
  if (eventImage) {
    console.log(`[redattore] Immagine evento trovata: ${eventImage}`);
  } else {
    console.warn("[redattore] Immagine evento non trovata — verrà usato il fallback");
  }

  const categorySlug = (opportunity.category as string | undefined) ?? "concerti";
  const categoryNameMap: Record<string, string> = {
    "concerti": "Concerti",
    "teatro-spettacoli": "Teatro & Spettacoli",
    "eventi-festival": "Eventi & Festival",
    "sport": "Sport",
    "nightlife-experience": "Nightlife & Experience",
    "guide": "Guide & Consigli",
  };
  const categoryName = categoryNameMap[categorySlug] ?? "Concerti";

  const userMessage = `Scrivi l'articolo per la seguente opportunità identificata dallo Scout.

OPPORTUNITÀ:
${JSON.stringify(opportunity, null, 2)}

CATEGORIA ASSEGNATA DALLO SCOUT:
- category: "${categoryName}"
- categorySlug: "${categorySlug}"
Usa ESATTAMENTE questi valori nei campi category e categorySlug dell'articolo.

IMMAGINE EVENTO:
${eventImage || "(non disponibile — usa il fallback /images/[slug]-hero.jpg)"}

Istruzioni di output:
- Rispondi SOLO con il contenuto del file TypeScript (import + export const article = {...})
- Nessun markdown, nessuna spiegazione, solo il codice TypeScript valido
- Inizia direttamente con: import type { Article } from "@/data/blog";
- Usa l'IMMAGINE EVENTO fornita sopra come valore del campo image (se disponibile)`;

  const raw = await callClaude(
    systemPrompt,
    userMessage,
    "redattore"
  );

  const tsMatch =
    raw.match(/```(?:typescript|ts)?\n([\s\S]*?)```/) ??
    raw.match(/(import type[\s\S]*)/);
  const tsContent = tsMatch ? (tsMatch[1] ?? tsMatch[0]).trim() : raw.trim();

  const slug =
    (opportunity.suggested_slug as string | undefined) ??
    `articolo-${today()}`;

  console.log(`[redattore] Articolo generato in memoria: ${slug} (${tsContent.length} chars)`);

  return { slug, rawContent: tsContent };
}

// ---------------------------------------------------------------------------
// Agente SEO
// ---------------------------------------------------------------------------

export interface SeoResult {
  title: string;
  excerpt: string;
  keyword: string;
  funnelStage: string;
  seoScore: Record<string, string>;
  rawContent: string;
  seoReport: string;
}

export async function runSeo(
  slug: string,
  articleContent: string,
  keywords: string[]
): Promise<SeoResult> {
  const systemPrompt = readPrompt("seo", "seo-prompt.md");

  const userMessage = `Ottimizza l'articolo seguente per il posizionamento SEO su Google.

KEYWORD PRINCIPALI (dal report Scout): ${keywords.join(", ")}

ARTICOLO (${slug}.ts):
\`\`\`typescript
${articleContent}
\`\`\`

Rispondi con DUE blocchi separati dal marcatore ---SEO-REPORT---:

BLOCCO 1: articolo TypeScript ottimizzato (solo codice, senza markdown fences)
---SEO-REPORT---
BLOCCO 2: report SEO in formato markdown`;

  const raw = await callClaude(systemPrompt, userMessage, "seo");

  const separator = "---SEO-REPORT---";
  const parts = raw.split(separator);

  let optimizedTs = parts[0]?.trim() ?? articleContent;
  const tsMatch = optimizedTs.match(/```(?:typescript|ts)?\n([\s\S]*?)```/);
  if (tsMatch?.[1]) optimizedTs = tsMatch[1].trim();

  const seoReport = parts[1]?.trim() ?? "Report SEO non generato.";

  console.log(`[seo] Articolo ottimizzato in memoria (${optimizedTs.length} chars)`);

  const titleMatch = optimizedTs.match(/title:\s*"([^"]+)"/);
  const excerptMatch = optimizedTs.match(/excerpt:\s*"([^"]+)"/);
  const funnelMatch = optimizedTs.match(/funnelStage:\s*"([^"]+)"/);
  const seoScoreMatch = seoReport.match(
    /Score SEO Stimato[\s\S]*?(?=##|$)/
  );

  const seoScore: Record<string, string> = {};
  seoScoreMatch?.[0]
    ?.split("\n")
    .filter((l) => l.includes("✅") || l.includes("⚠️") || l.includes("❌"))
    .forEach((line) => {
      const m = line.match(/[-*]?\s*(.+?):\s*(✅|⚠️|❌)/);
      if (m?.[1] && m?.[2]) seoScore[m[1].trim()] = m[2];
    });

  return {
    title: titleMatch?.[1] ?? slug,
    excerpt: excerptMatch?.[1] ?? "",
    keyword: keywords[0] ?? "",
    funnelStage: funnelMatch?.[1] ?? "BOFU",
    seoScore,
    rawContent: optimizedTs,
    seoReport,
  };
}

// ---------------------------------------------------------------------------
// Pipeline completa (modalità review — senza auto-publish)
// ---------------------------------------------------------------------------

export async function runPipeline(): Promise<void> {
  const startTime = Date.now();
  console.log(`[orchestrator] Pipeline avviata: ${new Date().toISOString()}`);

  try {
    console.log("\n=== STEP 1: SCOUT ===");
    const { opportunities } = await runScout();

    const bestBofu = (opportunities as Record<string, unknown>[]).find(
      (o) => o.funnel_stage === "BOFU" && o.seo_potential === "high"
    ) ?? (opportunities as Record<string, unknown>[])[0];

    if (!bestBofu) throw new Error("Nessuna opportunità trovata nello Scout report");
    console.log(`[orchestrator] Opportunità selezionata: ${bestBofu.title}`);

    console.log("\n=== STEP 2: REDATTORE ===");
    const { slug, rawContent } = await runRedattore(bestBofu);

    console.log("\n=== STEP 3: SEO ===");
    const keywords = (bestBofu.keywords as string[] | undefined) ?? [];
    const seoResult = await runSeo(slug, rawContent, keywords);

    console.log("\n=== STEP 4: NOTIFICA EMAIL ===");
    await sendArticleNotification({
      slug,
      title: seoResult.title,
      excerpt: seoResult.excerpt,
      keyword: seoResult.keyword,
      filePath: `(in-memory) ${slug}.ts`,
      funnelStage: seoResult.funnelStage,
      seoScore: seoResult.seoScore,
      rawContent: seoResult.rawContent,
    });

    console.log(`[orchestrator] Pipeline completata in ${Date.now() - startTime}ms`);
  } catch (err) {
    console.error("[orchestrator] Errore:", err);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// autoPublish — inserisce l'articolo in blog.ts, committa e pusha
// ---------------------------------------------------------------------------

function extractArticleObject(fileContent: string): string {
  const marker = "export const article";
  const markerIdx = fileContent.indexOf(marker);
  if (markerIdx === -1) throw new Error("Marker 'export const article' non trovato");

  const objStart = fileContent.indexOf("{", markerIdx + marker.length);
  if (objStart === -1) throw new Error("Apertura oggetto '{' non trovata");

  // strMode: 0 = codice, 1 = stringa "..", 2 = stringa '..', 3 = template literal `..`
  let strMode: 0 | 1 | 2 | 3 = 0;
  let depth = 0;
  // Stack delle profondità a cui siamo entrati in interpolazione ${...}
  // Quando depth ritorna a uno di questi valori, riprende il template literal esterno.
  const templateStack: number[] = [];
  let escape = false;

  for (let i = objStart; i < fileContent.length; i++) {
    const ch = fileContent[i];

    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }

    if (strMode === 0) {
      if (ch === '"') { strMode = 1; continue; }
      if (ch === "'") { strMode = 2; continue; }
      if (ch === "`") { strMode = 3; continue; }
      if (ch === "{") {
        depth++;
      } else if (ch === "}") {
        depth--;
        if (depth === 0) return fileContent.slice(objStart, i + 1);
        if (templateStack.length > 0 && depth === templateStack[templateStack.length - 1]) {
          templateStack.pop();
          strMode = 3;
        }
      }
    } else if (strMode === 1) {
      if (ch === '"') strMode = 0;
    } else if (strMode === 2) {
      if (ch === "'") strMode = 0;
    } else if (strMode === 3) {
      if (ch === "`") {
        strMode = 0;
      } else if (ch === "$" && fileContent[i + 1] === "{") {
        templateStack.push(depth);
        depth++;
        strMode = 0;
        i++;
      }
    }
  }

  console.error(
    `[extractArticleObject] Bilanciamento fallito — depth=${depth}, strMode=${strMode}, templateStack=${JSON.stringify(templateStack)}, lunghezza=${fileContent.length}, objStart=${objStart}`
  );
  console.error(
    `[extractArticleObject] Primi 300 caratteri dall'oggetto:\n${fileContent.slice(objStart, objStart + 300)}`
  );
  console.error(
    `[extractArticleObject] Ultimi 300 caratteri del file:\n${fileContent.slice(-300)}`
  );
  throw new Error(
    `Oggetto articolo non bilanciato (depth finale=${depth}, strMode=${strMode}, template stack size=${templateStack.length})`
  );
}

// ---------------------------------------------------------------------------
// Blocklist artisti/eventi già pubblicati (agents/blocklist.json)
// ---------------------------------------------------------------------------

const BLOCKLIST_REMOTE_PATH = "agents/blocklist.json";
const BLOCKLIST_LOCAL_PATH = path.join(__dirname, "blocklist.json");

function parseBlocklist(raw: string): string[] {
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.map((s) => String(s).toLowerCase().trim()).filter(Boolean);
}

// Source of truth della blocklist = file su GitHub. Su Railway il filesystem
// è effimero, quindi leggere dal repo remoto garantisce persistenza tra deploy.
// In caso di errore di rete fallback al file locale (dev / primo bootstrap).
async function loadBlocklist(): Promise<string[]> {
  const githubRepo = process.env.GITHUB_REPO;
  const githubToken = process.env.GITHUB_TOKEN;
  const githubBranch = process.env.GITHUB_BRANCH ?? "main";

  if (githubRepo && githubToken) {
    try {
      const { content } = await githubGetFile(
        githubRepo,
        githubToken,
        BLOCKLIST_REMOTE_PATH,
        githubBranch
      );
      const list = parseBlocklist(content);
      console.log(`[blocklist] Caricata da GitHub: ${list.length} voci`);
      return list;
    } catch (err) {
      console.warn("[blocklist] Lettura da GitHub fallita, fallback locale:", err);
    }
  }

  try {
    const raw = fs.readFileSync(BLOCKLIST_LOCAL_PATH, "utf-8");
    const list = parseBlocklist(raw);
    console.log(`[blocklist] Caricata da filesystem locale: ${list.length} voci`);
    return list;
  } catch (err) {
    console.warn(`[blocklist] Impossibile leggere ${BLOCKLIST_LOCAL_PATH}:`, err);
    return [];
  }
}

async function appendArtistToBlocklist(artist: string): Promise<void> {
  const normalized = artist.toLowerCase().trim();
  if (!normalized) return;

  const githubRepo = process.env.GITHUB_REPO;
  const githubToken = process.env.GITHUB_TOKEN;
  const githubBranch = process.env.GITHUB_BRANCH ?? "main";
  if (!githubRepo || !githubToken) {
    console.warn("[blocklist] GITHUB_REPO/GITHUB_TOKEN mancanti — skip aggiornamento remoto");
    return;
  }

  const { sha, content } = await githubGetFile(
    githubRepo,
    githubToken,
    BLOCKLIST_REMOTE_PATH,
    githubBranch
  );

  let list: string[];
  try {
    const parsed = JSON.parse(content);
    list = Array.isArray(parsed) ? parsed.map((s) => String(s)) : [];
  } catch {
    list = [];
  }

  if (list.some((b) => b.toLowerCase().trim() === normalized)) {
    console.log(`[blocklist] "${normalized}" già presente — nessun update`);
    return;
  }

  list.push(normalized);
  const newContent = JSON.stringify(list, null, 2) + "\n";

  await githubPutFile(
    githubRepo,
    githubToken,
    BLOCKLIST_REMOTE_PATH,
    newContent,
    sha,
    githubBranch,
    `Blocklist: aggiunto "${normalized}"`
  );
  console.log(`[blocklist] Aggiunto "${normalized}" a agents/blocklist.json`);
}

// ---------------------------------------------------------------------------
// GitHub REST API helpers (Railway non ha git installato → niente simple-git)
// ---------------------------------------------------------------------------

async function githubGetFile(
  repo: string,
  token: string,
  filePath: string,
  branch: string
): Promise<{ sha: string; content: string }> {
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "TicketItaliaBlog-Bot",
    },
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`[github] GET ${filePath} fallito (${res.status}): ${errBody}`);
  }
  const data = (await res.json()) as { sha: string; content: string; encoding: string };
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { sha: data.sha, content };
}

async function githubPutFile(
  repo: string,
  token: string,
  filePath: string,
  newContent: string,
  sha: string,
  branch: string,
  commitMessage: string
): Promise<void> {
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const body = {
    message: commitMessage,
    content: Buffer.from(newContent, "utf-8").toString("base64"),
    sha,
    branch,
  };
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      "User-Agent": "TicketItaliaBlog-Bot",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`[github] PUT ${filePath} fallito (${res.status}): ${errBody}`);
  }
}

export async function autoPublish(
  slug: string,
  title: string,
  rawContent: string
): Promise<string> {
  const githubRepo = process.env.GITHUB_REPO;
  const githubToken = process.env.GITHUB_TOKEN;
  const githubBranch = process.env.GITHUB_BRANCH ?? "main";
  if (!githubRepo) throw new Error("[autoPublish] GITHUB_REPO non configurato (formato: owner/repo)");
  if (!githubToken) throw new Error("[autoPublish] GITHUB_TOKEN non configurato");

  const pubDate = today();

  // Aggiorna status + publishedAt nel contenuto in memoria
  let draftContent = rawContent;
  draftContent = draftContent.replace(/status:\s*"draft"/, `status: "published"`);
  if (/publishedAt:\s*"[^"]*"/.test(draftContent)) {
    draftContent = draftContent.replace(/publishedAt:\s*"[^"]*"/, `publishedAt: "${pubDate}"`);
  } else {
    draftContent = draftContent.replace(
      /status:\s*"published"/,
      `status: "published",\n  publishedAt: "${pubDate}"`
    );
  }

  // Legge blog.ts da GitHub e controlla duplicati
  const { sha, content: blogContent } = await githubGetFile(
    githubRepo,
    githubToken,
    "src/data/blog.ts",
    githubBranch
  );
  if (new RegExp(`slug:\\s*["']${slug}["']`).test(blogContent)) {
    console.warn(`[autoPublish] Slug "${slug}" già presente in blog.ts — skip`);
    return pubDate;
  }

  // Inserisce l'oggetto articolo nell'array articles[]
  const rawObj = extractArticleObject(draftContent);
  const indented = rawObj.split("\n").map((l) => `  ${l}`).join("\n");
  const insertionMarker = "\n];\n\nexport const publishedArticles";
  const idx = blogContent.indexOf(insertionMarker);
  if (idx === -1) throw new Error("[autoPublish] Marker di inserimento non trovato in blog.ts");

  const newBlogContent = blogContent.slice(0, idx) + `\n  ${indented},` + blogContent.slice(idx);

  // Commit via GitHub Contents API
  await githubPutFile(
    githubRepo,
    githubToken,
    "src/data/blog.ts",
    newBlogContent,
    sha,
    githubBranch,
    `Auto-publish: ${title} ${pubDate}`
  );
  console.log(`[autoPublish] Articolo committato su ${githubRepo}@${githubBranch}: ${slug}`);

  return pubDate;
}

// ---------------------------------------------------------------------------
// Pipeline auto-publish: Scout → Redattore → SEO → autoPublish + email
// ---------------------------------------------------------------------------

export async function runAutoPublishPipeline(): Promise<void> {
  const startTime = Date.now();
  console.log(`[orchestrator] Auto-publish pipeline avviata: ${new Date().toISOString()}`);

  const siteUrl = process.env.SITE_URL ?? "https://blog.ticketitalia.com";

  try {
    console.log("\n=== STEP 1: SCOUT ===");
    const { opportunities } = await runScout();

    // Legge blog.ts ed estrae tutti gli slug e titoli già pubblicati
    const blogPath = path.join(ROOT, "src", "data", "blog.ts");
    const blogContent = fs.readFileSync(blogPath, "utf-8");

    const existingSlugs = new Set<string>();
    const existingTitles = new Set<string>();
    const slugRegex = /slug:\s*["']([^"']+)["']/g;
    const titleRegex = /title:\s*["']([^"']+)["']/g;
    let m: RegExpExecArray | null;
    while ((m = slugRegex.exec(blogContent)) !== null) {
      existingSlugs.add(m[1].toLowerCase().trim());
    }
    while ((m = titleRegex.exec(blogContent)) !== null) {
      existingTitles.add(m[1].toLowerCase().trim());
    }

    const opportunitiesArr0 = opportunities as Record<string, unknown>[];

    // STEP 1: filtro blocklist (agents/blocklist.json letto da GitHub)
    // Scarta opportunità il cui titolo o artista contiene una voce della blocklist
    const blocklist = await loadBlocklist();
    console.log(`[blocklist] Voci attive (${blocklist.length}):`, blocklist);

    const opportunitiesArr = opportunitiesArr0.filter((opp) => {
      const normalizedTitle = normalizeFingerprint((opp.title as string | undefined) ?? "");
      const normalizedArtist = normalizeFingerprint((opp.artist as string | undefined) ?? "");
      const hit = blocklist.find((b) => {
        const nb = normalizeFingerprint(b);
        return normalizedTitle.includes(nb) || normalizedArtist.includes(nb);
      });
      if (hit) {
        console.log(`[blocklist] SCARTATA "${opp.title}" — match blocklist "${hit}"`);
        return false;
      }
      return true;
    });
    console.log(
      `[blocklist] Opportunità dopo blocklist: ${opportunitiesArr.length}/${opportunitiesArr0.length}`
    );

    // Fingerprint del corpus esistente: titoli + slug
    const existingFingerprints = Array.from(
      new Set([
        ...Array.from(existingTitles).map(normalizeFingerprint),
        ...Array.from(existingSlugs).map(normalizeFingerprint),
      ])
    ).filter((fp) => fp.length > 0);

    console.log("[duplicati] Fingerprint esistenti:");
    for (const fp of existingFingerprints) console.log(`  • "${fp}"`);

    // Fingerprint delle opportunità: title + artist
    const opportunitiesWithFp = opportunitiesArr.map((o) => {
      const title = (o.title as string | undefined) ?? "";
      const artist = (o.artist as string | undefined) ?? "";
      return {
        o,
        fp: normalizeFingerprint(`${title} ${artist}`),
        artistFp: normalizeFingerprint(artist),
      };
    });

    console.log("[duplicati] Fingerprint opportunità:");
    for (const { o, fp } of opportunitiesWithFp) {
      console.log(`  • "${o.title}" → "${fp}"`);
    }

    const filtered: Record<string, unknown>[] = [];
    for (const { o, fp, artistFp } of opportunitiesWithFp) {
      if (!fp) {
        filtered.push(o);
        continue;
      }

      // Match bidirezionale: scarta se fp opp è substring di un esistente
      // o se un esistente è substring del fp opp (gestisce titoli più lunghi/corti)
      const overlap = existingFingerprints.find(
        (efp) => efp.includes(fp) || fp.includes(efp)
      );
      if (overlap) {
        console.log(`[duplicati] SCARTATA "${o.title}" — overlap con esistente "${overlap}"`);
        continue;
      }

      // Fallback per dedup per artista: artist come parola intera in qualsiasi fingerprint
      // esistente (es. opportunità "Pooh tour 2026" vs esistente "pooh stadio checcarini")
      if (artistFp.length >= 3) {
        const escapedArtist = artistFp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const artistRe = new RegExp(`(^|\\s)${escapedArtist}(\\s|$)`);
        const artistMatch = existingFingerprints.find((efp) => artistRe.test(efp));
        if (artistMatch) {
          console.log(
            `[duplicati] SCARTATA "${o.title}" — artist "${artistFp}" presente in "${artistMatch}"`
          );
          continue;
        }
      }

      filtered.push(o);
    }

    const discardedCount = opportunitiesArr.length - filtered.length;
    console.log(
      `[orchestrator] Articoli esistenti: ${existingSlugs.size} — opportunità filtrate: ${filtered.length}`
    );
    console.log(
      `[orchestrator] Opportunità scartate perché già pubblicate: ${discardedCount}`
    );

    const bestBofu = filtered[0];

    if (!bestBofu) {
      console.log("[orchestrator] Nessuna opportunità nuova da pubblicare — pipeline terminata");
      return;
    }
    console.log(`[orchestrator] Opportunità selezionata: ${bestBofu.title}`);

    console.log("\n=== STEP 2: REDATTORE ===");
    const { slug, rawContent } = await runRedattore(bestBofu);

    console.log("\n=== STEP 3: SEO ===");
    const keywords = (bestBofu.keywords as string[] | undefined) ?? [];
    const seoResult = await runSeo(slug, rawContent, keywords);

    console.log("\n=== STEP 4: AUTO-PUBLISH ===");
    const pubDate = await autoPublish(slug, seoResult.title, seoResult.rawContent);
    const articleUrl = `${siteUrl}/articoli/${slug}`;

    // Aggiorna blocklist remota con l'artista appena pubblicato
    const publishedArtist = (bestBofu.artist as string | undefined) ?? "";
    if (publishedArtist.trim()) {
      try {
        await appendArtistToBlocklist(publishedArtist);
      } catch (err) {
        console.warn("[blocklist] Update fallito (non bloccante):", err);
      }
    }

    console.log("\n=== STEP 5: NOTIFICA EMAIL ===");
    await sendPublishedNotification({
      slug,
      title: seoResult.title,
      excerpt: seoResult.excerpt,
      keyword: seoResult.keyword,
      funnelStage: seoResult.funnelStage,
      articleUrl,
      publishedAt: pubDate,
      seoScore: seoResult.seoScore,
    });

    console.log(`[orchestrator] Auto-publish pipeline completata in ${Date.now() - startTime}ms`);
  } catch (err) {
    console.error("[orchestrator] Errore:", err);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Entrypoint — esegue solo se invocato direttamente (non quando importato)
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const isDirectRun = process.argv[1]?.replace(/\\/g, '/').endsWith('agents/orchestrator.ts') ?? false;

if (isDirectRun) {
  if (args.includes("--scout")) {
    runScout()
      .then(({ opportunities }) => {
        console.log(JSON.stringify({ opportunities }, null, 2));
      })
      .catch(console.error);
  } else {
    runPipeline().catch(console.error);
  }
}

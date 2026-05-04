/**
 * Pipeline agenti: Scout → Redattore → SEO
 *
 * Uso:
 *   tsx agents/orchestrator.ts            # pipeline completa
 *   tsx agents/orchestrator.ts --scout    # solo Scout
 */

console.log("ENV CHECK:", {
  hasKey: !!process.env.ANTHROPIC_API_KEY,
  keyStart: process.env.ANTHROPIC_API_KEY?.slice(0, 10),
  allEnvKeys: Object.keys(process.env).filter(k => k.includes("ANTHROPIC"))
});

import { config } from "dotenv";
config({ override: false });

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

// ---------------------------------------------------------------------------
// Claude call con prompt caching sul system prompt
// ---------------------------------------------------------------------------

async function callClaude(
  systemPrompt: string,
  userMessage: string,
  label: string
): Promise<string> {
  console.log(`[${label}] Chiamata a Claude (${MODEL})…`);

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY ?? "",
  });

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8192,
    system: [
      {
        type: "text",
        text: systemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: userMessage }],
  });

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

    const opportunitiesArr = opportunities as Record<string, unknown>[];
    const existingTitlesArr = Array.from(existingTitles);
    const filtered = opportunitiesArr.filter((o) => {
      const slug = (o.suggested_slug as string | undefined)?.toLowerCase().trim();
      if (slug && existingSlugs.has(slug)) return false;

      // Match per artista come substring nei titoli esistenti
      // Esempio: se esiste "Pooh - Stadio Checcarini", scarta qualsiasi opportunità con "Pooh"
      const artist = (o.artist as string | undefined)?.toLowerCase().trim();
      if (artist && artist.length >= 3) {
        if (existingTitlesArr.some((t) => t.includes(artist))) return false;
      }

      // Match esatto sul titolo dell'opportunità (utile per guide/evergreen senza artist)
      const title = (o.title as string | undefined)?.toLowerCase().trim();
      if (title && existingTitles.has(title)) return false;

      return true;
    });

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
const isDirectRun = import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`;

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

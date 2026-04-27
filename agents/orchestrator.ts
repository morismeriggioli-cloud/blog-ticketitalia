/**
 * Pipeline agenti: Scout → Redattore → SEO
 *
 * Uso:
 *   tsx agents/orchestrator.ts            # pipeline completa
 *   tsx agents/orchestrator.ts --scout    # solo Scout
 */

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
  const marker = "export const article: Article = ";
  const markerIdx = fileContent.indexOf(marker);
  if (markerIdx === -1) throw new Error("Marker 'export const article' non trovato");

  const objStart = fileContent.indexOf("{", markerIdx + marker.length);
  if (objStart === -1) throw new Error("Apertura oggetto '{' non trovata");

  let depth = 0;
  let inStr = false;
  let escape = false;

  for (let i = objStart; i < fileContent.length; i++) {
    const ch = fileContent[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return fileContent.slice(objStart, i + 1);
    }
  }
  throw new Error("Oggetto articolo non bilanciato");
}

export async function autoPublish(
  slug: string,
  title: string,
  rawContent: string
): Promise<string> {
  const blogPath = path.join(ROOT, "src", "data", "blog.ts");
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

  // Legge blog.ts (file presente nel repo) e controlla duplicati
  let blogContent = fs.readFileSync(blogPath, "utf-8");
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

  blogContent = blogContent.slice(0, idx) + `\n  ${indented},` + blogContent.slice(idx);
  fs.writeFileSync(blogPath, blogContent, "utf-8");
  console.log(`[autoPublish] Articolo inserito in blog.ts: ${slug}`);

  // Git commit + push tramite simple-git
  const { default: simpleGit } = await import("simple-git");
  const git = simpleGit(ROOT);
  await git.add(blogPath);
  await git.commit(`Auto-publish: ${title} ${pubDate}`);
  await git.push("origin", "main");
  console.log(`[autoPublish] Commit e push completati: "${title}"`);

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

    // Legge blog.ts per filtrare opportunità già pubblicate
    const blogPath = path.join(ROOT, "src", "data", "blog.ts");
    const blogContent = fs.readFileSync(blogPath, "utf-8");

    const bestBofu = (opportunities as Record<string, unknown>[]).find((o) => {
      if (o.funnel_stage !== "BOFU" || o.seo_potential !== "high") return false;
      const slug = o.suggested_slug as string | undefined;
      if (!slug) return false;
      return !new RegExp(`slug:\\s*["']${slug}["']`).test(blogContent);
    }) ?? (opportunities as Record<string, unknown>[]).find((o) => {
      const slug = o.suggested_slug as string | undefined;
      if (!slug) return false;
      return !new RegExp(`slug:\\s*["']${slug}["']`).test(blogContent);
    });

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
// Entrypoint
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const isScoutOnly = args.includes("--scout");

if (isScoutOnly) {
  runScout()
    .then(({ opportunities }) => {
      console.log(JSON.stringify({ opportunities }, null, 2));
    })
    .catch(console.error);
} else {
  runPipeline().catch(console.error);
}

/**
 * Pipeline agenti: Scout → Redattore → SEO
 *
 * Uso:
 *   tsx agents/orchestrator.ts            # pipeline completa
 *   tsx agents/orchestrator.ts --scout    # solo Scout
 */

import dotenv from "dotenv";
dotenv.config();

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendArticleNotification } from "./mailer.js";

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

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function saveLog(log: Record<string, unknown>) {
  const logDir = path.join(ROOT, "output", "logs");
  ensureDir(logDir);
  const file = path.join(logDir, `run-${today()}.json`);
  fs.writeFileSync(file, JSON.stringify(log, null, 2), "utf-8");
  console.log(`[orchestrator] Log salvato: ${file}`);
}

// ---------------------------------------------------------------------------
// Claude call con prompt caching sul system prompt
// ---------------------------------------------------------------------------

async function callClaude(
  client: Anthropic,
  systemPrompt: string,
  userMessage: string,
  label: string
): Promise<string> {
  console.log(`[${label}] Chiamata a Claude (${MODEL})…`);

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

export async function runScout(
  client: Anthropic
): Promise<{ reportPath: string; opportunities: unknown[] }> {
  const systemPrompt = readPrompt("scout", "scout-prompt.md");

  const userMessage = `Analizza la sitemap di Ticket Italia e produci il report opportunità.

URL sitemap: ${SITEMAP_URL}
Data di oggi: ${today()}

Rispondi SOLO con il JSON puro del report (nessun markdown, nessun testo aggiuntivo).
Il JSON deve rispettare esattamente il formato definito nel tuo system prompt.`;

  const raw = await callClaude(client, systemPrompt, userMessage, "scout");

  // Estrai JSON dalla risposta (Claude potrebbe aggiungere fences nonostante le istruzioni)
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("[scout] Risposta non contiene JSON valido");

  const report = JSON.parse(jsonMatch[0]);

  const reportDir = path.join(ROOT, "output", "articles");
  ensureDir(reportDir);
  const reportPath = path.join(reportDir, `scout-report-${today()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");
  console.log(`[scout] Report salvato: ${reportPath}`);

  return { reportPath, opportunities: report.opportunities ?? [] };
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

    // 1. og:image
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1]) return ogMatch[1];

    // 2. Prima <img> con src assoluto che sembri un'immagine evento
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
  client: Anthropic,
  opportunity: Record<string, unknown>
): Promise<{ articlePath: string; slug: string; rawContent: string }> {
  const systemPrompt = readPrompt("redattore", "redattore-prompt.md");

  // Recupera l'immagine reale dalla pagina evento
  const eventUrl = opportunity.ticketitalia_url as string | undefined;
  const eventImage = eventUrl ? await fetchEventImage(eventUrl) : "";
  if (eventImage) {
    console.log(`[redattore] Immagine evento trovata: ${eventImage}`);
  } else {
    console.warn("[redattore] Immagine evento non trovata — verrà usato il fallback");
  }

  const userMessage = `Scrivi l'articolo per la seguente opportunità identificata dallo Scout.

OPPORTUNITÀ:
${JSON.stringify(opportunity, null, 2)}

IMMAGINE EVENTO:
${eventImage || "(non disponibile — usa il fallback /images/[slug]-hero.jpg)"}

Istruzioni di output:
- Rispondi SOLO con il contenuto del file TypeScript (import + export const article = {...})
- Nessun markdown, nessuna spiegazione, solo il codice TypeScript valido
- Inizia direttamente con: import type { Article } from "@/data/blog";
- Usa l'IMMAGINE EVENTO fornita sopra come valore del campo image (se disponibile)`;

  const raw = await callClaude(
    client,
    systemPrompt,
    userMessage,
    "redattore"
  );

  // Estrai il blocco TypeScript se Claude ha aggiunto fences
  const tsMatch =
    raw.match(/```(?:typescript|ts)?\n([\s\S]*?)```/) ??
    raw.match(/(import type[\s\S]*)/);
  const tsContent = tsMatch ? (tsMatch[1] ?? tsMatch[0]).trim() : raw.trim();

  const slug =
    (opportunity.suggested_slug as string | undefined) ??
    `articolo-${today()}`;
  const articleDir = path.join(ROOT, "output", "articles");
  ensureDir(articleDir);
  const articlePath = path.join(articleDir, `${slug}.ts`);
  fs.writeFileSync(articlePath, tsContent, "utf-8");
  console.log(`[redattore] Articolo salvato: ${articlePath}`);

  return { articlePath, slug, rawContent: tsContent };
}

// ---------------------------------------------------------------------------
// Agente SEO
// ---------------------------------------------------------------------------

export interface SeoResult {
  articlePath: string;
  reportPath: string;
  title: string;
  excerpt: string;
  keyword: string;
  funnelStage: string;
  seoScore: Record<string, string>;
  rawContent: string;
}

export async function runSeo(
  client: Anthropic,
  articlePath: string,
  keywords: string[]
): Promise<SeoResult> {
  const systemPrompt = readPrompt("seo", "seo-prompt.md");
  const articleContent = fs.readFileSync(articlePath, "utf-8");
  const slug = path.basename(articlePath, ".ts");

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

  const raw = await callClaude(client, systemPrompt, userMessage, "seo");

  const separator = "---SEO-REPORT---";
  const parts = raw.split(separator);

  let optimizedTs = parts[0]?.trim() ?? articleContent;
  // Rimuovi eventuali fences
  const tsMatch = optimizedTs.match(/```(?:typescript|ts)?\n([\s\S]*?)```/);
  if (tsMatch?.[1]) optimizedTs = tsMatch[1].trim();

  const seoReport = parts[1]?.trim() ?? "Report SEO non generato.";

  fs.writeFileSync(articlePath, optimizedTs, "utf-8");

  const reportPath = path.join(
    path.dirname(articlePath),
    `${slug}-seo-report.md`
  );
  fs.writeFileSync(reportPath, seoReport, "utf-8");
  console.log(`[seo] Articolo ottimizzato: ${articlePath}`);
  console.log(`[seo] Report salvato: ${reportPath}`);

  // Estrai metadati dall'articolo ottimizzato per la notifica email
  const titleMatch = optimizedTs.match(/title:\s*"([^"]+)"/);
  const excerptMatch = optimizedTs.match(/excerpt:\s*"([^"]+)"/);
  const funnelMatch = optimizedTs.match(/funnelStage:\s*"([^"]+)"/);
  const seoScoreMatch = seoReport.match(
    /Score SEO Stimato[\s\S]*?(?=##|$)/
  );

  // Parsing grezzo del score dal report markdown
  const seoScore: Record<string, string> = {};
  seoScoreMatch?.[0]
    ?.split("\n")
    .filter((l) => l.includes("✅") || l.includes("⚠️") || l.includes("❌"))
    .forEach((line) => {
      const m = line.match(/[-*]?\s*(.+?):\s*(✅|⚠️|❌)/);
      if (m?.[1] && m?.[2]) seoScore[m[1].trim()] = m[2];
    });

  return {
    articlePath,
    reportPath,
    title: titleMatch?.[1] ?? slug,
    excerpt: excerptMatch?.[1] ?? "",
    keyword: keywords[0] ?? "",
    funnelStage: funnelMatch?.[1] ?? "BOFU",
    seoScore,
    rawContent: optimizedTs,
  };
}

// ---------------------------------------------------------------------------
// Pipeline completa
// ---------------------------------------------------------------------------

export async function runPipeline(): Promise<void> {
  const startTime = Date.now();
  const log: Record<string, unknown> = {
    startedAt: new Date().toISOString(),
    model: MODEL,
    steps: {},
  };

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    // 1. Scout
    console.log("\n=== STEP 1: SCOUT ===");
    const { reportPath, opportunities } = await runScout(client);
    log.steps = { ...(log.steps as object), scout: { reportPath, found: opportunities.length } };

    // Seleziona la migliore opportunità BOFU
    const bestBofu = (opportunities as Record<string, unknown>[]).find(
      (o) => o.funnel_stage === "BOFU" && o.seo_potential === "high"
    ) ?? (opportunities as Record<string, unknown>[])[0];

    if (!bestBofu) throw new Error("Nessuna opportunità trovata nello Scout report");
    console.log(`[orchestrator] Opportunità selezionata: ${bestBofu.title}`);

    // 2. Redattore
    console.log("\n=== STEP 2: REDATTORE ===");
    const { articlePath, slug } = await runRedattore(client, bestBofu);
    log.steps = { ...(log.steps as object), redattore: { articlePath, slug } };

    // 3. SEO
    console.log("\n=== STEP 3: SEO ===");
    const keywords = (bestBofu.keywords as string[] | undefined) ?? [];
    const seoResult = await runSeo(client, articlePath, keywords);
    log.steps = {
      ...(log.steps as object),
      seo: {
        articlePath: seoResult.articlePath,
        reportPath: seoResult.reportPath,
        seoScore: seoResult.seoScore,
      },
    };

    // 4. Notifica email
    console.log("\n=== STEP 4: NOTIFICA EMAIL ===");
    await sendArticleNotification({
      slug,
      title: seoResult.title,
      excerpt: seoResult.excerpt,
      keyword: seoResult.keyword,
      filePath: seoResult.articlePath,
      funnelStage: seoResult.funnelStage,
      seoScore: seoResult.seoScore,
      rawContent: seoResult.rawContent,
    });

    log.status = "success";
  } catch (err) {
    console.error("[orchestrator] Errore:", err);
    log.status = "error";
    log.error = String(err);
  } finally {
    log.durationMs = Date.now() - startTime;
    log.completedAt = new Date().toISOString();
    saveLog(log);
  }
}

// ---------------------------------------------------------------------------
// Entrypoint
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const isScoutOnly = args.includes("--scout");

if (isScoutOnly) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  runScout(client).catch(console.error);
} else {
  runPipeline().catch(console.error);
}

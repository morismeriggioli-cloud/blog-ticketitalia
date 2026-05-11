/**
 * Approval server — pubblica un articolo draft su richiesta HTTP.
 *
 * Uso: tsx agents/approve-server.ts
 * Endpoint: GET http://localhost:3001/approve?slug=SLUG&token=TOKEN
 *
 * Sicurezza:
 * - Bind di default su 127.0.0.1 (sovrascrivibile con APPROVE_SERVER_BIND)
 * - Token obbligatorio via env APPROVE_SERVER_TOKEN; rifiuta avvio se mancante
 *   (anche perché un endpoint che muta blog.ts senza auth non deve esistere)
 * - Rate limit in-memory per IP (10 richieste / 60s, soft cap)
 * - Confronto token con timingSafeEqual per evitare side-channel
 */

import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

import express, { type NextFunction, type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.APPROVE_SERVER_PORT ?? 3001);
const BIND = process.env.APPROVE_SERVER_BIND ?? "127.0.0.1";

const APPROVE_TOKEN = process.env.APPROVE_SERVER_TOKEN;
if (!APPROVE_TOKEN || APPROVE_TOKEN.length < 24) {
  console.error(
    "[approve-server] APPROVE_SERVER_TOKEN non configurato o troppo corto (< 24 char). " +
      "Genera un token con: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
  );
  process.exit(1);
}

const app = express();
app.disable("x-powered-by");

// --- Rate limit in-memory: 10 richieste / 60s per IP -----------------------
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10;
const rateBuckets = new Map<string, number[]>();

function rateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
  const now = Date.now();
  const hits = (rateBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    res.status(429).send("Too many requests");
    return;
  }
  hits.push(now);
  rateBuckets.set(ip, hits);
  next();
}

// --- Auth: token via query `?token=` o header `Authorization: Bearer ...` ---
function requireToken(req: Request, res: Response, next: NextFunction) {
  const headerToken =
    typeof req.headers.authorization === "string" &&
    req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : "";
  const queryToken = typeof req.query.token === "string" ? req.query.token : "";
  const provided = headerToken || queryToken;

  const a = Buffer.from(provided);
  const b = Buffer.from(APPROVE_TOKEN!);
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!valid) {
    res.status(401).send("Unauthorized");
    return;
  }
  next();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Estrae il corpo dell'oggetto `export const article: Article = { ... };`
 * restituendo la stringa che va da `{` fino alla `}` di chiusura (inclusa).
 */
function extractArticleObject(fileContent: string): string {
  const marker = "export const article: Article = ";
  const markerIdx = fileContent.indexOf(marker);
  if (markerIdx === -1) throw new Error("Marker 'export const article' non trovato nel file");

  const objStart = fileContent.indexOf("{", markerIdx + marker.length);
  if (objStart === -1) throw new Error("Apertura oggetto '{' non trovata");

  // Walk stack-based per trovare la chiusura bilanciata
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
  throw new Error("Oggetto articolo non bilanciato — parentesi non chiuse");
}

/**
 * Aggiunge 2 spazi di indentazione a ogni riga (per l'inserimento nell'array).
 */
function indent(obj: string): string {
  return obj
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}

// ---------------------------------------------------------------------------
// Pagine HTML di risposta
// ---------------------------------------------------------------------------

function htmlPage(
  icon: string,
  title: string,
  message: string,
  detail?: string
): string {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
         background:#f8f9fa;display:flex;align-items:center;justify-content:center;
         min-height:100vh;padding:24px}
    .card{background:#fff;border-radius:12px;padding:40px;max-width:480px;width:100%;
          box-shadow:0 4px 24px rgba(0,0,0,.08);text-align:center}
    .icon{font-size:56px;margin-bottom:16px}
    h1{font-size:22px;font-weight:800;color:#212529;margin-bottom:12px}
    p{font-size:15px;color:#495057;line-height:1.6;margin-bottom:10px}
    code{background:#f1f3f5;padding:2px 7px;border-radius:4px;font-size:13px;color:#e63946}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    ${detail ? `<p><code>${detail}</code></p>` : ""}
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Endpoint principale
// ---------------------------------------------------------------------------

app.get("/approve", rateLimit, requireToken, (req, res) => {
  const slug = typeof req.query.slug === "string" ? req.query.slug.trim() : "";

  if (!slug) {
    res.status(400).send(
      htmlPage("⚠️", "Parametro mancante", "Specificare <code>?slug=SLUG</code> nella URL.")
    );
    return;
  }

  const draftPath = path.join(ROOT, "output", "articles", `${slug}.ts`);
  const blogPath = path.join(ROOT, "src", "data", "blog.ts");

  // 1. Verifica esistenza file draft
  if (!fs.existsSync(draftPath)) {
    res.status(404).send(
      htmlPage("❌", "File non trovato", `Il draft <code>${slug}.ts</code> non esiste in output/articles/.`)
    );
    return;
  }

  // 2. Leggi blog.ts e controlla duplicato
  let blogContent = fs.readFileSync(blogPath, "utf-8");
  if (new RegExp(`slug:\\s*["']${slug}["']`).test(blogContent)) {
    res.status(409).send(
      htmlPage("⚠️", "Già pubblicato", `L'articolo con slug <code>${slug}</code> è già presente in blog.ts.`)
    );
    return;
  }

  try {
    // 3. Leggi e aggiorna il file draft
    let draftContent = fs.readFileSync(draftPath, "utf-8");

    // Cambia status
    draftContent = draftContent.replace(/status:\s*"draft"/, `status: "published"`);

    // Imposta o aggiorna publishedAt
    const pubDate = today();
    if (/publishedAt:\s*"[^"]*"/.test(draftContent)) {
      draftContent = draftContent.replace(
        /publishedAt:\s*"[^"]*"/,
        `publishedAt: "${pubDate}"`
      );
    } else {
      draftContent = draftContent.replace(
        /status:\s*"published"/,
        `status: "published",\n  publishedAt: "${pubDate}"`
      );
    }

    // Salva draft aggiornato
    fs.writeFileSync(draftPath, draftContent, "utf-8");

    // 4. Estrai oggetto articolo e indentalo
    const rawObj = extractArticleObject(draftContent);
    const indentedObj = indent(rawObj);

    // 5. Inserisci in blog.ts prima della chiusura dell'array articles
    //    Il pattern finale dell'array è:  \n];\n\nexport const publishedArticles
    const insertionMarker = "\n];\n\nexport const publishedArticles";
    const insertionIdx = blogContent.indexOf(insertionMarker);

    if (insertionIdx === -1) {
      throw new Error("Marker di inserimento non trovato in blog.ts — struttura del file modificata?");
    }

    blogContent =
      blogContent.slice(0, insertionIdx) +
      `\n  ${indentedObj},` +
      blogContent.slice(insertionIdx);

    fs.writeFileSync(blogPath, blogContent, "utf-8");

    console.log(`[approve] Articolo pubblicato: ${slug} (${pubDate})`);

    res.send(
      htmlPage(
        "✅",
        "Articolo pubblicato!",
        `<strong>${slug}</strong> è stato aggiunto a <code>src/data/blog.ts</code> con status <code>published</code>.`,
        `publishedAt: ${pubDate}`
      )
    );
  } catch (err) {
    console.error("[approve] Errore:", err);
    res.status(500).send(
      htmlPage("💥", "Errore interno", String(err))
    );
  }
});

// ---------------------------------------------------------------------------
// Healthcheck
// ---------------------------------------------------------------------------

app.get("/health", (_req, res) => {
  res.json({ status: "ok", port: PORT });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

app.listen(PORT, BIND, () => {
  console.log(`[approve-server] In ascolto su http://${BIND}:${PORT} (bind locale)`);
  console.log(`[approve-server] Approva con: http://${BIND}:${PORT}/approve?slug=SLUG&token=<APPROVE_SERVER_TOKEN>`);
  console.log("[approve-server] Token richiesto via query ?token= o header Authorization: Bearer …");
});

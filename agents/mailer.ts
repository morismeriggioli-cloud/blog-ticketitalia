import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Tipi
// ---------------------------------------------------------------------------

export interface ArticleNotification {
  slug: string;
  title: string;
  excerpt: string;
  keyword: string;
  filePath: string;
  funnelStage: string;
  seoScore?: Record<string, string>;
  /** Oggetto Article già parsato (sostituisce il vecchio rawContent TypeScript). */
  articleData?: Record<string, unknown>;
}

export interface PublishedNotification {
  slug: string;
  title: string;
  excerpt: string;
  keyword: string;
  funnelStage: string;
  articleUrl: string;
  publishedAt: string;
  seoScore?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Accesso al body dell'articolo via oggetto JSON parsato
// (sostituisce i vecchi parser regex su TypeScript)
// ---------------------------------------------------------------------------

interface ParsedBody {
  intro: string;
  quickInfoTitle: string;
  quickInfoBullets: string[];
  ticketsTitle: string;
  ticketsText: string;
  ticketsBullets: string[];
  artistContextTitle: string;
  artistContextParagraphs: string[];
  locationTitle: string;
  locationExperience: string;
  locationAtmosphere: string;
  practicalInfoTitle: string;
  practicalInfoBullets: string[];
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faq: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaHref: string;
}

type AnyObj = Record<string, unknown>;

function asObj(v: unknown): AnyObj {
  return v && typeof v === "object" ? (v as AnyObj) : {};
}
function asStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}
function asStrArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function parseArticleBody(article: AnyObj): ParsedBody {
  const body = asObj(article.body);
  const quickInfo = asObj(body.quickInfo);
  const tickets = asObj(body.tickets);
  const artistContext = asObj(body.artistContext);
  const location = asObj(body.location);
  const practicalInfo = asObj(body.practicalInfo);
  const cta = asObj(body.cta);

  const sections = (Array.isArray(body.sections) ? body.sections : [])
    .map((s) => {
      const o = asObj(s);
      return { heading: asStr(o.heading), paragraphs: asStrArr(o.paragraphs) };
    })
    .filter((s) => s.heading);

  const faq = (Array.isArray(body.faq) ? body.faq : [])
    .map((f) => {
      const o = asObj(f);
      return { question: asStr(o.question), answer: asStr(o.answer) };
    })
    .filter((f) => f.question);

  return {
    intro: asStr(body.intro),
    quickInfoTitle: asStr(quickInfo.title),
    quickInfoBullets: asStrArr(quickInfo.bullets),
    ticketsTitle: asStr(tickets.title),
    ticketsText: asStr(tickets.text),
    ticketsBullets: asStrArr(tickets.bullets),
    artistContextTitle: asStr(artistContext.title),
    artistContextParagraphs: asStrArr(artistContext.paragraphs),
    locationTitle: asStr(location.title),
    locationExperience: asStr(location.experience),
    locationAtmosphere: asStr(location.atmosphere),
    practicalInfoTitle: asStr(practicalInfo.title),
    practicalInfoBullets: asStrArr(practicalInfo.bullets),
    sections,
    faq,
    ctaTitle: asStr(cta.title),
    ctaHref: asStr(cta.href),
  };
}

// ---------------------------------------------------------------------------
// Costanti di stile
// ---------------------------------------------------------------------------

const C = {
  primary: "#e63946",
  primaryDark: "#c1121f",
  success: "#2d6a4f",
  successBg: "#d8f3dc",
  bg: "#f8f9fa",
  card: "#ffffff",
  border: "#e9ecef",
  text: "#212529",
  muted: "#6c757d",
  code: "#495057",
  badgeBg: {
    BOFU: "#fff3cd",
    MOFU: "#cfe2ff",
    TOFU: "#d1e7dd",
  } as Record<string, string>,
  badgeColor: {
    BOFU: "#856404",
    MOFU: "#084298",
    TOFU: "#0f5132",
  } as Record<string, string>,
};

// ---------------------------------------------------------------------------
// Componenti HTML inline
// ---------------------------------------------------------------------------

function h2(text: string): string {
  return `<h2 style="font-size:16px;font-weight:700;color:${C.text};margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid ${C.primary}">${esc(text)}</h2>`;
}

function h3(text: string): string {
  return `<h3 style="font-size:14px;font-weight:600;color:${C.text};margin:16px 0 6px">${esc(text)}</h3>`;
}

function p(text: string): string {
  return `<p style="font-size:14px;color:#444;line-height:1.7;margin:0 0 10px">${esc(text)}</p>`;
}

function ul(items: string[]): string {
  if (!items.length) return "";
  const lis = items
    .map(
      (it) =>
        `<li style="font-size:13px;color:#444;line-height:1.6;margin-bottom:4px">${esc(it)}</li>`
    )
    .join("");
  return `<ul style="margin:6px 0 10px 18px;padding:0">${lis}</ul>`;
}

function card(content: string): string {
  return `<div style="background:${C.card};border:1px solid ${C.border};border-radius:8px;padding:20px;margin-bottom:16px">${content}</div>`;
}

function divider(): string {
  return `<hr style="border:none;border-top:1px solid ${C.border};margin:20px 0">`;
}

function badge(label: string): string {
  const bg = C.badgeBg[label] ?? "#e9ecef";
  const color = C.badgeColor[label] ?? "#333";
  return `<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:${bg};color:${color};letter-spacing:0.5px">${label}</span>`;
}

function scoreIcon(val: string): string {
  if (val.includes("✅")) return "✅";
  if (val.includes("⚠️")) return "⚠️";
  if (val.includes("❌")) return "❌";
  return val;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

// ---------------------------------------------------------------------------
// Builder HTML principale
// ---------------------------------------------------------------------------

function buildHtml(article: ArticleNotification): string {
  const siteUrl = process.env.SITE_URL ?? "https://blog.ticketitalia.com";
  const now = new Date().toLocaleDateString("it-IT", { dateStyle: "long" });
  const body = article.articleData ? parseArticleBody(article.articleData) : null;

  // --- SEZIONE SEO SCORE ---
  const seoScoreRows = article.seoScore
    ? Object.entries(article.seoScore)
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:6px 10px;font-size:13px;color:${C.muted};border-bottom:1px solid ${C.border}">${esc(k)}</td>
          <td style="padding:6px 10px;font-size:14px;border-bottom:1px solid ${C.border};text-align:center">${scoreIcon(v)}</td>
        </tr>`
        )
        .join("")
    : "";

  // --- SEZIONE BODY ARTICOLO ---
  let articleHtml = "";

  if (body) {
    // Intro
    if (body.intro) {
      articleHtml += card(
        `<p style="font-size:15px;color:${C.text};line-height:1.8;font-style:italic;margin:0">"${esc(body.intro)}"</p>`
      );
    }

    // Quick Info
    if (body.quickInfoBullets.length) {
      articleHtml += card(
        h2(body.quickInfoTitle || "Informazioni rapide") +
          ul(body.quickInfoBullets)
      );
    }

    // Biglietti
    if (body.ticketsTitle) {
      articleHtml += card(
        h2(body.ticketsTitle) +
          (body.ticketsText ? p(body.ticketsText) : "") +
          ul(body.ticketsBullets)
      );
    }

    // Artista
    if (body.artistContextTitle) {
      articleHtml += card(
        h2(body.artistContextTitle) +
          body.artistContextParagraphs.map((t) => p(t)).join("")
      );
    }

    // Location
    if (body.locationTitle) {
      articleHtml += card(
        h2(body.locationTitle) +
          (body.locationExperience
            ? `<div style="background:${C.bg};border-left:3px solid ${C.primary};padding:10px 14px;margin-bottom:10px;border-radius:0 4px 4px 0">${p(body.locationExperience)}</div>`
            : "") +
          (body.locationAtmosphere ? p(body.locationAtmosphere) : "")
      );
    }

    // Sezioni approfondimento
    if (body.sections.length) {
      const sectionsHtml = body.sections
        .map(
          (s) =>
            h3(s.heading) + s.paragraphs.map((t) => p(t)).join("")
        )
        .join("");
      articleHtml += card(
        `<h2 style="font-size:16px;font-weight:700;color:${C.text};margin:0 0 14px;padding-bottom:8px;border-bottom:2px solid ${C.primary}">Approfondimenti</h2>` +
          sectionsHtml
      );
    }

    // Practical Info
    if (body.practicalInfoBullets.length) {
      articleHtml += card(
        h2(body.practicalInfoTitle || "Informazioni pratiche") +
          ul(body.practicalInfoBullets)
      );
    }

    // FAQ
    if (body.faq.length) {
      const faqHtml = body.faq
        .map(
          (f) => `
          <div style="margin-bottom:14px">
            <p style="font-size:14px;font-weight:600;color:${C.text};margin:0 0 4px">Q: ${esc(f.question)}</p>
            <p style="font-size:13px;color:#444;line-height:1.6;margin:0;padding-left:12px;border-left:2px solid ${C.border}">${esc(f.answer)}</p>
          </div>`
        )
        .join("");
      articleHtml += card(
        `<h2 style="font-size:16px;font-weight:700;color:${C.text};margin:0 0 14px;padding-bottom:8px;border-bottom:2px solid ${C.primary}">FAQ</h2>` +
          faqHtml
      );
    }
  }

  // --- PULSANTI CTA ---
  // L'URL include il token di approve-server: il pulsante nell'email è l'unico
  // canale d'invio ammesso, e l'email viene già recapitata in modo riservato a
  // NOTIFY_EMAIL. Senza token l'endpoint risponde 401.
  const approveServerUrl = process.env.APPROVE_SERVER_URL ?? "http://localhost:3001";
  const approveToken = process.env.APPROVE_SERVER_TOKEN ?? "";
  const approveHref =
    `${approveServerUrl}/approve` +
    `?slug=${encodeURIComponent(article.slug)}` +
    (approveToken ? `&token=${encodeURIComponent(approveToken)}` : "");
  const ctaButtons = `
<table style="width:100%;margin:24px 0" cellpadding="0" cellspacing="0">
  <tr>
    <td style="padding-right:8px">
      <a href="${approveHref}"
         style="display:block;text-align:center;padding:14px 20px;background:${C.success};color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:700">
        ✅ Approva e Pubblica
      </a>
    </td>
    <td style="padding-left:8px">
      <a href="mailto:${process.env.NOTIFY_EMAIL ?? ""}?subject=RIFIUTO: ${encodeURIComponent(article.title)}&body=Motivazione:"
         style="display:block;text-align:center;padding:14px 20px;background:${C.primary};color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:700">
        ❌ Rifiuta
      </a>
    </td>
  </tr>
</table>`;

  // --- COMPOSIZIONE FINALE ---
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(article.title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:${C.text}">

<div style="max-width:600px;margin:0 auto;padding:24px 16px">

  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,${C.primaryDark} 0%,${C.primary} 100%);border-radius:12px;padding:28px 24px;margin-bottom:20px">
    <p style="color:rgba(255,255,255,0.75);font-size:12px;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px">
      Ticket Italia Blog · Pipeline Agenti
    </p>
    <h1 style="color:#fff;font-size:22px;font-weight:800;margin:0 0 12px;line-height:1.3">
      ${esc(article.title)}
    </h1>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${badge(article.funnelStage)}
      <span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.2);color:#fff">
        Nuovo draft · ${now}
      </span>
    </div>
  </div>

  <!-- META -->
  ${card(`
    <p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 14px;font-style:italic">${esc(article.excerpt)}</p>
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <tr>
        <td style="padding:5px 0;color:${C.muted};width:130px">Slug</td>
        <td style="padding:5px 0"><code style="background:${C.bg};padding:2px 6px;border-radius:4px;font-size:12px">${esc(article.slug)}</code></td>
      </tr>
      <tr>
        <td style="padding:5px 0;color:${C.muted}">Keyword</td>
        <td style="padding:5px 0;font-weight:600">${esc(article.keyword)}</td>
      </tr>
      <tr>
        <td style="padding:5px 0;color:${C.muted}">File</td>
        <td style="padding:5px 0"><code style="background:${C.bg};padding:2px 6px;border-radius:4px;font-size:11px">${esc(article.filePath)}</code></td>
      </tr>
    </table>
  `)}

  <!-- SEO SCORE -->
  ${
    seoScoreRows
      ? card(`
    <h2 style="font-size:15px;font-weight:700;color:${C.text};margin:0 0 12px">Score SEO</h2>
    <table style="width:100%;border-collapse:collapse">
      ${seoScoreRows}
    </table>
  `)
      : ""
  }

  ${divider()}

  <!-- CONTENUTO ARTICOLO -->
  <h2 style="font-size:18px;font-weight:800;color:${C.text};margin:0 0 16px">
    Contenuto articolo
  </h2>

  ${articleHtml || `<p style="color:${C.muted};font-size:14px">Contenuto non disponibile.</p>`}

  ${divider()}

  <!-- PULSANTI -->
  ${ctaButtons}

  <!-- FOOTER -->
  <div style="background:${C.card};border:1px solid ${C.border};border-radius:8px;padding:16px;font-size:12px;color:${C.muted}">
    <p style="margin:0 0 6px">
      <strong>File generato:</strong>
      <code style="background:${C.bg};padding:1px 5px;border-radius:3px">${esc(article.filePath)}</code>
    </p>
    <p style="margin:0 0 6px">
      Per pubblicare: sposta il contenuto in <code>src/data/blog.ts</code>
      e imposta <code>status: "published"</code>
    </p>
    <p style="margin:0;color:#aaa">Generato il ${now} · Ticket Italia Blog Pipeline</p>
  </div>

</div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Resend client
// ---------------------------------------------------------------------------

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[mailer] RESEND_API_KEY non impostata — invio email disabilitato");
    return null;
  }
  return new Resend(key);
}

function getFromAddress(): string {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error(
      "[mailer] RESEND_FROM_EMAIL non impostata: deve essere un mittente verificato su Resend"
    );
  }
  // Se l'utente non ha specificato un display name, lo aggiungiamo noi
  return from.includes("<") ? from : `Ticket Italia Blog <${from}>`;
}

// ---------------------------------------------------------------------------
// Export pubblico
// ---------------------------------------------------------------------------

export async function sendArticleNotification(
  article: ArticleNotification
): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) {
    console.warn("[mailer] NOTIFY_EMAIL non impostata — notifica saltata");
    return;
  }

  const resend = getResendClient();
  if (!resend) return;

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to,
    subject: `[Draft ${article.funnelStage}] ${article.title}`,
    html: buildHtml(article),
  });

  if (error) {
    console.error("[mailer] Errore invio notifica:", error);
    return;
  }

  console.log(`[mailer] Notifica inviata a ${to}`);
}

export async function sendPublishedNotification(
  article: PublishedNotification
): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) {
    console.warn("[mailer] NOTIFY_EMAIL non impostata — notifica pubblicazione saltata");
    return;
  }

  const resend = getResendClient();
  if (!resend) return;

  const seoRows = article.seoScore
    ? Object.entries(article.seoScore)
        .map(
          ([key, value]) => `
        <tr>
          <td style="padding:6px 10px;font-size:13px;color:${C.muted};border-bottom:1px solid ${C.border}">${esc(key)}</td>
          <td style="padding:6px 10px;font-size:14px;border-bottom:1px solid ${C.border};text-align:center">${scoreIcon(value)}</td>
        </tr>`
        )
        .join("")
    : "";

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to,
    subject: `[Pubblicato ${article.funnelStage}] ${article.title}`,
    html: `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(article.title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:${C.text}">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px">
    <div style="background:${C.success};border-radius:12px;padding:28px 24px;margin-bottom:20px">
      <p style="color:rgba(255,255,255,0.78);font-size:12px;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px">
        Ticket Italia Blog · Articolo pubblicato
      </p>
      <h1 style="color:#fff;font-size:22px;font-weight:800;margin:0 0 12px;line-height:1.3">
        ${esc(article.title)}
      </h1>
      <span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(255,255,255,0.2);color:#fff">
        ${esc(article.funnelStage)} · ${esc(article.publishedAt)}
      </span>
    </div>

    ${card(`
      <p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 14px;font-style:italic">${esc(article.excerpt)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr>
          <td style="padding:5px 0;color:${C.muted};width:130px">Slug</td>
          <td style="padding:5px 0"><code style="background:${C.bg};padding:2px 6px;border-radius:4px;font-size:12px">${esc(article.slug)}</code></td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:${C.muted}">Keyword</td>
          <td style="padding:5px 0;font-weight:600">${esc(article.keyword)}</td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:${C.muted}">URL</td>
          <td style="padding:5px 0"><a href="${article.articleUrl}" style="color:${C.primary};font-weight:700">${esc(article.articleUrl)}</a></td>
        </tr>
      </table>
    `)}

    ${
      seoRows
        ? card(`
      <h2 style="font-size:15px;font-weight:700;color:${C.text};margin:0 0 12px">Score SEO</h2>
      <table style="width:100%;border-collapse:collapse">
        ${seoRows}
      </table>
    `)
        : ""
    }

    <a href="${article.articleUrl}"
       style="display:block;text-align:center;padding:14px 20px;background:${C.primary};color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:700">
      Apri articolo
    </a>
  </div>
</body>
</html>`,
  });

  if (error) {
    console.error("[mailer] Errore invio notifica pubblicazione:", error);
    return;
  }

  console.log(`[mailer] Notifica pubblicazione inviata a ${to}`);
}

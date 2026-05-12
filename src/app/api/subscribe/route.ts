import { NextResponse } from "next/server";

/**
 * POST /api/subscribe — iscrizione newsletter via Brevo.
 *
 * La chiave Brevo sta SOLO lato server (env). Il browser parla solo con questa
 * route same-origin; non vede mai la chiave.
 *
 * Env richieste:
 * - API_KEY_BLOG_BREVO  → API key Brevo (obbligatoria; la route risponde 503 se assente)
 * - BREVO_LIST_ID       → id numerico della lista contatti (opzionale: senza, il
 *                         contatto viene creato/aggiornato ma non aggiunto a una lista)
 *
 * Va impostata sul servizio che serve il blog (Vercel / il Railway che fa `next start`),
 * non solo sul servizio agenti.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BREVO_API_KEY = process.env.API_KEY_BLOG_BREVO ?? process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limit best-effort in-memory (per IP): su serverless non è una garanzia
// forte — le istanze possono ripartire — ma frena gli abusi banali.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const buckets = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (buckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) return true;
  hits.push(now);
  buckets.set(ip, hits);
  // Garbage collection leggera per non far crescere la mappa all'infinito
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) buckets.delete(k);
    }
  }
  return false;
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  if (!BREVO_API_KEY) {
    return NextResponse.json(
      { error: "Newsletter non configurata sul server." },
      { status: 503 },
    );
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Troppe richieste, riprova tra un minuto." },
      { status: 429 },
    );
  }

  let email = "";
  try {
    const body = (await req.json()) as { email?: unknown };
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Inserisci un indirizzo email valido." },
      { status: 400 },
    );
  }

  const payload: Record<string, unknown> = { email, updateEnabled: true };
  if (BREVO_LIST_ID) {
    const id = Number(BREVO_LIST_ID);
    if (Number.isFinite(id)) payload.listIds = [id];
  }

  let res: Response;
  try {
    res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return NextResponse.json(
      { error: "Servizio newsletter momentaneamente non raggiungibile." },
      { status: 502 },
    );
  }

  // 201 = creato, 204 = aggiornato (updateEnabled). Entrambi OK.
  if (res.ok) {
    return NextResponse.json({ ok: true });
  }

  let detail: { code?: string; message?: string } | null = null;
  try {
    detail = (await res.json()) as { code?: string; message?: string };
  } catch {
    /* corpo non-JSON */
  }

  // Contatto già presente: con updateEnabled non dovrebbe capitare, ma per sicurezza.
  if (detail?.code === "duplicate_parameter") {
    return NextResponse.json({ ok: true, alreadySubscribed: true });
  }

  console.error("[subscribe] Brevo error", res.status, detail);
  return NextResponse.json(
    { error: "Iscrizione non riuscita, riprova più tardi." },
    { status: 502 },
  );
}

export function GET() {
  return NextResponse.json({ error: "Metodo non consentito." }, { status: 405 });
}

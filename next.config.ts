import type { NextConfig } from "next";

// Modalità server (non più `output: "export"`): serve la API route /api/subscribe
// che parla con Brevo tenendo la chiave lato server. Le pagine del blog restano
// pre-renderizzate (tutte usano generateStaticParams), quindi per l'utente nulla
// cambia in termini di performance/SEO. `headers()` qui sotto ora viene applicato
// davvero; `vercel.json` resta come ridondanza al layer hosting.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https: data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // `unoptimized: true`: gli articoli usano decine di host esterni (ticketitalia,
    // siti hotel, ecc.) che non vale la pena enumerare in `remotePatterns`. Le
    // immagini esterne passano al browser così come sono; la difesa è la CSP
    // `img-src 'self' https: data:` (vercel.json + headers() qui sotto).
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ticketitalia.com" },
      { protocol: "https", hostname: "www.ticketitalia.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

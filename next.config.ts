import type { NextConfig } from "next";

// IMPORTANT — `output: "export"` produce HTML statico: la funzione `headers()` qui
// sotto NON viene applicata in produzione (Next non gira un server). Gli header di
// sicurezza reali sono serviti dal layer hosting tramite `vercel.json`.
// `headers()` resta utile solo per `next dev` e per documentare l'intento, così che
// passando a server-mode (o a `next start`) la stessa policy sia già pronta.
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
  output: "export",
  trailingSlash: true,
  images: {
    // `unoptimized: true` è obbligatorio con `output: "export"`: l'optimizer Next
    // richiede un server. Con questa flag `remotePatterns` non è applicato in
    // produzione (gli URL esterni vengono passati al browser così come sono),
    // quindi la whitelist non vincola la sicurezza — la difesa è la CSP
    // `img-src 'self' https: data:` servita da vercel.json.
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

export const brandStyle = {
  mood: ["elettrico", "curato", "urbano", "premium", "live"],
  identity:
    "Ticket Italia Blog e un magazine-evento: fa scoprire cosa vale il biglietto, guida le decisioni e porta il lettore vicino al palco prima ancora dell'acquisto.",
  visualVoice:
    "Editoriale ad alto ritmo, con contrasti netti, superfici pulite, accenti luminosi controllati, immagini immersive e dettagli da pass backstage.",
} as const;

export const colors = {
  primary: {
    50: "#E8FBFF",
    100: "#C7F5FF",
    200: "#8CEBFF",
    300: "#45DFFF",
    400: "#16D4F2",
    500: "#00B8D9",
    600: "#0094B3",
    700: "#0A7188",
    800: "#0D5363",
    900: "#0B3843",
  },
  secondary: {
    50: "#FFF0F6",
    100: "#FFD6E7",
    200: "#FF9FCA",
    300: "#FF68AC",
    400: "#FF3D8D",
    500: "#E81972",
    600: "#C30F5C",
    700: "#9B0E4B",
    800: "#74113D",
    900: "#4F102D",
  },
  accent: {
    concert: "#00B8D9",
    festival: "#B7FF2A",
    theatre: "#D7265E",
    sport: "#00B871",
    nightlife: "#7C3AED",
    culture: "#FFB000",
    guide: "#111318",
    news: "#2563EB",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#F7F8FA",
    100: "#ECEFF3",
    200: "#DCE2E8",
    300: "#C4CDD7",
    400: "#8F9AAA",
    500: "#687386",
    600: "#4B5565",
    700: "#333B49",
    800: "#1E2430",
    900: "#111318",
    950: "#07080B",
  },
  semantic: {
    success: "#00B871",
    warning: "#FFB000",
    danger: "#FF3D5A",
    info: "#00B8D9",
  },
} as const;

export const darkTheme = {
  background: "#07080B",
  foreground: "#F7F8FA",
  surface: "#111318",
  surfaceRaised: "#1E2430",
  muted: "#AEB7C4",
  ink: "#FFFFFF",
  line: "rgba(255, 255, 255, 0.14)",
} as const;

export const typography = {
  googleFonts: {
    heading: ["Sora", "Space Grotesk", "Archivo"],
    body: ["Manrope", "Inter", "IBM Plex Sans"],
    mono: ["Geist Mono"],
  },
  fontFamily: {
    heading: "var(--font-heading)",
    body: "var(--font-body)",
    mono: "var(--font-geist-mono)",
  },
  scale: {
    display: { size: "4.5rem", mobileSize: "2.75rem", lineHeight: "0.96", weight: 900, letterSpacing: "0" },
    h1: { size: "4rem", mobileSize: "2.5rem", lineHeight: "1", weight: 900, letterSpacing: "0" },
    h2: { size: "3rem", mobileSize: "2rem", lineHeight: "1.05", weight: 850, letterSpacing: "0" },
    h3: { size: "2rem", mobileSize: "1.5rem", lineHeight: "1.12", weight: 800, letterSpacing: "0" },
    h4: { size: "1.375rem", mobileSize: "1.25rem", lineHeight: "1.2", weight: 800, letterSpacing: "0" },
    bodyLg: { size: "1.125rem", lineHeight: "1.7", weight: 500, letterSpacing: "0" },
    body: { size: "1rem", lineHeight: "1.65", weight: 400, letterSpacing: "0" },
    bodySm: { size: "0.875rem", lineHeight: "1.55", weight: 500, letterSpacing: "0" },
    caption: { size: "0.75rem", lineHeight: "1.35", weight: 800, letterSpacing: "0" },
  },
} as const;

export const layout = {
  spacingBase: "4px",
  container: {
    page: "1180px",
    editorial: "760px",
    wide: "1320px",
  },
  breakpoints: {
    mobile: "0px",
    tablet: "640px",
    laptop: "1024px",
    desktop: "1280px",
    wide: "1536px",
  },
  grid: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
  },
} as const;

export const motion = {
  duration: {
    instant: "120ms",
    fast: "180ms",
    base: "240ms",
    slow: "360ms",
    reveal: "620ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
    exit: "cubic-bezier(0.7, 0, 0.84, 0)",
  },
} as const;

export const componentStyles = {
  button: {
    base: "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 font-black transition duration-240 ease-event",
    primary: "bg-primary-500 text-white hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-glow",
    secondary: "border border-line bg-surface text-ink hover:border-ink hover:-translate-y-0.5 hover:shadow-lift",
    ghost: "border border-transparent bg-transparent text-current hover:border-current hover:bg-white/10",
  },
  card: {
    article:
      "group overflow-hidden rounded-md border border-line bg-surface shadow-sm transition duration-300 ease-event hover:-translate-y-1 hover:border-ink hover:shadow-lift",
    media: "relative aspect-[16/10] overflow-hidden bg-ink",
    image: "object-cover transition duration-500 ease-entrance group-hover:scale-105",
    title: "font-heading text-2xl font-black leading-tight text-ink transition group-hover:text-secondary-500",
  },
  input: {
    base: "h-13 w-full rounded-md border border-line bg-surface px-4 text-sm font-medium text-ink outline-none transition focus:border-ink focus:ring-4 focus:ring-primary-500/35",
    error: "border-danger text-ink focus:border-danger focus:ring-danger/25",
  },
} as const;

export const categoryStyles = {
  concerti: { color: colors.accent.concert, text: "#071014", vibe: "arena, palco, bassi, fan culture" },
  festival: { color: colors.accent.festival, text: "#071014", vibe: "outdoor, discovery, energia solare" },
  teatro: { color: colors.accent.theatre, text: "#FFFFFF", vibe: "sipario, presenza scenica, eleganza tesa" },
  sport: { color: colors.accent.sport, text: "#FFFFFF", vibe: "velocita, rivalita, community" },
  nightlife: { color: colors.accent.nightlife, text: "#FFFFFF", vibe: "club, neon, after dark" },
  cultura: { color: colors.accent.culture, text: "#071014", vibe: "mostre, luoghi, tempo libero intelligente" },
  guide: { color: colors.accent.guide, text: "#FFFFFF", vibe: "chiarezza, fiducia, zero frizione" },
  news: { color: colors.accent.news, text: "#FFFFFF", vibe: "prevendite, aggiornamenti, servizio" },
} as const;

export const namingConvention = {
  colors: "primary-*, secondary-*, neutral-*, accent-* per categorie, semantic-* per stati",
  components: "PascalCase per React, kebab-case per slug e classi semantiche globali",
  utilities: "btn-*, category-*, container-* solo quando riducono duplicazione reale",
} as const;

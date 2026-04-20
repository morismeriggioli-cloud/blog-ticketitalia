/**
 * Re-export dello schema Article da src/data/blog.ts con documentazione
 * per gli agenti. Importare sempre da qui nei file output/articles/*.ts.
 */
export type {
  Article,
  Category,
  Subcategory,
  ContentType,
  ArticleStatus,
  FunnelStage,
  ArticleType,
} from "../src/data/blog";

/**
 * Mappa funnel stage → article_type attesi.
 * Usata dallo Scout per validare la coerenza del report e dal Redattore
 * per scegliere la struttura body corretta.
 */
export const FUNNEL_ARTICLE_TYPE_MAP = {
  BOFU: ["evento"],
  MOFU: ["guida", "stagionale"],
  TOFU: ["guida", "evergreen"],
} as const satisfies Record<string, string[]>;

/**
 * Campi obbligatori per articoli di tipo "evento" (BOFU).
 * Lo Scout deve verificare che tutti i campi body siano presenti.
 */
export const EVENTO_REQUIRED_BODY_FIELDS = [
  "intro",
  "quickInfo",
  "tickets",
  "artistContext",
  "location",
  "liveExperience",
  "practicalInfo",
  "sections",
  "cta",
] as const;

export type EventoRequiredBodyField =
  (typeof EVENTO_REQUIRED_BODY_FIELDS)[number];

/**
 * Campi obbligatori per articoli MOFU (guida/stagionale).
 */
export const MOFU_REQUIRED_BODY_FIELDS = [
  "intro",
  "quickInfo",
  "sections",
  "internalLinks",
  "cta",
] as const;

export type MofuRequiredBodyField = (typeof MOFU_REQUIRED_BODY_FIELDS)[number];

/**
 * Campi obbligatori per articoli TOFU (guida/evergreen).
 */
export const TOFU_REQUIRED_BODY_FIELDS = [
  "intro",
  "quickInfo",
  "sections",
  "faq",
] as const;

export type TofuRequiredBodyField = (typeof TOFU_REQUIRED_BODY_FIELDS)[number];

/**
 * Categorie e slug validi nel progetto.
 */
export const VALID_CATEGORIES = [
  { name: "Concerti", slug: "concerti" },
  { name: "Teatro & Spettacoli", slug: "teatro-spettacoli" },
  { name: "Sport", slug: "sport" },
  { name: "Famiglia", slug: "famiglia" },
  { name: "Fiere & Eventi", slug: "fiere-eventi" },
] as const;

export type CategorySlug = (typeof VALID_CATEGORIES)[number]["slug"];

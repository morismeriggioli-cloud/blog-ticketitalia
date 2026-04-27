import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  CalendarCheck,
  Drama,
  Guitar,
  Headphones,
  Lightbulb,
  Moon,
  PartyPopper,
  Radio,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
} from "lucide-react";

export type HeroFeature = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export type HomeCategoryCard = {
  name: string;
  slug: string;
  shortName: string;
  description: string;
  className: string;
  icon: LucideIcon;
  cue: string;
};

export type GuidePanel = {
  title: string;
  excerpt: string;
  kicker: string;
  href: string;
  icon: LucideIcon;
};

export const homepageHero = {
  eyebrow: "La community del live italiano",
  title: "Vivere il live, raccontarlo insieme.",
  subtitle:
    "Concerti, teatro, festival, sport: scriviamo gli eventi come ne parleresti tu, dopo, con un amico al telefono. Per non perdere quello che vale davvero la fatica di esserci.",
  primaryCta: { label: "Trova il prossimo live", href: "https://www.ticketitalia.com" },
  secondaryCta: { label: "Leggi le nostre guide", href: "/categorie/guide" },
  image:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2200&q=85",
  features: [
    { label: "Live vissuti", value: "Cuore in prima fila", icon: CalendarCheck },
    { label: "Scelte vere", value: "Niente algoritmo", icon: Sparkles },
    { label: "La nostra tribù", value: "Capisce di che parli", icon: ShieldCheck },
  ] satisfies HeroFeature[],
};

export const homeCategoryCards: HomeCategoryCard[] = [
  {
    name: "Concerti",
    slug: "concerti",
    shortName: "Live",
    description: "Quando le luci si abbassano e tutto il resto smette di esistere.",
    className: "category-concerti",
    icon: Guitar,
    cue: "Cuore che batte forte",
  },
  {
    name: "Festival",
    slug: "eventi-festival",
    shortName: "Open air",
    description: "Tre giorni che valgono un anno: il tuo prossimo ricordo migliore è qui dentro.",
    className: "category-festival",
    icon: PartyPopper,
    cue: "Estate che chiama",
  },
  {
    name: "Teatro",
    slug: "teatro-spettacoli",
    shortName: "Stage",
    description: "Quando il sipario si alza, il mondo fuori può aspettare.",
    className: "category-teatro",
    icon: Drama,
    cue: "Silenzio che parla",
  },
  {
    name: "Sport",
    slug: "sport",
    shortName: "Game day",
    description: "L'ultimo minuto, lo stadio in piedi, tu in mezzo: ecco perché ci siamo.",
    className: "category-sport",
    icon: Trophy,
    cue: "Fiato sospeso",
  },
  {
    name: "Nightlife",
    slug: "nightlife-experience",
    shortName: "After dark",
    description: "La notte che non vuoi finisca: ed è qui che impari a cercarla.",
    className: "category-nightlife",
    icon: Moon,
    cue: "Quando la città dorme",
  },
];

export const guidePanels: GuidePanel[] = [
  {
    title: "Come usare Carta Cultura e Carta Docente per i biglietti eventi",
    excerpt:
      "Tutto quello che ti serve sapere prima di usare il bonus per un evento: senza fregature, senza inghippi all'ultimo.",
    kicker: "Bonus per il live",
    href: "/come-usare-carta-cultura-carta-docente-biglietti-eventi",
    icon: Headphones,
  },
  {
    title: "Carta Cultura: cosa puoi comprare davvero nel 2026",
    excerpt:
      "Cosa puoi davvero comprare con la Carta Cultura nel 2026, raccontato come lo direbbe un amico esperto.",
    kicker: "Cosa puoi comprare",
    href: "/carta-cultura-cosa-puoi-comprare",
    icon: Radio,
  },
  {
    title: "Come usare Carta Cultura per concerti e spettacoli live",
    excerpt:
      "Quando puoi usare il bonus per un concerto, come generare il buono e cosa controllare prima di pagare.",
    kicker: "Live e bonus",
    href: "/carta-cultura-concerti-come-usarla",
    icon: Lightbulb,
  },
];

export const finalHomeCta = {
  eyebrow: "Dal racconto al palco",
  title: "La prossima serata da ricordare ti sta aspettando.",
  text:
    "Siamo Ticket Italia Blog: una community di gente che agli eventi ci va davvero. Ti raccontiamo il prima, il durante e il dopo — perché un biglietto è solo l'inizio della storia che ti porti a casa.",
  primary: { label: "Trova eventi", href: "https://www.ticketitalia.com", icon: Ticket },
  secondary: { label: "Sfoglia il blog", href: "/articoli", icon: ArrowUpRight },
};

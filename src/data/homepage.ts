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
  eyebrow: "Ticket Italia Magazine",
  title: "Scopri gli eventi che non puoi perdere",
  subtitle:
    "Concerti, festival, teatro, sport e nightlife: una prima pagina viva per capire cosa succede, cosa vale il biglietto e dove esserci davvero.",
  primaryCta: { label: "Esplora eventi", href: "https://www.ticketitalia.com" },
  secondaryCta: { label: "Leggi le guide", href: "/categorie/guide" },
  image:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2200&q=85",
  features: [
    { label: "Agenda calda", value: "Nuove date", icon: CalendarCheck },
    { label: "Scelte curate", value: "Live da seguire", icon: Sparkles },
    { label: "Guide pratiche", value: "Zero frizione", icon: ShieldCheck },
  ] satisfies HeroFeature[],
};

export const homeCategoryCards: HomeCategoryCard[] = [
  {
    name: "Concerti",
    slug: "concerti",
    shortName: "Live",
    description: "Tour, arene, club e date italiane da segnare prima degli altri.",
    className: "category-concerti",
    icon: Guitar,
    cue: "Palco acceso",
  },
  {
    name: "Festival",
    slug: "eventi-festival",
    shortName: "Open air",
    description: "Lineup, weekend lunghi e mete da vivere fuori casa.",
    className: "category-festival",
    icon: PartyPopper,
    cue: "Energia solare",
  },
  {
    name: "Teatro",
    slug: "teatro-spettacoli",
    shortName: "Stage",
    description: "Musical, prosa, comedy e serate con presenza scenica.",
    className: "category-teatro",
    icon: Drama,
    cue: "Sipario vivo",
  },
  {
    name: "Sport",
    slug: "sport",
    shortName: "Game day",
    description: "Finali, derby e appuntamenti dove l'atmosfera pesa.",
    className: "category-sport",
    icon: Trophy,
    cue: "Tensione buona",
  },
  {
    name: "Nightlife",
    slug: "nightlife-experience",
    shortName: "After dark",
    description: "Club, dj set e format immersivi con identita forte.",
    className: "category-nightlife",
    icon: Moon,
    cue: "Neon controllato",
  },
];

export const guidePanels: GuidePanel[] = [
  {
    title: "Come usare Carta Cultura e Carta Docente per i biglietti eventi",
    excerpt:
      "Bonus, buoni digitali, categorie ammesse e passaggi da controllare prima dell'acquisto.",
    kicker: "Guida smart",
    href: "/come-usare-carta-cultura-carta-docente-biglietti-eventi",
    icon: Headphones,
  },
  {
    title: "Carta Cultura: cosa puoi comprare davvero nel 2026",
    excerpt:
      "Una guida chiara per capire quali acquisti sono ammessi e dove fare attenzione.",
    kicker: "Bonus cultura",
    href: "/carta-cultura-cosa-puoi-comprare",
    icon: Radio,
  },
  {
    title: "Come usare Carta Cultura per concerti e spettacoli live",
    excerpt:
      "Quando puoi usare il bonus per un live, come generare il buono e cosa verificare nel checkout.",
    kicker: "Concerti",
    href: "/carta-cultura-concerti-come-usarla",
    icon: Lightbulb,
  },
];

export const finalHomeCta = {
  eyebrow: "Dal magazine al live",
  title: "Non perderti i prossimi eventi",
  text:
    "Leggi, scegli, salva la data. Quando hai trovato l'evento giusto, Ticket Italia ti porta al passo successivo.",
  primary: { label: "Trova eventi", href: "https://www.ticketitalia.com", icon: Ticket },
  secondary: { label: "Sfoglia articoli", href: "/articoli", icon: ArrowUpRight },
};

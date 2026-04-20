import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  Drama,
  Guitar,
  Headphones,
  Map,
  Moon,
  Newspaper,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Trophy,
  Lightbulb,
} from "lucide-react";

export type HomeCategory = {
  name: string;
  slug: string;
  description: string;
  className: string;
  icon: LucideIcon;
  imageHint: string;
};

export type Guide = {
  title: string;
  excerpt: string;
  kicker: string;
  icon: LucideIcon;
};

export type StoryBeat = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
};

export const homeCategories: HomeCategory[] = [
  {
    name: "Concerti",
    slug: "concerti",
    description: "Tour, arene e club da mettere subito in calendario.",
    className: "category-concerti",
    icon: Guitar,
    imageHint: "Stage lights",
  },
  {
    name: "Eventi & Festival",
    slug: "eventi-festival",
    description: "Lineup, weekend lunghi ed eventi speciali da vivere fuori casa.",
    className: "category-festival",
    icon: PartyPopper,
    imageHint: "Open air",
  },
  {
    name: "Teatro & Spettacoli",
    slug: "teatro-spettacoli",
    description: "Musical, prosa, comedy e spettacoli con una serata piu intensa.",
    className: "category-teatro",
    icon: Drama,
    imageHint: "Curtain call",
  },
  {
    name: "Sport",
    slug: "sport",
    description: "Finali, derby e appuntamenti dove l'atmosfera conta.",
    className: "category-sport",
    icon: Trophy,
    imageHint: "Game night",
  },
  {
    name: "Nightlife & Experience",
    slug: "nightlife-experience",
    description: "Club, dj set e format esperienziali con identita forte.",
    className: "category-nightlife",
    icon: Moon,
    imageHint: "After dark",
  },
  {
    name: "Guide & Consigli",
    slug: "guide",
    description: "Checklist e idee pratiche per scegliere e vivere meglio ogni evento.",
    className: "category-guide",
    icon: Lightbulb,
    imageHint: "Ticket tips",
  },
  {
    name: "News Ticket Italia",
    slug: "news-ticket-italia",
    description: "Aggiornamenti, prevendite e novita dalla piattaforma Ticket Italia.",
    className: "category-news",
    icon: Newspaper,
    imageHint: "Platform news",
  },
];

export const guideItems: Guide[] = [
  {
    title: "Come scegliere i migliori concerti senza farsi guidare solo dall'hype",
    excerpt:
      "Una checklist rapida per leggere lineup, location, orari e servizi prima di acquistare.",
    kicker: "Guida smart",
    icon: ShieldCheck,
  },
  {
    title: "Eventi da non perdere questo mese: metodo rapido per costruire il calendario",
    excerpt:
      "Dal grande show alla serata piu piccola: come mixare budget, compagnia e tempo libero.",
    kicker: "Agenda live",
    icon: CalendarCheck,
  },
  {
    title: "Festival weekend: cosa portare, quando arrivare e come godersi tutto",
    excerpt:
      "Pochi dettagli organizzati bene cambiano completamente l'esperienza sotto palco.",
    kicker: "Survival kit",
    icon: Map,
  },
];

export const homeStats = [
  { value: "7", label: "rubriche editoriali" },
  { value: "20+", label: "contenuti demo pronti" },
  { value: "100%", label: "mobile-first" },
];

export const editorialPills = [
  { icon: Sparkles, label: "Scelte curate" },
  { icon: CalendarCheck, label: "Agenda calda" },
  { icon: ShieldCheck, label: "Consigli pratici" },
];

export const energyCards = [
  {
    title: "Prima senti il richiamo.",
    text: "Una data annunciata, una lineup che gira, una serata che prende forma nella testa.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Poi scegli dove esserci.",
    text: "Il posto, il gruppo, il momento giusto. Ogni dettaglio avvicina il palco.",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Alla fine resta quello che hai vissuto.",
    text: "Non solo un biglietto: una storia che ti segue anche quando si spengono le luci.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
  },
];

export const storyBeats: StoryBeat[] = [
  {
    eyebrow: "01 / Scopri",
    title: "Dallo schermo al desiderio.",
    text: "Il magazine accende la curiosita: trend, guide e storie ti aiutano a capire cosa merita davvero il tuo tempo.",
    image: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "02 / Scegli",
    title: "Dal desiderio alla data.",
    text: "Quando l'idea e chiara, il percorso diventa semplice: categoria, articolo, evento, biglietto.",
    image: "https://images.unsplash.com/photo-1521334726092-b509a19597c6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "03 / Vivi",
    title: "Dalla data al ricordo.",
    text: "Il live non finisce all'uscita. Diventa racconto, foto, ritorno a casa, prossima occasione.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
  },
];

export const sensoryNotes = [
  { icon: Headphones, label: "suono", text: "basso, voci, cori" },
  { icon: Sparkles, label: "luce", text: "palco, neon, sipario" },
  { icon: Map, label: "luogo", text: "arena, club, teatro" },
];

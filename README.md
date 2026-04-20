# Ticket Italia Blog

Base frontend moderna per il blog editoriale di **Ticket Italia**, pensata per raccontare eventi live, concerti, festival, teatro, sport, family e nightlife con un taglio magazine premium.

## Stack

- Next.js con App Router
- TypeScript
- Tailwind CSS
- Lucide React
- Framer Motion
- Design system con token in `tailwind.config.ts` e `src/styles/design-system.ts`
- Motion system con varianti in `src/lib/motion` e wrapper in `src/components/motion`
- Dati mock separati e pronti per futura integrazione CMS/API
- SEO base con metadata, Open Graph e pagine dinamiche

## Struttura Editoriale

Il blog segue una logica editoriale ispirata ai migliori portali di ticketing, con categorie dedicate:

- Concerti
- Teatro & Spettacoli
- Eventi & Festival
- Sport
- Nightlife & Experience
- Guide & Consigli
- News Ticket Italia

Route principali:

- `/` homepage magazine
- `/articoli` archivio completo
- `/articoli/[slug]` dettaglio articolo SEO-friendly
- `/categorie` indice categorie
- `/categorie/[slug]` listing articoli per categoria

## Avvio locale

Installa le dipendenze:

```bash
npm install
```

Avvia il server di sviluppo:

```bash
npm run dev
```

Apri `http://localhost:3000`.

## Script

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Struttura principale

```txt
src/
  app/
    articoli/
      [slug]/
        page.tsx
      page.tsx
    categorie/
      [slug]/
        page.tsx
      page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    home/
    layout/
    motion/
    sections/
    ui/
  data/
    blog.ts
  styles/
    design-system.ts
  lib/
    utils.ts
```

## Design System

La guida completa e disponibile in `DESIGN_SYSTEM.md`. I token principali sono duplicati in modo intenzionale tra:

- `tailwind.config.ts` per classi Tailwind e tema;
- `src/styles/design-system.ts` per uso TypeScript;
- `src/app/globals.css` per variabili CSS runtime e utility semantiche.

## Roadmap

- Collegamento a CMS headless o API proprietaria
- Filtri reali per categoria, tag e ricerca
- Paginazione o infinite loading per archivio articoli
- Sitemap dinamica e feed RSS
- Preview editoriale per contenuti in bozza
- Analytics eventi e tracking CTA

## Repository suggerito

`blog-ticketitalia`

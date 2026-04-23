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

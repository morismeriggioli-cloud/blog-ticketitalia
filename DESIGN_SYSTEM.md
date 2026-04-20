# Ticket Italia Design System

Sistema visivo mobile-first per un blog editoriale sugli eventi live: concerti, festival, teatro, sport, nightlife, guide e news Ticket Italia.

## 1. Brand Style

**Mood visivo:** elettrico, curato, urbano, premium, live.

**Identita:** Ticket Italia Blog deve sembrare un magazine-evento: autorevole nella selezione, rapido da consultare, utile per decidere cosa vivere e memorabile nel colpo d'occhio.

**Tone of voice visivo:** editoriale ad alto ritmo. Titoli forti, immagini grandi, superfici pulite, contrasti netti, accenti luminosi usati con disciplina e dettagli da pass backstage.

## 2. Color System

Regola base: fondo chiaro editoriale, ink quasi nero, primary cyan per azioni e focus, secondary magenta per energia editoriale, accent distinti per categorie.

### Primary: Stage Cyan

| Token | HEX | Uso |
| --- | --- | --- |
| `primary-50` | `#E8FBFF` | background soft, box informativi |
| `primary-100` | `#C7F5FF` | hover leggeri, chips |
| `primary-200` | `#8CEBFF` | bordi attivi, highlights |
| `primary-300` | `#45DFFF` | stati active luminosi |
| `primary-400` | `#16D4F2` | icone, link su dark |
| `primary-500` | `#00B8D9` | CTA primaria, focus ring, badge spotlight |
| `primary-600` | `#0094B3` | hover CTA su fondi chiari |
| `primary-700` | `#0A7188` | testo/accessori ad alto contrasto |
| `primary-800` | `#0D5363` | superfici scure alternative |
| `primary-900` | `#0B3843` | fondi profondi, overlay |

### Secondary: Signal Magenta

| Token | HEX | Uso |
| --- | --- | --- |
| `secondary-50` | `#FFF0F6` | background editoriali soft |
| `secondary-100` | `#FFD6E7` | badge soft |
| `secondary-200` | `#FF9FCA` | hover leggeri |
| `secondary-300` | `#FF68AC` | link in evidenza |
| `secondary-400` | `#FF3D8D` | accento energico |
| `secondary-500` | `#E81972` | hover card, CTA secondarie forti |
| `secondary-600` | `#C30F5C` | active state |
| `secondary-700` | `#9B0E4B` | testo su fondi rosa chiari |
| `secondary-800` | `#74113D` | superfici dark editoriali |
| `secondary-900` | `#4F102D` | dark mode accent |

### Event Accents

| Token | HEX | Categoria | Vibe |
| --- | --- | --- | --- |
| `accent-concert` | `#00B8D9` | Concerti | arena, palco, bassi, fan culture |
| `accent-festival` | `#B7FF2A` | Festival | outdoor, discovery, energia solare |
| `accent-theatre` | `#D7265E` | Teatro | sipario, presenza scenica, eleganza tesa |
| `accent-sport` | `#00B871` | Sport | velocita, rivalita, community |
| `accent-nightlife` | `#7C3AED` | Nightlife | club, neon, after dark |
| `accent-culture` | `#FFB000` | Cultura/Experience | luoghi, mostre, tempo libero intelligente |
| `accent-guide` | `#111318` | Guide | chiarezza, fiducia, zero frizione |
| `accent-news` | `#2563EB` | News | prevendite, aggiornamenti, servizio |

### Neutrals

| Token | HEX | Uso |
| --- | --- | --- |
| `neutral-0` | `#FFFFFF` | card, input, superfici |
| `neutral-50` | `#F7F8FA` | background pagina |
| `neutral-100` | `#ECEFF3` | hover soft |
| `neutral-200` | `#DCE2E8` | border |
| `neutral-300` | `#C4CDD7` | divider forti |
| `neutral-400` | `#8F9AAA` | placeholder |
| `neutral-500` | `#687386` | testo secondario |
| `neutral-600` | `#4B5565` | testo muted scuro |
| `neutral-700` | `#333B49` | superfici scure |
| `neutral-800` | `#1E2430` | panel dark |
| `neutral-900` | `#111318` | testo primario, header/footer |
| `neutral-950` | `#07080B` | dark mode base |

### Semantic

| Token | HEX | Uso |
| --- | --- | --- |
| `success` | `#00B871` | conferme, stati positivi |
| `warning` | `#FFB000` | avvisi, disponibilita limitata |
| `danger` | `#FF3D5A` | errori form |
| `info` | `#00B8D9` | note informative |

### Dark Mode Ready

La dark mode usa la classe `.dark` e token runtime:

```css
--background: #07080B;
--foreground: #F7F8FA;
--surface: #111318;
--surface-raised: #1E2430;
--muted: #AEB7C4;
--ink: #FFFFFF;
--line: rgba(255, 255, 255, 0.14);
```

## 3. Typography

**Headings:** Sora. Alternative Google Fonts: Space Grotesk, Archivo.  
**Body:** Manrope. Alternative Google Fonts: Inter, IBM Plex Sans.  
**Mono:** Geist Mono.

La scala e a step responsive, non fluida, per mantenere controllo su mobile.

| Stile | Mobile | Desktop | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| Display | `44px` | `72px` | 900 | 0.96 | `0` |
| H1 | `40px` | `64px` | 900 | 1 | `0` |
| H2 | `32px` | `48px` | 850 | 1.05 | `0` |
| H3 | `24px` | `32px` | 800 | 1.12 | `0` |
| H4 | `20px` | `22px` | 800 | 1.2 | `0` |
| Body large | `18px` | `18px` | 500 | 1.7 | `0` |
| Body regular | `16px` | `16px` | 400 | 1.65 | `0` |
| Body small | `14px` | `14px` | 500 | 1.55 | `0` |
| Caption | `12px` | `12px` | 800 | 1.35 | `0` |

## 4. Spacing & Layout

**Spacing:** base 4px, uso prevalente su multipli di 8px.  
**Container pagina:** `1180px`, gutter mobile `20px`.  
**Container editoriale:** `760px`.  
**Container wide:** `1320px`.

| Breakpoint | Token | Min width | Uso |
| --- | --- | --- | --- |
| Mobile | default | `0px` | una colonna |
| Tablet | `sm` | `640px` | card a 2 colonne |
| Laptop | `lg` | `1024px` | griglie 3 colonne, nav desktop |
| Desktop | `xl` | `1280px` | spacing ampio |
| Wide | `2xl` | `1536px` | layout speciali |

**Grid:** mobile 4 colonne concettuali, tablet 8, desktop 12. Le liste articolo usano `1 / 2 / 3` colonne.

## 5. Componenti UI Base

### Button

**Base:** altezza minima `48px`, radius `8px`, font black, transizione `240ms`.

```tsx
<a className="btn-primary" href="/articoli">Leggi gli articoli</a>
<a className="btn-secondary" href="/categorie">Esplora categorie</a>
<button className="btn-ghost">Apri menu</button>
```

**Primary:** cyan, testo ink, hover festival-lime + glow.  
**Secondary:** surface white, border line, hover border ink + shadow.  
**Ghost:** trasparente, per navbar e azioni su dark.

### Card Articolo

Layout fisso:

- immagine `16:10`;
- badge categoria in alto;
- meta con data/read time;
- titolo H3 compatto;
- excerpt massimo 3 righe;
- CTA iconica `40px`.

```tsx
<article className="group overflow-hidden rounded-md border border-line bg-surface shadow-sm transition duration-300 ease-event hover:-translate-y-1 hover:border-ink hover:shadow-lift">
  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
    <Image className="object-cover transition duration-500 ease-entrance group-hover:scale-105" />
  </div>
</article>
```

### Badge / Tag

```tsx
<span className="category-concerti rounded-md px-3 py-1 text-xs font-black uppercase tracking-normal">
  Concerti
</span>
```

Tag generici:

```tsx
<span className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-bold text-muted">
  #Festival
</span>
```

### Input / Search Bar

**Base:** `52px`, radius `8px`, border `line`, icona Lucide a sinistra.  
**Focus:** border ink + ring primary `35%`.  
**Error:** border danger + messaggio `danger`.

```tsx
<input className="h-13 w-full rounded-md border border-line bg-surface px-4 text-sm font-medium text-ink outline-none focus:border-ink focus:ring-4 focus:ring-primary-500/35" />
```

### Navbar

Desktop: sticky, fondo `ink / 95%`, link bold, CTA cyan.  
Mobile: menu full-width sotto header, tap target minimo `44px`, gruppi categoria leggibili, CTA finale.

### Footer

Fondo `ink`, testo `white / 70%`, titoli in `primary-500`, link con hover white. Deve chiudere come una redazione, non come un blocco legale.

### Newsletter

Fondo ad alto contrasto, CTA chiara, form leggibile. Copy breve: promessa concreta, niente testo promozionale generico.

## 6. Animazioni & Interazioni

| Token | Durata | Uso |
| --- | --- | --- |
| `120ms` | istantaneo | feedback minimi |
| `180ms` | fast | link, colore |
| `240ms` | base | button, input |
| `360ms` | slow | card, immagini |
| `620ms` | reveal | ingressi editoriali |

**Easing:** `ease-event` per UI, `ease-entrance` per reveal, `ease-exit` per uscite.  
**Hover:** massimo una trasformazione dominante per componente. Card `translateY(-4px)`, immagini `scale(1.05)`, bottoni `translateY(-2px)`.  
**Accessibilita:** `prefers-reduced-motion` gia riduce animazioni e transizioni.

## 7. Iconografia

Libreria: `lucide-react`.

| Uso | Size |
| --- | --- |
| meta card | `14px` |
| nav/action inline | `16px` |
| feature icon | `20px` |
| category icon | `24px` |

Stile: stroke Lucide standard, niente mix con icone filled. Le icone devono avere testo o contesto accessibile.

## 8. Style Guidelines Per Eventi

**Concerti:** cyan, immagini palco/folla, titoli diretti, ritmo alto.  
**Festival:** lime, luce outdoor, discovery, composizioni aperte.  
**Teatro:** ruby, contrasti eleganti, ritmo piu calmo, immagini sceniche.  
**Sport:** green, diagonali, tensione, numeri e contesto partita.  
**Nightlife:** violet, fondi dark, neon controllato, copy secco.  
**Cultura/Experience:** amber, luoghi e tempo libero intelligente.  
**Guide:** ink, massima chiarezza, checklist, zero decorazione superflua.  
**News:** blue, servizio, urgenza controllata.

## 9. Implementazione Tecnica

File attivi:

- `src/styles/design-system.ts`: source of truth per token, categorie, component presets.
- `tailwind.config.ts`: importa i token e li espone a Tailwind.
- `src/app/globals.css`: CSS variables runtime, utility globali, classi semantiche.

Estratto Tailwind:

```ts
import type { Config } from "tailwindcss";
import { colors, layout, motion } from "./src/styles/design-system";

const config: Config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx,mdx}", "./src/components/**/*.{ts,tsx,mdx}"],
  theme: {
    screens: {
      sm: layout.breakpoints.tablet,
      lg: layout.breakpoints.laptop,
      xl: layout.breakpoints.desktop,
      "2xl": layout.breakpoints.wide,
    },
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        neutral: colors.neutral,
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        danger: colors.semantic.danger,
        info: colors.semantic.info,
        surface: "var(--surface)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        ink: "var(--ink)",
        line: "var(--line)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Sora", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "Manrope", "Arial", "sans-serif"],
      },
      transitionTimingFunction: {
        event: motion.easing.standard,
        entrance: motion.easing.entrance,
      },
    },
  },
};

export default config;
```

Naming convention:

- colori globali: `primary-*`, `secondary-*`, `neutral-*`;
- categorie: `accent-concert`, `accent-festival`, `accent-theatre`, `accent-sport`;
- stati: `success`, `warning`, `danger`, `info`;
- utility semantiche: `btn-primary`, `btn-secondary`, `btn-ghost`, `category-concerti`;
- componenti React: PascalCase;
- slug e dati CMS: kebab-case.

## 10. Esempi Di Utilizzo

Button:

```tsx
<Link href="/articoli" className="btn-primary">
  Scopri cosa vivere
</Link>
```

Card:

```tsx
<article className="group rounded-md border border-line bg-surface transition duration-300 ease-event hover:-translate-y-1 hover:shadow-lift">
  <h3 className="font-heading text-h3 text-ink group-hover:text-secondary-500">
    I festival da mettere in calendario
  </h3>
</article>
```

Search:

```tsx
<div className="relative">
  <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
  <input className="h-13 w-full rounded-md border border-line bg-surface pl-12 pr-4 focus:border-ink focus:ring-4 focus:ring-primary-500/35" />
</div>
```

Badge categoria:

```tsx
<span className="category-nightlife rounded-md px-3 py-1 text-xs font-black uppercase tracking-normal">
  Nightlife
</span>
```

## Regole Di Coerenza

- Usa `primary-500` solo per CTA principali, focus e spotlight.
- Non usare piu di due accent colors nella stessa sezione.
- Mantieni radius massimo standard a `8px`.
- Su mobile, CTA e input devono avere altezza minima `48px`.
- Le card articolo mantengono sempre immagine, badge, meta, titolo e CTA.
- Il body text resta leggibile: niente tracking negativo, line-height arioso.
- Ogni nuova categoria deve avere colore, contrasto testo, vibe, icona e regola di uso.

# SEO Report — Ermal Meta a Perugia 2026: biglietti e concerto Afterlife

## Keyword Target
- Principale: `ermal meta perugia 2026`
- Secondarie: `ermal meta biglietti`, `afterlife live club perugia`, `concerto perugia aprile 2026`, `ermal meta concerto`

---

## Analisi Pre-Ottimizzazione

### Title tag
- **Originale**: "Ermal Meta a Perugia 2026: biglietti e info concerto all'Afterlife Live Club" — **74 caratteri** (limite 60 superato di 14)
- **Problema**: Google tronca i title oltre i 60 caratteri, perdendo "all'Afterlife Live Club" nella SERP

### Excerpt (meta description)
- **Originale**: 151 caratteri ✅ (nel range 120-155)
- **Problema**: CTA finale "tutto quello che devi sapere" è debole e non orientata all'azione; assenza del prezzo (€49 è un forte attrattore di click)

### Slug
- **Valore**: `ermal-meta-afterlife-club-perugia-2026` — 38 caratteri ✅
- **Keyword principale inclusa**: ✅ Nessuna modifica necessaria

### Keyword density
- "ermal meta": ~12 occorrenze nel corpo — densità adeguata, ben distribuita tra intro, sezioni e bullets ✅
- "perugia" / "afterlife live club": presenti in tutti i blocchi chiave ✅
- "biglietti": presente in title sezione tickets, CTA, bullets ✅ — aggiunto al prezzo in excerpt

### Heading structure
- I titoli delle sezioni (`tickets.title`, `artistContext.title`, `location.title`, ecc.) sono semanticamente coerenti con le keyword target ✅
- Presenza di varianti: "biglietti Ermal Meta Perugia" come H2 di sezione tickets ✅

### Internal links
- **Originale**: assenti ❌
- **Azione**: aggiunto blocco `internalLinks` con 4 articoli correlati

### Schema markup
- L'articolo è codificato come TypeScript nel CMS — lo schema strutturato (JSON-LD Event/MusicEvent) va implementato nel layer di rendering, non nel file articolo. **Raccomandazione per il team tecnico**: aggiungere JSON-LD `MusicEvent` per le pagine con `type: "evento"`, includendo `startDate`, `location.name`, `location.address`, `offers.price`.

---

## Modifiche Apportate

| Campo | Modifica |
|-------|----------|
| `title` | Ridotto da 74 a 56 caratteri: "Ermal Meta a Perugia 2026: biglietti e concerto Afterlife" — keyword all'inizio, nessuna perdita in SERP |
| `excerpt` | Riscritto con prezzo (€49) e CTA esplicita "acquista ora su Ticket Italia" — da 151 a 140 caratteri, nel range ottimale |
| `tags` | Aggiunti: `"biglietti ermal meta"`, `"ermal meta tour 2026"`, `"sanremo 2018"`, `"cantautori italiani"` — coprono long-tail e query informazionali |
| `internalLinks` | Aggiunto blocco con 4 link: Salmo Perugia 2026, Francesco Renga Spoleto 2026, guida scelta posto, guida prevendite |

---

## Score SEO Stimato

| Segnale | Stato | Note |
|---------|-------|-------|
| Title tag | ✅ | 56 chars, keyword "ermal meta" in posizione 1 |
| Excerpt | ✅ | 140 chars, prezzo + CTA esplicita |
| Slug | ✅ | 38 chars, keyword inclusa, no stop words |
| Keyword density | ✅ | "ermal meta" ben distribuita, no stuffing |
| Heading structure | ✅ | Sezioni con keyword semanticamente coerenti |
| Internal links | ✅ | 4 link contestuali a contenuti correlati |
| Schema markup (JSON-LD) | ⚠️ | Da implementare nel renderer — fuori scope di questo file |
| CTA href | ✅ | URL ticketitalia.com verificato e inalterato |

---

## Note e Raccomandazioni

1. **JSON-LD MusicEvent**: priorità alta per questa tipologia di articolo. Google mostra rich result per eventi (data, luogo, prezzo) che aumentano il CTR. Implementare nel componente di rendering con i dati: `startDate: "2026-04-29T21:00"`, `location.name: "Afterlife Live Club"`, `location.address: "Balanzano, Perugia"`, `offers.price: 49`, `offers.priceCurrency: "EUR"`.

2. **Immagine**: il percorso `/images/ermal-meta-afterlife-club-perugia-2026-hero.jpg` deve essere accompagnato da `alt` text ottimizzato nel renderer: es. "Ermal Meta in concerto all'Afterlife Live Club di Perugia, 29 aprile 2026".

3. **Date proximity**: articolo con data evento a 11 giorni dalla pubblicazione — priorità alta per indicizzazione. Verificare che la sitemap XML venga aggiornata entro 24h dalla pubblicazione.

4. **Dati non verificabili senza ricerca aggiuntiva**: indirizzo esatto Afterlife Live Club (via/numero civico), orario apertura porte, capienza precisa. Il Redattore ha indicato queste lacune — non modificato nulla di fattuale.

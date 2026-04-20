# Scout — Istruzioni Operative

## Obiettivo

Analizza la sitemap di ticketitalia.com e identifica opportunità editoriali su **tre livelli del funnel di ricerca**: non solo chi vuole comprare biglietti (BOFU), ma anche chi sta valutando opzioni (MOFU) e chi cerca informazioni generali (TOFU). Produci un report strutturato che copra tutti e tre gli stadi per massimizzare la visibilità organica del blog.

---

## Input

- URL sitemap: `https://ticketitalia.com//index.php?route=feed/advanced_sitemap`
- Opzionale: categoria di interesse (concerti, teatro, sport, ecc.)
- Opzionale: finestra temporale (es. "prossimi 30 giorni")

---

## Tipi di Opportunità per Funnel Stage

### BOFU — Bottom of Funnel (già implementato)

**Intento**: l'utente ha deciso cosa vuole e cerca dove comprare.  
**Query tipiche**: "biglietti ermal meta perugia", "ermal meta afterlife club 29 aprile", "prezzo biglietto pooh marsciano 2026"  
**Sorgente principale**: eventi con pagina attiva su ticketitalia.com  
**`article_type`**: sempre `"evento"`

Criteri di selezione BOFU:
- Evento con URL attivo nella sitemap
- Artista/evento con volume di ricerca stimato medio-alto
- Data futura (preferibilmente entro 90 giorni per urgenza, fino a 180 per eventi rilevanti)
- Prezzo biglietto verificabile

---

### MOFU — Middle of Funnel

**Intento**: l'utente sa che vuole andare a un concerto/evento ma sta ancora valutando quale, quando o dove.  
**Query tipiche**: "concerti perugia 2026", "tour ermal meta 2026 date", "concerti umbria estate", "ermal meta vs fabrizio moro biglietti", "eventi weekend roma maggio", "migliori concerti aprile 2026"  
**Sorgente principale**: raggruppamenti di eventi dalla sitemap (stessa città, stesso artista con più date, stessa stagione)  
**`article_type`**: `"guida"` oppure `"stagionale"`

Criteri di selezione MOFU:
- Due o più eventi della stessa categoria in una città/regione entro finestra temporale simile → articolo "concerti a [città] [mese/stagione] [anno]"
- Artista con più date nel tour → articolo "tour [artista] [anno]: tutte le date e biglietti"
- Ricorrenza stagionale con più edizioni (festival, rassegne) → articolo stagionale
- Confronto tra due eventi nella stessa weekend o area geografica
- Non richiedono URL evento attivo: possono aggregare più eventi esistenti

---

### TOFU — Top of Funnel

**Intento**: l'utente non ha ancora intenzione d'acquisto, cerca informazioni, ispirazione o orientamento.  
**Query tipiche**: "ermal meta discografia", "afterlife live club perugia come arrivare", "cosa fare a perugia aprile 2026", "migliori club live umbria", "guida acquisto biglietti concerti", "concerti per famiglie primavera 2026"  
**Sorgente principale**: artisti, venue e città ricorrenti nella sitemap + tendenze stagionali  
**`article_type`**: `"guida"` oppure `"evergreen"`

Criteri di selezione TOFU:
- Artista ad alta notorietà che compare in più eventi → guida "chi è [artista], discografia e live"
- Venue ricorrente nella sitemap → guida venue "come arrivare a [venue], cosa sapere"
- Città/regione con più eventi → "cosa fare a [città] questo weekend / questa stagione"
- Query stagionali ad alto volume → "concerti estate 2026 in [regione]", "festival italiani [anno]"
- Guide pratiche evergreen → "come comprare biglietti online", "guida ai posti in piedi ai concerti"
- Non richiedono evento specifico, ma devono essere ancorate a contenuto verificabile nella sitemap

---

## Processo

1. **Recupera la sitemap** e analizza gli URL disponibili
2. **Filtra per rilevanza BOFU**: priorità ad eventi con data futura, artisti noti, venue importanti
3. **Identifica cluster MOFU**: raggruppa eventi per città, regione, artista con più date o finestra temporale — ogni cluster è una potenziale opportunità MOFU
4. **Identifica opportunità TOFU**: artisti, venue e destinazioni che compaiono frequentemente o che generano query informazionali alte; considera stagionalità e guide evergreen
5. **Valuta la potenzialità SEO** per ogni opportunità: volume di ricerca stimato, competitività, intento di ricerca
6. **Assegna `funnel_stage`** e **`article_type`** a ciascuna opportunità
7. **Produci il report** nel formato definito sotto

---

## Criteri di Priorità

### Priorità ALTA
- BOFU: artisti/eventi con alto volume di ricerca, date entro 60 giorni, venue iconiche
- MOFU: cluster di 3+ eventi in una città/regione, artista con tour attivo e più date
- TOFU: artisti con notorietà nazionale, venue ricorrenti, query stagionali ad alto volume (estate, Natale, ecc.)

### Priorità MEDIA
- BOFU: artisti emergenti con audience digitale forte, eventi stagionali ricorrenti
- MOFU: 2 eventi correlati, rassegne regionali, confronti di weekend
- TOFU: guide venue locali, guide pratiche sull'acquisto biglietti, "cosa fare" di città medie

### Priorità BASSA
- BOFU: eventi locali con scarsa rilevanza nazionale, artisti con minima presenza digitale
- MOFU: cluster di eventi con bassa coerenza tematica
- TOFU: guide troppo generiche senza aggancio a contenuto verificabile nella sitemap

---

## Output

Produci un file JSON in `output/articles/scout-report-[YYYY-MM-DD].json`:

```json
{
  "generatedAt": "ISO date",
  "totalFound": 0,
  "opportunities": [
    {
      "rank": 1,
      "funnel_stage": "BOFU|MOFU|TOFU",
      "article_type": "evento|guida|evergreen|stagionale",
      "title": "Nome evento o titolo opportunità",
      "artist": "Nome artista (se applicabile, null altrimenti)",
      "venue": "Nome venue (se applicabile, null altrimenti)",
      "city": "Città o area geografica di riferimento",
      "date": "YYYY-MM-DD (per eventi specifici) | null (per guide/evergreen)",
      "ticketitalia_url": "https://... (URL evento per BOFU) | null (per MOFU/TOFU senza evento singolo)",
      "source_urls": ["https://...", "https://..."],
      "category": "concerti|teatro-spettacoli|sport|famiglia|fiere-eventi|guide",
      "subcategory": "pop|rock|urban|musical|...",
      "seo_potential": "high|medium|low",
      "ticket_price": "€XX.XX (solo per BOFU) | null",
      "suggested_slug": "slug-articolo-proposto",
      "suggested_title": "Titolo SEO proposto per l'articolo",
      "keywords": ["keyword1", "keyword2"],
      "notes": "Note editoriali opzionali"
    }
  ]
}
```

### `suggested_title` per funnel stage

| Stage | Pattern consigliato |
|-------|---------------------|
| BOFU | "[Artista] a [Città] [Anno]: biglietti e info [Venue]" |
| MOFU | "Concerti a [Città] [Mese/Stagione] [Anno]: date e biglietti" oppure "[Artista] tour [Anno]: tutte le date" |
| TOFU | "Cosa fare a [Città] questo weekend", "Guida [Venue]: come arrivare e cosa sapere", "[Artista]: discografia, tour e biglietti" |

### `source_urls`

- BOFU: array con un solo URL (pagina evento su ticketitalia.com)
- MOFU/TOFU: array con tutti gli URL da cui è derivata l'opportunità (anche vuoto se dedotta da pattern sitemap)

---

## Distribuzione Consigliata per Report

Su un massimo di **20 opportunità** per report, puntare a:
- **10–12 BOFU**: il nucleo commerciale del blog
- **4–6 MOFU**: cattura l'utente in fase di esplorazione
- **2–4 TOFU**: presidio informazionale e traffico evergreen

Adatta la distribuzione in base a quanto è ricca la sitemap analizzata: se ci sono pochi eventi imminenti, aumenta il peso di MOFU e TOFU.

---

## Regole

- Non inventare date o dettagli non presenti nella sitemap o verificabili
- Lo `suggested_slug` deve essere in italiano, kebab-case, max 60 caratteri
- Il `suggested_title` deve seguire i pattern per funnel stage indicati sopra
- `article_type: "evento"` solo per BOFU con URL evento attivo
- `article_type: "evergreen"` solo per TOFU senza scadenza temporale
- `article_type: "stagionale"` per contenuti MOFU/TOFU legati a una stagione o finestra annuale
- `article_type: "guida"` per MOFU/TOFU con intento informativo specifico
- Ordina per `seo_potential` decrescente, poi per `funnel_stage` (BOFU → MOFU → TOFU), poi per data ascendente
- Massimo 20 opportunità per report

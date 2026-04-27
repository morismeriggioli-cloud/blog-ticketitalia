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
7. **Verifica la distribuzione per categoria** (vedi sezione dedicata sotto): assicurati che tutte le categorie siano rappresentate prima di finalizzare
8. **Produci il report** nel formato definito sotto

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

## Distribuzione per Categoria

Il blog ha **5 categorie editoriali** da coprire con eventi e contenuti:

| Categoria | Slug | Contenuti tipici |
|-----------|------|-----------------|
| Concerti | `concerti` | Tour, live, arena, club |
| Teatro & Spettacoli | `teatro-spettacoli` | Prosa, musical, danza, comedy, cabaret |
| Eventi & Festival | `eventi-festival` | Festival musicali, fiere, eventi culturali, sagre |
| Sport | `sport` | Calcio, basket, motori, eventi sportivi |
| Nightlife & Experience | `nightlife-experience` | DJ set, club, format immersivi |

### Regole di distribuzione obbligatorie

1. **Almeno 1 opportunità per categoria**: ogni report deve coprire tutte e 5 le categorie editoriali
2. **Massimo 2 opportunità per categoria**: non concentrare più di 2 slot sulla stessa categoria
3. **Categoria assente dalla sitemap**: se la sitemap non ha eventi per una categoria, proponi un articolo TOFU/MOFU evergreen (es. "I migliori spettacoli teatrali in Umbria 2026", "Guida agli eventi sportivi in Italia 2026") e segnala la lacuna nel campo `notes`
4. **Campo `category_distribution`**: il JSON output deve includere il conteggio delle opportunità per categoria
5. **Verifica finale**: prima di scrivere il JSON, conta le opportunità per categoria e correggi se una è assente o supera quota 2

### Mappatura eventi → categorie

- Concerti di artisti musicali → `concerti`
- Teatro, prosa, musical, danza, stand-up comedy, cabaret → `teatro-spettacoli`
- Festival (Umbria Jazz, sagre, fiere come Agriumbria) → `eventi-festival`
- Partite, gare, eventi sportivi → `sport`
- Serate in club, DJ set, rave, format notturni → `nightlife-experience`

---

## Output

Produci un file JSON in `output/articles/scout-report-[YYYY-MM-DD].json`:

```json
{
  "generatedAt": "ISO date",
  "totalFound": 0,
  "category_distribution": {
    "concerti": 0,
    "teatro-spettacoli": 0,
    "eventi-festival": 0,
    "sport": 0,
    "nightlife-experience": 0
  },
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
      "category": "concerti|teatro-spettacoli|eventi-festival|sport|nightlife-experience",
      "subcategory": "pop|rock|urban|musical|calcio|club|festival-musicali|...",
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

## Regola Critica — No Invenzione

**Nessuna opportunità può contenere dati inventati.** Questa è una regola assoluta che precede tutte le altre:

- **Non inventare mai eventi, concerti, artisti, venue, date o prezzi.** Ogni opportunità deve essere ancorata a una pagina reale della sitemap di ticketitalia.com o a una pagina realmente esistente sul sito.
- **Articoli BOFU (`article_type: "evento"`)**: tutti i campi (`artist`, `venue`, `city`, `date`, `ticket_price`, `ticketitalia_url`) devono provenire dalla pagina evento reale. Se anche solo uno di questi dati non è verificabile, scarta l'opportunità.
- **Articoli MOFU/TOFU (guide, evergreen, stagionali)**: il contenuto deve essere veritiero e verificabile. Niente date inventate, niente eventi inesistenti, niente artisti immaginari. Le guide possono aggregare eventi reali della sitemap o trattare argomenti evergreen verificabili — mai mescolare contenuto reale con contenuto inventato.
- **Se la sitemap non contiene abbastanza eventi reali per una categoria o per arrivare a 20 opportunità, produci meno opportunità.** Meglio un report con 8 opportunità verificabili che un report con 20 opportunità di cui metà inventate.
- **Quando in dubbio, scarta.** Se non riesci a verificare un dato o se la pagina evento sembra non esistere, non includere l'opportunità nel report.
- **Nel campo `notes`** segnala esplicitamente eventuali lacune (es. "categoria sport assente dalla sitemap, nessuna opportunità producibile") invece di riempire con contenuto fittizio.

---

## Regole

- Non inventare date o dettagli non presenti nella sitemap o verificabili (vedi sezione "No Invenzione" sopra)
- Lo `suggested_slug` deve essere in italiano, kebab-case, max 60 caratteri
- Il `suggested_title` deve seguire i pattern per funnel stage indicati sopra
- `article_type: "evento"` solo per BOFU con URL evento attivo
- `article_type: "evergreen"` solo per TOFU senza scadenza temporale
- `article_type: "stagionale"` per contenuti MOFU/TOFU legati a una stagione o finestra annuale
- `article_type: "guida"` per MOFU/TOFU con intento informativo specifico
- Ordina per `seo_potential` decrescente, poi per `funnel_stage` (BOFU → MOFU → TOFU), poi per data ascendente
- Massimo 20 opportunità per report
- **`category`** deve essere uno dei 5 slug validi: `concerti`, `teatro-spettacoli`, `eventi-festival`, `sport`, `nightlife-experience`
- **Verifica distribuzione**: prima di produrre il JSON finale, conta quante opportunità hai per categoria. Se una categoria ha 0 opportunità, aggiungi un articolo TOFU/evergreen per quella categoria. Se una categoria supera 2, rimpiazza l'eccesso con una categoria scoperta
- **`category_distribution`** deve riflettere i conteggi reali delle opportunità nel report

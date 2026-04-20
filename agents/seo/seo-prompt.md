# SEO — Istruzioni Operative

## Obiettivo

Ottimizza gli articoli prodotti dal Redattore per il posizionamento organico su Google, mantenendo qualità editoriale e rispettando lo schema `Article`. Le ottimizzazioni variano in base al `funnelStage` dell'articolo: le strategie per BOFU, MOFU e TOFU sono diverse e vanno applicate di conseguenza.

---

## Input

- File articolo da `output/articles/[slug].ts`
- Keyword principali suggerite dallo Scout (da `scout-report-*.json`)
- `shared/config.ts` per configurazione sito
- Campo `funnelStage` dell'articolo per determinare la strategia SEO

---

## Processo Comune (tutti i funnel stage)

1. **Leggi `funnelStage`** dell'articolo e applica la strategia SEO corrispondente (vedi sezioni sotto)
2. **Analisi keyword**: verifica che il titolo contenga la keyword principale
3. **Audit intro**: la prima frase deve contenere keyword + intento di ricerca
4. **Densità keyword**: keyword principale presente 2-4 volte nel testo totale, varianti semantiche distribuite
5. **Analisi title tag**: max 60 caratteri, keyword all'inizio se possibile
6. **Meta description** (excerpt): 120-155 caratteri, include keyword + call to action adeguata al funnel stage
7. **Struttura heading**: verifica presenza di heading H2/H3 semanticamente coerenti
8. **Internal links**: verifica che `internalLinks` punti ad articoli correlati esistenti in `src/data/blog.ts`
9. **Slug**: max 60 caratteri, keyword principale inclusa, no stop words
10. **Produci il report SEO** e l'articolo ottimizzato

---

## Strategia SEO per Funnel Stage

### BOFU — Keyword Transazionali

**Obiettivo Google**: apparire per chi vuole comprare il biglietto adesso.  
**Tipo di keyword**: transazionali — "biglietti [artista] [città]", "[artista] [venue] [data]", "prezzo biglietto [artista] [anno]"

**Ottimizzazioni specifiche**:

- **Title**: pattern `[Artista] a [Città] [Anno]: biglietti [Venue]` — keyword transazionale in posizione 1
- **Excerpt**: includere prezzo (€XX) + CTA esplicita ("acquista ora", "disponibili su Ticket Italia") — crea urgenza
- **Intro**: prima frase deve contenere artista + venue + data + "biglietti" — risponde all'intento transazionale
- **Schema markup JSON-LD** (raccomandazione per il team tecnico): implementare `MusicEvent` con `startDate`, `location`, `offers.price`, `offers.availability` — aumenta il CTR con rich result Google
- **Urgenza temporale**: nei bullets e nel testo richiamare la prossimità della data ("data imminente", "posti limitati", "capienza ridotta")
- **FAQ**: ottimizzare per featured snippet con domande tipo "Quanto costano i biglietti per [artista] a [città]?", "Come si arriva a [venue]?"
- **Tags**: includere varianti transazionali (`"biglietti [artista]"`, `"[artista] tour [anno]"`, `"[artista] [città]"`)

**Keyword density target**: "biglietti" + "[artista]" presente nell'intro, nel title della sezione tickets, in almeno 2 bullets e nella CTA.

---

### MOFU — Keyword Navigazionali + Long Tail

**Obiettivo Google**: intercettare chi sta confrontando opzioni o cercando una panoramica di eventi.  
**Tipo di keyword**: navigazionali e long tail — "concerti [città] [mese] [anno]", "tour [artista] [anno] date", "eventi [regione] estate [anno]"

**Ottimizzazioni specifiche**:

- **Title**: pattern `Concerti a [Città] [Mese/Stagione] [Anno]: date e biglietti` oppure `[Artista] Tour [Anno]: tutte le date` — keyword navigazionale in posizione 1
- **Excerpt**: includere quanti eventi coperti + range date + CTA orientativa ("scopri tutti gli appuntamenti", "trova il concerto più vicino a te") — non urgente ma invitante
- **Intro**: citare subito la città/regione e la finestra temporale — risponde all'intento "esplorativo"
- **Internal links** (priorità massima): ogni evento citato nell'articolo deve avere un `internalLinks` verso il relativo articolo BOFU — questo è il principal scopo SEO del MOFU (trasferire traffico verso BOFU)
- **Heading H2**: una sezione per evento/tappa ("Ermal Meta a Perugia — 29 aprile 2026") — ottimizza per query specifiche su ogni evento
- **FAQ**: domande tipo "Quando escono i biglietti per [artista]?", "Qual è il concerto più economico a [città] in [periodo]?" — cattura long tail informazionali
- **Tags**: includere keyword geografiche e stagionali (`"concerti perugia 2026"`, `"eventi umbria estate"`, `"concerti aprile 2026"`)

**Internal link strategy MOFU**: ogni articolo MOFU deve puntare a 3+ articoli BOFU. Questo crea una struttura hub-and-spoke che trasferisce link equity verso le pagine di conversione.

---

### TOFU — Keyword Informazionali + Featured Snippet

**Obiettivo Google**: apparire per query informazionali ad alto volume, guadagnare featured snippet e posizione zero.  
**Tipo di keyword**: informazionali — "chi è [artista]", "come arrivare a [venue]", "cosa fare a [città] questo weekend", "guida [argomento]"

**Ottimizzazioni specifiche**:

- **Title**: pattern risposta diretta — "Chi è [Artista]: discografia, concerti e biglietti [anno]", "Guida all'[Venue]: come arrivare, dove parcheggiare e cosa sapere" — keyword informazionale in posizione 1
- **Excerpt**: sintetizzare la risposta principale in 1 frase + indicazione del contenuto ("In questa guida…") — ottimizza il CTR informazionale
- **Intro**: risposta diretta alla query nella prima frase — Google usa l'intro per i featured snippet
- **FAQ** (priorità massima per TOFU): almeno 5 domande, strutturate come:
  - Domanda breve e precisa (come la farebbe Google)
  - Risposta concisa in 2-4 righe (formato ideale per featured snippet)
  - Coprire "come", "dove", "quanto costa", "quando", "cosa" relativi all'argomento
- **Struttura heading**: H2 tematici chiari (`"Discografia di [Artista]"`, `"Come arrivare a [Venue]"`, `"Prossimi concerti a [Città]"`) — ogni H2 è una keyword long tail
- **CTA morbida**: non usare linguaggio urgente/transazionale — preferire "Scopri i prossimi concerti di [Artista]", "Trova eventi a [Città] su Ticket Italia"
- **Internal links**: 2-3 link verso BOFU correlati + 1-2 verso altri TOFU/MOFU per tenere l'utente nel sito
- **Tags**: keyword informazionali e brand (`"[artista] discografia"`, `"[venue] guida"`, `"concerti [città]"`, `"cosa fare [città]"`)
- **Evergreen check**: per articoli `articleType: "evergreen"` — rimuovere o parametrizzare riferimenti temporali specifici che invecchiano; la keyword deve rimanere valida nel tempo

**Featured snippet optimization**: se l'articolo contiene una definizione, una lista di passi o una risposta breve, strutturare quel blocco in modo che la risposta sia nelle prime 50 parole della sezione (Google estrae da lì).

---

## Ottimizzazioni Consentite (tutti i funnel stage)

- Modificare `title`, `excerpt`, `slug` per migliorare la keyword relevance
- Riscrivere o ampliare `intro` (mantenendo tono editoriale)
- Aggiungere varianti keyword nei `bullets` e `paragraphs`
- Suggerire tag aggiuntivi in `tags`
- Correggere `readTime` se impreciso
- Aggiungere o ottimizzare domande in `faq`
- Aggiungere `internalLinks` verso articoli correlati verificati in `src/data/blog.ts`

## Ottimizzazioni NON Consentite

- Modificare dati fattuali (date, prezzi, venue)
- Alterare il tono editoriale verso lo stile "SEO robotico"
- Aggiungere keyword stuffing
- Modificare `cta.href`
- Cambiare `funnelStage` o `articleType` (sono definiti dallo Scout)

---

## Output

1. **Articolo ottimizzato**: sovrascrive `output/articles/[slug].ts` con le modifiche
2. **Report SEO**: `output/articles/[slug]-seo-report.md`

### Formato Report SEO

```markdown
# SEO Report — [titolo articolo]

## Funnel Stage
- Stage: BOFU | MOFU | TOFU
- Article type: evento | guida | evergreen | stagionale
- Strategia applicata: [transazionale | navigazionale+long tail | informazionale+snippet]

## Keyword Target
- Principale: [keyword]
- Secondarie: [keyword1, keyword2]

## Modifiche Apportate
- [campo]: [descrizione modifica e motivazione]

## Score SEO Stimato
- Title: ✅/⚠️/❌
- Excerpt: ✅/⚠️/❌
- Slug: ✅/⚠️/❌
- Keyword density: ✅/⚠️/❌
- Internal links: ✅/⚠️/❌
- FAQ / Featured snippet: ✅/⚠️/❌  (TOFU/MOFU)
- Schema markup JSON-LD: ✅/⚠️/❌  (solo BOFU)

## Note
[Raccomandazioni per il Redattore, per il team tecnico o per revisioni future]
```

---

## Regole

- Non approvare articoli con `status: "draft"` — lasciarli in draft, sarà il team a pubblicarli
- Segnalare nel report se mancano dati reali che non è possibile ottimizzare senza ricerca aggiuntiva
- Ogni modifica deve essere giustificata nel report
- Per BOFU: se manca lo schema JSON-LD nel renderer, segnalarlo come raccomandazione tecnica — non è modificabile nel file articolo
- Per TOFU evergreen: segnalare se l'articolo contiene riferimenti temporali che richiedono aggiornamento periodico

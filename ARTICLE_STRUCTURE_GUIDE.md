# Guida alla Struttura degli Articoli Evento - Ticket Italia

## Obiettivo

Rendere ogni articolo evento più ricco, utile e differenziato, enfatizzando la venue come parte dell'esperienza ed evitando articoli poveri o troppo generici.

## Struttura Obbligatoria per Articoli Evento

Ogni articolo evento (`type: "evento"`) deve seguire questa struttura precisa:

### 1. Introduzione SEO
- **Campo**: `intro`
- **Scopo**: Prima frase che cattura l'attenzione e contiene parole chiave
- **Lunghezza**: 1-2 frasi concise
- **Tono**: Coinvolgente, diretto, curioso

### 2. Informazioni Rapide
- **Campo**: `quickInfo`
- **Scopo**: Sintesi immediata per chi ha poco tempo
- **Struttura**:
  ```typescript
  quickInfo: {
    title: "Informazioni rapide",
    text: "testo che riassume l'essenza dell'evento",
    bullets: [
      "Artista: nome e descrizione breve",
      "Location: venue completa",
      "Evento: tipo di spettacolo",
      "Atmosfera: aggettivi chiave"
    ]
  }
  ```

### 3. Sezione Biglietti
- **Campo**: `tickets`
- **Scopo**: Guida pratica alla scelta dei biglietti
- **Contenuto**: Spiegazione dei settori, consigli pratici, rapporto prezzo/posizione

### 4. Contesto Artista/Evento
- **Campo**: `artistContext`
- **Scopo**: Background dell'artista o dell'evento
- **Contenuto**: Storia, rilevanza, perché questo evento è importante

### 5. Sezione Location Valorizzata **[OBBLIGATORIA]**
- **Campo**: `location`
- **Scopo**: Trasformare la venue da informazione tecnica a elemento distintivo
- **Struttura**:
  ```typescript
  location: {
    title: "Titolo evocativo della location",
    venueType: "Tipo specifico di venue",
    experience: "Descrizione dell'esperienza che offre",
    suitability: "Perché è perfetta per questo artista/evento",
    atmosphere: "Che atmosfera può aspettarsi il pubblico",
    paragraphs: ["testo descrittivo approfondito"],
    bullets: ["dettagli tecnici e pratici"]
  }
  ```

**Requisiti fondamentali della sezione location:**

- **Non trattare come informazione tecnica**: La location è parte dell'esperienza
- **Spiegare il tipo di venue**: Stadio, teatro, club, arena, fiera, ecc.
- **Descrivere l'esperienza**: Cosa si prova essendo lì
- **Motivare la scelta**: perché è adatta a quell'artista/evento
- **Evocare l'atmosfera**: che clima, che emozioni, che energia
- **Tono editoriale**: Coinvolgente, concreto, non generico
- **Contenuti diversi per ogni articolo**: Ogni location va valorizzata in modo unico
- **Realismo**: Non inventare dettagli non credibili

### 6. Esperienza Live / Cosa Aspettarsi
- **Campo**: `liveExperience`
- **Scopo**: Preparare il pubblico a ciò che vivrà
- **Contenuto**: Produzione, atmosfera, momenti chiave, interazione

### 7. Informazioni Utili
- **Campo**: `practicalInfo`
- **Scopo**: Dettagli logistici per vivere serenamente l'evento
- **Contenuto**: Accessi, trasporti, servizi, regole

### 8. CTA Finale
- **Campo**: `cta`
- **Scopo**: Call to action chiara e motivazionale
- **Struttura**:
  ```typescript
  cta: {
    title: "Titolo motivazionale",
    text: "testo che spinge all'azione",
    label: "etichetta pulsante",
    href: "link diretto"
  }
  ```

## Esempi di Sezioni Location

### Stadio (es. San Siro)
```typescript
location: {
  title: "San Siro: più di uno stadio, una cattedrale del suono",
  venueType: "Stadio storico, tempio del calcio e palcoscenico internazionale",
  experience: "San Siro trasforma un concerto in un evento cinematografico...",
  suitability: "Perfetto per Tedua perché lo stadio è la metafora del suo percorso...",
  atmosphere: "L'atmosfera è unica: misto di attesa reverenziale ed energia ribelle...",
  paragraphs: ["San Siro non è un venue qualsiasi..."],
  bullets: ["Acustica: naturale amplificazione...", "Visuale: ogni settore offre..."]
}
```

### Teatro Lirico (es. La Scala)
```typescript
location: {
  title: "La Scala: dove la storia respira ancora",
  venueType: "Teatro lirico storico, tempio mondiale dell'opera",
  experience: "Entrare alla Scala è come varcare una soglia temporale...",
  suitability: "Perfetto per questa produzione perché la Scala possiede un'acustica leggendaria...",
  atmosphere: "L'atmosfera è di concentrazione reverenziale...",
  paragraphs: ["La Scala non è un teatro come gli altri..."],
  bullets: ["Acustica: considerata una delle migliori al mondo..."]
}
```

### Fiera (es. Umbriafiere)
```typescript
location: {
  title: "Umbriafiere: il cuore pulsante dell'agricoltura italiana",
  venueType: "Centro fieristico specializzato, polo espositivo regionale",
  experience: "Umbriafiere trasforma una fiera in un ecosistema vivente...",
  suitability: "Ideale per Agriumbria perché combina spazi coperti e aree esterne...",
  atmosphere: "L'atmosfera è professionale ma accessibile...",
  paragraphs: ["Umbriafiere non è solo un luogo di esposizione..."],
  bullets: ["Spazi: padiglioni tematici e aree esterne...", "Accessibilità: facile da raggiungere..."]
}
```

## Regole di Stile

### Tono Editoriale
- **Concreto**: Evitare astrazioni, usare esempi reali
- **Coinvolgente**: Parlare direttamente al lettore ("tu", "ti")
- **Valorizzante**: Evidenziare i punti di forza senza esagerare
- **Differenziato**: Ogni articolo deve avere una voce unica

### Frasi da Evitare
- "Location suggestiva nel cuore della città"
- "Atmosfera magica e coinvolgente"
- "Esperienza unica e indimenticabile"
- "Venue perfetta per ogni tipo di evento"

### Frasi da Usare
- "L'architettura semicircolare crea una cassa acustica naturale"
- "Il rosso velluto dei sedili trasforma il pubblico in parte di una cerimonia"
- "Le gradinate diventano un'unica onda umana durante i ritornelli"
- "L'acustica leggendaria valorizza ogni sfumatura vocale"

## Checklist di Validazione

Per ogni articolo evento, verificare:

- [ ] Introduzione SEO presente e efficace
- [ ] Informazioni rapide complete
- [ ] Sezione biglietti dettagliata
- [ ] Contesto artista/evento approfondito
- [ ] **Sezione location completa con tutti i campi obbligatori**
- [ ] Esperienza live descritta in modo coinvolgente
- [ ] Informazioni pratiche utili
- [ ] CTA finale chiara e motivazionale
- [ ] Tono editoriale coerente
- [ ] Contenuti originali e non generici
- [ ] Nessuna frase vuota o stereotipata

## Integrazione Tecnica

La struttura è già implementata nel TypeScript (`src/data/blog.ts`) con i nuovi campi:
- `quickInfo` (prima `quickAnswer`)
- `tickets`
- `artistContext`
- `location` (nuovo campo obbligatorio per eventi)
- `liveExperience`
- `practicalInfo`

Tutti i campi sono opzionali tranne `intro`, ma per gli articoli di tipo `evento` si raccomanda di utilizzare l'intera struttura per garantire coerenza editoriale e valore per il lettore.

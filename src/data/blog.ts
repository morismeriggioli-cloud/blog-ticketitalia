export type Category = {
  name: string;
  slug: string;
  description: string;
  eyebrow: string;
  accentClass: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  name: string;
  slug: string;
  description: string;
};

export type ContentType = "evento" | "guida" | "editoriale" | "news";
export type ArticleStatus = "published" | "draft";
export type FunnelStage = "TOFU" | "MOFU" | "BOFU";
export type ArticleType = "evento" | "guida" | "evergreen" | "stagionale";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  subcategorySlug?: string;
  type: ContentType;
  status: ArticleStatus;
  publishedAt?: string;
  funnelStage?: FunnelStage;
  articleType?: ArticleType;
  tags: string[];
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured?: boolean;
  spotlight?: boolean;
  body: {
    intro: string;
    quickAnswer?: {
      title: string;
      text: string;
      bullets: string[];
    };
    quickInfo?: {
      title: string;
      text: string;
      bullets: string[];
    };
    tickets?: {
      title: string;
      text: string;
      bullets: string[];
    };
    artistContext?: {
      title: string;
      paragraphs: string[];
      bullets?: string[];
    };
    location?: {
      title: string;
      venueType: string;
      experience: string;
      suitability: string;
      atmosphere: string;
      paragraphs: string[];
      bullets?: string[];
      locationImage?: string;
      nearbyParking?: Array<{
        name: string;
        distanceOnFoot: string;
        type: "gratuito" | "a pagamento";
        notes?: string;
        mapsUrl?: string;
      }>;
      nearbyHotels?: Array<{
        name: string;
        distanceOnFoot: string;
        priceRange: string;
        bookingUrl?: string;
        images?: string[];
      }>;
    };
    liveExperience?: {
      title: string;
      paragraphs: string[];
      bullets?: string[];
    };
    practicalInfo?: {
      title: string;
      paragraphs: string[];
      bullets?: string[];
    };
    internalLinks?: Array<{
      label: string;
      href: string;
      description: string;
    }>;
    sections: Array<{
      heading: string;
      paragraphs: string[];
      bullets?: string[];
      ordered?: string[];
      subSections?: Array<{
        heading: string;
        paragraphs: string[];
      }>;
    }>;
    faq?: Array<{
      question: string;
      answer: string;
    }>;
    cta?: {
      title: string;
      text: string;
      label: string;
      href: string;
    };
  };
};

export const categories: Category[] = [
  {
    name: "Concerti",
    slug: "concerti",
    description: "Tour, arene, club e date italiane da segnare subito.",
    eyebrow: "Live music",
    accentClass: "category-concerti",
    subcategories: [
      { name: "Pop", slug: "pop", description: "Grandi tour pop, arene e show mainstream." },
      { name: "Rock", slug: "rock", description: "Band, chitarre, festival rock e concerti ad alta energia." },
      { name: "Urban", slug: "urban", description: "Rap, hip hop, trap e nuova scena italiana." },
    ],
  },
  {
    name: "Teatro & Spettacoli",
    slug: "teatro-spettacoli",
    description: "Musical, prosa, comedy, danza e grandi palchi.",
    eyebrow: "Stage culture",
    accentClass: "category-teatro",
    subcategories: [
      { name: "Musical", slug: "musical", description: "Produzioni musicali, grandi classici e nuovi show." },
      { name: "Commedia", slug: "commedia", description: "Comedy, stand-up e spettacoli leggeri." },
      { name: "Danza", slug: "danza", description: "Balletto, danza contemporanea e performance sceniche." },
    ],
  },
  {
    name: "Eventi & Festival",
    slug: "eventi-festival",
    description: "Festival, eventi speciali e weekend da vivere fuori casa.",
    eyebrow: "Open air",
    accentClass: "category-festival",
    subcategories: [
      { name: "Festival musicali", slug: "festival-musicali", description: "Lineup, date e guide ai festival live." },
      { name: "Eventi culturali", slug: "eventi-culturali", description: "Mostre, rassegne e appuntamenti culturali." },
      { name: "Weekend", slug: "weekend", description: "Idee per vivere il fine settimana fuori casa." },
    ],
  },
  {
    name: "Sport",
    slug: "sport",
    description: "Partite, finali, derby e appuntamenti ad alta tensione.",
    eyebrow: "Game day",
    accentClass: "category-sport",
    subcategories: [
      { name: "Calcio", slug: "calcio", description: "Partite, finali, derby e guide da stadio." },
      { name: "Basket", slug: "basket", description: "Match, palazzetti e grandi sfide indoor." },
      { name: "Motori", slug: "motori", description: "Eventi motoristici, circuiti e weekend race." },
    ],
  },
  {
    name: "Nightlife & Experience",
    slug: "nightlife-experience",
    description: "Club, dj set, format immersivi e nuove esperienze urbane.",
    eyebrow: "After dark",
    accentClass: "category-nightlife",
    subcategories: [
      { name: "Club", slug: "club", description: "Serate, club culture e dancefloor." },
      { name: "DJ set", slug: "dj-set", description: "Lineup elettroniche, guest e format musicali." },
      { name: "Experience", slug: "experience", description: "Esperienze immersive e format urbani." },
    ],
  },
  {
    name: "Guide & Consigli",
    slug: "guide",
    description: "Checklist, idee pratiche e consigli per godersi ogni evento.",
    eyebrow: "Ticket tips",
    accentClass: "category-guide",
    subcategories: [
      { name: "Bonus Cultura", slug: "bonus-cultura", description: "Carta Cultura, Carta del Merito e bonus per eventi." },
      { name: "Acquisto Biglietti", slug: "acquisto-biglietti", description: "Guide per scegliere, comprare e gestire i biglietti." },
      { name: "Organizzazione evento", slug: "organizzazione-evento", description: "Consigli pratici prima, durante e dopo l'evento." },
    ],
  },
  {
    name: "News Ticket Italia",
    slug: "news-ticket-italia",
    description: "Aggiornamenti, piattaforma, prevendite e novita dal mondo Ticket Italia.",
    eyebrow: "Platform news",
    accentClass: "category-news",
    subcategories: [
      { name: "Piattaforma", slug: "piattaforma", description: "Novita, strumenti e aggiornamenti Ticket Italia." },
      { name: "Prevendite", slug: "prevendite", description: "Aperture vendita, priorita e consigli operativi." },
      { name: "Comunicati", slug: "comunicati", description: "News ufficiali e informazioni di servizio." },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "come-usare-carta-cultura-carta-docente-biglietti-eventi",
    title: "Come usare Carta Cultura e Carta Docente per acquistare biglietti eventi",
    excerpt:
      "Guida pratica per capire quali eventi puoi acquistare con Carta Cultura, Carta del Merito e Carta Docente, come generare il buono e come usarlo in fase di acquisto.",
    category: "Guide & Consigli",
    categorySlug: "guide",
    subcategory: "Bonus Cultura",
    subcategorySlug: "bonus-cultura",
    type: "guida",
    status: "published",
    tags: ["Carta Cultura", "Carta Docente", "Biglietti eventi"],
    date: "2026-04-17",
    readTime: "8 min",
    author: "Redazione Ticket Italia",
    featured: true,
    image: "/images/carta-cultura-biglietti.svg",
    body: {
      intro:
        "Puoi usare Carta Cultura e Carta Docente per acquistare biglietti di eventi ammessi, come teatro, spettacoli dal vivo, cinema, musei e iniziative culturali. La cosa importante e generare il buono corretto sulla piattaforma ufficiale e verificare che l'evento scelto supporti quel metodo di pagamento.",
      quickAnswer: {
        title: "Informazioni rapide",
        text:
          "Per usare il bonus devi scegliere un evento ammesso, generare un buono dell'importo corretto dal portale ufficiale Carta Cultura o Carta Docente, poi inserirlo o presentarlo nel canale di acquisto abilitato. Su Ticket Italia controlla sempre nella scheda evento o nel checkout se il pagamento con bonus e disponibile.",
        bullets: [
          "Scegli un evento culturale o spettacolo dal vivo compatibile.",
          "Genera il buono dal portale ufficiale con SPID o CIE.",
          "Usa il codice nel checkout o secondo le istruzioni indicate dall'organizzatore.",
        ],
      },
      sections: [
        {
          heading: "Cosa sono Carta Cultura e Carta Docente",
          paragraphs: [
            "Carta Cultura Giovani e Carta del Merito sono strumenti digitali pensati per sostenere l'accesso dei giovani a beni e attivita culturali. Sono nominative, si richiedono online tramite identita digitale e possono essere usate per categorie di spesa ammesse dal Ministero della Cultura. Se vuoi orientarti prima sugli acquisti consentiti, parti dalla guida su [cosa puoi comprare con Carta Cultura](/carta-cultura-cosa-puoi-comprare); se invece ti interessano soprattutto i live musicali, vai all'approfondimento su [come usare Carta Cultura per concerti](/carta-cultura-concerti-come-usarla).",
            "Carta Docente e invece il bonus dedicato alla formazione e all'aggiornamento professionale degli insegnanti aventi diritto. Anche in questo caso il credito si usa generando buoni elettronici dal portale ufficiale.",
          ],
          subSections: [
            {
              heading: "La differenza principale",
              paragraphs: [
                "Carta Cultura riguarda i giovani beneficiari e l'accesso alla cultura. Carta Docente riguarda docenti e personale avente diritto, con una finalita legata alla formazione professionale. Entrambe possono includere biglietti per eventi culturali, ma regole, importi, scadenze e categorie disponibili dipendono dalla normativa e dalla piattaforma ufficiale attiva nell'anno di riferimento.",
              ],
            },
          ],
        },
        {
          heading: "Cosa puoi acquistare",
          paragraphs: [
            "In generale, i bonus possono essere usati per beni e attivita culturali. Per chi cerca carta cultura biglietti o carta docente eventi, la regola pratica e verificare che l'evento rientri tra le categorie ammesse e che il venditore sia abilitato ad accettare quel buono. Per un quadro piu dettagliato sugli acquisti ammessi e su quelli esclusi, consulta anche [Carta Cultura: cosa puoi comprare davvero nel 2026](/carta-cultura-cosa-puoi-comprare).",
          ],
          bullets: [
            "Biglietti per rappresentazioni teatrali.",
            "Biglietti per spettacoli dal vivo ed eventi culturali.",
            "Ingressi a cinema, musei, mostre e aree archeologiche, quando previsti.",
            "Concerti o festival, se rientrano tra gli spettacoli dal vivo ammessi e se il canale di vendita accetta il buono.",
            "Abbonamenti o card culturali, quando la piattaforma ufficiale e l'esercente li prevedono.",
          ],
        },
        {
          heading: "Come usare il bonus step by step",
          paragraphs: [
            "Il processo e semplice, ma conviene prepararsi prima di arrivare al pagamento. Generare un buono sbagliato per categoria, importo o canale di vendita puo rallentare l'acquisto.",
          ],
          ordered: [
            "Accedi al portale ufficiale della Carta con SPID o CIE.",
            "Verifica il credito disponibile e le categorie di spesa ammesse.",
            "Scegli l'evento che vuoi acquistare e controlla prezzo, data, settore e disponibilita.",
            "Genera un buono dell'importo corretto, scegliendo la categoria piu coerente con l'evento.",
            "Usa il codice del buono nel checkout, se il canale online lo supporta, oppure segui le istruzioni indicate dall'organizzatore o dalla biglietteria.",
            "Conserva conferma d'ordine, biglietto e codice del buono fino al giorno dell'evento.",
          ],
        },
        {
          heading: "Come usarlo su Ticket Italia",
          paragraphs: [
            "Su Ticket Italia il percorso consigliato e partire dalla scheda evento. Cerca l'evento che ti interessa, apri la pagina dedicata e verifica le informazioni sui metodi di pagamento disponibili.",
            "Quando il pagamento con Carta Cultura, Carta del Merito o Carta Docente e abilitato per quell'evento, il flusso di acquisto puo richiedere l'inserimento del codice buono nel checkout o indicare istruzioni specifiche per completare la procedura. Se l'opzione non compare, significa che quell'evento o quel canale di vendita potrebbe non supportare il bonus.",
          ],
          subSections: [
            {
              heading: "Prima di generare il buono",
              paragraphs: [
                "Controlla sempre importo finale, commissioni, data, settore e intestazione. Genera il buono solo quando sei sicuro dell'acquisto, cosi riduci il rischio di doverlo annullare o ricreare.",
              ],
            },
          ],
        },
        {
          heading: "Errori comuni da evitare",
          paragraphs: [
            "Molti problemi nascono da buoni generati troppo presto o con categoria non corretta. Prima di procedere, leggi con attenzione le indicazioni dell'evento e del portale ufficiale; per i biglietti live musicali, la guida su [come usare Carta Cultura per concerti](/carta-cultura-concerti-come-usarla) ti aiuta a verificare data, settore e checkout prima di creare il buono.",
          ],
          bullets: [
            "Generare un buono prima di sapere se l'evento accetta quel metodo di pagamento.",
            "Scegliere una categoria non coerente con l'evento.",
            "Creare un buono di importo diverso dal totale richiesto.",
            "Confondere Carta Cultura, Carta del Merito e Carta Docente.",
            "Aspettare l'ultimo minuto: durante le vendite piu richieste i posti possono esaurirsi rapidamente.",
          ],
        },
      ],
      faq: [
        {
          question: "Posso comprare biglietti per concerti con Carta Cultura?",
          answer:
            "In molti casi i concerti rientrano negli spettacoli dal vivo, ma devi sempre verificare che l'evento specifico e il canale di vendita siano abilitati ad accettare il buono.",
        },
        {
          question: "Carta Docente si puo usare per eventi?",
          answer:
            "Carta Docente puo coprire titoli di accesso a teatro, cinema, musei, mostre, eventi culturali e spettacoli dal vivo, secondo le regole ufficiali e le opzioni disponibili presso l'esercente.",
        },
        {
          question: "Devo generare il buono prima o dopo aver scelto l'evento?",
          answer:
            "Meglio scegliere prima evento, data, settore e importo. Genera il buono solo quando hai verificato che il pagamento con bonus e disponibile e sai l'importo corretto.",
        },
        {
          question: "Cosa succede se il buono non viene accettato?",
          answer:
            "Controlla categoria, importo, validita e canale di utilizzo. Se il problema continua, annulla il buono dal portale ufficiale quando possibile e contatta l'assistenza indicata dal venditore o dall'organizzatore.",
        },
        {
          question: "Posso usare il bonus per comprare piu biglietti?",
          answer:
            "Dipende dalle regole della Carta, dall'evento e dall'esercente. Prima di procedere verifica limiti, intestazione dei titoli e condizioni di utilizzo indicate nel checkout o nella scheda evento.",
        },
      ],
      cta: {
        title: "Trova il prossimo evento da vivere",
        text:
          "Ora che sai come funzionano Carta Cultura e Carta Docente, esplora gli eventi disponibili e controlla le modalita di pagamento nella scheda evento.",
        label: "Scopri eventi su Ticket Italia",
        href: "https://www.ticketitalia.com",
      },
    },
  },
  {
    slug: "carta-cultura-cosa-puoi-comprare",
    title: "Carta Cultura: cosa puoi comprare davvero nel 2026",
    excerpt:
      "Libri, musica, cinema, teatro, spettacoli dal vivo ed eventi culturali: una guida chiara per capire cosa puoi acquistare con Carta Cultura e cosa resta escluso.",
    category: "Guide & Consigli",
    categorySlug: "guide",
    subcategory: "Bonus Cultura",
    subcategorySlug: "bonus-cultura",
    type: "guida",
    status: "published",
    tags: ["Carta Cultura", "Bonus cultura", "Concerti"],
    date: "2026-04-18",
    readTime: "7 min",
    author: "Redazione Ticket Italia",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80",
    body: {
      intro:
        "Con Carta Cultura puoi acquistare beni e servizi culturali ammessi, tra cui libri, musica, cinema, teatro, spettacoli dal vivo, musei ed eventi culturali. Per concerti ed eventi la risposta e si, ma solo quando l'evento e il canale di vendita sono idonei e accettano il buono. Se vuoi passare subito alla procedura, leggi la [guida completa all'utilizzo del bonus](/come-usare-carta-cultura-carta-docente-biglietti-eventi); se il tuo obiettivo sono i live, trovi anche una guida dedicata su [come usare Carta Cultura per concerti](/carta-cultura-concerti-come-usarla).",
      quickAnswer: {
        title: "Informazioni rapide",
        text:
          "Se stai cercando carta cultura cosa comprare, la risposta breve e: puoi usare il credito per acquisti culturali ammessi, non per qualsiasi prodotto o abbonamento. Prima di generare il buono controlla sempre categoria, importo e canale di acquisto.",
        bullets: [
          "Libri, anche in formato digitale.",
          "Musica registrata e prodotti dell'editoria audiovisiva ammessi.",
          "Biglietti per cinema, teatro, spettacoli dal vivo ed eventi culturali.",
          "Ingressi a musei, mostre, monumenti, aree archeologiche e parchi naturali.",
          "Corsi di musica, teatro, danza e lingue straniere.",
        ],
      },
      sections: [
        {
          heading: "Cosa puoi comprare con Carta Cultura",
          paragraphs: [
            "Carta Cultura e pensata per sostenere l'accesso dei giovani a prodotti e attivita culturali. Il credito non e un buono spesa generico: puo essere usato solo per categorie ammesse dalla normativa e dagli esercenti aderenti.",
            "Le categorie piu rilevanti per chi segue Ticket Italia sono spettacoli dal vivo, teatro, cinema, musei, mostre ed eventi culturali. In alcuni casi possono rientrare anche concerti e festival, se gestiti come spettacoli dal vivo e se il canale di vendita accetta il buono.",
          ],
          subSections: [
            {
              heading: "Libri",
              paragraphs: [
                "Puoi acquistare libri cartacei e, quando previsto, contenuti editoriali digitali. Rientrano in questa area anche pubblicazioni e prodotti editoriali compatibili con le regole della piattaforma.",
              ],
            },
            {
              heading: "Musica",
              paragraphs: [
                "La musica registrata rientra tra gli acquisti ammessi. Il credito puo quindi essere usato per prodotti musicali idonei, secondo le modalita previste dagli esercenti registrati.",
              ],
            },
            {
              heading: "Eventi, concerti, teatro e spettacoli",
              paragraphs: [
                "I biglietti per rappresentazioni teatrali, cinema e spettacoli dal vivo sono tra le categorie centrali. Per la ricerca carta cultura concerti, la regola pratica e verificare sempre che l'evento sia classificato correttamente e che il venditore supporti il pagamento con Carta Cultura; nell'approfondimento su [usare Carta Cultura per concerti](/carta-cultura-concerti-come-usarla) trovi esempi e controlli specifici per i live musicali.",
              ],
            },
            {
              heading: "Cinema, musei e altri prodotti culturali",
              paragraphs: [
                "Sono generalmente ammessi anche titoli di accesso a cinema, musei, mostre, monumenti, gallerie, aree archeologiche, parchi naturali ed eventi culturali. Possono rientrare anche corsi di musica, teatro, danza e lingue straniere.",
              ],
            },
          ],
        },
        {
          heading: "Puoi comprare biglietti per concerti ed eventi?",
          paragraphs: [
            "Si, puoi comprare biglietti per concerti ed eventi quando rientrano nelle categorie ammesse, come spettacoli dal vivo o eventi culturali, e quando il canale di vendita e abilitato ad accettare Carta Cultura.",
            "Non tutti gli eventi disponibili online accettano automaticamente il bonus. La disponibilita dipende dall'organizzatore, dall'esercente e dal metodo di pagamento previsto per quello specifico evento.",
          ],
          bullets: [
            "Controlla la scheda evento prima di generare il buono.",
            "Verifica che il checkout indichi Carta Cultura tra i metodi disponibili.",
            "Genera un buono dell'importo corretto solo dopo aver scelto evento, data e settore.",
          ],
        },
        {
          heading: "Cosa NON puoi comprare",
          paragraphs: [
            "Carta Cultura non puo essere usata per acquisti fuori dalle categorie culturali ammesse. Questo punto e importante: il credito non funziona come una carta prepagata libera.",
          ],
          bullets: [
            "Videogiochi.",
            "Abbonamenti a piattaforme streaming audiovisive.",
            "Buoni spesa sostitutivi generati dall'esercente.",
            "Prodotti o servizi non compresi nelle categorie culturali ammesse.",
            "Eventi o articoli venduti da esercenti non abilitati all'iniziativa.",
          ],
        },
        {
          heading: "Come usare Carta Cultura per eventi",
          paragraphs: [
            "Il modo piu semplice e partire dall'evento che vuoi acquistare. Su Ticket Italia puoi cercare concerti, spettacoli, festival o appuntamenti culturali e verificare nella scheda evento quali metodi di pagamento sono disponibili.",
            "Se l'evento supporta Carta Cultura, genera il buono dal portale ufficiale con l'importo corretto e segui le istruzioni indicate nel checkout o nella pagina evento. Se l'opzione non compare, l'evento potrebbe non essere acquistabile con quel bonus.",
          ],
          ordered: [
            "Scegli l'evento su Ticket Italia.",
            "Controlla data, settore, prezzo e metodi di pagamento disponibili.",
            "Accedi al portale Carta Cultura con SPID o CIE.",
            "Crea un buono coerente con categoria e importo.",
            "Inserisci il codice nel checkout se previsto, oppure segui le istruzioni della biglietteria.",
          ],
        },
        {
          heading: "Errori comuni",
          paragraphs: [
            "Gli errori piu frequenti nascono da buoni generati in anticipo o da interpretazioni troppo larghe delle categorie ammesse. Prima di procedere, fai sempre un controllo incrociato tra portale ufficiale e scheda evento; per il flusso operativo completo, torna alla guida su [come usare Carta Cultura e Carta Docente per acquistare biglietti eventi](/come-usare-carta-cultura-carta-docente-biglietti-eventi).",
          ],
          bullets: [
            "Pensare che Carta Cultura valga per qualsiasi concerto o festival.",
            "Generare un buono prima di verificare che il venditore lo accetti.",
            "Scegliere una categoria non coerente con l'acquisto.",
            "Confondere Carta Cultura con Carta Docente o Carta del Merito.",
            "Non controllare scadenze e credito residuo.",
          ],
        },
      ],
      faq: [
        {
          question: "Carta Cultura cosa comprare nel 2026?",
          answer:
            "Puoi acquistare beni e attivita culturali ammessi, tra cui libri, musica registrata, biglietti per cinema, teatro, spettacoli dal vivo, musei, mostre, eventi culturali e corsi culturali previsti dalla normativa.",
        },
        {
          question: "Posso usare Carta Cultura per concerti?",
          answer:
            "Si, quando il concerto rientra tra gli spettacoli dal vivo ammessi e il canale di vendita e abilitato ad accettare Carta Cultura. Verifica sempre la scheda evento prima di generare il buono.",
        },
        {
          question: "Carta Cultura vale anche per festival ed eventi?",
          answer:
            "Puo valere per festival ed eventi culturali se rientrano nelle categorie ammesse e se l'esercente aderisce all'iniziativa. Non tutti gli eventi sono automaticamente compatibili.",
        },
        {
          question: "Posso comprare abbonamenti streaming con Carta Cultura?",
          answer:
            "No. Gli abbonamenti per l'accesso a canali o piattaforme che offrono contenuti audiovisivi sono esclusi dagli acquisti ammessi.",
        },
        {
          question: "Dove controllo se un evento Ticket Italia accetta Carta Cultura?",
          answer:
            "Controlla la scheda evento e il checkout. Se il metodo e disponibile, troverai indicazioni operative per usare il buono o completare l'acquisto secondo le modalita previste.",
        },
      ],
      cta: {
        title: "Scopri eventi compatibili con il tuo prossimo piano live",
        text:
          "Cerca concerti, teatro, festival e spettacoli su Ticket Italia e verifica nella scheda evento le modalita di pagamento disponibili.",
        label: "Scopri eventi disponibili",
        href: "https://www.ticketitalia.com",
      },
    },
  },
  {
    slug: "carta-cultura-concerti-come-usarla",
    title: "Come usare Carta Cultura per concerti: guida completa",
    excerpt:
      "Guida pratica per capire quando puoi usare Carta Cultura per concerti, quali eventi sono idonei, come generare il buono e come completare l'acquisto su Ticket Italia.",
    category: "Guide & Consigli",
    categorySlug: "guide",
    subcategory: "Bonus Cultura",
    subcategorySlug: "bonus-cultura",
    type: "guida",
    status: "published",
    tags: ["Carta Cultura", "Concerti", "Bonus cultura"],
    date: "2026-04-19",
    readTime: "8 min",
    author: "Redazione Ticket Italia",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=80",
    body: {
      intro:
        "Si, puoi usare Carta Cultura per concerti quando l'evento rientra tra gli spettacoli dal vivo ammessi e il canale di vendita accetta il buono. Prima di generarlo, controlla sempre scheda evento, importo finale e metodo di pagamento disponibile. Per il quadro generale degli acquisti ammessi puoi leggere [cosa puoi comprare con Carta Cultura](/carta-cultura-cosa-puoi-comprare), mentre per tutti i passaggi operativi trovi la [guida completa all'utilizzo del bonus](/come-usare-carta-cultura-carta-docente-biglietti-eventi).",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Per usare Carta Cultura per concerti scegli un concerto idoneo, verifica che il venditore accetti il bonus, genera il buono dal portale ufficiale con SPID o CIE e inserisci il codice nel checkout se previsto. Se l'opzione non compare, quel concerto potrebbe non essere acquistabile con Carta Cultura su quel canale.",
        bullets: [
          "Controlla che il concerto sia acquistabile con Carta Cultura.",
          "Scegli data, settore e numero di biglietti prima di creare il buono.",
          "Genera un buono dell'importo corretto sul portale ufficiale.",
          "Usa il codice nel checkout o segui le istruzioni indicate dalla biglietteria.",
        ],
      },
      sections: [
        {
          heading: "Puoi usare Carta Cultura per concerti?",
          paragraphs: [
            "Si, puoi usare Carta Cultura per concerti quando il concerto e gestito come spettacolo dal vivo o evento culturale ammesso e quando l'esercente aderisce all'iniziativa. La compatibilita non dipende solo dal tipo di evento, ma anche dal canale di vendita e dalle regole applicate per quella data.",
            "In pratica, non conviene generare un buono appena trovi un concerto interessante. Prima verifica che l'evento indichi Carta Cultura tra i metodi utilizzabili o che la biglietteria riporti istruzioni chiare per il pagamento con bonus.",
          ],
        },
        {
          heading: "Quali concerti puoi acquistare",
          paragraphs: [
            "La categoria piu rilevante e quella degli spettacoli dal vivo. Possono quindi rientrare concerti in teatro, club, palazzetti, arene, festival musicali e rassegne live, se l'organizzatore e il venditore sono abilitati ad accettare Carta Cultura. Per distinguere meglio eventi ammessi, prodotti culturali e acquisti esclusi, resta utile la guida su [cosa puoi comprare con Carta Cultura](/carta-cultura-cosa-puoi-comprare).",
            "La regola da ricordare e semplice: Carta Cultura non trasforma automaticamente ogni concerto in un acquisto valido. Serve sempre che il singolo evento sia idoneo e che il checkout supporti il buono.",
          ],
          bullets: [
            "Concerti di artisti italiani o internazionali, se venduti da esercenti abilitati.",
            "Festival musicali e rassegne live, quando classificati come spettacoli dal vivo ammessi.",
            "Eventi in teatri, club, arene o palazzetti con pagamento tramite Carta Cultura disponibile.",
            "Biglietti singoli o formule ammesse dalla biglietteria, nel rispetto delle condizioni dell'evento.",
          ],
          subSections: [
            {
              heading: "Attenzione a festival, pacchetti e servizi extra",
              paragraphs: [
                "Se il biglietto include servizi non culturali, pacchetti hospitality, trasporto, food o formule speciali, verifica con attenzione cosa e coperto dal buono. In alcuni casi il bonus puo essere valido solo per il titolo di accesso all'evento, non per servizi aggiuntivi.",
              ],
            },
          ],
        },
        {
          heading: "Come usare Carta Cultura per comprare biglietti",
          paragraphs: [
            "Il modo piu sicuro per usare carta cultura concerti e procedere con ordine: prima scegli il concerto, poi controlla le condizioni, infine genera il buono. Questo riduce il rischio di creare un voucher con importo o categoria non corretti.",
          ],
          ordered: [
            "Cerca il concerto che vuoi acquistare e apri la scheda evento.",
            "Controlla data, luogo, settore, prezzo finale e disponibilita dei posti.",
            "Verifica che Carta Cultura sia indicata tra i metodi di pagamento o nelle istruzioni dell'evento.",
            "Accedi al portale ufficiale Carta Cultura con SPID o CIE.",
            "Genera un buono coerente con la categoria dell'acquisto e con l'importo richiesto.",
            "Torna al checkout e inserisci il codice del buono, se previsto dal flusso online.",
            "Completa l'ordine e conserva conferma, biglietto e ricevuta fino al giorno del concerto.",
          ],
        },
        {
          heading: "Come acquistare su Ticket Italia",
          paragraphs: [
            "Su Ticket Italia il percorso parte dalla ricerca dell'evento. Apri la pagina del concerto, controlla le informazioni principali e verifica se nella scheda evento o nel checkout sono presenti indicazioni sul pagamento con Carta Cultura.",
            "Quando l'evento e abilitato, il flusso di acquisto puo richiedere l'inserimento del codice buono in fase di checkout oppure indicare una procedura dedicata. Se non trovi il metodo tra le opzioni disponibili, non generare il buono prima di aver verificato le condizioni dell'evento.",
          ],
          subSections: [
            {
              heading: "Prima del checkout",
              paragraphs: [
                "Prepara account, metodo di accesso al portale Carta Cultura e importo esatto. Nei concerti molto richiesti, avere gia chiare data e settore ti aiuta a completare l'acquisto con meno esitazioni.",
              ],
            },
          ],
        },
        {
          heading: "Consigli utili",
          paragraphs: [
            "Usare carta cultura concerti funziona meglio quando l'acquisto e pianificato. Il bonus ha regole precise e gli eventi live possono esaurire rapidamente i posti migliori.",
          ],
          bullets: [
            "Scegli prima l'evento e crea il buono solo quando sei pronto ad acquistare.",
            "Controlla sempre il prezzo totale, incluse eventuali commissioni indicate nel checkout.",
            "Verifica scadenza del bonus, credito residuo e condizioni dell'esercente.",
            "Preferisci eventi con istruzioni chiare sul pagamento con Carta Cultura.",
            "Se hai dubbi, consulta la guida generale del blog prima di procedere.",
          ],
        },
        {
          heading: "Errori comuni",
          paragraphs: [
            "Gli errori piu frequenti nascono da fretta e informazioni incomplete. Prima di usare Carta Cultura per concerti, fai un controllo finale tra portale ufficiale, scheda evento e checkout; se hai dubbi su generazione del buono, importo e metodo di pagamento, riparti dalla guida su [come usare Carta Cultura e Carta Docente per acquistare biglietti eventi](/come-usare-carta-cultura-carta-docente-biglietti-eventi).",
          ],
          bullets: [
            "Pensare che tutti i concerti siano automaticamente acquistabili con Carta Cultura.",
            "Generare il buono prima di verificare se Ticket Italia o l'esercente lo accetta per quella data.",
            "Creare un buono con importo diverso dal totale richiesto.",
            "Scegliere una categoria non coerente con l'acquisto.",
            "Confondere Carta Cultura con Carta del Merito o Carta Docente.",
            "Non controllare scadenza, annullabilita del buono e condizioni del concerto.",
          ],
        },
      ],
      faq: [
        {
          question: "Posso usare Carta Cultura per tutti i concerti?",
          answer:
            "No. Puoi usarla per concerti idonei, quando rientrano tra gli spettacoli dal vivo ammessi e quando il canale di vendita accetta Carta Cultura per quello specifico evento.",
        },
        {
          question: "Come capisco se un concerto accetta Carta Cultura?",
          answer:
            "Controlla la scheda evento e il checkout. Se Carta Cultura e disponibile, troverai indicazioni sul metodo di pagamento o sulla procedura da seguire per usare il buono.",
        },
        {
          question: "Devo generare il buono prima di scegliere il concerto?",
          answer:
            "No, e meglio scegliere prima concerto, data, settore e importo. Genera il buono solo dopo aver verificato che l'evento supporti Carta Cultura e che il totale sia corretto.",
        },
        {
          question: "Carta Cultura copre anche festival musicali?",
          answer:
            "Puo coprirli se il festival rientra tra gli spettacoli dal vivo o eventi culturali ammessi e se l'esercente aderente accetta il bonus. Verifica sempre le condizioni del singolo evento.",
        },
        {
          question: "Posso pagare una parte con Carta Cultura e una parte con altro metodo?",
          answer:
            "Dipende dal checkout e dalle regole dell'esercente. Alcuni flussi possono richiedere un buono pari all'importo esatto, altri possono prevedere modalita diverse. Controlla sempre le istruzioni prima di generare il buono.",
        },
      ],
      cta: {
        title: "Trova il prossimo concerto da vivere dal vivo",
        text:
          "Esplora i concerti disponibili su Ticket Italia e verifica nella scheda evento se puoi usare Carta Cultura per completare l'acquisto.",
        label: "Scopri concerti disponibili",
        href: "https://www.ticketitalia.com",
      },
    },
  },
  {
    slug: "agriumbria-evento-biglietti-guida",
    title: "Agriumbria: com'è andata l'ultima edizione e come partecipare",
    excerpt:
      "Bilancio dell'ultima edizione di Agriumbria a Umbriafiere, informazioni utili sull'evento e consigli pratici per acquistare i biglietti e partecipare alle prossime edizioni.",
    category: "Eventi & Festival",
    categorySlug: "eventi-festival",
    subcategory: "Eventi culturali",
    subcategorySlug: "eventi-culturali",
    type: "evento",
    status: "published",
    tags: ["Agriumbria", "Umbriafiere", "Fiere"],
    date: "2026-04-20",
    readTime: "6 min",
    author: "Redazione Ticket Italia",
    featured: true,
    image: "/agriumbria-vista-panoramica-fonte-agriumbria.jpg",
    body: {
      intro:
        "Agriumbria e una delle manifestazioni italiane piu riconosciute dedicate ad agricoltura, zootecnia e alimentazione. Si svolge a Umbriafiere, a Bastia Umbra, in provincia di Perugia, e riunisce operatori del settore, aziende, allevatori, istituzioni e pubblico interessato al mondo rurale e agroalimentare.",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "L'ultima edizione di Agriumbria ha confermato il peso nazionale dell'evento, superando le 85mila presenze e valorizzando filiere agricole, zootecnia, meccanizzazione, forestazione e prodotti del territorio. Per partecipare alle prossime edizioni conviene seguire l'apertura delle vendite online e acquistare i biglietti Agriumbria in anticipo quando disponibili su Ticket Italia.",
        bullets: [
          "Evento: Mostra Nazionale Agricoltura, Zootecnia, Alimentazione.",
          "Location: Umbriafiere, Piazza Moncada, Bastia Umbra (PG).",
          "Ultima edizione: 57a edizione, dal 27 al 29 marzo 2026.",
          "Partecipazione: oltre 85mila presenze secondo Umbriafiere.",
        ],
      },
      sections: [
        {
          heading: "Com'e andata l'ultima edizione",
          paragraphs: [
            "L'ultima edizione di Agriumbria, la 57a, si e svolta dal 27 al 29 marzo 2026 nei padiglioni e negli spazi esterni di Umbriafiere. La manifestazione ha superato le 85mila presenze, confermando una partecipazione molto alta nonostante un avvio condizionato dal maltempo.",
            "L'atmosfera e stata quella di una fiera di settore molto viva: operatori professionali, famiglie, allevatori, aziende agricole, espositori e visitatori si sono mossi tra aree dimostrative, mostre zootecniche, macchinari, incontri tecnici e spazi dedicati ai prodotti del territorio.",
            "Il cuore dell'evento e rimasto la filiera, dal campo alla tavola. Zootecnia, forestazione, meccanizzazione agricola, alimentazione, mercati di filiera corta e mostra mercato hanno costruito un percorso ampio, pensato sia per il pubblico professionale sia per chi vuole scoprire da vicino il mondo agricolo.",
          ],
        },
        {
          heading: "Perche Agriumbria e un evento importante",
          paragraphs: [
            "Agriumbria non e una semplice fiera locale. Nel tempo si e consolidata come appuntamento di riferimento per il comparto agricolo e zootecnico, con una posizione centrale nel calendario delle manifestazioni di settore in Italia.",
            "La sua rilevanza nasce dalla capacita di mettere insieme pubblici diversi: imprese, istituzioni, tecnici, allevatori, associazioni di categoria, famiglie e appassionati. Questo mix rende l'evento utile per chi lavora nel settore, ma anche accessibile a chi vuole conoscere meglio agricoltura, allevamento, sostenibilita e produzioni alimentari.",
            "Per il territorio umbro, Agriumbria rappresenta anche una vetrina turistica ed economica. Bastia Umbra e il quartiere fieristico diventano per tre giorni un punto di incontro nazionale, con ricadute su ospitalita, ristorazione, servizi e mobilita.",
          ],
        },
        {
          heading: "Biglietti e partecipazione",
          paragraphs: [
            "Per l'edizione 2026 i biglietti Agriumbria erano acquistabili online tramite il canale di vendita dedicato, con biglietto a data aperta per un singolo ingresso alla manifestazione. Questo tipo di soluzione e utile per chi vuole organizzare la visita con maggiore flessibilita nei giorni di apertura.",
            "Ticket Italia ha avuto un ruolo pratico nel percorso di partecipazione: rendere piu semplice l'accesso alla biglietteria online, aiutando gli utenti a trovare l'evento, verificare disponibilita e completare l'acquisto in modo chiaro. Per un appuntamento molto frequentato come Agriumbria, avere un canale digitale ordinato riduce code, incertezze e passaggi inutili.",
            "Chi cerca Agriumbria biglietti dovrebbe sempre controllare la pagina evento aggiornata, per verificare prezzo, validita del titolo, eventuali condizioni di ingresso e modalita di accesso previste dall'organizzazione.",
          ],
        },
        {
          heading: "Come partecipare alle prossime edizioni",
          paragraphs: [
            "Per partecipare alle prossime edizioni di Agriumbria conviene muoversi con anticipo. La manifestazione richiama decine di migliaia di persone e il weekend tende a concentrare il maggior flusso di visitatori, soprattutto famiglie e pubblico non professionale.",
            "Il consiglio e monitorare l'apertura della vendita online, scegliere il giorno di visita in base ai propri interessi e acquistare il biglietto appena sono disponibili informazioni ufficiali su date, orari e programma. Chi lavora nel settore puo preferire le fasce piu operative; chi visita con bambini o amici puo invece programmare la giornata attorno a mostre, dimostrazioni e aree mercato.",
          ],
          bullets: [
            "Controlla date e orari ufficiali prima di organizzare il viaggio.",
            "Acquista online appena la vendita e disponibile, soprattutto se prevedi di visitare nel weekend.",
            "Arriva con anticipo per gestire parcheggio, ingressi e spostamenti tra padiglioni.",
            "Consulta programma, piantina e aree tematiche per costruire un percorso di visita realistico.",
            "Conserva il biglietto digitale in un punto facilmente accessibile sul telefono.",
          ],
        },
        {
          heading: "Informazioni utili",
          paragraphs: [
            "Agriumbria si svolge presso Umbriafiere, in Piazza Moncada, a Bastia Umbra, nel cuore dell'Umbria e in una posizione comoda rispetto a Perugia, Assisi e alle principali direttrici regionali.",
            "La tipologia dell'evento e quella di mostra mercato nazionale dedicata ad agricoltura, zootecnia e alimentazione. Il format combina esposizione, confronto professionale, dimostrazioni, mostre zootecniche, incontri tecnici, prodotti agroalimentari e spazi pensati anche per il pubblico generalista.",
          ],
          bullets: [
            "Location: Umbriafiere, Bastia Umbra (PG).",
            "Ambito: agricoltura, zootecnia, alimentazione, meccanizzazione e forestazione.",
            "Pubblico: operatori professionali, aziende, allevatori, istituzioni, famiglie e visitatori interessati.",
            "Formato: fiera, mostra mercato, convegni, dimostrazioni e aree espositive.",
          ],
        },
      ],
      location: {
        title: "Umbriafiere: il quartiere fieristico nel cuore dell'Umbria",
        venueType: "Quartiere fieristico polifunzionale, sede espositiva e convegnistica",
        experience: "Umbriafiere è il principale polo fieristico dell'Umbria, situato a Bastia Umbra in una posizione strategica tra Perugia e Assisi. Con i suoi padiglioni moderni, gli spazi espositivi e le aree esterne, ospita ogni anno manifestazioni di rilievo nazionale come Agriumbria. La struttura è pensata per eventi ad alto afflusso, con ingressi separati, aree di sosta ampie e percorsi interni ben organizzati.",
        suitability: "Ideale per fiere, mostre mercato e manifestazioni di settore. La configurazione modulare dei padiglioni permette di accogliere espositori di diverse dimensioni, dalle grandi aziende agli artigiani locali. Gli spazi esterni sono usati per le mostre zootecniche e le aree dimostrative, garantendo ampiezza e versatilità.",
        atmosphere: "L'atmosfera durante Agriumbria è quella tipica delle grandi fiere di settore: operativa, concreta, ricca di incontri professionali ma accessibile anche alle famiglie. Il weekend concentra il massimo afflusso di pubblico generalista, mentre i giorni feriali sono dedicati soprattutto agli operatori.",
        paragraphs: [
          "Umbriafiere si trova in Piazza Moncada, 1 a Bastia Umbra (PG), ben collegata alla SS75 e alla E45. La sua posizione centrale nel cuore dell'Umbria la rende raggiungibile facilmente da Perugia (circa 15 km), Assisi (circa 8 km) e dall'aeroporto regionale di Sant'Egidio.",
          "Durante Agriumbria i piazzali interni ed esterni del quartiere fieristico si trasformano in aree parcheggio, con una capienza complessiva che supera le 700 auto. Un servizio navetta gratuito collega i parcheggi periferici all'ingresso principale durante i giorni di apertura.",
        ],
        bullets: [
          "Indirizzo: Piazza Moncada, 1 – Bastia Umbra (PG)",
          "Accesso: SS75 uscita Assisi/Santa Maria degli Angeli Nord",
          "Parcheggio interno: oltre 700 posti auto nei piazzali del quartiere fieristico",
          "Navetta gratuita attiva durante Agriumbria (ven-dom, 8:30-19:30)",
        ],
        locationImage: "https://ticketitalia.com/image/cache/wp/gp/Luoghi%20banner/Progetto%20senza%20titolo%20(59)-1400x300.webp",
        nearbyParking: [
          { name: "Parcheggi fieristici Umbriafiere (Largo America, Oceania, Asia)", distanceOnFoot: "0 min a piedi", type: "gratuito", notes: "Parcheggi gratuiti segnalati, attivi durante le fiere con navetta inclusa", mapsUrl: "https://maps.google.com/?q=Umbriafiere+Piazza+Moncada+Bastia+Umbra" },
          { name: "Parcheggio di fronte alle Poste – Bastia Umbra", distanceOnFoot: "10 min a piedi", type: "gratuito", notes: "50 posti, con servizio camper. Vicino al centro di Bastia Umbra", mapsUrl: "https://maps.google.com/?q=Poste+Italiane+Bastia+Umbra" },
          { name: "Parcheggi pubblici Via Roma – Bastia Umbra", distanceOnFoot: "15 min a piedi", type: "gratuito", notes: "Parcheggi lungo strada nel centro di Bastia Umbra", mapsUrl: "https://maps.google.com/?q=Via+Roma+Bastia+Umbra" },
        ],
        nearbyHotels: [
          { name: "Hotel Santa Lucia", distanceOnFoot: "20 min a piedi", priceRange: "€", bookingUrl: "https://www.google.com/maps/search/Hotel+Santa+Lucia+Bastia+Umbra", images: ["https://www.hotelsantaluciabastia.com/index_html_files/226.jpg", "https://www.hotelsantaluciabastia.com/index_html_files/227.jpg", "https://www.hotelsantaluciabastia.com/index_html_files/228.jpg"] },
          { name: "Hotel La Villa Excelsior", distanceOnFoot: "30 min a piedi", priceRange: "€€", bookingUrl: "https://www.google.com/maps/search/Hotel+La+Villa+Excelsior+Bastia+Umbra", images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe2e2?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80"] },
          { name: "Relais Madonna di Campagna", distanceOnFoot: "25 min in auto", priceRange: "€€", bookingUrl: "https://www.google.com/maps/search/Relais+Madonna+di+Campagna+Bastia+Umbra", images: ["https://www.relaismadonnadicampagna.it/wp-content/uploads/2021/04/DJI_0007-scaled.jpg", "https://www.relaismadonnadicampagna.it/wp-content/uploads/2021/04/IMG_0133-scaled.jpg", "https://www.relaismadonnadicampagna.it/wp-content/uploads/2021/04/1-1.jpg"] },
        ],
      },
      faq: [
        {
          question: "Dove si svolge Agriumbria?",
          answer:
            "Agriumbria si svolge a Umbriafiere, in Piazza Moncada, a Bastia Umbra, in provincia di Perugia.",
        },
        {
          question: "Quante presenze ha registrato l'ultima edizione?",
          answer:
            "L'edizione 2026 ha superato le 85mila presenze, confermando Agriumbria tra le principali manifestazioni italiane del settore agricolo e zootecnico.",
        },
        {
          question: "Dove acquistare i biglietti Agriumbria?",
          answer:
            "Quando la vendita e attiva, i biglietti Agriumbria possono essere acquistati online tramite il canale indicato dall'organizzazione e tramite la pagina evento disponibile su Ticket Italia.",
        },
        {
          question: "Agriumbria e adatta anche alle famiglie?",
          answer:
            "Si. Pur avendo un forte valore professionale, Agriumbria propone aree espositive, animali, prodotti, dimostrazioni e mostra mercato che interessano anche famiglie e visitatori non specializzati.",
        },
      ],
      cta: {
        title: "Scopri i prossimi eventi a Umbriafiere",
        text:
          "Segui Ticket Italia per trovare biglietti, date e informazioni aggiornate su Agriumbria e sugli altri eventi in programma a Bastia Umbra.",
        label: "Scopri eventi su Ticket Italia",
        href: "https://ticketitalia.com/luoghi/umbria-fiere-bastia-umbra-pg",
      },
    },
  },
  {
    slug: "francesco-renga-spoleto-2026-biglietti-teatro-nuovo",
    title: "Francesco Renga a Spoleto 2026: concerto al Teatro Nuovo, biglietti e dettagli",
    excerpt: "Francesco Renga sarà in concerto a Spoleto il 29 settembre 2026 al Teatro Nuovo. Un evento che si distingue per il contesto e per il tipo di esperienza proposta.",
    category: "Concerti",
    categorySlug: "concerti",
    subcategory: "Pop",
    subcategorySlug: "pop",
    type: "evento",
    status: "published",
    tags: ["Francesco Renga", "Concerti", "Spoleto", "Teatro Nuovo", "Teatro"],
    date: "2026-04-23",
    readTime: "6 min",
    author: "Redazione Ticket Italia",
    featured: true,
    image: "/images/renga_teatri_quad-1500x1500.webp",
    body: {
      intro: "Francesco Renga arriva a Spoleto per trasformare il Teatro Nuovo in uno spazio di pura emozione musicale, un concerto che unisce l'intimità teatrale con la potenza della sua voce inconfondibile.",
      quickInfo: {
        title: "Informazioni rapide",
        text: "Francesco Renga approda al Teatro Nuovo di Spoleto per un'unica data umbra, un concerto che privilegia l'ascolto e l'interpretazione in un contesto teatrale d'eccezione.",
        bullets: [
          "Artista: Francesco Renga, la voce intensa della pop italiana",
          "Location: Teatro Nuovo, Spoleto",
          "Data: 29 settembre 2026",
          "Atmosfera: Intima, teatrale, concentrata sull'emozione"
        ]
      },
      tickets: {
        title: "Biglietti e settori",
        text: "Il Teatro Nuovo offre una configurazione tradizionale che valorizza ogni posto. La disponibilità è limitata rispetto ad altri venue, rendendo ogni scelta importante per l'esperienza.",
        bullets: [
          "Platea centrale: esperienza immersiva, contatto visivo diretto con l'artista",
          "Palchi laterali: prospettiva d'insieme, atmosfera più privata",
          "Galleria: esperienza tradizionale, buon rapporto qualità/prezzo",
          "Loggione: posizione elevata, acustica ottimale per l'ascolto"
        ]
      },
      artistContext: {
        title: "Il contesto: Renga e l'arte dell'interpretazione",
        paragraphs: [
          "Francesco Renga non è solo un cantante, è un interprete. La sua carriera è stata segnata da una capacità unica di trasformare ogni canzone in un momento di pura comunicazione emotiva. Dalle prime esperienze ai grandi successi, Renga ha sempre mantenuto una coerenza artistica basata sull'autenticità e sulla voce come strumento principale.",
          "Questo tour teatrale rappresenta una scelta precisa: avvicinare la musica al suo aspetto più intimo. Non uno spettacolo pirotecnico, ma una conversazione musicale in cui ogni brano diventa un dialogo con il pubblico. La scaletta è pensata per creare un percorso emotivo, alternando momenti di grande intensità a passaggi più raccolti e riflessivi."
        ],
        bullets: [
          "Repertorio: mix tra successi come 'Angelo', 'Meraviglioso' e brani più recenti",
          "Produzione: essenziale, focalizzata sulla voce e sull'interpretazione",
          "Format: concerto acustico con arrangiamenti teatrali",
          "Durata: circa 75 minuti di musica pura, senza interruzioni"
        ]
      },
      location: {
        title: "Teatro Nuovo di Spoleto: dove la musica diventa teatro",
        venueType: "Teatro storico, cuore culturale di Spoleto, venue polifunzionale",
        experience: "Il Teatro Nuovo è l'essenza stessa dello spazio teatrale umbro. Non è una grande cattedrale del suono, ma una camera musicale intima dove ogni nota trova il suo spazio naturale. L'architettura a ferro di cavallo crea una vicinanza fisica ed emotiva tra artista e pubblico, trasformando il concerto in un'esperienza quasi privata. Qui la musica non si esegue, si condivide.",
        suitability: "Perfetto per Francesco Renga perché il Teatro Nuovo è stato concepito per valorizzare la voce e l'interpretazione. Le sue canzoni, cariche di introspezione e intensità emotiva, trovano in questo spazio la cornice ideale: un ambiente che non disperde l'emozione ma la concentra, amplificando ogni sfumatura vocale e ogni parola. È il luogo ideale per un artista che vuole comunicare più che esibirsi.",
        atmosphere: "L'atmosfera al Teatro Nuovo è di concentrazione sacra. Il pubblico spoletino è educato all'ascolto, capace di creare un silenzio totale durante i brani più intensi e di esplodere in applausi sinceri nei momenti clou. Non c'è la distanza informale del palazzetto, ma una vicinanza rispettosa che trasforma ogni concerto in un evento culturale. Il teatro diventa un'unica anima che respira insieme all'artista.",
        paragraphs: [
          "Il Teatro Nuovo non è solo un venue di Spoleto, è parte della sua identità culturale. Ha visto stagioni teatrali importanti, concerti di artisti nazionali, eventi che hanno segnato la vita culturale della città. Ogni sedia, ogni angolo, ogni palco porta con sé le echo di decenni di applausi e di emozioni.",
          "Per un artista come Francesco Renga, suonare al Teatro Nuovo significa scegliere un pubblico che sa ascoltare. Spoleto ha una tradizione culturale profonda, una sensibilità per le arti che rende questo pubblico unico. Qui le sue canzoni non vengono solo ascoltate, ma comprese nel loro significato più profondo. È un dialogo che va oltre la musica, diventa esperienza condivisa."
        ],
        bullets: [
          "Acustica: eccellente, progettata per voce e musica dal vivo",
          "Capacità: circa 800 posti, dimensione ideale per concerti intimi",
          "Architettura: tradizionale ferro di cavallo, visuale ottimale da ogni settore",
          "Posizione: centro storico di Spoleto, facilmente raggiungibile a piedi"
        ],
        locationImage: "https://ticketitalia.com/image/cache/wp/gj/Luoghi%20banner/344506502072015142421_galleriamedia1-1400x300.webp",
        nearbyParking: [
          { name: "Parcheggio della Posterna", distanceOnFoot: "10 min a piedi", type: "a pagamento", notes: "454 posti, €1,20/ora. Tapis roulant sotterraneo con uscita nei pressi del Teatro Nuovo", mapsUrl: "https://maps.google.com/?q=Parcheggio+Posterna+Spoleto" },
          { name: "Parcheggio Spoletosfera", distanceOnFoot: "15 min a piedi", type: "a pagamento", notes: "414 posti coperti, aperto 24h su 24. Raggiungibile da Viale dei Cappuccini", mapsUrl: "https://maps.google.com/?q=Parcheggio+Spoletosfera+Spoleto" },
          { name: "Parcheggio Pian di Boccio", distanceOnFoot: "20 min a piedi", type: "gratuito", notes: "Parcheggio gratuito nel weekend, collegato al centro storico", mapsUrl: "https://maps.google.com/?q=Pian+di+Boccio+Spoleto+parcheggio" },
        ],
        nearbyHotels: [
          { name: "Hotel San Luca", distanceOnFoot: "10 min a piedi", priceRange: "€€", bookingUrl: "https://www.hotelsanluca.com/", images: ["https://cdn.blastness.biz/media/1007/top/thumbs/full/1600-drone2.jpg", "https://cdn.blastness.biz/media/1007/gallery/thumbs/full/1024_Cortile-2.jpg", "https://cdn.blastness.biz/media/1007/Gallery-Camere/thumbs/full/1024_CAMERA_01.jpg"] },
          { name: "Hotel dei Duchi", distanceOnFoot: "8 min a piedi", priceRange: "€€", bookingUrl: "https://www.hoteldeiduchi.com/", images: ["https://cdn.blastness.biz/media/617/top/thumbs/full/1600-hall2.jpg", "https://cdn.blastness.biz/media/617/gallery/thumbs/full/1024-suite4.jpg", "https://cdn.blastness.biz/media/617/thumbs/full/01_Giardino.jpg"] },
          { name: "Boutique Hotel Aurora & Private Spa", distanceOnFoot: "5 min a piedi", priceRange: "€€", bookingUrl: "https://www.hotelauroraspoleto.it/", images: ["https://hotelaurora.etruriacollection.com/wp-content/uploads/2026/03/Suite_HOTEL-AURORA-56.jpg", "https://hotelaurora.etruriacollection.com/wp-content/uploads/2026/03/JuniorSuite_HOTEL-AURORA-88.jpg", "https://hotelaurora.etruriacollection.com/wp-content/uploads/2026/03/Superior_HOTEL-AURORA-61.jpg"] },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dal concerto",
        paragraphs: [
          "Il concerto di Francesco Renga al Teatro Nuovo sarà un'esperienza di pura intensità vocale. La sua voce, potente e delicata allo stesso tempo, riempirà lo spazio teatrale creando momenti di grande impatto emotivo. Non aspettarti uno spettacolo coreografico, ma una serata in cui la musica è l'unica protagonista.",
          "L'atmosfera sarà di totale concentrazione. I concerti teatrali di Renga creano un'energia particolare: fatta di ascolto attento, partecipazione emotiva, applausi composti ma sentiti. Sarà una serata in cui il tempo sembra rallentare, in cui ogni canzone diventa un momento di riflessione personale per chi ascolta."
        ],
        bullets: [
          "Produzione: essenziale, luce calda e focus totale sull'artista",
          "Momenti chiave: i brani più intensi che creano silenzio totale, i successi che generano cori spontanei",
          "Interazione: Renga parla al pubblico, crea intimità tra una canzone e l'altra",
          "Finale: chiusura emotiva con i brani più rappresentativi del suo percorso"
        ]
      },
      practicalInfo: {
        title: "Informazioni utili",
        paragraphs: [
          "Vivere un concerto al Teatro Nuovo richiede rispetto per il luogo e per l'arte. Il teatro ha regole precise che non sono formalismi, ma parte dell'esperienza che rende ogni serata speciale."
        ],
        bullets: [
          "Orario inizio: 21:00, consiglia arrivare 30 minuti prima",
          "Accessibilità: teatro completamente accessibile, posti dedicati disponibili",
          "Servizi: bar interno aperto prima e dopo lo spettacolo",
          "Regole: divieto foto e video durante il concerto, telefoni in modalità silenziosa"
        ]
      },
      sections: [
        {
          heading: "Perché è un concerto da non perdere",
          paragraphs: [
            "Francesco Renga non è un artista che si esibisce spesso in teatri. I suoi concerti in contesti teatrali sono eventi rari, appuntamenti che meritano di essere vissuti. La sua capacità di unire intensità e delicatezza, di parlare direttamente al cuore attraverso canzoni che sono diventate parte della colonna sonora italiana, rende questo concerto un'occasione unica.",
          ],
          bullets: ["Non solo musica, ma pura interpretazione teatrale.", "Un'opportunità per ascoltare la voce italiana nella sua massima espressione.", "L'atmosfera unica del teatro che eleva ogni emozione."]
        },
      ],
      cta: {
        title: "Non perdere il concerto di Francesco Renga a Spoleto",
        text: "I biglietti per il concerto di Francesco Renga al Teatro Nuovo sono disponibili su Ticket Italia. Scegli il tuo posto e assicurati un'esperienza musicale indimenticabile.",
        label: "Acquista biglietti su Ticket Italia",
        href: "https://ticketitalia.com/francesco-renga-teatro-nuovo-spoleto-29-settembre-2026"
      }
    },
  },
  {
    slug: "salmo-perugia-2026-umbria-che-spacca-biglietti",
    title: "Salmo a Perugia (Umbria Che Spacca): data, biglietti e informazioni sull'evento",
    excerpt: "Salmo sarà tra i protagonisti di Umbria Che Spacca a Perugia il 26 giugno 2026. Uno degli appuntamenti più attesi del festival.",
    category: "Eventi & Festival",
    categorySlug: "eventi-festival",
    subcategory: "Festival musicali",
    subcategorySlug: "festival-musicali",
    type: "evento",
    status: "published",
    tags: ["Salmo", "Perugia", "Umbria Che Spacca", "Festival", "Rap"],
    date: "2026-04-24",
    readTime: "6 min",
    author: "Redazione Ticket Italia",
    featured: true,
    image: "/salmo-san-siro-06-07-2022-arianna-carotta-8.webp",
    body: {
      intro: "Salmo approda a Umbria Che Spacca per portare il suo rap energico e visionario nel cuore verde dell'Umbria, un concerto che promette di trasformare i Giardini del Frontone in un'arena di pura adrenalina musicale.",
      quickInfo: {
        title: "Informazioni rapide",
        text: "Salmo è uno dei headliner di Umbria Che Spacca 2026, un concerto che unisce la potenza del rap italiano con l'atmosfera unica di un festival estivo nel cuore di Perugia.",
        bullets: [
          "Artista: Salmo, il visionario del rap italiano",
          "Location: Giardini del Frontone, Perugia",
          "Data: 26 giugno 2026",
          "Evento: Umbria Che Spacca Festival",
          "Atmosfera: Energica, partecipativa, estiva"
        ]
      },
      tickets: {
        title: "Biglietti e accessi",
        text: "I biglietti per Umbria Che Spacca danno accesso a tutta la giornata festival, con Salmo come uno degli artisti principali. La disponibilità è limitata e tende a esaurirsi rapidamente per gli artisti più richiesti.",
        bullets: [
          "Abbonamento giornata: accesso a tutti gli artisti del 26 giugno",
          "Early bird: prezzo ridotto per acquisti anticipati",
          "VIP: area dedicata con servizi esclusivi",
          "Studenti: sconti speciali con documentazione valida"
        ]
      },
      artistContext: {
        title: "Il contesto: Salmo e l'evoluzione del rap italiano",
        paragraphs: [
          "Salmo non è solo un rapper, è un architetto di suoni e visioni. La sua carriera ha ridefinito le possibilità del rap italiano, portandolo da nicchia underground a fenomeno mainstream senza perdere l'autenticità e la sperimentazione. Ogni album è un capitolo di una ricerca artistica che unisce suoni duri, testi complessi e una produzione che sfida i confini del genere.",
          "Il suo live è un'estensione naturale di questa visione: non solo un concerto, ma un'esperienza immersiva dove la musica diventa ambiente. Salmo trasforma il palco in uno spazio cinematografico, dove ogni beat è un'onda d'urto e ogni rima un colpo scenico. In un contesto festival come Umbria Che Spacca, questa energia si moltiplica, creando un momento di pura connessione collettiva."
        ],
        bullets: [
          "Repertorio: mix tra classici come 'La canzone nostra', 'Il diavolo non c'è' e brani recenti",
          "Produzione: scenografia potente, effetti visual, suono immersivo",
          "Ospiti: possibili collaborazioni a sorpresa durante il set",
          "Durata: circa 90 minuti di concerto ad alta energia"
        ]
      },
      location: {
        title: "Giardini del Frontone: l'anima verde di Perugia",
        venueType: "Giardini storici all'aperto, location iconica di Perugia per eventi estivi",
        experience: "I Giardini del Frontone sono molto più di un semplice parco: sono il polmone verde e culturale di Perugia. Situati nel cuore della città, questi giardini storici si trasformano d'estate in un'anfiteatro naturale dove la musica e l'architettura urbana si fondono. L'atmosfera è unica: il verde degli alberi fa da cornice ai suoni, le mura storiche creano acustica naturale, il centro città palpita a pochi metri di distanza.",
        suitability: "Perfetto per Salmo perché i Giardini del Frontone offrono lo spazio aperto e la libertà che il suo rap richiede. A differenza dei venue chiusi, qui l'energia può espandersi senza limiti, il pubblico può muoversi, ballare, partecipare attivamente. La location permette di creare un'esperienza che non è solo ascolto, ma totale immersione nell'energia del festival. È il luogo ideale per un artista che vuole sfondare le barriere tra palco e pubblico.",
        atmosphere: "L'atmosfera ai Giardini del Frontone durante Umbria Che Spacca è elettrica. Il pubblico perugino è famoso per la sua passione per la musica live, per la capacità di creare energia collettiva. Non c'è la formalità del teatro o la struttura del palazzetto, ma una libertà contagiante: il prato diventa dancefloor, le colline naturali diventano gradinate, il cielo diventa il soffitto del concerto. È un'atmosfera da vero festival, dove ogni persona è parte dello spettacolo.",
        paragraphs: [
          "I Giardini del Frontone non sono solo una location, sono un simbolo di Perugia. Hanno visto concerti leggendari, eventi culturali importanti, momenti che hanno segnato la vita musicale della città. Ogni prato, ogni albero, ogni angolo porta con sé le echo di decenni di musica e di festa. È un luogo che ha memoria sonora.",
          "Per un artista come Salmo, suonare qui significa scegliere un pubblico che vive la musica con passione e senza filtri. Perugia ha una tradizione musicale profonda, una scena musicale viva, un pubblico che non si limita ad ascoltare ma partecipa. Qui il rap di Salmo non viene solo eseguito, viene vissuto, assorbito, amplificato dall'energia collettiva. È un dialogo che diventa festa."
        ],
        bullets: [
          "Acustica: naturale amplificazione data dalle colline e dalle mura storiche",
          "Capacità: circa 15.000 persone, dimensione ideale per festival energici",
          "Posizione: centro storico di Perugia, facilmente raggiungibile a piedi",
          "Atmosfera: informale, partecipativa, tipica dei festival estivi italiani"
        ],
        locationImage: "https://ticketitalia.com/image/cache/wp/gj/Luoghi%20banner/Giardini%20del%20Frontone%20Perugia%20(1)-1400x300.webp",
        nearbyParking: [
          { name: "Parcheggio Piazza Partigiani", distanceOnFoot: "10 min a piedi", type: "a pagamento", notes: "Parcheggio custodito con scale mobili verso il centro storico", mapsUrl: "https://maps.google.com/?q=Parcheggio+Piazza+Partigiani+Perugia" },
          { name: "Parcheggio Piazzale Europa", distanceOnFoot: "12 min a piedi", type: "a pagamento", notes: "Parcheggio custodito con scale mobili, vicino agli accessi principali al centro", mapsUrl: "https://maps.google.com/?q=Parcheggio+Piazzale+Europa+Perugia" },
          { name: "Parcheggio Mercato Coperto (Via del Mercato)", distanceOnFoot: "8 min a piedi", type: "a pagamento", notes: "Parcheggio con ascensore, posizione comoda per raggiungere i Giardini del Frontone", mapsUrl: "https://maps.google.com/?q=Parcheggio+Mercato+Coperto+Perugia" },
        ],
        nearbyHotels: [
          { name: "Sina Brufani", distanceOnFoot: "5 min a piedi", priceRange: "€€€", bookingUrl: "https://www.sinahotels.com/it/h/brufani-palace-perugia/", images: ["https://www.sinahotels.com/assets/uploads/Immagini-Definitive/Brufani/HOME-HOTEL/Stairs-Brufani-Perugia.jpg", "https://www.sinahotels.com/assets/uploads/hotels/brufani/Lobby-Brufani-Palace-Hotel-Perugia-Italy.jpg", "https://www.sinahotels.com/assets/uploads/Immagini-Definitive/Brufani/M-Barro/Sina-Brufani-Facciata.jpg"] },
          { name: "Sangallo Palace Hotel", distanceOnFoot: "5 min a piedi", priceRange: "€€", bookingUrl: "https://www.sangallopalace.it/", images: ["https://www.sangallo.it/images/hotel-perugia-01.jpg", "https://www.sangallo.it/images/superior-rooms-01.jpg", "https://www.sangallo.it/images/pool.jpg"] },
          { name: "Chocohotel", distanceOnFoot: "20 min a piedi", priceRange: "€", bookingUrl: "https://www.chocohotel.it/", images: ["https://www.chocohotel.it/source/index-1.jpg", "https://www.chocohotel.it/source/index-2.jpg", "https://www.chocohotel.it/source/index-chocostore.jpg"] },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dal concerto",
        paragraphs: [
          "Il concerto di Salmo a Umbria Che Spacca sarà un'esperienza di pura energia. La sua musica, già potente in studio, diventa devastante dal vivo: bassi che fanno tremare il terreno, beat che entrano nel petto, rime che volano come proiettili. Non aspettarti un concerto sedato, ma una serata in cui l'adrenalina è la protagonista.",
          "L'energia del pubblico sarà fondamentale. I concerti di Salmo creano un'atmosfera particolare: fatta di salti, cori, mani alzate, energia pura. In un contesto festival come questo, l'effetto si moltiplica. Sarà una serata in cui le barriere tra artista e pubblico svaniscono, in cui ogni persona diventa parte dello spettacolo, in cui la musica diventa forza collettiva."
        ],
        bullets: [
          "Produzione: potente, con luci, effetti speciali, suono ad alta definizione",
          "Momenti chiave: i brani più famosi che scatenano il pubblico, le sperimentazioni più dure",
          "Interazione: Salmo crea connessione diretta con il pubblico, chiama alla partecipazione",
          "Finale: chiusura esplosiva con i brani più energici del repertorio"
        ]
      },
      practicalInfo: {
        title: "Informazioni utili",
        paragraphs: [
          "Partecipare a Umbria Che Spacca richiede organizzazione. È un festival, non un concerto tradizionale: ci sono orari da rispettare, servizi da conoscere, regole da seguire per vivere al meglio l'esperienza."
        ],
        bullets: [
          "Orari: cancelli aperti dal primo pomeriggio, concerto Salmo in serata",
          "Servizi: aree ristoro, bar, punti ristoro distribuiti nei giardini",
          "Accessibilità: area dedicata per disabili, percorsi accessibili",
          "Regole: divieto di bottiglie di vetro, controlli all'ingresso, policy ufficiale sul sito"
        ]
      },
      sections: [
        {
          heading: "Perché è un appuntamento da non perdere",
          paragraphs: [
            "Salmo non è un artista che si esibisce spesso in festival di questa dimensione. Il suo live a Umbria Che Spacca rappresenta un'occasione rara per vedere uno dei più importanti artisti rap italiani in un contesto che amplifica la sua energia. La sua capacità di unire sperimentazione e accessibilità, di creare musica che è sia arte che festa, rende questo concerto un evento imperdibile.",
          ],
          bullets: ["Non solo rap, ma un'esperienza musicale totale.", "Un'opportunità per vivere l'energia del festival umbro.", "L'atmosfera unica dei Giardini del Frontone che eleva ogni concerto."]
        },
      ],
      cta: {
        title: "Non perdere Salmo a Umbria Che Spacca",
        text: "I biglietti per Umbria Che Spacca con Salmo sono disponibili su Ticket Italia. Assicurati il tuo posto per uno dei concerti più attesi dell'estate umbra.",
        label: "Acquista biglietti su Ticket Italia",
        href: "https://ticketitalia.com/salmo-giardini-del-frontone-perugia-umbria-che-spacca-26-giugno-2026"
      }
    },
  },
  {
    slug: "ermal-meta-perugia-2026-biglietti-afterlife-live-club",
    title: "Ermal Meta a Perugia 2026: biglietti Afterlife Live Club",
    excerpt: "Ermal Meta in concerto all'Afterlife Live Club di Perugia il 29 aprile 2026. Biglietti da €49, info venue e come arrivare per il live più atteso dell'anno.",
    category: "Concerti",
    categorySlug: "concerti",
    subcategory: "Pop",
    subcategorySlug: "pop",
    type: "evento",
    status: "published",
    publishedAt: "2026-04-18",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["ermal meta", "biglietti ermal meta", "afterlife live club", "concerti perugia 2026", "ermal meta perugia", "concerti aprile 2026", "ermal meta tour 2026"],
    date: "2026-04-18",
    readTime: "8 min",
    author: "Redazione Ticket Italia",
    image: "/images/ermal_ansa.avif",
    body: {
      intro: "Ermal Meta arriva a Perugia per un concerto imperdibile: martedì 29 aprile 2026, l'Afterlife Live Club ospita una delle voci più apprezzate del pop italiano. I biglietti partono da €49 e promettono una serata intima in una venue da 575 mq — pochi metri dal palco, nessun filtro tra te e l'artista.",

      quickInfo: {
        title: "Informazioni rapide",
        text: "Ermal Meta live all'Afterlife Live Club di Perugia: una serata a contatto ravvicinato con l'artista in uno dei club più attrezzati dell'Umbria.",
        bullets: [
          "Artista: Ermal Meta, cantautore vincitore di Sanremo 2018",
          "Location: Afterlife Live Club, Balanzano – Perugia (PG)",
          "Data: mercoledì 29 aprile 2026, ore 21:00",
          "Biglietto: Posto Unico Intero €49,00 (€52,43 con commissioni)",
          "Capienza: venue da 575 mq, posti limitati",
          "Organizzatore: MEA Concerti srl",
        ],
      },

      tickets: {
        title: "Biglietti Ermal Meta Perugia — prezzi e come acquistare",
        text: "Per questa data è previsto un unico settore non numerato: libertà di movimento e possibilità di sceglierti la posizione migliore una volta dentro. Il prezzo base è €49,00, che diventa €52,43 con le commissioni di prevendita. Il biglietto è elettronico — ricevi un PDF via email e mostri il QR code all'ingresso. Data la capienza limitata, acquisto anticipato consigliato.",
        bullets: [
          "Posto Unico Intero: €49,00 (prezzo base)",
          "Totale con commissioni: €52,43",
          "Formato: biglietto elettronico PDF consegnato via email",
          "Accesso: QR code da smartphone, stampa non necessaria",
          "Capienza limitata: venue da 575 mq, esaurimento rapido",
          "Disabili: scrivere a dsb@musicaeventiautore.com con certificato allegato",
        ],
      },

      artistContext: {
        title: "Ermal Meta: la storia di un cantautore che scrive per non dimenticare",
        paragraphs: [
          "Ermal Meta nasce nel 1986 a Fier, in Albania. Arriva in Italia da adolescente portando con sé una lingua che stava ancora imparando e una determinazione che non ha mai smesso di crescere. La musica diventa il suo italiano più fluente: un codice per raccontare il distacco, l'adattamento, la ricerca di appartenenza.",
          "Prima con La Fame di Camilla — la band con cui esordisce sulla scena romana degli anni Duemila — poi la svolta solista nel 2015. Due anni dopo, 'Vietato Morire' consolida la sua voce come una delle più autorevoli della canzone d'autore italiana. Al Sanremo 2016 arriva secondo con 'Odio le favole'. Nel 2018 vince con Fabrizio Moro 'Non mi avete fatto niente', scritto dopo gli attentati terroristici in Europa.",
          "Il tour teatrale che ha preceduto queste date club ha registrato sold out in tutta Italia, con una formula insolita: i concerti erano pensati come performance narrative, con Ermal che intrecciava racconti personali alle canzoni. Il passaggio ai club non è un passo indietro — è un cambio di angolazione, un avvicinarsi ulteriore al pubblico.",
        ],
        bullets: [
          "Nato nel 1986 a Fier, Albania — in Italia da adolescente",
          "Esordio con La Fame di Camilla, poi carriera solista dal 2015",
          "Sanremo 2016: secondo classificato con 'Odio le favole'",
          "Sanremo 2018: vincitore con Fabrizio Moro, 'Non mi avete fatto niente'",
          "Tour teatrale precedente: sold out in tutta Italia",
        ],
      },

      location: {
        title: "Afterlife Live Club: 575 metri quadri dove la musica non ha vie di fuga",
        venueType: "Club di musica dal vivo progettato specificamente per concerti, venue moderna su unico piano",
        experience: "L'Afterlife Live Club di Balanzano è uno spazio costruito con una sola idea in testa: che tra il palco e il pubblico non ci sia niente di superfluo. Niente balconate, niente piani sopraelevati, niente colonne che spezzano la visuale. Un unico piano di 575 mq dove il suono rimbalza in modo diretto.",
        suitability: "Per Ermal Meta — che nei club torna deliberatamente dopo i teatri — questo tipo di venue è la scelta più coerente con la sua formula live. Il palco di 6×8 metri offre spazio sufficiente per una produzione professionale, ma non così tanto da creare quella distanza inevitabile nelle arene.",
        atmosphere: "La serata all'Afterlife ha una qualità specifica: ci si trova in un luogo che non ha la solennità di un teatro né la dispersione di uno stadio. L'ambiente raccolto fa sì che l'energia del pubblico si concentri e si amplifichi, che i cori diventino qualcosa di fisicamente percepibile.",
        paragraphs: [
          "L'Afterlife Live Club si trova a Balanzano, frazione di Perugia, in posizione strategica vicino al raccordo autostradale: non è un locale nascosto nel centro storico, ma una struttura pensata per essere raggiunta anche da chi viene da fuori città.",
          "La suddivisione in due zone con arredi diversi permette a chi vuole stare sotto il palco di viversi il concerto in modo frontale e fisico, e a chi preferisce una prospettiva più distaccata di seguire comunque tutto senza perdere la qualità del suono. La corte esterna completa l'esperienza: punto di ritrovo pre-concerto e luogo dove si finisce a parlare con gli altri alla fine.",
        ],
        bullets: [
          "Superficie: ~575 mq su unico piano, nessuna barriera visiva",
          "Palco: 6×8 metri con impianto audio, luci e video professionale",
          "Disposizione: due zone con allestimenti distinti (area palco + zona lounge)",
          "Corte esterna: disponibile per ritrovo pre/post concerto",
          "Accessibilità: vicino al raccordo autostradale di Perugia, ampio parcheggio",
          "Indirizzo: Balanzano, Perugia (PG)",
        ],
        locationImage: "https://www.umbriafilmcommission.com/wp-content/uploads/2021/10/6171274fb2039-640x400.jpg",
        nearbyParking: [
          { name: "Parcheggio zona industriale Balanzano (area esterna venue)", distanceOnFoot: "0 min a piedi", type: "gratuito", notes: "Ampio parcheggio privato annesso al locale, capienza elevata", mapsUrl: "https://maps.google.com/?q=Afterlife+Live+Club+Balanzano+Perugia" },
          { name: "Parcheggio P+R Ponte San Giovanni", distanceOnFoot: "15 min a piedi", type: "gratuito", notes: "Parcheggio di interscambio vicino alla stazione, con navetta per il centro", mapsUrl: "https://maps.google.com/?q=Parcheggio+Ponte+San+Giovanni+Perugia" },
          { name: "Parcheggio Via della Gomma (strada pubblica)", distanceOnFoot: "2 min a piedi", type: "gratuito", notes: "Posti lungo la strada nella zona industriale, disponibili la sera", mapsUrl: "https://maps.google.com/?q=Via+della+Gomma+Balanzano+Perugia" },
        ],
        nearbyHotels: [
          { name: "Perugia Park Hotel", distanceOnFoot: "20 min in auto", priceRange: "€€", bookingUrl: "https://www.perugiapark.it/", images: ["https://static.perugiaparkhotel.com/static/3a81ffbfc24f07ae8d8d9e7be493f175/204db/3237360b-a91e-4c5d-b0cc-25b0a472ecac.jpg", "https://static.perugiaparkhotel.com/static/b58184a53bad9ab3f0d05b8da455f076/23109/1561ae31-c2da-44b9-8323-7fe1582ebec4.jpg", "https://static.perugiaparkhotel.com/static/747a8de09ca61de0daed25544978d6cf/23109/85f87246-8d04-457b-8a35-ec4c2682f6e8.jpg"] },
          { name: "Posta Donini 1579 – UNA Esperienze", distanceOnFoot: "15 min in auto", priceRange: "€€€", bookingUrl: "https://www.unahotels.it/hotel/una-esperienze-posta-donini-1579/", images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe2e2?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80"] },
          { name: "Chocohotel Perugia", distanceOnFoot: "20 min in auto", priceRange: "€€", bookingUrl: "https://www.chocohotel.it/", images: ["https://www.chocohotel.it/source/index-1.jpg", "https://www.chocohotel.it/source/index-2.jpg", "https://www.chocohotel.it/source/index-chocostore.jpg"] },
        ],
      },

      liveExperience: {
        title: "Cosa aspettarsi dalla serata",
        paragraphs: [
          "Ermal Meta nei club non è Ermal Meta nei teatri. La formula cambia: i concerti sono pensati per una dimensione più diretta ed energica, con meno spazio per le pause meditative e più spazio per la connessione immediata. Il repertorio attinge agli album più amati, con i brani più cantabili che diventano collettivi in uno spazio così piccolo.",
          "La dimensione narrativa che ha caratterizzato il tour teatrale non scompare del tutto — Ermal Meta è un cantautore che usa le parole anche fuori dalle canzoni — ma si mescola con un'energia diversa, quella del club, dove il confine tra palco e platea è sottile. Portarsi i testi a memoria è un vantaggio: in uno spazio di 575 mq, cantare insieme all'artista non è una metafora.",
        ],
        bullets: [
          "Repertorio: brani dall'intera carriera solista, focus sui pezzi più cantati",
          "Formato: live diretto ed energico, diverso dalla formula narrativa teatrale",
          "Capienza ridotta: ogni posto è buono, distanza massima dal palco limitata",
          "Durata attesa: circa 90 minuti di concerto",
        ],
      },

      practicalInfo: {
        title: "Come arrivare e informazioni pratiche",
        paragraphs: [
          "L'Afterlife Live Club si trova a Balanzano, raggiungibile facilmente dall'uscita del raccordo autostradale di Perugia. Per chi arriva in auto è la soluzione più comoda: il locale è pensato anche per l'accesso con mezzi pesanti, quindi il parcheggio non è un problema. Chi viene da Roma o Firenze può prendere l'E45 e seguire le indicazioni per Balanzano.",
          "I biglietti sono esclusivamente elettronici: nessuna stampa richiesta, basta avere il PDF sul telefono e mostrare il QR code ai controlli. Le porte aprono solitamente 60-90 minuti prima dello show. Per informazioni sull'accessibilità per persone con disabilità, contattare in anticipo dsb@musicaeventiautore.com allegando il certificato di invalidità.",
        ],
        bullets: [
          "Venue: Afterlife Live Club, Balanzano – Perugia (PG)",
          "Inizio concerto: ore 21:00 del 29 aprile 2026",
          "Come arrivare: uscita raccordo autostradale di Perugia, indicazioni Balanzano",
          "Parcheggio: disponibile nei pressi del locale",
          "Biglietti: solo formato elettronico PDF, scansione QR code da smartphone",
          "Disabili: scrivere a dsb@musicaeventiautore.com con certificato allegato",
        ],
      },

      internalLinks: [
        {
          label: "Salmo a Perugia 2026 – Umbria Che Spacca",
          href: "/articoli/salmo-perugia-2026-umbria-che-spacca-biglietti",
          description: "Un altro grande concerto in Umbria nella primavera 2026: biglietti e info per lo show di Salmo.",
        },
        {
          label: "Francesco Renga a Spoleto 2026",
          href: "/articoli/francesco-renga-spoleto-2026-biglietti-teatro-nuovo",
          description: "Altro cantautore italiano in scena in Umbria: tutto su biglietti e venue per Renga a Spoleto.",
        },
      ],

      sections: [
        {
          heading: "Dal teatro al club: perché questa data è diversa dalle altre",
          paragraphs: [
            "Negli ultimi anni Ermal Meta ha costruito una reputazione live che va oltre la semplice esecuzione del repertorio. Il tour teatrale che lo ha preceduto aveva una struttura deliberata: i concerti funzionavano come performance narrative, dove le canzoni erano intervallate da racconti. Una formula insolita per la musica pop italiana, più vicina a certe tradizioni del teatro canzone che al concerto-prodotto standard.",
            "Il passaggio ai club segna un cambio di registro. Non una perdita di qualità né una marcia indietro, ma una diversa intenzione: avvicinarsi fisicamente al pubblico, togliere la mediazione del grande palco, lavorare con l'energia grezza che solo uno spazio piccolo sa generare. Per chi ha già visto Ermal Meta nei teatri, questa è un'occasione di scoprire una versione diversa dello stesso artista.",
          ],
        },
        {
          heading: "Perché Perugia e l'Umbria nel circuito dei club nazionali",
          paragraphs: [
            "L'Umbria non è storicamente la prima regione che viene in mente quando si parla di circuito dei club musicali italiani. Milano, Bologna, Roma e Firenze monopolizzano la maggior parte delle date dei tour nei locali. Che Ermal Meta abbia inserito Perugia nel percorso del tour non è un dettaglio marginale: significa che l'Afterlife Live Club è entrato nel radar degli organizzatori nazionali.",
            "La scelta di Balanzano come tappa umbra del tour conferma una tendenza degli ultimi anni: la crescita di venue specializzate fuori dai capoluoghi tradizionali, in grado di attrarre artisti di livello nazionale senza richiedere agli spettatori il viaggio verso le grandi città.",
          ],
        },
      ],

      faq: [
        {
          question: "Dove si trova l'Afterlife Live Club?",
          answer: "L'Afterlife Live Club si trova a Balanzano, una frazione di Perugia (PG), vicino al raccordo autostradale. È facilmente raggiungibile in auto da tutta la regione.",
        },
        {
          question: "Quanto costano i biglietti per Ermal Meta a Perugia?",
          answer: "Il biglietto è a Posto Unico Intero al prezzo di €49,00. Con le commissioni di prevendita il totale è di €52,43. Non ci sono settori numerati: l'ingresso è libero all'interno del locale.",
        },
        {
          question: "Come ricevo il biglietto dopo l'acquisto?",
          answer: "Il biglietto viene consegnato in formato PDF via email. All'ingresso basta mostrare il QR code dallo smartphone: non è necessario stampare nulla.",
        },
        {
          question: "A che ora inizia il concerto?",
          answer: "L'inizio del concerto è fissato per le ore 21:00 del 29 aprile 2026. L'orario di apertura porte non è ancora stato comunicato ufficialmente, ma solitamente i club aprono 60-90 minuti prima dello show.",
        },
        {
          question: "Ci sono agevolazioni per persone con disabilità?",
          answer: "Sì. Per informazioni sui biglietti riservati a persone con disabilità, contattare dsb@musicaeventiautore.com allegando il certificato di invalidità.",
        },
      ],

      cta: {
        title: "Acquista i biglietti per Ermal Meta a Perugia",
        text: "I posti all'Afterlife Live Club sono limitati dalla capienza della venue. Acquista il biglietto ora su Ticket Italia e assicurati il tuo posto per una delle serate live più intense dell'aprile 2026.",
        label: "Acquista su Ticket Italia",
        href: "https://ticketitalia.com/ermal-meta-afterlife-live-club-perugia-29-aprile-2026",
      },
    },
  },
  {
    slug: "pooh-stadio-checcarini-marsciano-2026",
    title: "Pooh a Marsciano 2026: biglietti e info Stadio Checcarini",
    excerpt:
      "I Pooh il 10 luglio 2026 allo Stadio Alberto Checcarini di Marsciano (PG): data zero del tour estivo \"60 - La nostra storia\". Biglietti da €74,90 (prezzo finale al checkout), info venue, parcheggi e hotel.",
    category: "Concerti",
    categorySlug: "concerti",
    subcategory: "Pop",
    subcategorySlug: "pop",
    type: "evento",
    status: "published",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["pooh marsciano", "biglietti pooh", "stadio checcarini", "concerti umbria luglio 2026", "pooh 60 la nostra storia", "musica per i borghi"],
    date: "2026-04-23",
    readTime: "8 min",
    author: "Redazione Ticket Italia",
    image: "https://ticketitalia.com/image/cache/wp/ge/EliteAgency/pooh%202026-1500x1500.webp",
    body: {
      intro:
        "I Pooh il 10 luglio 2026 allo Stadio Alberto Checcarini di Marsciano (PG): è la data zero del tour estivo \"60 - La nostra storia\", parte della rassegna Musica per i Borghi. Biglietti da €74,90 (prezzo finale al checkout, commissioni incluse) — alta domanda, acquisto anticipato consigliato.",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Pooh in concerto allo Stadio Alberto Checcarini di Marsciano per la data zero del tour estivo 2026. Stadio comunale a cielo aperto, capienza concerti circa 3.500 posti tra parterre e tribune.",
        bullets: [
          "Artista: Pooh — tour \"60 - La nostra storia - Estate\" (data zero)",
          "Location: Stadio Alberto Checcarini, Via Salita Biscarini, Marsciano (PG)",
          "Data: venerdì 10 luglio 2026",
          "Biglietto: a partire da €74,90 (prezzo finale al checkout, commissioni incluse)",
          "Rassegna: Musica per i Borghi",
        ],
      },
      tickets: {
        title: "Biglietti Pooh Marsciano — prezzi e come acquistare",
        text:
          "I biglietti per il concerto dei Pooh allo Stadio Checcarini di Marsciano vanno da €74,90 a €101,65: tutti prezzi finali al checkout, con diritto di prevendita e commissioni di servizio già incluse. I biglietti sono in formato elettronico e vengono consegnati via email dopo l'acquisto.",
        bullets: [
          "Poltrona Laterale: €74,90 (prezzo finale al checkout)",
          "Poltrona CAT 2: €85,60 (prezzo finale al checkout)",
          "Poltrona CAT 1: €90,95 (prezzo finale al checkout)",
          "Poltronissima: €96,30 (prezzo finale al checkout)",
          "Poltronissima Gold: €101,65 (prezzo finale al checkout)",
          "Formato: biglietto elettronico PDF consegnato via email",
          "Accesso: QR code da smartphone all'ingresso",
          "Acquisto: su Ticket Italia tramite il link nel CTA in fondo all'articolo",
        ],
      },
      artistContext: {
        title: "I Pooh: sessant'anni di musica italiana",
        paragraphs: [
          "I Pooh sono la band italiana più longeva e identitaria della storia del pop nazionale. Nati nel 1966 a Bologna, hanno attraversato sei decenni di musica con una continuità rara: Roby Facchinetti, Red Canzian, Dodi Battaglia e Stefano D'Orazio (scomparso nel 2020) hanno costruito un catalogo che pochi possono vantare in Italia.",
          "Il tour estivo 2026 \"60 - La nostra storia\" celebra i sessant'anni della band. La scaletta attinge ai grandi classici — 'Uomini soli', 'Tanta voglia di lei', 'Parsifal', 'Chi fermerà la musica' — ma include anche pagine meno frequentate del repertorio. Marsciano ospita la data zero: la prima serata pubblica del tour estivo, con il pubblico delle anteprime e tutto il valore aggiunto di un debutto.",
          "Vedere i Pooh in uno stadio comunale di provincia, sotto il cielo umbro di luglio, è un'esperienza diversa rispetto alle arene metropolitane: dimensioni umane, distanza dal palco contenuta, il rituale del concerto open-air estivo come si faceva un tempo.",
        ],
        bullets: [
          "Fondati nel 1966 a Bologna, sessant'anni di carriera",
          "Roby Facchinetti (voce e tastiere), Red Canzian (basso e voce), Dodi Battaglia (chitarra e voce)",
          "Successi: 'Uomini soli', 'Tanta voglia di lei', 'Chi fermerà la musica', 'Parsifal'",
          "Tour estivo 2026 \"60 - La nostra storia\": data zero a Marsciano",
          "Festival ospitante: Musica per i Borghi (rassegna estiva umbra)",
        ],
      },
      location: {
        title: "Stadio Alberto Checcarini: lo stadio comunale di Marsciano",
        venueType: "Stadio comunale di calcio a cielo aperto, configurabile per concerti",
        experience:
          "Lo Stadio Alberto Checcarini è lo stadio comunale di Marsciano, struttura a cielo aperto con manto erboso naturale e pista atletica. È sede della Nestor Calcio 1904 e ogni estate viene riconfigurato per ospitare i grandi concerti della rassegna Musica per i Borghi: il prato si trasforma in parterre con palco a un'estremità, le tribune storiche si aggiungono alla capienza complessiva. Negli ultimi anni ha ospitato Il Volo, Elisa, Venditti & De Gregori e Alessandra Amoroso.",
        suitability:
          "La configurazione concertistica porta la capienza intorno ai 3.500 posti tra parterre e tribune, una dimensione raccolta rispetto alle grandi arene ma sufficiente a sostenere una produzione importante come quella dei Pooh. Per la data zero del tour 2026 questo significa atmosfera intima e visibilità ottima da tutti i settori.",
        atmosphere:
          "Concerto in stadio comunale di provincia in piena estate: cielo aperto, temperatura piacevole della sera umbra, pubblico multigenerazionale che canta ogni testo a memoria. Per i Pooh è il contesto più adatto a una scaletta che attraversa sessant'anni di musica italiana — una serata che si vive insieme, non solo si guarda.",
        paragraphs: [
          "Lo Stadio Alberto Checcarini si trova in Via Salita Biscarini, nel centro di Marsciano (PG). Marsciano è un comune collinare in posizione centrale rispetto alla provincia di Perugia, raggiungibile da Perugia in circa 30 minuti tramite la SS3bis E45 (uscita Marsciano Nord) oppure tramite la SS220 Pievaiola. Da Todi sono circa 20 minuti in auto.",
          "Lo stadio è intitolato ad Alberto Checcarini, presidente della Nestor Calcio 1904 dal 1990 al 2001. La struttura, di proprietà del Comune di Marsciano, viene utilizzata principalmente per il calcio durante l'anno e ogni estate diventa il palco principale di Musica per i Borghi, la rassegna che porta in Umbria grandi artisti italiani con un'attenzione particolare ai borghi di provincia.",
        ],
        bullets: [
          "Indirizzo: Via Salita Biscarini, 06055 Marsciano (PG)",
          "Tipo: stadio comunale di calcio con tribune e pista atletica",
          "Capienza concerti: circa 3.500 posti tra parterre e tribune",
          "Da Perugia: ~30 min via E45 (uscita Marsciano Nord) o SS220",
          "Da Todi: ~20 min in auto",
          "Gestione: Comune di Marsciano",
        ],
        locationImage:
          "https://ticketitalia.com/image/cache/wp/gj/Luoghi%20banner/244452504_6867501549942582_193726995694896856_n-1400x300.webp",
        nearbyParking: [
          {
            name: "Largo Vittime Innocenti delle Mafie (antistante l'ingresso stadio)",
            distanceOnFoot: "0 min a piedi",
            type: "gratuito",
            notes: "Area antistante l'ingresso stadio. Il Comune riserva una quota di posti per persone con disabilità durante i concerti — verificare l'ordinanza viabilità sul sito del Comune di Marsciano nei giorni precedenti l'evento.",
            mapsUrl: "https://www.google.com/maps/search/Largo+Vittime+Innocenti+delle+Mafie+Marsciano",
          },
          {
            name: "Parcheggi area Via Salita Biscarini / Via XXIV Maggio",
            distanceOnFoot: "5 min a piedi",
            type: "gratuito",
            notes: "Posti su strada nelle vie circostanti lo stadio, abitualmente utilizzati per i concerti di Musica per i Borghi. Capienza limitata: nelle sere di concerto si riempiono presto, conviene arrivare con anticipo.",
            mapsUrl: "https://www.google.com/maps/search/Stadio+Checcarini+Marsciano+parcheggio",
          },
        ],
        nearbyHotels: [
          {
            name: "Oasi Villaggio – Marsciano",
            distanceOnFoot: "5 min in auto",
            priceRange: "€€",
            bookingUrl: "https://www.oasivillaggio.com/",
          },
          {
            name: "Agriturismo Pieve del Castello – Castello delle Forme (Marsciano)",
            distanceOnFoot: "12 min in auto",
            priceRange: "€€",
            bookingUrl: "https://www.pievedelcastello.com/",
          },
          {
            name: "Torre Colombaia – Bio Agriturismo (San Biagio della Valle)",
            distanceOnFoot: "15 min in auto",
            priceRange: "€€",
            bookingUrl: "https://www.torrecolombaia.it/",
          },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dalla serata con i Pooh",
        paragraphs: [
          "La data zero di un tour porta sempre con sé un'energia particolare: la band suona davanti al pubblico la prima volta dopo le prove, l'arrangiamento e la scaletta possono ancora cambiare nelle date successive, e per chi è in stadio è l'occasione di vedere il debutto reale dello show estivo. Per i Pooh, che a Marsciano aprono il tour \"60 - La nostra storia - Estate\", questo significa un concerto carico di senso simbolico oltre che musicale.",
          "La scaletta attesa attraversa decenni di storia italiana: i grandi classici degli anni Settanta e Ottanta, gli hit degli anni Novanta come 'Uomini soli', le pagine più recenti del repertorio. Lo stadio aperto, sotto il cielo umbro di luglio, amplifica il rituale collettivo del cantare insieme — uno degli aspetti più riconoscibili dei live Pooh.",
        ],
        bullets: [
          "Data zero del tour estivo 2026: prima serata pubblica del giro",
          "Scaletta: classici e brani meno frequentati di sessant'anni di carriera",
          "Atmosfera: open-air estivo, pubblico multigenerazionale, canti collettivi",
          "Produzione: luci, video e audio professionali in configurazione stadio",
          "Inizio concerto previsto: ore 21:30",
        ],
      },
      practicalInfo: {
        title: "Come arrivare e informazioni pratiche",
        paragraphs: [
          "Lo Stadio Checcarini è a Marsciano, raggiungibile da Perugia in circa 30 minuti via E45 (SS3bis) con uscita Marsciano Nord, oppure via SS220 Pievaiola. Da Todi sono circa 20 minuti, da Roma via A1 uscita Orte, poi SS205 e raccordo Perugia-Bettolle. L'auto è il mezzo più comodo: i collegamenti pubblici serali tra Perugia e Marsciano sono limitati.",
          "I biglietti sono in formato elettronico: ricevi il PDF via email dopo l'acquisto e mostri il QR code all'ingresso. Le porte aprono generalmente 60-90 minuti prima dell'inizio del concerto. Per posti riservati a persone con disabilità contatta l'organizzatore con anticipo: il Comune di Marsciano emana un'ordinanza viabilità dedicata nei giorni precedenti il concerto, con la lista dei parcheggi temporanei e dei posti riservati.",
        ],
        bullets: [
          "Da Perugia: E45 uscita Marsciano Nord, ~30 min",
          "Da Roma: A1 uscita Orte, SS205, raccordo Perugia-Bettolle",
          "Parcheggi: nelle vie circostanti lo stadio (capienza limitata, arrivare con anticipo)",
          "Biglietti: formato elettronico PDF, QR code da smartphone",
          "Apertura porte: ~60-90 min prima dell'inizio concerto",
          "Inizio: ore 21:30",
        ],
      },
      internalLinks: [
        {
          label: "Francesco Renga a Spoleto 2026",
          href: "/articoli/francesco-renga-spoleto-2026-biglietti-teatro-nuovo",
          description: "Un altro grande nome del pop italiano in Umbria: concerto al Teatro Nuovo di Spoleto.",
        },
        {
          label: "Salmo a Perugia 2026 – Umbria Che Spacca",
          href: "/articoli/salmo-perugia-2026-umbria-che-spacca-biglietti",
          description: "La scena urban umbra si anima con il live di Salmo: tutto sui biglietti.",
        },
        {
          label: "Ermal Meta a Perugia 2026 – Afterlife Live Club",
          href: "/articoli/ermal-meta-perugia-2026-biglietti-afterlife-live-club",
          description: "Un'altra data umbra di un grande del pop italiano, in un format raccolto da live club.",
        },
      ],
      sections: [
        {
          heading: "Perché la data zero a Marsciano è speciale",
          paragraphs: [
            "Il tour \"60 - La nostra storia - Estate\" parte da Marsciano: significa che il pubblico dello Stadio Checcarini è il primo a vedere lo show pubblico dopo le prove della band. Le data zero hanno una loro magia — la scaletta è ancora in assestamento, l'energia è quella del debutto, la produzione cerca il proprio equilibrio davanti al pubblico vero per la prima volta.",
            "Marsciano si conferma capitale estiva della musica italiana di provincia grazie alla rassegna Musica per i Borghi, che negli ultimi anni ha portato sul prato del Checcarini Il Volo, Elisa, Venditti & De Gregori, Alessandra Amoroso. La scelta dei Pooh come data zero del tour estivo 2026 è un riconoscimento del valore costruito dal festival in pochi anni.",
          ],
        },
        {
          heading: "Come preparare la serata: consigli pratici",
          paragraphs: [
            "Per godersi al massimo il concerto allo Stadio Checcarini è utile pianificare con anticipo. Arrivare almeno 60 minuti prima dell'inizio permette di trovare parcheggio nelle vie limitrofe (la capienza è limitata e nelle sere di concerto si riempie presto), fare i controlli all'ingresso senza fretta e scegliere una buona posizione sul prato.",
            "Porta il biglietto sul telefono già scaricato per non dipendere dalla connessione dati in zona stadio. Lo show è all'aperto: in caso di previsioni incerte, controlla la pagina evento su Ticket Italia e i canali del festival per eventuali avvisi. Per le ordinanze parcheggi e viabilità, fai riferimento al sito del Comune di Marsciano nei giorni precedenti.",
          ],
          bullets: [
            "Arriva almeno 60 minuti prima per trovare parcheggio",
            "Scarica il biglietto PDF prima di uscire di casa",
            "Concerto open-air: porta una giacca leggera per la sera",
            "Controlla l'ordinanza viabilità sul sito del Comune di Marsciano",
            "Inizio concerto: ore 21:30",
          ],
        },
      ],
      faq: [
        {
          question: "Dove si trova lo Stadio Alberto Checcarini di Marsciano?",
          answer:
            "Lo Stadio Alberto Checcarini è in Via Salita Biscarini a Marsciano (PG), a circa 30 minuti da Perugia tramite E45 (uscita Marsciano Nord) o SS220 Pievaiola.",
        },
        {
          question: "Quanto costano i biglietti per i Pooh a Marsciano?",
          answer:
            "Il prezzo finale al checkout su Ticket Italia va da €74,90 (Poltrona Laterale) a €101,65 (Poltronissima Gold), con tutte le commissioni di servizio e i diritti di prevendita già inclusi. Per disponibilità aggiornata dei settori consulta la pagina evento su Ticket Italia.",
        },
        {
          question: "Come acquisto i biglietti per i Pooh allo Stadio Checcarini?",
          answer:
            "I biglietti sono disponibili su Ticket Italia. Acquista online, ricevi il PDF via email e mostra il QR code all'ingresso dello stadio.",
        },
        {
          question: "C'è parcheggio vicino allo Stadio Checcarini?",
          answer:
            "Sì, nelle vie attorno allo stadio (Via Salita Biscarini, Largo Vittime Innocenti delle Mafie, Via XXIV Maggio) ci sono posti gratuiti su strada. La capienza è limitata: si consiglia di arrivare almeno 60 minuti prima. Il Comune di Marsciano pubblica un'ordinanza viabilità dedicata nei giorni precedenti il concerto.",
        },
        {
          question: "A che ora inizia il concerto dei Pooh a Marsciano?",
          answer:
            "L'inizio è previsto per le 21:30 di venerdì 10 luglio 2026. Le porte dello stadio aprono generalmente 60-90 minuti prima.",
        },
      ],
      cta: {
        title: "Acquista i biglietti per i Pooh a Marsciano",
        text:
          "Data zero del tour estivo \"60 - La nostra storia\": alta domanda attesa. Acquista subito su Ticket Italia per assicurarti il posto allo Stadio Checcarini il 10 luglio 2026.",
        label: "Acquista su Ticket Italia",
        href: "https://ticketitalia.com/pooh-stadio-comunale-checcarini-marsciano-pg-10-luglio-2026",
      },
    },
  },
  {
    slug: "nicolo-filippucci-arena-54-corciano-2026-biglietti",
    title: "Nicolò Filippucci a Corciano 2026: biglietti e info Arena 54",
    excerpt:
      "Nicolò Filippucci il 20 giugno 2026 all'Arena 54 di Corciano (PG): il vincitore di Sanremo Giovani 2025-2026 torna a casa, dove è cresciuto. Biglietti da €24,50, info venue, parcheggi e hotel.",
    category: "Concerti",
    categorySlug: "concerti",
    subcategory: "Pop",
    subcategorySlug: "pop",
    type: "evento",
    status: "published",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["nicolò filippucci", "filippucci corciano", "arena 54", "concerti perugia giugno 2026", "sanremo 2026 nuove proposte", "amici 24"],
    date: "2026-04-27",
    readTime: "7 min",
    author: "Redazione Ticket Italia",
    image: "https://ticketitalia.com/image/cache/wp/gj/Miste/NICOLOFILIPPUCCI%20quadrata-1500x1500.webp",
    body: {
      intro:
        "Nicolò Filippucci torna a Corciano sabato 20 giugno 2026, all'Arena 54: una serata speciale per il giovane cantautore umbro fresco vincitore delle Nuove Proposte di Sanremo 2026 con \"Laguna\". Concerto a casa sua, dove è cresciuto. Biglietti da €24,50 — alta domanda, acquisto anticipato consigliato.",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Nicolò Filippucci all'Arena 54 di Corciano per una data live nella sua terra. Inizio concerto ore 21:30, formato raccolto in spazio open-air.",
        bullets: [
          "Artista: Nicolò Filippucci — vincitore Nuove Proposte Sanremo 2026, ex Amici 24",
          "Location: Arena 54 (Cafè 54), Via Parco 12, Corciano (PG)",
          "Data: sabato 20 giugno 2026",
          "Inizio: ore 21:30",
          "Biglietto: €24,50 (totale, prevendita inclusa)",
        ],
      },
      tickets: {
        title: "Biglietti Filippucci Corciano — prezzo e come acquistare",
        text:
          "I biglietti per il concerto di Nicolò Filippucci all'Arena 54 hanno prezzo unico: €24,50 totale (€23,00 prezzo + €1,50 prevendita). Le commissioni di servizio si aggiungono al checkout, portando il costo finale a €26,22. Acquisto online su Ticket Italia, biglietto in formato elettronico via email.",
        bullets: [
          "Prezzo totale biglietto: €24,50 (prevendita inclusa)",
          "Costo finale al checkout: €26,22 (commissioni di servizio incluse)",
          "Formato: biglietto elettronico PDF consegnato via email",
          "Accesso: QR code da smartphone all'ingresso",
          "Acquisto: su Ticket Italia tramite il link nel CTA in fondo all'articolo",
        ],
      },
      artistContext: {
        title: "Chi è Nicolò Filippucci: dal liceo a Sanremo passando per Amici",
        paragraphs: [
          "Nicolò Filippucci è nato il 30 maggio 2006 a Castiglione del Lago ed è cresciuto a Corciano, in provincia di Perugia. Quando il 20 giugno sale sul palco dell'Arena 54 non è il classico cantautore in tour: è quello del liceo lì vicino, quello che ha cantato per anni nei locali della zona prima di farsi notare dal grande pubblico. Per chi è di queste parti, è una serata che pesa.",
          "Il suo percorso pubblico parte nell'autunno 2024, quando entra nella ventiquattresima edizione di Amici di Maria De Filippi. Va al serale con il sostegno di Anna Pettinelli e Deborah Lettieri, viene eliminato in semifinale ma esce dal programma con una fanbase compatta. La svolta arriva pochi mesi dopo: vince le Nuove Proposte di Sanremo Giovani 2025 con \"Laguna\", brano che lo porta in gara al Festival 2026 dove conquista anche lì la categoria Nuove Proposte.",
          "Il 27 marzo 2026 esce il singolo \"Tutte le ragazze vogliono canzoni d'amore\", che anticipa il primo album \"Un posto dove andare\" pubblicato il 10 aprile 2026 per Warner Records Italy. Il live di Corciano è una delle prime occasioni di sentire dal vivo l'intero progetto, in formato raccolto e in casa.",
        ],
        bullets: [
          "Cantautore italiano, classe 2006 — cresciuto a Corciano (PG)",
          "Amici 24 (2024-25): serale, eliminato in semifinale",
          "Sanremo Giovani 2025: vince con \"Laguna\"",
          "Sanremo 2026: vince le Nuove Proposte",
          "Album d'esordio: \"Un posto dove andare\" (Warner Records Italy, 10 aprile 2026)",
          "Etichetta: Warner Records Italy",
        ],
      },
      location: {
        title: "Arena 54 di Corciano: lo spazio live di Cafè 54",
        venueType: "Arena open-air, spazio eventi del Cafè 54 di Corciano",
        experience:
          "L'Arena 54 è lo spazio outdoor del Cafè 54, locale storico di Corciano in zona Taverne / San Mariano. Nelle stagioni calde l'area esterna del locale si trasforma in un'arena raccolta per concerti acustici e serate live di musica italiana. Per un cantautore come Filippucci — che a Corciano ha cantato nei locali per anni prima di arrivare al grande pubblico — il ritorno qui ha un valore particolare: dimensione intima, distanza zero dal palco, pubblico in larga parte di gente che lo conosce davvero.",
        suitability:
          "Perfetto per concerti in formato cantautorale: capienza limitata, atmosfera diretta, qualità sonora curata per la voce e per la dimensione acustica della proposta. Non aspettarti una grande arena: aspettati una serata che assomiglia più a un live di paese che a un grande show, e proprio per questo difficile da trovare altrove nel tour.",
        atmosphere:
          "La serata è una di quelle date che mescolano pubblico nazionale (chi ha seguito Filippucci da Amici e da Sanremo) e pubblico locale (chi lo segue da quando suonava nei bar). L'atmosfera è quella delle prime date in casa: emozione condivisa, voglia di esserci, tanta gente che canta i pezzi a memoria insieme all'artista. Concerto in giugno, all'aperto, sera umbra: mix difficile da battere.",
        paragraphs: [
          "L'Arena 54 si trova in Via Parco 12, a Corciano (PG), nella zona di Taverne / San Mariano — frazioni della città metropolitana di Perugia. È raggiungibile in circa 10-12 minuti dal centro storico di Perugia in auto, e si trova vicino al Quasar Village, principale polo commerciale dell'area.",
          "Lo spazio è quello del Cafè 54, locale che durante l'anno funziona come bar/ristorante e che nella stagione estiva apre l'area esterna agli eventi musicali. La dimensione raccolta significa qualità d'ascolto e contatto diretto con il palco: una scelta coerente con la natura cantautorale della proposta di Filippucci e con il suo legame personale con Corciano.",
        ],
        bullets: [
          "Indirizzo: Via Parco 12, 06073 Corciano (PG)",
          "Frazione: Taverne / San Mariano (zona ovest di Perugia)",
          "Tipo: arena open-air dello spazio Cafè 54",
          "Da Perugia centro: ~10-12 min in auto",
          "Vicino al Quasar Village (centro commerciale Corciano)",
          "Dimensione: spazio raccolto, capienza limitata",
        ],
        nearbyParking: [
          {
            name: "Parcheggio Cafè 54 / Via Parco",
            distanceOnFoot: "0 min a piedi",
            type: "gratuito",
            notes: "Area di sosta lungo Via Parco e nei piazzali adiacenti al locale. Capienza limitata: nelle sere di concerto si riempie presto, conviene arrivare con anticipo.",
            mapsUrl: "https://maps.app.goo.gl/hCAxrVtHxEYcZooYA",
          },
          {
            name: "Parcheggi Quasar Village (Corciano)",
            distanceOnFoot: "10-15 min a piedi",
            type: "gratuito",
            notes: "Grande parcheggio del centro commerciale Quasar Village a Corciano, a poca distanza in auto dall'Arena 54. Verifica gli orari di apertura del centro: in caso di chiusura serale il parcheggio potrebbe essere ad accesso limitato.",
            mapsUrl: "https://www.google.com/maps/search/Quasar+Village+Corciano",
          },
        ],
        nearbyHotels: [
          {
            name: "Sangallo Palace Hotel – Perugia centro",
            distanceOnFoot: "15 min in auto",
            priceRange: "€€€",
            bookingUrl: "https://www.sangallo.it/",
          },
          {
            name: "Chocohotel – Perugia",
            distanceOnFoot: "12 min in auto",
            priceRange: "€€",
            bookingUrl: "https://www.chocohotel.it/",
          },
          {
            name: "Hotel Giò Wine and Jazz Area – Perugia",
            distanceOnFoot: "12 min in auto",
            priceRange: "€€",
            bookingUrl: "https://www.hotelgio.it/",
          },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dalla serata",
        paragraphs: [
          "Il concerto di Corciano è uno dei live più attesi della prima estate di Filippucci con un album da portare in giro. La scaletta attinge a \"Un posto dove andare\" — disco d'esordio uscito ad aprile 2026 — e include i brani più conosciuti dal grande pubblico: \"Laguna\" (il pezzo Sanremo 2026), \"Tutte le ragazze vogliono canzoni d'amore\" (singolo di lancio), e i brani che lo hanno fatto scoprire ad Amici 24.",
          "La dimensione raccolta dell'Arena 54 fa sì che il live abbia un sapore diverso da quello che si vede nei grandi festival estivi: meno produzione di palcoscenico, più contatto. Per una serata in casa propria — con amici, famiglia e fan locali — è la scelta giusta.",
        ],
        bullets: [
          "Scaletta attesa: brani da \"Un posto dove andare\" + Laguna + classici da Amici",
          "Formato: cantautorale, dimensione raccolta",
          "Atmosfera: data \"in casa\" — pubblico locale e nazionale",
          "Durata attesa: circa 80-100 minuti",
          "Inizio: ore 21:30",
        ],
      },
      practicalInfo: {
        title: "Come arrivare e informazioni pratiche",
        paragraphs: [
          "L'Arena 54 (Cafè 54) si raggiunge da Perugia centro storico in circa 10-12 minuti in auto, percorrendo la SS75bis in direzione Corciano e uscendo a San Mariano / Taverne. Da Roma è accessibile via A1 uscita Orte, poi raccordo Perugia-Bettolle e SS75bis. Da Firenze: A1 uscita Valdichiana, poi raccordo Bettolle-Perugia.",
          "I biglietti sono in formato elettronico: ricevi il PDF via email dopo l'acquisto e mostri il QR code all'ingresso. Per posti riservati a persone con disabilità è opportuno contattare l'organizzatore con anticipo. Il concerto è all'aperto: in caso di previsioni meteo incerte, controlla la pagina evento su Ticket Italia per eventuali avvisi.",
        ],
        bullets: [
          "Da Perugia centro: SS75bis direzione Corciano, ~10-12 min",
          "Da Roma: A1 uscita Orte, raccordo Perugia-Bettolle",
          "Da Firenze: A1 uscita Valdichiana, raccordo Bettolle-Perugia",
          "Parcheggio: nelle vie circostanti il locale (capienza limitata)",
          "Biglietti: formato elettronico PDF, QR code da smartphone",
          "Inizio: ore 21:30 — porte aperte ~60 min prima",
        ],
      },
      internalLinks: [
        {
          label: "Ermal Meta a Perugia 2026 – Afterlife Live Club",
          href: "/articoli/ermal-meta-perugia-2026-biglietti-afterlife-live-club",
          description: "Un altro live umbro in formato raccolto: Ermal Meta a Balanzano, Perugia.",
        },
        {
          label: "Salmo a Perugia 2026 – Umbria Che Spacca",
          href: "/articoli/salmo-perugia-2026-umbria-che-spacca-biglietti",
          description: "L'estate live perugina continua con Salmo ai Giardini del Frontone.",
        },
        {
          label: "Pooh a Marsciano 2026 – Stadio Checcarini",
          href: "/articoli/pooh-stadio-checcarini-marsciano-2026",
          description: "Data zero del tour estivo dei Pooh nello stadio di Marsciano, in Umbria.",
        },
      ],
      sections: [
        {
          heading: "Perché questa data a Corciano è speciale",
          paragraphs: [
            "Filippucci a Corciano non è una tappa qualsiasi del tour: è la data in casa. È cresciuto qui, ha cantato per anni nei locali di Perugia e dintorni, conosce i nomi dei posti perché li ha frequentati da ragazzo. Per un giovane artista che in due anni è passato da concorrente di Amici a vincitore delle Nuove Proposte di Sanremo 2026, tornare in un'arena del proprio paese di origine è uno di quei passaggi che lasciano il segno — sul palco e in chi guarda.",
            "Per chi non è umbro, è l'occasione di vedere un cantautore in formato raccolto prima che la sua estate diventi affollata di palchi più grandi. Per chi è umbro, è una di quelle serate da raccontare anni dopo: \"c'ero io, all'Arena 54 di Corciano, quando Filippucci tornò a casa\".",
          ],
        },
        {
          heading: "Come preparare la serata: consigli pratici",
          paragraphs: [
            "Capienza limitata, posto unico, biglietti che difficilmente saranno disponibili sotto data: il primo consiglio è l'acquisto anticipato. Il prezzo è contenuto (€24,50 totale) ma la domanda — tra fan locali, fan da Amici e fan da Sanremo — supererà la disponibilità.",
            "Arriva all'Arena 54 con almeno 45-60 minuti di anticipo: il parcheggio nelle vie circostanti si riempie presto e in giugno la sera umbra può rinfrescarsi. Una giacca leggera, il telefono carico per il QR code, e magari una playlist veloce dell'album per arrivare già caldi: il resto lo fa la serata.",
          ],
          bullets: [
            "Acquista in anticipo: capienza limitata, alta domanda",
            "Arriva 45-60 min prima per parcheggio e ingresso",
            "Concerto open-air: porta una giacca leggera",
            "Telefono carico: il QR code si mostra all'ingresso",
            "Inizio concerto: 21:30",
          ],
        },
      ],
      faq: [
        {
          question: "Dove si trova l'Arena 54 di Corciano?",
          answer:
            "L'Arena 54 è lo spazio outdoor del Cafè 54, in Via Parco 12 a Corciano (PG), zona Taverne / San Mariano — circa 10-12 minuti in auto dal centro storico di Perugia.",
        },
        {
          question: "Quanto costa il biglietto per Filippucci a Corciano?",
          answer:
            "Il biglietto ha prezzo unico: €24,50 totale (prevendita inclusa). Le commissioni di servizio al checkout portano il costo finale a €26,22.",
        },
        {
          question: "Come acquisto i biglietti per Filippucci all'Arena 54?",
          answer:
            "I biglietti sono disponibili su Ticket Italia. Acquista online, ricevi il PDF via email e mostra il QR code all'ingresso del locale.",
        },
        {
          question: "A che ora inizia il concerto?",
          answer:
            "L'inizio è previsto per le 21:30 di sabato 20 giugno 2026. Le porte aprono generalmente circa 60 minuti prima.",
        },
        {
          question: "C'è parcheggio vicino all'Arena 54?",
          answer:
            "Sì, ci sono posti gratuiti lungo Via Parco e nelle strade limitrofe, oltre al parcheggio del Quasar Village a poca distanza in auto. Capienza limitata: arriva con anticipo.",
        },
        {
          question: "Perché è una data speciale per Filippucci?",
          answer:
            "Nicolò Filippucci è cresciuto a Corciano. Il concerto all'Arena 54 è una delle prime date \"in casa\" dopo la vittoria delle Nuove Proposte di Sanremo 2026 e l'uscita dell'album d'esordio.",
        },
      ],
      cta: {
        title: "Acquista i biglietti per Filippucci a Corciano",
        text:
          "Capienza limitata, prezzo unico €24,50: la data in casa di Filippucci all'Arena 54 si esaurirà rapidamente. Acquista subito su Ticket Italia per assicurarti il posto sabato 20 giugno 2026.",
        label: "Acquista su Ticket Italia",
        href: "https://ticketitalia.com/nicolo-filippucci-arena-54-perugia-20-giugno-2026",
      },
    },
  },
  {
    slug: "claudio-baglioni-la-vita-e-adesso-grandtour-piazza-duomo-spoleto-15-luglio-2026",
    title: "Claudio Baglioni a Spoleto 15 luglio 2026: La Vita è Adesso GrandTour in Piazza Duomo",
    excerpt:
      "Claudio Baglioni porta La Vita è Adesso GrandTour in Piazza Duomo a Spoleto il 15 luglio 2026: l'album del 1985 eseguito per intero con 20 musicisti, prezzi da €110.",
    category: "Concerti",
    categorySlug: "concerti",
    subcategory: "Pop",
    subcategorySlug: "pop",
    type: "evento",
    status: "published",
    publishedAt: "2026-05-04",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["Claudio Baglioni", "Concerti Spoleto", "La Vita è Adesso", "Piazza Duomo Spoleto", "Concerti Umbria 2026"],
    date: "2026-05-04",
    readTime: "9 min",
    author: "Redazione Ticket Italia",
    image: "https://ticketitalia.com/image/cache/wp/gj/EliteAgency/CB_GRANTOUr-1500x1500.webp",
    body: {
      intro:
        "Claudio Baglioni torna a Spoleto il 15 luglio 2026 con La Vita è Adesso GrandTour, la tappa estiva in Piazza Duomo che chiude il ciclo di celebrazioni per i 40 anni dell'album simbolo della sua carriera. L'album del 1985 viene eseguito per intero, accompagnato dai brani più amati del repertorio, con un'orchestra di 20 musicisti e coristi sul palco. Biglietti disponibili su Ticket Italia a partire da €110.",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Una serata unica nella cornice rinascimentale di Piazza Duomo, con l'intero album La Vita è Adesso eseguito dal vivo nell'ordine originale e i grandi successi di Baglioni a chiudere lo show.",
        bullets: [
          "Artista: Claudio Baglioni",
          "Location: Piazza Duomo, Spoleto (PG)",
          "Data: mercoledì 15 luglio 2026, ore 21:00",
          "Prezzo: a partire da €110,00",
          "Atmosfera: concerto evento, intero album live + grandi successi",
        ],
      },
      tickets: {
        title: "Biglietti e prezzi",
        text:
          "I biglietti per Claudio Baglioni in Piazza Duomo a Spoleto sono in vendita su Ticket Italia in formato elettronico (PDF inviato via email). Il prezzo base parte da €110,00; le tariffe variano in base al settore scelto e al posizionamento rispetto al palco. Per chi necessita di assistenza per disabilità, l'organizzazione mette a disposizione l'indirizzo denise@elitegroup.it a cui inviare il certificato di invalidità.",
        bullets: [
          "Prezzo a partire da: €110,00",
          "Formato biglietto: elettronico (PDF via email)",
          "Acquisto sicuro: pagamento con carta, PayPal o bonifico",
          "Assistenza disabilità: denise@elitegroup.it (con certificato di invalidità)",
          "Promotore: Elite Agency",
        ],
      },
      artistContext: {
        title: "Claudio Baglioni e i 40 anni di La Vita è Adesso",
        paragraphs: [
          "La Vita è Adesso esce nel maggio 1985 e diventa l'album italiano più venduto di sempre per la sua epoca, con oltre quattro milioni di copie. È il disco che consegna Claudio Baglioni alla storia del pop italiano, con brani diventati patrimonio collettivo come la title track, Uomini persi, Noi no e Tamburi lontani. La produzione, le orchestrazioni e la cura dei testi segnano un punto di svolta nella canzone d'autore degli anni Ottanta.",
          "Il GrandTour celebra i quarant'anni del disco riproponendolo per intero dal vivo, nell'ordine originale, con la formazione più ampia mai messa insieme da Baglioni: venti tra musicisti e coristi sul palco. Dopo l'album integrale, lo show prosegue con i grandi classici della carriera, da Questo piccolo grande amore a Strada facendo, fino agli anni più recenti. La tappa di Spoleto è una delle date estive in cornici monumentali italiane.",
        ],
        bullets: [
          "Album celebrato: La Vita è Adesso (1985), 40° anniversario",
          "Formazione: 20 musicisti e coristi sul palco",
          "Struttura: album integrale + raccolta dei più grandi successi",
          "Classifiche storiche: 27 settimane al primo posto in Italia nel 1985",
        ],
      },
      location: {
        title: "Piazza Duomo: il Rinascimento incontra il pop",
        venueType: "Piazza monumentale all'aperto nel centro storico",
        experience:
          "Pochi luoghi in Italia restituiscono lo stesso effetto di Piazza Duomo a Spoleto al calare del sole: la facciata romanica della Cattedrale di Santa Maria Assunta con il mosaico di Solsterno (1207) si accende delle luci di scena, le scalinate diventano gradinate naturali e la pietra rosata di Spoleto amplifica il suono dell'orchestra.",
        suitability:
          "L'acustica della piazza, racchiusa tra il portico rinascimentale del 1491 e il palazzo della Curia, esalta gli arrangiamenti orchestrali del GrandTour: cori, archi e fiati di Baglioni trovano qui una cassa armonica naturale che gli stadi non possono offrire.",
        atmosphere:
          "Pubblico seduto, tramonto sui Monti Martani, palcoscenico ai piedi della Cattedrale: l'atmosfera è quella di un grande concerto-evento più che di una data di tour, con la musica che rimbalza tra le pietre del XIII secolo.",
        paragraphs: [
          "Piazza Duomo a Spoleto è il salotto monumentale della città, costruito su una scarpata che scende dal Colle Sant'Elia. La facciata della Cattedrale di Santa Maria Assunta domina l'intera piazza con il suo mosaico bizantineggiante del 1207 firmato dal maestro Solsterno: nei concerti serali, il riverbero della pietra calcarea bianca e rosa contribuisce a un suono caldo e avvolgente.",
          "Il portico rinascimentale aggiunto nel 1491 da Antonio Barocci chiude il lato superiore della piazza e crea uno spazio scenico unico. Le scalinate laterali, che collegano via dell'Arringo a via Saffi, vengono utilizzate come gradinate aggiuntive per gli spettatori. La piazza è regolarmente sede del Festival dei Due Mondi: Baglioni si inserisce in questa tradizione di grandi appuntamenti culturali sotto la cupola del Duomo.",
        ],
        bullets: [
          "Capienza concerto: alcune migliaia di posti tra platea e gradinate",
          "Visibilità: ottima da quasi ogni punto grazie alla pendenza naturale",
          "Acustica: piazza chiusa su tre lati, riverbero contenuto e voce in primo piano",
          "Servizi: bagni pubblici e punto info nelle vicinanze (via dell'Arringo)",
          "Accesso: pedonale dal centro storico, chiusura totale al traffico",
        ],
        locationImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Duomo_Spoleto_11_05_2018_02.jpg/1280px-Duomo_Spoleto_11_05_2018_02.jpg",
        nearbyParking: [
          {
            name: "Parcheggio Posterna",
            distanceOnFoot: "8 min a piedi (con tappeti mobili attivi fino a tarda sera)",
            type: "a pagamento",
            notes:
              "452 posti, collegato al centro tramite percorsi meccanizzati; in estate i tappeti mobili sono attivi fino all'1:00 nei prefestivi",
            mapsUrl: "https://www.google.com/maps/search/Parcheggio+Posterna+Spoleto",
          },
          {
            name: "Parcheggio Spoletosfera",
            distanceOnFoot: "12 min a piedi (con scale mobili)",
            type: "a pagamento",
            notes: "Parcheggio collegato al centro tramite scale mobili dedicate",
            mapsUrl: "https://www.google.com/maps/search/Parcheggio+Spoletosfera+Spoleto",
          },
          {
            name: "Parcheggio Ponzianina",
            distanceOnFoot: "15 min a piedi (con percorso meccanizzato)",
            type: "a pagamento",
            notes: "Adiacente a uno dei tre percorsi meccanizzati del centro storico",
            mapsUrl: "https://www.google.com/maps/search/Parcheggio+Ponzianina+Spoleto",
          },
          {
            name: "Via Nursina (area di sosta)",
            distanceOnFoot: "10 min a piedi",
            type: "gratuito",
            notes: "Solo 20 posti, conviene arrivare con ampio anticipo",
            mapsUrl: "https://www.google.com/maps/search/Via+Nursina+Spoleto",
          },
        ],
        nearbyHotels: [
          {
            name: "Hotel Clitunno",
            distanceOnFoot: "5 min a piedi dal Duomo",
            priceRange: "€€",
            bookingUrl: "https://www.hotelclitunno.com/it/",
          },
          {
            name: "Hotel dei Duchi",
            distanceOnFoot: "7 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://www.hoteldeiduchi.com/",
          },
          {
            name: "Hotel Charleston",
            distanceOnFoot: "6 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://www.hotelcharleston.it/",
          },
          {
            name: "Albergo Ristorante Il Panciolle",
            distanceOnFoot: "3 min a piedi (a pochi passi da Piazza Duomo)",
            priceRange: "€€",
            bookingUrl: "https://www.ilpanciolle.it/",
          },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dal vivo",
        paragraphs: [
          "Il GrandTour non è un greatest hits tradizionale: la prima parte del concerto è dedicata interamente a La Vita è Adesso eseguito nell'ordine originale dell'album. Significa rivivere la sequenza di Tamburi lontani, Strada facendo (parte II), Notte di Note, fino al finale di La vita è adesso (Reprise) come fu pensato in studio nel 1985.",
          "Nella seconda parte arrivano i brani che hanno reso Baglioni una delle voci più riconoscibili del pop italiano: Questo piccolo grande amore, Avrai, E tu, Mille giorni di te e di me. L'orchestrazione dal vivo con 20 elementi cambia profondamente la resa rispetto alle versioni in studio: archi più presenti, cori in primo piano, arrangiamenti più estesi.",
        ],
        bullets: [
          "Durata stimata: oltre 2 ore di concerto",
          "Formazione: orchestra dal vivo con 20 musicisti e coristi",
          "Struttura: album integrale + grandi successi",
          "Pubblico: posti a sedere, ideale per famiglie e ascolto attento",
        ],
      },
      practicalInfo: {
        title: "Informazioni pratiche",
        paragraphs: [
          "Il concerto inizia alle 21:00 di mercoledì 15 luglio 2026. Spoleto va raggiunta con largo anticipo: il centro storico è chiuso al traffico e i parcheggi più comodi richiedono almeno 10-15 minuti di percorso meccanizzato per arrivare in piazza. Consigliamo di trovarsi in zona già dalle 19:30 per evitare code agli ingressi e cercare con calma il proprio settore.",
          "In caso di pioggia il concerto si svolge regolarmente, salvo eventi meteo estremi: la piazza non ha copertura, quindi prevedi un kway leggero. Sono ammessi piccoli zaini e borse, vietate bottiglie di vetro e ombrelli rigidi.",
        ],
        bullets: [
          "Apertura porte: orario non ancora comunicato, indicativamente 19:30",
          "Inizio concerto: ore 21:00",
          "Trasporti: stazione FS Spoleto + bus navetta per il centro",
          "ZTL attiva: l'auto va lasciata nei parcheggi indicati",
          "Biglietto: PDF stampato o su smartphone, documento d'identità a portata di mano",
        ],
      },
      internalLinks: [
        {
          label: "Francesco Renga al Teatro Nuovo di Spoleto 2026",
          href: "/francesco-renga-spoleto-2026-biglietti-teatro-nuovo",
          description:
            "Un'altra grande data spoletina del 2026: orari, settori e consigli pratici per il Teatro Nuovo Gian Carlo Menotti.",
        },
        {
          label: "Concerti in Umbria nel 2026: la guida completa",
          href: "/pooh-stadio-checcarini-marsciano-2026",
          description:
            "Le date più attese in regione: tour, festival e arene per chi pianifica il proprio calendario live.",
        },
        {
          label: "Come usare Carta Cultura per i concerti",
          href: "/carta-cultura-concerti-come-usarla",
          description:
            "Verifica se il tuo bonus può coprire l'acquisto del biglietto e segui i passaggi corretti per non sbagliare il buono.",
        },
        {
          label: "Salmo a Perugia 2026 - Umbria che Spacca",
          href: "/salmo-perugia-2026-umbria-che-spacca-biglietti",
          description:
            "Un'altra grande data umbra del 2026, in chiave urban: lineup, biglietti e info pratiche.",
        },
      ],
      sections: [
        {
          heading: "Spoleto come tappa-evento del GrandTour",
          paragraphs: [
            "Le date estive del GrandTour sono pensate come eventi singoli, non come repliche di un tour standard. Spoleto, insieme alle altre piazze monumentali italiane scelte da Baglioni, fa parte di un calendario ridotto a poche città: ogni serata ha una sua scenografia adattata al luogo. Significa luci diverse, suono calibrato sulle pareti specifiche della piazza, scaletta calibrata sul tipo di pubblico.",
            "Per chi segue Baglioni da decenni, la versione spoletina è particolarmente attesa: la piazza, stretta intorno al pubblico e dominata dalla facciata del Duomo, restituisce una resa scenica molto più intima rispetto a uno stadio o a un palasport.",
          ],
        },
        {
          heading: "Cosa vedere a Spoleto prima del concerto",
          paragraphs: [
            "Se arrivi nel pomeriggio, hai il tempo per una passeggiata che parte da Piazza Libertà (vicino al Posterna), sale fino al Teatro Romano e prosegue per via Brignone fino a Piazza del Mercato. Da lì si scende a Piazza Duomo lungo via dell'Arringo: è il modo più scenografico per arrivare alla cattedrale, che si rivela tutta in una volta dalla scalinata superiore.",
            "Per cena, l'area intorno a Piazza del Mercato e via Saffi offre trattorie storiche con piatti spoletini: strangozzi al tartufo, agnello alla cacciatora, crostini alla norcina. Conviene prenotare con anticipo: nei giorni di concerto la zona si riempie rapidamente.",
          ],
          bullets: [
            "Cattedrale di Santa Maria Assunta: visita libera, mosaico di Solsterno",
            "Teatro Romano e museo archeologico: 5 min a piedi dal Duomo",
            "Ponte delle Torri: panorama sulla valle, 15 min dalla piazza",
            "Festival dei Due Mondi: Spoleto è città-festival da oltre 60 anni",
          ],
        },
        {
          heading: "Treno o auto: come arrivare",
          paragraphs: [
            "La stazione FS di Spoleto è sulla linea Roma-Ancona ed è servita da treni regionali e Frecce. Dalla stazione al centro storico ci sono circa 1,5 km in piano: navetta cittadina o taxi consigliati nelle ore serali. Per chi arriva da Roma, il viaggio in treno è di circa 1h20 con il regionale veloce.",
            "In auto, da Roma si esce a Orte e si prosegue sulla SS3 Flaminia (circa 1h30 totali). Da Perugia si scende lungo la E45 e si prende la SS3 in direzione Spoleto (circa 50 min). Tutti i parcheggi del centro sono segnalati con cartelli appena entri in città: scegli Posterna se vuoi il percorso più diretto e meccanizzato.",
          ],
        },
      ],
      faq: [
        {
          question: "A che ora inizia il concerto di Claudio Baglioni a Spoleto?",
          answer:
            "Il concerto è programmato per mercoledì 15 luglio 2026 alle ore 21:00 in Piazza Duomo. L'orario di apertura porte non è ancora stato comunicato ufficialmente: indicativamente, conviene arrivare in piazza entro le 19:30-20:00.",
        },
        {
          question: "Quanto costano i biglietti?",
          answer:
            "I biglietti partono da €110,00. Le tariffe variano in base al settore e alla posizione rispetto al palco; trovi tutti i prezzi e la disponibilità aggiornata direttamente sulla scheda evento di Ticket Italia.",
        },
        {
          question: "Dove parcheggiare per il concerto in Piazza Duomo a Spoleto?",
          answer:
            "Il parcheggio più comodo è il Posterna (452 posti, collegato al centro con tappeti mobili). In alternativa Spoletosfera e Ponzianina, entrambi serviti da percorsi meccanizzati. L'area gratuita di via Nursina ha solo 20 posti e si esaurisce rapidamente.",
        },
        {
          question: "Il biglietto è elettronico?",
          answer:
            "Sì, il biglietto viene inviato in formato elettronico (PDF) all'indirizzo email indicato in fase d'acquisto. Puoi mostrarlo direttamente da smartphone o stamparlo: porta sempre con te un documento d'identità.",
        },
        {
          question: "Cosa succede in caso di pioggia?",
          answer:
            "Il concerto si svolge regolarmente in caso di pioggia leggera o moderata, essendo un evento all'aperto senza copertura. Solo in caso di condizioni meteo estreme l'organizzazione può comunicare rinvii o variazioni: controlla la scheda evento di Ticket Italia nelle ore precedenti.",
        },
      ],
      cta: {
        title: "Acquista i biglietti per Claudio Baglioni a Spoleto",
        text:
          "La data di Spoleto del GrandTour è una serata-evento con capienza limitata. Acquista subito su Ticket Italia per assicurarti il posto in Piazza Duomo il 15 luglio 2026.",
        label: "Acquista su Ticket Italia",
        href: "https://ticketitalia.com/claudio-baglioni-la-vita-e-adesso-grandtour-piazza-duomo-spoleto-15-luglio-2026",
      },
    },
  },
  {
    slug: "angelina-mango-piazzale-rocca-maggiore-assisi-5-agosto-2026",
    title: "Angelina Mango ad Assisi 5 agosto 2026: Nina canta nei Teatri d'Estate al Piazzale Rocca Maggiore",
    excerpt:
      "Angelina Mango porta il tour Nina canta nei Teatri d'Estate al Piazzale Rocca Maggiore di Assisi il 5 agosto 2026: posto unico €55,37 (prezzo finale al checkout), biglietti su Ticket Italia.",
    category: "Concerti",
    categorySlug: "concerti",
    subcategory: "Pop",
    subcategorySlug: "pop",
    type: "evento",
    status: "published",
    publishedAt: "2026-05-04",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["Angelina Mango", "Concerti Assisi", "Nina", "Piazzale Rocca Maggiore", "Teatri d'Estate", "Concerti Umbria 2026"],
    date: "2026-05-04",
    readTime: "8 min",
    author: "Redazione Ticket Italia",
    image: "https://ticketitalia.com/image/cache/wp/gj/Mea%20nuove/Amangonuova-1500x1500.webp",
    body: {
      intro:
        "Angelina Mango fa tappa ad Assisi mercoledì 5 agosto 2026 con Nina canta nei Teatri d'Estate, il tour che porta l'album Nina nelle cornici monumentali italiane. Il palco è al Piazzale Rocca Maggiore, ai piedi della fortezza che domina la città. Posto unico €55,37 a biglietto (prezzo finale al checkout, commissioni incluse): biglietti elettronici disponibili su Ticket Italia.",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Una serata estiva sotto le stelle, con Angelina Mango che riprende dal vivo i brani di Nina e i pezzi che l'hanno consacrata dopo Sanremo 2024.",
        bullets: [
          "Artista: Angelina Mango",
          "Location: Piazzale Rocca Maggiore, Assisi (PG)",
          "Data: mercoledì 5 agosto 2026, ore 21:00",
          "Prezzo: posto unico €55,37 finale al checkout (commissioni incluse)",
          "Atmosfera: concerto all'aperto in cornice medievale, tour estivo",
        ],
      },
      tickets: {
        title: "Biglietti e prezzi",
        text:
          "Per la data di Assisi è prevista un'unica fascia di prezzo, posto unico in piedi. Il prezzo finale al checkout su Ticket Italia è €55,37 a biglietto: composto da €45,00 di tariffa base, €6,75 di diritti di prevendita e €3,62 di commissioni amministrative. Il formato è elettronico: PDF inviato via email subito dopo l'acquisto.",
        bullets: [
          "Posto unico - Intero (base): €45,00",
          "Diritti di prevendita: €6,75",
          "Commissioni amministrative: €3,62",
          "Totale finale al checkout: €55,37",
          "Formato: biglietto elettronico (PDF via email)",
          "Promotore: AUCMA",
        ],
      },
      artistContext: {
        title: "Angelina Mango e il tour Nina",
        paragraphs: [
          "Angelina Mango si è imposta sulla scena italiana vincendo Sanremo 2024 con La noia, brano che è poi diventato il singolo italiano più ascoltato dell'anno. Subito dopo è arrivato Pokè melodrama, mixtape che ha confermato la sua direzione tra cantautorato urban e radici cantautorali ereditate dal padre Pino Mango.",
          "Nina è il primo album in studio dell'artista, un disco che ha definito una sua identità più matura e personale. Il tour Nina canta nei Teatri d'Estate è la versione estiva del progetto, pensata per i palchi all'aperto di anfiteatri e piazze storiche italiane: una scaletta che alterna i brani dell'album, i singoli più recenti e i pezzi che l'hanno fatta conoscere al grande pubblico.",
        ],
        bullets: [
          "Vittoria Sanremo: 2024 con La noia",
          "Album di riferimento: Nina (primo album in studio)",
          "Tour: Nina canta nei Teatri d'Estate, edizione estiva 2026",
          "Genere: cantautorato pop con contaminazioni urban e latine",
        ],
      },
      location: {
        title: "Piazzale Rocca Maggiore: il concerto sotto la fortezza",
        venueType: "Piazzale all'aperto in cornice medievale, ai piedi della Rocca",
        experience:
          "Si arriva al Piazzale Rocca Maggiore salendo per le scalinate del centro storico di Assisi: il palco è schiacciato tra le mura medievali e la fortezza imperiale, con vista aperta sulla valle umbra che si stende fino a Perugia. La temperatura serale di agosto, a 505 metri di altitudine, rende l'esperienza nettamente più fresca rispetto alla pianura.",
        suitability:
          "La posizione, in piano e relativamente compatta, si adatta bene al formato del tour estivo di Angelina Mango: pubblico vicino al palco, audio gestibile, niente eco eccessiva grazie alla mancanza di pareti riflettenti su tutti i lati.",
        atmosphere:
          "Tramonto sul Subasio, mura del 1316 alle spalle del pubblico, fortezza illuminata sopra il palco: è una delle cornici più scenografiche del calendario concerti estivo umbro.",
        paragraphs: [
          "La Rocca Maggiore di Assisi domina la città dal punto più alto del colle, a 505 metri di altezza. La fortezza attuale è frutto della ricostruzione del cardinale Albornoz nel 1367, su una struttura più antica distrutta durante la rivolta cittadina del 1198. Il piazzale antistante è oggi uno spazio aperto, raggiungibile a piedi attraverso le scalinate che salgono da via San Rufino o da Porta Perlici.",
          "Il piazzale viene utilizzato come spazio concerti durante la stagione estiva: la conformazione naturale del terreno e la presenza delle mura sui due lati creano una sorta di anfiteatro a cielo aperto. Il punto più suggestivo dello show, secondo chi ci è già stato, è il momento in cui la fortezza viene illuminata alle spalle del palco: l'effetto scenografico è quello di un teatro medievale.",
        ],
        bullets: [
          "Capienza: posto unico in piedi, alcune migliaia di posti",
          "Visibilità: ottima dal centro del piazzale, leggermente compromessa sui lati",
          "Servizi: punti ristoro temporanei e bagni chimici allestiti per l'evento",
          "Accesso: solo pedonale, dal centro storico tramite scalinate",
          "Altitudine: 505 m s.l.m., temperatura serale più fresca della pianura",
        ],
        locationImage:
          "https://ticketitalia.com/image/cache/wp/gj/Luoghi%20banner/RoccamaggiorediAssisi1-1400x300.webp",
        nearbyParking: [
          {
            name: "Parcheggio Porta Nuova",
            distanceOnFoot: "20 min a piedi (con percorso in salita verso la Rocca)",
            type: "a pagamento",
            notes:
              "Posizione strategica, raggiungibile dal centro in circa 5 minuti a piedi; per la Rocca Maggiore prevedere ulteriore tempo di salita",
            mapsUrl: "https://www.google.com/maps/search/Parcheggio+Porta+Nuova+Assisi",
          },
          {
            name: "Parcheggio Porta Mojano (Saba)",
            distanceOnFoot: "25 min a piedi",
            type: "a pagamento",
            notes:
              "Sotterraneo su tre livelli, ideale per visitare il centro; bar e bagni pubblici disponibili",
            mapsUrl: "https://www.google.com/maps/search/Parcheggio+Porta+Mojano+Assisi",
          },
          {
            name: "Parcheggio Porta San Giacomo",
            distanceOnFoot: "15 min a piedi (con salita)",
            type: "gratuito",
            notes:
              "L'unico parcheggio gratuito di Assisi, posizionato a metà del fianco collinare della città",
            mapsUrl: "https://www.google.com/maps/search/Parcheggio+Porta+San+Giacomo+Assisi",
          },
          {
            name: "Piazza Matteotti",
            distanceOnFoot: "10 min a piedi",
            type: "a pagamento",
            notes:
              "Il parcheggio più vicino alla Rocca Maggiore; nei giorni di evento può chiudere prima del concerto, conviene arrivare presto",
            mapsUrl: "https://www.google.com/maps/search/Parcheggio+Piazza+Matteotti+Assisi",
          },
        ],
        nearbyHotels: [
          {
            name: "Hotel La Rocca",
            distanceOnFoot: "5 min a piedi dalla Rocca Maggiore",
            priceRange: "€",
            bookingUrl: "https://www.hotelarocca.it/",
          },
          {
            name: "Hotel Il Duomo",
            distanceOnFoot: "8 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://hotelilduomo.it/",
          },
          {
            name: "Giotto Hotel & Spa",
            distanceOnFoot: "20 min a piedi (in centro storico)",
            priceRange: "€€€",
            bookingUrl: "https://www.hotelgiottoassisi.it/",
          },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dal vivo",
        paragraphs: [
          "Il tour estivo di Angelina Mango è pensato per i palchi all'aperto: scaletta più dinamica rispetto alla versione invernale teatrale, attenzione al ritmo per tenere il pubblico in piedi per oltre 90 minuti. Si alternano i brani di Nina (Melodrama, Per due come noi, Fila indiana) ai singoli più recenti e ai pezzi che l'hanno consacrata, come La noia e Che t'o dico a fa'.",
          "La band è quella consolidata del progetto Nina: chitarre, basso, batteria, tastiere e cori. La voce di Angelina è il centro dello show: il tour insiste molto sulla resa live degli arrangiamenti, con sezioni acustiche e momenti più ballabili che si alternano nell'arco della serata.",
        ],
        bullets: [
          "Durata stimata: circa 90-100 minuti di concerto",
          "Formazione: band live + cori",
          "Scaletta: brani da Nina + grandi singoli + La noia",
          "Pubblico: posto unico in piedi, energia da concerto estivo",
        ],
      },
      practicalInfo: {
        title: "Informazioni pratiche",
        paragraphs: [
          "Lo show inizia alle 21:00 di mercoledì 5 agosto 2026. Assisi va raggiunta con largo anticipo: il centro storico è in salita e il Piazzale Rocca Maggiore si trova nella parte alta della città, raggiungibile solo a piedi tramite scalinate. Calcola almeno 20-30 minuti dal parcheggio scelto al piazzale, in base alla posizione.",
          "L'estate ad Assisi è fresca la sera grazie all'altitudine, ma di giorno fa caldo: porta una giacca leggera o una felpa per il dopo-concerto. Scarpe comode sono indispensabili per le scalinate. Sono ammessi piccoli zaini, vietate bottiglie di vetro.",
        ],
        bullets: [
          "Apertura porte: orario non ancora comunicato",
          "Inizio concerto: ore 21:00",
          "Trasporti: stazione FS Assisi-Santa Maria degli Angeli + bus per il centro",
          "Salita finale: solo pedonale, prevedere scarpe comode",
          "Biglietto: PDF su smartphone o stampato, documento d'identità a portata di mano",
        ],
      },
      internalLinks: [
        {
          label: "Pooh allo Stadio Checcarini di Marsciano 2026",
          href: "/pooh-stadio-checcarini-marsciano-2026",
          description:
            "Un'altra grande data umbra dell'estate 2026: settori, prezzi e parcheggi consigliati a Marsciano.",
        },
        {
          label: "Salmo a Perugia per Umbria che Spacca",
          href: "/salmo-perugia-2026-umbria-che-spacca-biglietti",
          description:
            "L'altro grande appuntamento urban dell'estate umbra: lineup, biglietti e info pratiche.",
        },
        {
          label: "Come usare Carta Cultura per i concerti",
          href: "/carta-cultura-concerti-come-usarla",
          description:
            "Verifica se puoi usare il bonus per il tuo biglietto e segui i passaggi corretti per generare il buono.",
        },
        {
          label: "Nicolò Filippucci all'Arena 54 di Corciano",
          href: "/nicolo-filippucci-arena-54-corciano-2026-biglietti",
          description:
            "Un altro nome forte della scena italiana che fa tappa in Umbria nel 2026: orari e prezzi.",
        },
      ],
      sections: [
        {
          heading: "Assisi tappa simbolica del tour Nina",
          paragraphs: [
            "Le date estive di Nina canta nei Teatri d'Estate sono pensate come singoli eventi-cornice: ogni piazza italiana scelta ha una sua identità monumentale, e il pubblico paga per vivere la combinazione tra concerto e luogo. Assisi, con la Rocca Maggiore alle spalle del palco, è una delle cornici più richieste dal team del tour.",
            "Per i fan di Angelina, la versione estiva del concerto è quella più adatta a chi vuole vivere lo show in piedi e con un'energia diversa rispetto ai teatri al chiuso: meno sezioni acustiche, più momenti corali e ballabili.",
          ],
        },
        {
          heading: "Cosa vedere ad Assisi prima del concerto",
          paragraphs: [
            "Se arrivi nel pomeriggio, la passeggiata classica parte dalla Basilica di San Francesco (parte bassa della città), risale lungo via San Francesco, attraversa Piazza del Comune e prosegue per via San Rufino fino alla Cattedrale di San Rufino. Da lì la salita finale verso la Rocca Maggiore prende circa 15 minuti a piedi.",
            "Per cena, l'area intorno a Piazza del Comune e via Portica offre osterie con specialità umbre: torta al testo, strangozzi al tartufo, agnello alla brace. Conviene prenotare in anticipo, soprattutto nei giorni di concerto quando il centro si riempie rapidamente.",
          ],
          bullets: [
            "Basilica di San Francesco: parte bassa, ingresso libero",
            "Cattedrale di San Rufino: 10 min a piedi dalla Rocca",
            "Piazza del Comune: cuore del centro, con il Tempio di Minerva",
            "Rocca Minore: la fortezza gemella, panorama opposto",
          ],
        },
        {
          heading: "Treno o auto: come arrivare ad Assisi",
          paragraphs: [
            "La stazione di Assisi-Santa Maria degli Angeli si trova a circa 5 km dal centro storico ed è collegata da bus urbani frequenti (linea C). In treno da Roma ci vogliono circa 2h con il regionale + cambio a Foligno; da Firenze circa 2h30. Da Perugia il treno regionale impiega 25 minuti.",
            "In auto, da Roma si esce a Orte e si prosegue sulla E45 in direzione Cesena fino all'uscita Assisi (circa 2h totali). Da Firenze si percorre la E45 in direzione opposta. Tutti i parcheggi del centro sono segnalati: il Porta Nuova è il più funzionale per la maggior parte dei visitatori, mentre Piazza Matteotti è il più vicino alla Rocca Maggiore.",
          ],
        },
      ],
      faq: [
        {
          question: "A che ora inizia il concerto di Angelina Mango ad Assisi?",
          answer:
            "Il concerto è programmato per mercoledì 5 agosto 2026 alle ore 21:00 al Piazzale Rocca Maggiore. L'orario di apertura porte non è ancora stato comunicato: indicativamente conviene salire al piazzale entro le 19:30-20:00.",
        },
        {
          question: "Quanto costa il biglietto?",
          answer:
            "Il prezzo finale al checkout su Ticket Italia è €55,37 a biglietto per il posto unico. La composizione: €45,00 di tariffa base, €6,75 di diritti di prevendita e €3,62 di commissioni amministrative.",
        },
        {
          question: "Dove parcheggiare per il concerto al Piazzale Rocca Maggiore?",
          answer:
            "Il parcheggio più vicino è Piazza Matteotti, a circa 10 minuti di salita a piedi. In alternativa Porta Nuova (più funzionale ma a 20 min a piedi) e Porta Mojano (sotterraneo, 25 min). Porta San Giacomo è l'unico gratuito, a 15 min in salita.",
        },
        {
          question: "Il biglietto è elettronico o cartaceo?",
          answer:
            "Il biglietto è elettronico: viene inviato in formato PDF all'indirizzo email indicato in fase d'acquisto. Puoi mostrarlo da smartphone o stamparlo; porta sempre con te un documento d'identità.",
        },
        {
          question: "Cosa succede in caso di pioggia?",
          answer:
            "Il concerto si svolge regolarmente in caso di pioggia leggera, essendo un evento all'aperto senza copertura. Solo in caso di condizioni meteo estreme l'organizzazione AUCMA può comunicare rinvii o variazioni: controlla la scheda evento di Ticket Italia nelle ore precedenti.",
        },
      ],
      cta: {
        title: "Acquista i biglietti per Angelina Mango ad Assisi",
        text:
          "La data di Assisi del tour Nina canta nei Teatri d'Estate è una delle più richieste dell'estate umbra. Acquista subito su Ticket Italia per assicurarti il posto al Piazzale Rocca Maggiore il 5 agosto 2026.",
        label: "Acquista su Ticket Italia",
        href: "https://ticketitalia.com/angelina-mango-piazzale-rocca-maggiore-assisi-5-agosto-2026",
      },
    },
  },
  {
    slug: "maurizio-battista-barton-park-perugia-28-giugno-2026",
    title: "Maurizio Battista al Barton Park di Perugia il 28 giugno 2026: biglietti Tour 2025/26",
    excerpt:
      "Maurizio Battista porta il Tour 2025/26 al Barton Park di Perugia il 28 giugno 2026 alle 21:00. Platea €61,53 e Gradinata €43,07, prezzi finali al checkout su Ticket Italia.",
    category: "Teatro & Spettacoli",
    categorySlug: "teatro-spettacoli",
    subcategory: "Commedia",
    subcategorySlug: "commedia",
    type: "evento",
    status: "published",
    publishedAt: "2026-05-11",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["Maurizio Battista", "Cabaret", "Comicità", "Barton Park Perugia", "Tour 2025-2026"],
    date: "2026-05-11",
    readTime: "6 min",
    author: "Redazione Ticket Italia",
    image: "https://ticketitalia.com/image/cache/wp/gj/Mea%20nuove/Battista%202026-1500x1500.webp",
    body: {
      intro:
        "Maurizio Battista arriva al Barton Park di Perugia il 28 giugno 2026 alle ore 21:00 con il Tour 2025/26: una serata di stand-up sotto le stelle, nell'arena del parco urbano di Pian di Massiano. Biglietti su Ticket Italia: Platea a €61,53 e Gradinata a €43,07, prezzi finali al checkout con commissioni amministrative incluse.",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Stand-up comedy all'aperto nel grande parco urbano di Perugia, in formato arena con palco e settori distinti. Biglietteria attiva su Ticket Italia, formato elettronico via email.",
        bullets: [
          "Artista: Maurizio Battista — Tour 2025/26",
          "Location: Barton Park, Perugia",
          "Data: domenica 28 giugno 2026, ore 21:00",
          "Prezzi finali: Platea €61,53 — Gradinata €43,07",
          "Atmosfera: comedy all'aperto in parco urbano",
        ],
      },
      tickets: {
        title: "Biglietti Maurizio Battista al Barton Park — prezzi e settori",
        text:
          "Per la data di Perugia sono previsti due settori, con prezzo finale al checkout su Ticket Italia comprensivo di diritto di prevendita e commissioni amministrative. Il biglietto è elettronico (PDF via email): basta mostrare il QR code all'ingresso del parco.",
        bullets: [
          "Primo Settore Platea: €61,53 (prezzo finale al checkout, commissioni incluse)",
          "Secondo Settore Gradinata: €43,07 (prezzo finale al checkout, commissioni incluse)",
          "Formato: biglietto elettronico PDF via email",
          "Accesso: QR code da smartphone, non serve stampare",
          "Per biglietti accessibilità: contatta l'organizzatore con certificato di invalidità",
        ],
      },
      artistContext: {
        title: "Maurizio Battista: trent'anni di comicità romana",
        paragraphs: [
          "Maurizio Battista è uno dei comici romani più riconoscibili della scena italiana. Una carriera che attraversa decenni di televisione e teatro, costruita su un personaggio popolare, quotidiano, capace di trasformare il piccolo dettaglio della vita di tutti i giorni in materiale comico. La cifra è il monologo confidenziale: aneddoti, osservazioni sulla famiglia, sulla coppia, sulle abitudini italiane — raccontati con il ritmo lento del bar di quartiere.",
          "Il Tour 2025/26 prosegue il format teatrale che Battista porta avanti da anni: uno show di stand-up costruito sull'interazione con il pubblico, senza scenografie ingombranti, focalizzato sul rapporto diretto fra comico e platea. Al Barton Park, all'aperto e in arena, il contesto si presta a una serata leggera, perfetta per inaugurare l'estate perugina con una risata.",
        ],
        bullets: [
          "Carriera: oltre tre decenni tra televisione (Maurizio Costanzo Show, La Sai L'Ultima, Insegno) e teatro",
          "Stile: stand-up romano, osservazione del quotidiano, monologo familiare",
          "Tour 2025/26: format teatrale itinerante, serate a misura di pubblico generalista",
          "Pubblico tipo: famiglie, gruppi di amici, fan storici della tv generalista",
        ],
      },
      location: {
        title: "Barton Park: il parco urbano-arena di Perugia",
        venueType: "Parco urbano polifunzionale con teatro e arena all'aperto",
        experience:
          "Il Barton Park è un'oasi di 3 ettari nel cuore di Perugia, sviluppata come spazio polifunzionale che ospita un teatro e un'arena per eventi piccoli e grandi. Un percorso pedonale di oltre 1.200 metri completamente libero da barriere architettoniche attraversa il parco: significa che chiunque, indipendentemente dalla mobilità, può raggiungere il punto-arena senza ostacoli. Per uno show comico estivo è il contesto ideale, perché unisce l'informalità del parco urbano alla struttura tipica di un teatro all'aperto.",
        suitability:
          "Adatto al monologo comico: pochi fronzoli scenografici, foglie e cielo sopra il palco, distanza contenuta fra artista e pubblico nei settori frontali. La capienza distribuita su Platea e Gradinata permette di scegliere fra prima fila e visione d'insieme dall'alto.",
        atmosphere:
          "Serata estiva perugina, temperatura piacevole alla sera, ritmo informale e pubblico generalista. È il classico contesto da comedy all'aperto: si arriva con calma, ci si siede, ci si rilassa, si ride.",
        paragraphs: [
          "Il Barton Park nasce come spazio verde fruibile tutto l'anno e si attiva nei mesi estivi con una stagione di concerti, comedy, presentazioni di libri e format giornalistici (Stefano Nazzi, Roberta Bruzzone, Cristiano De André tra i nomi della stagione 2026). Per Maurizio Battista è la cornice giusta: lontano dai teatri formali, vicino alla cifra confidenziale dei suoi monologhi.",
        ],
        bullets: [
          "Tipo: parco urbano di 3 ettari con teatro e arena all'aperto",
          "Quartiere: Santa Lucia / Pian di Massiano, zona ovest di Perugia",
          "Accessibilità: percorso pedonale di 1.200 m senza barriere architettoniche",
          "Stagione: format estivi di comedy, concerti e incontri culturali",
        ],
        nearbyParking: [
          {
            name: "Parcheggio Pian di Massiano",
            distanceOnFoot: "4 min a piedi",
            type: "gratuito",
            notes: "Park & ride principale di Perugia, capienza molto ampia, collegato al Mini Metrò che porta in centro storico",
            mapsUrl: "https://www.google.com/maps/search/Parcheggio+Pian+di+Massiano+Perugia",
          },
          {
            name: "Piazzale Nando Martellini",
            distanceOnFoot: "6 min a piedi",
            type: "gratuito",
            mapsUrl: "https://www.google.com/maps/search/Piazzale+Nando+Martellini+Perugia",
          },
          {
            name: "Piazzale dell'Imbattibilità",
            distanceOnFoot: "7 min a piedi",
            type: "gratuito",
            mapsUrl: "https://www.google.com/maps/search/Piazzale+dell%27Imbattibilita+Perugia",
          },
        ],
        nearbyHotels: [
          {
            name: "Al Massiano",
            distanceOnFoot: "8 min a piedi",
            priceRange: "€",
            bookingUrl: "https://www.google.com/maps/search/Hotel+Al+Massiano+Perugia",
          },
          {
            name: "Il Cigno",
            distanceOnFoot: "16 min a piedi (o ~5 min in auto)",
            priceRange: "€€",
            bookingUrl: "https://www.google.com/maps/search/Il+Cigno+Hotel+Perugia",
          },
          {
            name: "Hotel Giò Wine & Jazz Area",
            distanceOnFoot: "16-17 min a piedi (o ~7 min in auto)",
            priceRange: "€€€",
            bookingUrl: "https://www.google.com/maps/search/Hotel+Gio+Perugia",
          },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dalla serata",
        paragraphs: [
          "Maurizio Battista non punta sull'effetto scenico: tutto lo show ruota attorno alla parola, ai tempi comici, al rapporto con il pubblico. La serata al Barton Park sarà uno stand-up classico, con il comico che alterna monologhi a momenti più diretti di interazione con la platea. Lo show dura circa 90 minuti, senza intervallo.",
        ],
        bullets: [
          "Formato: stand-up con monologhi, no spalla, no scenografia complessa",
          "Durata: circa 90 minuti senza intervallo",
          "Inizio: ore 21:00",
          "Apertura porte: anticipa di 30-45 minuti per trovare posto e parcheggio",
        ],
      },
      practicalInfo: {
        title: "Come arrivare e informazioni pratiche",
        paragraphs: [
          "Il Barton Park è all'interno del parco urbano di Perugia, raggiungibile in auto e a piedi dal centro città. La viabilità nei giorni di evento può cambiare: nei giorni precedenti il concerto controlla la pagina evento su Ticket Italia per eventuali comunicazioni ufficiali. Il biglietto è elettronico, lo ricevi in PDF dopo l'acquisto e mostri il QR code all'ingresso.",
        ],
        bullets: [
          "Biglietto: PDF elettronico via email, QR code all'ingresso",
          "Apertura porte: anticipata rispetto alle 21:00",
          "Show all'aperto: porta una giacca leggera per la sera",
          "Per accessibilità: contatta l'organizzatore con certificato di invalidità prima dell'acquisto",
        ],
      },
      internalLinks: [
        {
          label: "Valentina Persia al Teatro Lyrick",
          href: "/articoli/valentina-persia-teatro-lyrick-santa-maria-degli-angeli-23-maggio-2026",
          description: "Un'altra serata di comicità in Umbria, stessa stagione, format teatrale.",
        },
        {
          label: "Salmo a Perugia (Umbria Che Spacca)",
          href: "/articoli/salmo-perugia-2026-umbria-che-spacca-biglietti",
          description: "Il festival che anima l'estate perugina con i grandi nomi della musica.",
        },
        {
          label: "Come usare Carta Cultura per gli eventi",
          href: "/come-usare-carta-cultura-carta-docente-biglietti-eventi",
          description: "Se hai diritto al bonus, verifica se è compatibile prima di acquistare.",
        },
      ],
      sections: [
        {
          heading: "Perché è una serata da non perdere",
          paragraphs: [
            "Battista al Barton Park è una di quelle serate fatte apposta per spegnere il telefono e lasciarsi andare per un'ora e mezza. Niente coreografie, niente effetti — solo una voce romana riconoscibile e una platea che lo accompagna a tempo. È l'inaugurazione estiva ideale per chi ha bisogno di una pausa dalla velocità del lavoro o dei feed.",
          ],
        },
        {
          heading: "Consigli pratici per la serata",
          paragraphs: [
            "Arriva con almeno 30 minuti di anticipo: il parco si raggiunge a piedi attraversando il percorso pedonale di 1,2 km, quindi calcola tempi reali e non solo distanza in mappa. Le serate estive perugine sono fresche dopo il tramonto: una giacca leggera o una felpa torna sempre utile. Il biglietto è elettronico: scaricalo dalla mail prima di uscire di casa, così non dipendi dalla connessione dati in zona.",
          ],
          bullets: [
            "Arriva 30 minuti prima dell'inizio",
            "Porta una giacca leggera: la sera al parco rinfresca",
            "Scarica il PDF del biglietto prima di partire",
            "Verifica viabilità sul sito del Comune di Perugia nei giorni precedenti",
          ],
        },
      ],
      faq: [
        {
          question: "A che ora inizia lo spettacolo di Maurizio Battista al Barton Park?",
          answer:
            "Lo show inizia alle 21:00 di domenica 28 giugno 2026. Le porte aprono in anticipo: consiglio di arrivare almeno 30 minuti prima.",
        },
        {
          question: "Quanto costano i biglietti?",
          answer:
            "Il prezzo finale al checkout su Ticket Italia è €61,53 per il Primo Settore Platea e €43,07 per il Secondo Settore Gradinata, comprensivo di diritto di prevendita e commissioni amministrative.",
        },
        {
          question: "Il biglietto è elettronico?",
          answer:
            "Sì, è un PDF inviato all'indirizzo email indicato in fase d'acquisto. Mostri il QR code all'ingresso, da smartphone o stampato — non è obbligatorio stamparlo.",
        },
        {
          question: "Dove si trova il Barton Park?",
          answer:
            "Il Barton Park è un parco urbano di 3 ettari a Perugia, con un percorso pedonale di 1.200 metri accessibile e senza barriere architettoniche. Per la viabilità e i parcheggi del giorno dell'evento consulta la pagina evento di Ticket Italia.",
        },
      ],
      cta: {
        title: "Acquista i biglietti per Maurizio Battista al Barton Park",
        text:
          "Stand-up di Maurizio Battista al Barton Park di Perugia il 28 giugno 2026, ore 21:00. Acquista subito su Ticket Italia: Platea €61,53 o Gradinata €43,07, prezzi finali al checkout.",
        label: "Acquista su Ticket Italia",
        href: "https://ticketitalia.com/maurizio-battista-barton-park-perugia-28-giugno-2026",
      },
    },
  },
  {
    slug: "valentina-persia-teatro-lyrick-santa-maria-degli-angeli-23-maggio-2026",
    title: "Valentina Persia 'Nata con la Guepiere' al Teatro Lyrick il 23 maggio 2026",
    excerpt:
      "Valentina Persia porta 'Nata con la Guepiere' al Teatro Lyrick di Santa Maria degli Angeli (Assisi) il 23 maggio 2026: prezzi finali al checkout da €36,92 a €49,22 su Ticket Italia.",
    category: "Teatro & Spettacoli",
    categorySlug: "teatro-spettacoli",
    subcategory: "Commedia",
    subcategorySlug: "commedia",
    type: "evento",
    status: "published",
    publishedAt: "2026-05-11",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["Valentina Persia", "Cabaret", "Commedia", "Teatro Lyrick", "Santa Maria degli Angeli"],
    date: "2026-05-11",
    readTime: "5 min",
    author: "Redazione Ticket Italia",
    image: "https://ticketitalia.com/image/cache/wp/gj/Mea%20nuove/valentina%20Persia-1500x1500.webp",
    body: {
      intro:
        "Valentina Persia porta lo spettacolo 'Nata con la Guepiere' al Teatro Lyrick di Santa Maria degli Angeli, frazione di Assisi, sabato 23 maggio 2026 alle 21:00. Tre settori, prezzi finali al checkout su Ticket Italia: Primo €49,22, Secondo €43,07, Terzo €36,92 (commissioni amministrative incluse).",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Serata di stand-up al femminile in una delle venue più note dell'Umbria, con tre fasce di prezzo per scegliere posizione e visuale.",
        bullets: [
          "Artista: Valentina Persia",
          "Spettacolo: 'Nata con la Guepiere'",
          "Location: Teatro Lyrick, S. Maria degli Angeli (PG)",
          "Data: sabato 23 maggio 2026, ore 21:00",
          "Prezzi finali: dal Primo Settore €49,22 al Terzo Settore €36,92",
        ],
      },
      tickets: {
        title: "Biglietti Valentina Persia al Teatro Lyrick — prezzi e settori",
        text:
          "Per questa data il Lyrick è configurato su tre settori con visibilità decrescente dal palco. I prezzi finali al checkout su Ticket Italia includono diritto di prevendita e commissioni amministrative. Biglietto elettronico (PDF via email): non serve stamparlo.",
        bullets: [
          "Primo Settore: €49,22 (prezzo finale al checkout, commissioni incluse)",
          "Secondo Settore: €43,07 (prezzo finale al checkout, commissioni incluse)",
          "Terzo Settore: €36,92 (prezzo finale al checkout, commissioni incluse)",
          "Formato: PDF inviato via email, QR code all'ingresso",
          "Per disabilità: contatta l'organizzatore allegando certificato di invalidità",
        ],
      },
      artistContext: {
        title: "Valentina Persia: dalla televisione al teatro",
        paragraphs: [
          "Valentina Persia è una delle voci più riconoscibili della comicità italiana al femminile. La sua carriera passa per la televisione (Bagaglino, Zelig, partecipazioni a reality e talent) e si è poi spostata stabilmente sul palco teatrale, dove costruisce monologhi che intrecciano osservazioni sulla vita quotidiana, sulla coppia, sulle dinamiche familiari.",
          "'Nata con la Guepiere' è uno spettacolo che gioca sul confine fra autobiografia comica e racconto generazionale: l'idea della 'donna nata con un certo abito' diventa il filo conduttore per attraversare aneddoti, ricordi e una galleria di personaggi messi insieme in trent'anni di mestiere.",
        ],
        bullets: [
          "Stile: monologo comico-narrativo con momenti musicali",
          "Cifra: autobiografia, sguardo sulla coppia, racconto generazionale",
          "Carriera: dal Bagaglino a Zelig, dal varietà al teatro",
        ],
      },
      location: {
        title: "Teatro Lyrick: il punto di riferimento per spettacoli e concerti in Umbria",
        venueType: "Teatro polifunzionale al chiuso, sede di concerti, prosa e comedy",
        experience:
          "Il Teatro Lyrick di Santa Maria degli Angeli (frazione di Assisi) è una delle venue più attive dell'Umbria, con una stagione che mescola comedy, musical, concerti e spettacoli di prosa. La struttura moderna è pensata per ospitare grandi nomi della scena italiana: nel 2026 calendario ricco con Brunori Sas, Fiorella Mannoia, Marco Travaglio, oltre allo spettacolo di Valentina Persia.",
        suitability:
          "Adatto allo stand-up perché la disposizione frontale e la suddivisione in tre settori permettono al comico di lavorare sul rapporto diretto con la platea, mantenendo una visuale buona anche dai settori più lontani. L'acustica chiusa amplifica la voce senza bisogno di forzature.",
        atmosphere:
          "Atmosfera di teatro contemporaneo, formale ma non rigida. Il pubblico tipo del Lyrick è generalista, abitudinario, fedele alle stagioni teatrali umbre.",
        paragraphs: [
          "Santa Maria degli Angeli è la frazione di Assisi che sorge ai piedi del colle, attorno alla Basilica di Santa Maria degli Angeli. Il Teatro Lyrick è raggiungibile facilmente in auto dalla SS75 (uscita Santa Maria degli Angeli) ed è collegato in pochi minuti con il centro storico di Assisi via bus o auto.",
        ],
        bullets: [
          "Indirizzo: Viale Gabriele D'Annunzio, 06081 Santa Maria degli Angeli (PG)",
          "Tipo: teatro polifunzionale, configurazione frontale a tre settori",
          "Stagione 2026: comedy, concerti, musical e prosa",
          "Accesso: SS75 uscita Santa Maria degli Angeli; stazione FS Assisi-S.M. degli Angeli a pochi minuti",
        ],
        nearbyParking: [
          {
            name: "Piazzale Guido Donegani",
            distanceOnFoot: "4 min a piedi",
            type: "a pagamento",
            notes: "Tariffa da verificare in loco — parcheggio urbano in zona, il più vicino al teatro",
            mapsUrl: "https://www.google.com/maps/search/Piazzale+Guido+Donegani+Santa+Maria+degli+Angeli",
          },
          {
            name: "Parcheggio Stazione (Santa Maria degli Angeli)",
            distanceOnFoot: "5 min a piedi",
            type: "a pagamento",
            notes: "Adiacente alla stazione FS Assisi-S.M. degli Angeli, comodo per chi arriva in treno",
            mapsUrl: "https://www.google.com/maps/search/Parcheggio+Stazione+Santa+Maria+degli+Angeli",
          },
          {
            name: "Piazzale Tarpani",
            distanceOnFoot: "17 min a piedi (o ~3 min in auto)",
            type: "gratuito",
            notes: "Alternativa gratuita più distante, utile se i parcheggi più vicini sono pieni",
            mapsUrl: "https://www.google.com/maps/search/Piazzale+Tarpani+Santa+Maria+degli+Angeli",
          },
        ],
        nearbyHotels: [
          {
            name: "Domus Pacis",
            distanceOnFoot: "9 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://www.domuspacis.it/",
          },
          {
            name: "Hotel Le Stuoie",
            distanceOnFoot: "10 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://www.google.com/maps/search/Hotel+Le+Stuoie+Santa+Maria+degli+Angeli",
          },
          {
            name: "Hotel Antonelli",
            distanceOnFoot: "11 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://www.assisihotelantonelli.it/",
          },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dallo spettacolo",
        paragraphs: [
          "'Nata con la Guepiere' è uno show di stand-up con inserti narrativi, con cambi di ritmo fra il monologo classico e momenti più costruiti. Lo spettacolo ha una durata standard da teatro (intorno ai 90 minuti) e gioca molto sul rapporto con il pubblico: aspettati momenti di interazione, soprattutto dai settori frontali.",
        ],
        bullets: [
          "Formato: stand-up con inserti narrativi e momenti di interazione",
          "Durata: circa 90 minuti",
          "Inizio: ore 21:00",
          "Pubblico: generalista, adulto",
        ],
      },
      practicalInfo: {
        title: "Come arrivare e informazioni pratiche",
        paragraphs: [
          "Il Teatro Lyrick è in zona Santa Maria degli Angeli, frazione di Assisi a pochi minuti dall'uscita SS75. Per chi arriva in treno, la stazione di Assisi-Santa Maria degli Angeli è a circa 5-10 minuti a piedi. Il biglietto è elettronico: lo ricevi in PDF dopo l'acquisto e mostri il QR code all'ingresso, da smartphone o stampato.",
        ],
        bullets: [
          "In auto: SS75 uscita Santa Maria degli Angeli",
          "In treno: stazione Assisi-Santa Maria degli Angeli, a breve distanza dal teatro",
          "Biglietto: PDF elettronico via email, QR code all'ingresso",
          "Inizio show: ore 21:00",
        ],
      },
      internalLinks: [
        {
          label: "Maurizio Battista al Barton Park di Perugia",
          href: "/articoli/maurizio-battista-barton-park-perugia-28-giugno-2026",
          description: "Un altro nome della comedy nazionale in Umbria, sempre stagione 2026.",
        },
        {
          label: "Angelina Mango ad Assisi (Rocca Maggiore)",
          href: "/articoli/angelina-mango-piazzale-rocca-maggiore-assisi-5-agosto-2026",
          description: "Stesso comune, format diverso: concerto outdoor al Piazzale Rocca Maggiore.",
        },
        {
          label: "Come usare Carta Cultura per gli eventi",
          href: "/come-usare-carta-cultura-carta-docente-biglietti-eventi",
          description: "Verifica se puoi usare il bonus prima dell'acquisto del biglietto.",
        },
      ],
      sections: [
        {
          heading: "Perché vale la pena vederla dal vivo",
          paragraphs: [
            "Valentina Persia in televisione è una macchietta riconoscibile; a teatro lavora su un materiale più stratificato, in cui la comicità diventa anche racconto. 'Nata con la Guepiere' è il formato in cui dà il meglio: tempi teatrali, monologhi più lunghi, vere pause comiche — cose che il varietà televisivo non lascia mai respirare.",
          ],
        },
        {
          heading: "Quale settore scegliere",
          paragraphs: [
            "Il Primo Settore (€49,22) è la scelta naturale per chi vuole l'interazione diretta e la visione frontale del palco. Il Secondo (€43,07) mantiene una visuale ottima e abbassa il prezzo. Il Terzo (€36,92) è la fascia più economica, comunque dentro un teatro con buona acustica: chi ha sentito Persia dal vivo sa che la voce arriva ovunque senza problemi.",
          ],
        },
      ],
      faq: [
        {
          question: "Quando inizia lo spettacolo di Valentina Persia al Lyrick?",
          answer:
            "Lo show inizia alle 21:00 di sabato 23 maggio 2026. Le porte aprono in anticipo: consiglio di arrivare almeno 20-30 minuti prima per entrare con calma.",
        },
        {
          question: "Quanto costano i biglietti?",
          answer:
            "Prezzo finale al checkout su Ticket Italia: Primo Settore €49,22, Secondo Settore €43,07, Terzo Settore €36,92. Commissioni amministrative e diritto di prevendita inclusi.",
        },
        {
          question: "Dove si trova il Teatro Lyrick?",
          answer:
            "Il Teatro Lyrick è a Santa Maria degli Angeli, frazione di Assisi, in Umbria. Si raggiunge in auto dalla SS75 (uscita Santa Maria degli Angeli) o in treno (stazione Assisi-S.M. degli Angeli a breve distanza).",
        },
        {
          question: "Il biglietto è cartaceo o elettronico?",
          answer:
            "Elettronico: PDF inviato via email all'indirizzo indicato in fase d'acquisto. Puoi mostrarlo da smartphone o stamparlo, ma stampare non è obbligatorio.",
        },
      ],
      cta: {
        title: "Acquista i biglietti per Valentina Persia al Teatro Lyrick",
        text:
          "Stand-up di Valentina Persia al Teatro Lyrick di Santa Maria degli Angeli, sabato 23 maggio 2026. Acquista subito su Ticket Italia: tre settori, prezzi finali al checkout da €36,92.",
        label: "Acquista su Ticket Italia",
        href: "https://ticketitalia.com/valentina-persia-teatro-lyrick-s-maria-degli-angeli-23-maggio-2026",
      },
    },
  },
  {
    slug: "litfiba-giardini-del-frontone-perugia-umbria-che-spacca-27-giugno-2026",
    title: "Litfiba a Umbria Che Spacca: 27 giugno 2026 ai Giardini del Frontone (sold out)",
    excerpt:
      "Litfiba ai Giardini del Frontone di Perugia per Umbria Che Spacca, sabato 27 giugno 2026 dalle 19:30. Posto unico €61,53 finale al checkout — evento sold out su Ticket Italia.",
    category: "Eventi & Festival",
    categorySlug: "eventi-festival",
    subcategory: "Festival musicali",
    subcategorySlug: "festival-musicali",
    type: "evento",
    status: "published",
    publishedAt: "2026-05-11",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["Litfiba", "Umbria che Spacca", "Frontone", "Perugia", "Festival", "Rock italiano"],
    date: "2026-05-11",
    readTime: "7 min",
    author: "Redazione Ticket Italia",
    image: "https://ticketitalia.com/image/cache/wp/gj/UMBRIA%20CHE%20SPACCA/Litfiba_Manifesto-1500x1500.webp",
    body: {
      intro:
        "I Litfiba sono headliner di una delle serate più attese di Umbria Che Spacca 2026: sabato 27 giugno ai Giardini del Frontone di Perugia, apertura cancelli ore 19:30, salita sul palco prevista per le 21:00. Posto unico €61,53 finale al checkout (€50,00 base + €7,50 prevendita + €4,03 commissioni amministrative). La data è già SOLD OUT su Ticket Italia.",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Una delle serate-bandiera del festival perugino. Tutto esaurito: monitora la pagina evento per eventuali rilasci di biglietti o nuove disponibilità.",
        bullets: [
          "Artista: Litfiba",
          "Festival: Umbria Che Spacca 2026",
          "Location: Giardini del Frontone, Perugia",
          "Data: sabato 27 giugno 2026, apertura ore 19:30",
          "Prezzo finale al checkout: €61,53 (posto unico)",
          "Stato: evento sold out",
        ],
      },
      tickets: {
        title: "Biglietti Litfiba al Frontone — prezzi e stato vendita",
        text:
          "Per la data di Perugia è prevista un'unica tipologia di biglietto, posto unico, con prezzo finale €61,53 al checkout (€50,00 prezzo base + €7,50 diritto di prevendita + €4,03 commissioni amministrative). I biglietti sono esauriti; per disponibilità last-minute monitora la pagina evento ufficiale.",
        bullets: [
          "Posto unico - Intero (base): €50,00",
          "Diritto di prevendita: €7,50",
          "Commissioni amministrative: €4,03",
          "Totale finale al checkout: €61,53",
          "Stato: sold out (verifica la pagina evento per rilasci dell'ultimo minuto)",
          "Formato: biglietto elettronico PDF via email",
        ],
      },
      artistContext: {
        title: "Litfiba: la band-simbolo del rock italiano",
        paragraphs: [
          "I Litfiba sono una delle band più importanti del rock italiano. Fondati a Firenze nel 1980 da Piero Pelù e Ghigo Renzulli, hanno attraversato quattro decenni segnando la storia musicale del Paese con dischi come 17 Re, El Diablo, Terremoto, Spirito. La loro carriera ha conosciuto separazioni, ritorni e cambi di formazione, sempre con il filo conduttore di un rock energico e politicamente schierato.",
          "Per Umbria Che Spacca 2026 la band torna in Umbria con uno show ad alto impatto: scaletta che alterna i grandi successi storici alle uscite più recenti, produzione luce e suono pensata per il contesto outdoor del Frontone.",
        ],
        bullets: [
          "Fondati a Firenze nel 1980 (Piero Pelù, Ghigo Renzulli)",
          "Album simbolo: 17 Re, El Diablo, Terremoto, Spirito",
          "Stile: rock italiano, testi politicamente schierati",
          "Pubblico: trasversale, dai fan storici alle nuove generazioni",
        ],
      },
      location: {
        title: "Giardini del Frontone: l'anima verde di Perugia",
        venueType: "Giardini storici all'aperto, location iconica di Perugia per eventi estivi",
        experience:
          "I Giardini del Frontone sono il polmone verde e culturale di Perugia. Situati nel cuore della città, d'estate si trasformano in un anfiteatro naturale: il verde degli alberi fa da cornice ai suoni, le mura storiche creano acustica naturale, il centro città palpita a pochi metri di distanza. Capienza intorno alle 15.000 persone in configurazione festival.",
        suitability:
          "Perfetto per il rock dei Litfiba: spazio aperto, pubblico che si muove, energia che si espande senza vincoli di pareti riflettenti. La conformazione del terreno aiuta visibilità e acustica da quasi tutti i punti del prato.",
        atmosphere:
          "Notte d'estate perugina, mura del centro storico tutto attorno, pubblico multigenerazionale. È una delle cornici più riconoscibili dei festival italiani estivi.",
        paragraphs: [
          "I Giardini del Frontone hanno una storia di concerti leggendari e momenti culturali che hanno segnato Perugia. Per i Litfiba è il contesto perfetto: rock italiano in una piazza aperta, sotto un cielo che sa di estate, in una città che la musica la vive senza filtri.",
        ],
        bullets: [
          "Acustica: naturale, amplificata da colline e mura storiche",
          "Capienza: circa 15.000 persone in configurazione festival",
          "Posizione: centro storico di Perugia, raggiungibile a piedi",
          "Atmosfera: informale, partecipativa, tipica dei festival estivi",
        ],
        locationImage:
          "https://ticketitalia.com/image/cache/wp/gj/Luoghi%20banner/Giardini%20del%20Frontone%20Perugia%20(1)-1400x300.webp",
        nearbyParking: [
          {
            name: "Parcheggio Piazza Partigiani",
            distanceOnFoot: "10 min a piedi",
            type: "a pagamento",
            notes: "Parcheggio custodito con scale mobili verso il centro storico",
            mapsUrl: "https://maps.google.com/?q=Parcheggio+Piazza+Partigiani+Perugia",
          },
          {
            name: "Parcheggio Piazzale Europa",
            distanceOnFoot: "12 min a piedi",
            type: "a pagamento",
            notes: "Parcheggio custodito con scale mobili, vicino agli accessi al centro",
            mapsUrl: "https://maps.google.com/?q=Parcheggio+Piazzale+Europa+Perugia",
          },
          {
            name: "Parcheggio Mercato Coperto",
            distanceOnFoot: "8 min a piedi",
            type: "a pagamento",
            notes: "Parcheggio con ascensore, posizione comoda per raggiungere il Frontone",
            mapsUrl: "https://maps.google.com/?q=Parcheggio+Mercato+Coperto+Perugia",
          },
        ],
        nearbyHotels: [
          {
            name: "Sina Brufani",
            distanceOnFoot: "5 min a piedi",
            priceRange: "€€€",
            bookingUrl: "https://www.sinahotels.com/it/h/brufani-palace-perugia/",
          },
          {
            name: "Sangallo Palace Hotel",
            distanceOnFoot: "5 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://www.sangallopalace.it/",
          },
          {
            name: "Chocohotel",
            distanceOnFoot: "20 min a piedi",
            priceRange: "€",
            bookingUrl: "https://www.chocohotel.it/",
          },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dalla serata",
        paragraphs: [
          "I Litfiba al Frontone significano due ore di scaletta-bandiera del rock italiano: dai pezzi storici come 'Eroi nel vento', 'El Diablo', 'Tex' ai brani più recenti. Salita sul palco prevista per le 21:00, con possibili opening act fra le 19:30 e l'ingresso della band. Il pubblico è trasversale: vecchi fan, gente che arriva per i classici, nuove generazioni a scoprirli dal vivo.",
        ],
        bullets: [
          "Apertura cancelli: ore 19:30",
          "Inizio show Litfiba: ore 21:00 (orario indicativo)",
          "Durata: circa 100-120 minuti",
          "Pubblico: multigenerazionale, energico",
        ],
      },
      practicalInfo: {
        title: "Come arrivare e informazioni pratiche",
        paragraphs: [
          "I Giardini del Frontone sono nel centro storico di Perugia. L'auto è la scelta tipica per chi viene da fuori: lascia il mezzo nei parcheggi di scambio (Piazza Partigiani, Piazzale Europa, Mercato Coperto) e raggiungi i giardini in 8-12 minuti a piedi tramite scale mobili. Il biglietto è elettronico: PDF via email, QR code all'ingresso.",
        ],
        bullets: [
          "Parcheggi: Piazza Partigiani, Piazzale Europa, Mercato Coperto (tutti a pagamento)",
          "Da fuori Perugia: E45 o Raccordo Perugia-Bettolle, uscita Perugia centro",
          "Biglietto: PDF elettronico via email, QR code all'ingresso",
          "Apertura cancelli: ore 19:30",
          "Inizio Litfiba: ore 21:00",
        ],
      },
      internalLinks: [
        {
          label: "Salmo a Umbria Che Spacca",
          href: "/articoli/salmo-perugia-2026-umbria-che-spacca-biglietti",
          description: "Un'altra serata-bandiera del festival 2026 al Frontone.",
        },
        {
          label: "Ermal Meta a Perugia (Afterlife Live Club)",
          href: "/articoli/ermal-meta-perugia-2026-biglietti-afterlife-live-club",
          description: "Format raccolto in club, opposto rispetto al Frontone open-air.",
        },
        {
          label: "Come usare Carta Cultura per i concerti",
          href: "/carta-cultura-concerti-come-usarla",
          description: "Verifica se puoi usare il bonus per il tuo biglietto del festival.",
        },
      ],
      sections: [
        {
          heading: "Perché Litfiba al Frontone è un appuntamento speciale",
          paragraphs: [
            "Il Frontone non è uno stadio: è una piazza-giardino con mura storiche tutto attorno. I Litfiba in una cornice così sono quello che la band è sempre stata: rock italiano dentro la città, non in un'arena anonima. La scaletta del 2026 punta sui classici e i pezzi recenti, ma è il contesto a fare la differenza.",
          ],
        },
        {
          heading: "Cosa fare se è sold out",
          paragraphs: [
            "Se sei arrivato all'evento dopo l'esaurimento dei biglietti, le opzioni concrete sono due: monitorare la pagina evento su Ticket Italia per eventuali rilasci dell'ultimo minuto (a volte arrivano biglietti restituiti) e verificare gli altri appuntamenti di Umbria Che Spacca 2026 ancora disponibili. Evita i circuiti di rivendita non ufficiali: prezzo gonfiato e zero garanzie.",
          ],
          bullets: [
            "Monitora la pagina evento su Ticket Italia per rilasci last-minute",
            "Esplora gli altri concerti del festival per date alternative",
            "Evita la rivendita non ufficiale: nessuna garanzia di validità del biglietto",
          ],
        },
      ],
      faq: [
        {
          question: "Quanto costa il biglietto Litfiba al Frontone?",
          answer:
            "Il prezzo finale al checkout su Ticket Italia è €61,53 per il posto unico. La composizione: €50,00 prezzo base, €7,50 diritto di prevendita, €4,03 commissioni amministrative.",
        },
        {
          question: "L'evento è ancora disponibile?",
          answer:
            "No, attualmente è SOLD OUT su Ticket Italia. Per eventuali rilasci dell'ultimo minuto controlla la pagina evento nelle ore precedenti al concerto.",
        },
        {
          question: "A che ora aprono i cancelli e quando salgono sul palco i Litfiba?",
          answer:
            "Cancelli aperti dalle 19:30. La band sale sul palco intorno alle 21:00 (orario indicativo, possibili opening act in mezzo).",
        },
        {
          question: "Dove parcheggiare?",
          answer:
            "I parcheggi consigliati sono Piazza Partigiani, Piazzale Europa e Mercato Coperto: tutti a pagamento, custoditi, con scale mobili o ascensori verso il centro storico. Distanza a piedi dai giardini: 8-12 minuti.",
        },
      ],
      cta: {
        title: "Scopri il programma di Umbria Che Spacca su Ticket Italia",
        text:
          "Il concerto Litfiba al Frontone del 27 giugno 2026 è sold out: controlla la pagina evento per eventuali rilasci e scopri gli altri appuntamenti del festival.",
        label: "Vai alla pagina evento su Ticket Italia",
        href: "https://ticketitalia.com/litfiba-giardini-del-frontone-perugia-umbria-che-spacca-27-giugno-2026",
      },
    },
  },
  {
    slug: "perugia-flower-show-villa-colle-del-cardinale-23-24-maggio-2026",
    title: "Perugia Flower Show 2026: mostra mercato a Villa del Colle del Cardinale, 23-24 maggio",
    excerpt:
      "Perugia Flower Show torna a Villa del Colle del Cardinale il 23 e 24 maggio 2026: mostra mercato di piante rare e inconsuete, corsi e laboratori. Biglietto intero €11,00 finale al checkout.",
    category: "Eventi & Festival",
    categorySlug: "eventi-festival",
    subcategory: "Eventi culturali",
    subcategorySlug: "eventi-culturali",
    type: "evento",
    status: "published",
    publishedAt: "2026-05-11",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["Perugia Flower Show", "Mostra mercato", "Piante rare", "Villa Colle del Cardinale", "Botanica"],
    date: "2026-05-11",
    readTime: "5 min",
    author: "Redazione Ticket Italia",
    image: "https://ticketitalia.com/image/cache/wp/gj/Flower%20Show/PERUGIA%20(002)-1500x1500.webp",
    body: {
      intro:
        "Perugia Flower Show torna nel weekend del 23 e 24 maggio 2026 a Villa del Colle del Cardinale: due giorni di mostra mercato dedicati a piante rare e inconsuete, con corsi di giardinaggio, seminari tematici e laboratori creativi. Biglietto giornaliero intero a €11,00 finale al checkout su Ticket Italia (€10,00 base + commissioni).",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Weekend florovivaistico in una delle residenze d'epoca più note dell'Umbria. Mostra mercato + eventi collaterali gratuiti inclusi nel biglietto d'ingresso.",
        bullets: [
          "Evento: Perugia Flower Show 2026 — mostra mercato piante rare e inconsuete",
          "Location: Villa del Colle del Cardinale, Perugia",
          "Date: sabato 23 e domenica 24 maggio 2026",
          "Biglietto: intero €11,00 finale al checkout su Ticket Italia",
          "Inclusi: corsi di giardinaggio, seminari, laboratori",
        ],
      },
      tickets: {
        title: "Biglietti Perugia Flower Show — prezzo e cosa è incluso",
        text:
          "Per Perugia Flower Show 2026 è prevista un'unica tipologia di biglietto giornaliero, con prezzo finale al checkout €11,00 (€10,00 base + commissioni). Il biglietto include l'accesso alla mostra mercato e a tutti gli eventi collaterali gratuiti (corsi, seminari, laboratori). Per chi vuole partecipare a entrambe le giornate è disponibile l'abbonamento 2 giorni — controlla la pagina evento per il prezzo.",
        bullets: [
          "Biglietto intero giornaliero: €11,00 (prezzo finale al checkout)",
          "Inclusi: mostra mercato + corsi di giardinaggio + seminari + laboratori creativi",
          "Formato: biglietto elettronico PDF via email",
          "Accesso: QR code da smartphone al controllo accessi",
          "Abbonamento 2 giorni disponibile sulla pagina evento Ticket Italia",
        ],
      },
      artistContext: {
        title: "Perugia Flower Show: un appuntamento per appassionati di botanica",
        paragraphs: [
          "Perugia Flower Show è una manifestazione florovivaistica specializzata che si distingue dalla mostra mercato generalista: il focus è sulle piante rare e inconsuete, cioè specie poco diffuse nei vivai commerciali, varietà botaniche di nicchia, esemplari da collezione. Per chi si occupa di giardinaggio amatoriale o di paesaggismo, è una delle poche occasioni in Italia centrale per trovare materiale botanico difficile da reperire altrimenti.",
          "Il programma collaterale è ricco quanto la mostra: corsi di giardinaggio per principianti e per esperti, seminari tematici condotti da agronomi e paesaggisti, laboratori creativi adatti anche a chi vuole avvicinarsi al verde senza basi pregresse.",
        ],
        bullets: [
          "Format: mostra mercato di piante rare e inconsuete",
          "Pubblico: appassionati di botanica, hobbisti, paesaggisti, neofiti curiosi",
          "Programma: vendita piante + corsi + seminari + laboratori",
        ],
      },
      location: {
        title: "Villa del Colle del Cardinale: dimora storica per la mostra",
        venueType: "Villa monumentale del Cinquecento, residenza d'epoca e spazio museale",
        experience:
          "Villa del Colle del Cardinale è la più nota tra i complessi residenziali umbri di epoca cinquecentesca. Una dimora storica prestigiosa, oggi anche luogo museale e sede di eventi ed esposizioni temporanee: la cornice ideale per una mostra mercato florovivaistica come il Flower Show, perché unisce architettura monumentale e spazi verdi.",
        suitability:
          "Lo spazio della villa permette di articolare la mostra fra giardini e padiglioni, con percorsi che alternano esposizione di piante, banchi di vendita, aree per i corsi e i laboratori. La conformazione del Colle del Cardinale è naturalmente adatta a una manifestazione botanica: terreno, vegetazione, prospettive.",
        atmosphere:
          "Atmosfera da weekend culturale all'aperto, pubblico misto fra appassionati e famiglie. Il maggio umbro è la stagione perfetta per visitare una villa così, tra fioriture e clima ancora mite.",
        paragraphs: [
          "La villa fu costruita nella metà del Cinquecento e nel tempo ha cambiato uso: dimora privata, struttura agricola, oggi luogo destinato alla fruizione culturale. Per Perugia Flower Show l'incontro funziona da entrambe le parti: la villa offre la cornice monumentale, la mostra le dà un programma di pubblico vivo.",
        ],
        bullets: [
          "Tipo: villa monumentale cinquecentesca, residenza d'epoca",
          "Funzione: luogo museale, sede eventi ed esposizioni temporanee",
          "Indirizzo: Strada Provinciale 171 di Colle del Cardinale, 06133 Colle Umberto (PG)",
          "Contesto: zona rurale collinare a nord di Perugia, raggiungibile in auto",
        ],
        nearbyParking: [
          {
            name: "Parcheggi temporanei dell'evento (lungo SP 171)",
            distanceOnFoot: "0-5 min a piedi",
            type: "gratuito",
            notes: "Aree di parcheggio allestite dall'organizzazione del Flower Show nei giorni della manifestazione — segui le indicazioni sulla SP 171 e i cartelli dell'evento",
            mapsUrl: "https://www.google.com/maps/search/Villa+del+Colle+del+Cardinale+Perugia",
          },
          {
            name: "Posteggi lungo la SP 171 di Colle del Cardinale",
            distanceOnFoot: "5-15 min a piedi a seconda del punto",
            type: "gratuito",
            notes: "Parcheggi su strada nelle vicinanze della villa, in zona rurale — verifica i divieti e i giorni della manifestazione",
            mapsUrl: "https://www.google.com/maps/search/SP+171+Colle+del+Cardinale+Perugia",
          },
        ],
        nearbyHotels: [
          {
            name: "Agriturismo Casale dei Dotti",
            distanceOnFoot: "~17 min a piedi (consigliata auto, ~3 min)",
            priceRange: "€€",
            bookingUrl: "https://www.google.com/maps/search/Casale+dei+Dotti+Colle+Umberto+Perugia",
          },
          {
            name: "Agriturismo Casali del Toppello",
            distanceOnFoot: "~5 min in auto",
            priceRange: "€€",
            bookingUrl: "https://www.casalideltoppello.it",
          },
          {
            name: "Hotel Faina",
            distanceOnFoot: "~5 min in auto",
            priceRange: "€€",
            bookingUrl: "https://www.google.com/maps/search/Hotel+Faina+Perugia",
          },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dalla due giorni",
        paragraphs: [
          "Il Flower Show non è una semplice esposizione: è un weekend partecipativo. Ti porti a casa piante che difficilmente troveresti altrove e nel frattempo segui un corso, fai un laboratorio, ascolti un seminario. Per chi è agli inizi è un'occasione per capire le basi del giardinaggio direttamente da chi lo fa di mestiere; per chi è esperto è il momento per scambiare con vivaisti specializzati.",
        ],
        bullets: [
          "Visite: vai con calma, le due giornate permettono di non correre",
          "Acquisto piante: porta contenitori adatti per il trasporto se vieni in auto",
          "Corsi e laboratori: posti a disponibilità — verifica orari il giorno stesso",
          "Famiglie con bambini: i laboratori creativi sono adatti anche ai più piccoli",
        ],
      },
      practicalInfo: {
        title: "Come arrivare e informazioni pratiche",
        paragraphs: [
          "Villa del Colle del Cardinale è raggiungibile in auto da Perugia centro in pochi minuti. Per indirizzo preciso e viabilità nei giorni della manifestazione consulta la pagina evento su Ticket Italia: in occasione del Flower Show l'organizzazione comunica i parcheggi temporanei e i percorsi di accesso. Il biglietto è elettronico: lo ricevi in PDF e mostri il QR code all'ingresso.",
        ],
        bullets: [
          "Da Perugia centro: pochi minuti in auto verso il Colle del Cardinale",
          "Biglietto: PDF elettronico via email, QR code all'ingresso",
          "Validità: una giornata (controlla l'abbonamento 2 giorni se vuoi venire sabato e domenica)",
          "Famiglie: laboratori creativi adatti a bambini e ragazzi",
        ],
      },
      internalLinks: [
        {
          label: "Agriumbria: la grande fiera agricola di Bastia Umbra",
          href: "/agriumbria-evento-biglietti-guida",
          description: "Un altro evento di settore in Umbria, con un focus più ampio sull'agroalimentare.",
        },
        {
          label: "Maurizio Battista al Barton Park di Perugia",
          href: "/articoli/maurizio-battista-barton-park-perugia-28-giugno-2026",
          description: "Un altro appuntamento della stagione estiva nei parchi urbani perugini.",
        },
      ],
      sections: [
        {
          heading: "Perché vale il biglietto a €11,00",
          paragraphs: [
            "A €11 finali porti a casa un weekend con dentro tre cose insieme: una mostra mercato specializzata, un programma di corsi/seminari/laboratori inclusi, e l'accesso a una villa monumentale del Cinquecento. Per chi è appassionato di botanica è scontato; per chi è curioso senza avere ancora un giardino, è il modo più semplice per provare se quel mondo gli interessa.",
          ],
        },
        {
          heading: "Sabato o domenica: come scegliere",
          paragraphs: [
            "I dueRound giorni hanno carattere diverso. Il sabato è in generale più affollato, soprattutto nelle ore centrali, con tutti i corsi pieni. La domenica è più rilassata, con un pubblico di famiglie e tempi di acquisto più dilatati. Se vuoi seguire un corso specifico, controlla in anticipo il programma sulla pagina evento: alcuni laboratori si svolgono solo in una delle due giornate.",
          ],
        },
      ],
      faq: [
        {
          question: "Quanto costa il biglietto del Perugia Flower Show?",
          answer:
            "Il prezzo finale al checkout su Ticket Italia è €11,00 per il biglietto giornaliero intero (€10,00 base + commissioni). Per chi vuole partecipare a entrambi i giorni è disponibile l'abbonamento 2 giorni — verifica il prezzo direttamente sulla pagina evento.",
        },
        {
          question: "I corsi e i laboratori sono inclusi?",
          answer:
            "Sì, il programma di eventi collaterali (corsi di giardinaggio base e specialistico, seminari tematici, laboratori creativi) è incluso nel biglietto d'ingresso, fino ai posti disponibili.",
        },
        {
          question: "Dove si trova Villa del Colle del Cardinale?",
          answer:
            "La villa è sul Colle del Cardinale, a Perugia. Per indirizzo esatto, viabilità e parcheggi del weekend dell'evento consulta la pagina evento ufficiale su Ticket Italia.",
        },
        {
          question: "L'evento è adatto alle famiglie?",
          answer:
            "Sì: i laboratori creativi sono pensati anche per bambini e ragazzi, e la cornice della villa permette una visita rilassata. La domenica è generalmente la giornata più tranquilla per le famiglie.",
        },
      ],
      cta: {
        title: "Acquista il biglietto per Perugia Flower Show 2026",
        text:
          "Due giorni di mostra mercato florovivaistica a Villa del Colle del Cardinale, 23-24 maggio 2026. Biglietto intero €11,00 finale al checkout su Ticket Italia, abbonamento 2 giorni disponibile.",
        label: "Acquista su Ticket Italia",
        href: "https://ticketitalia.com/perugia-flower-show-villa-colle-del-cardinale-pg-23-24-maggio-2026",
      },
    },
  },
  {
    slug: "elisir-d-amore-teatro-nuovo-spoleto-18-20-settembre-2026",
    title: "L'Elisir d'Amore al Teatro Nuovo G.C. Menotti di Spoleto: tre repliche dal 18 al 20 settembre 2026",
    excerpt:
      "L'Elisir d'Amore di Donizetti torna al Teatro Nuovo Gian Carlo Menotti di Spoleto dal 18 al 20 settembre 2026, parte dell'80ª Stagione Lirica Sperimentale A. Belli. Biglietti da €21,50 finali su Ticket Italia.",
    category: "Teatro & Spettacoli",
    categorySlug: "teatro-spettacoli",
    subcategory: "Musical",
    subcategorySlug: "musical",
    type: "evento",
    status: "published",
    publishedAt: "2026-05-11",
    funnelStage: "BOFU",
    articleType: "evento",
    tags: ["Elisir d'amore", "Donizetti", "Opera lirica", "Teatro Nuovo Spoleto", "Stagione Lirica Sperimentale"],
    date: "2026-05-11",
    readTime: "7 min",
    author: "Redazione Ticket Italia",
    image: "https://ticketitalia.com/image/cache/wp/gj/Lirico%20Sperimentale/Elisir-1500x1500.webp",
    body: {
      intro:
        "L'Elisir d'Amore di Gaetano Donizetti torna al Teatro Nuovo Gian Carlo Menotti di Spoleto con tre repliche nel weekend del 18-20 settembre 2026, nell'ambito dell'80ª Stagione Lirica Sperimentale A. Belli. Una delle opere comiche più amate del repertorio italiano, eseguita in una stagione storica fra le più longeve d'Italia. Biglietti a partire da €21,50 finali su Ticket Italia.",
      quickInfo: {
        title: "Informazioni rapide",
        text:
          "Melodramma giocoso in due atti di Donizetti, tre repliche in tre giorni consecutivi al Teatro Nuovo G.C. Menotti di Spoleto. Produzione dell'Istituzione Teatro Lirico Sperimentale A. Belli.",
        bullets: [
          "Opera: L'Elisir d'Amore — Gaetano Donizetti (1832)",
          "Stagione: 80ª Stagione Lirica Sperimentale A. Belli, 2026",
          "Location: Teatro Nuovo Gian Carlo Menotti, Spoleto (PG)",
          "Repliche: venerdì 18 settembre ore 20:30, sabato 19 settembre ore 18:00, domenica 20 settembre ore 17:00",
          "Prezzo: a partire da €21,50 finale al checkout (commissioni amministrative incluse)",
        ],
      },
      tickets: {
        title: "Biglietti L'Elisir d'Amore al Teatro Nuovo — prezzi e modalità",
        text:
          "Per le repliche di Spoleto i prezzi partono da €21,50 finali al checkout (commissioni amministrative già incluse). La fascia tariffaria varia in base al settore scelto — platea, palchi e galleria — e all'orario della replica. Il biglietto è elettronico: PDF via email subito dopo l'acquisto.",
        bullets: [
          "Prezzo a partire da: €21,50 (prezzo finale al checkout, commissioni incluse)",
          "Tre repliche: venerdì 20:30, sabato 18:00, domenica 17:00",
          "Settori: platea, palchi laterali, galleria (verifica la disponibilità per replica su Ticket Italia)",
          "Formato: biglietto elettronico PDF via email",
          "Per accessibilità: contatta l'organizzatore con certificato di invalidità prima dell'acquisto",
        ],
      },
      artistContext: {
        title: "Donizetti e l'Elisir d'Amore: la commedia che funziona da due secoli",
        paragraphs: [
          "L'Elisir d'Amore è il melodramma giocoso che ha consolidato la fama internazionale di Gaetano Donizetti. Andato in scena per la prima volta al Teatro della Cannobiana di Milano il 12 maggio 1832, in oltre due secoli non ha mai smesso di girare per i teatri del mondo. La trama — Nemorino innamorato di Adina che compra un finto elisir d'amore dal ciarlatano Dulcamara — è il prototipo della commedia romantica con happy ending, costruita su musica leggera e personaggi caricaturali ma teneri.",
          "La Stagione Lirica Sperimentale A. Belli di Spoleto è una delle istituzioni più longeve nel panorama italiano: nata per dare opportunità ai giovani cantanti lirici dopo aver superato un concorso nazionale, mette in scena ogni anno produzioni che combinano cast emergenti e regie spesso sperimentali. Vedere l'Elisir qui significa vedere quello che è diventato un titolo classico nelle mani di una nuova generazione di interpreti.",
        ],
        bullets: [
          "Opera: melodramma giocoso in due atti",
          "Compositore: Gaetano Donizetti",
          "Prima rappresentazione: 12 maggio 1832, Teatro della Cannobiana, Milano",
          "Produzione: Istituzione Teatro Lirico Sperimentale A. Belli",
          "Stagione: 80ª edizione (una delle stagioni liriche più longeve d'Italia)",
        ],
      },
      location: {
        title: "Teatro Nuovo Gian Carlo Menotti: il cuore dell'opera a Spoleto",
        venueType: "Teatro storico, sede principale della Stagione Lirica Sperimentale",
        experience:
          "Il Teatro Nuovo Gian Carlo Menotti di Spoleto è il fulcro della vita musicale della città. Architettura tradizionale a ferro di cavallo, acustica progettata per la voce e l'orchestra, capienza intorno agli 800 posti: la cornice ideale per un titolo come l'Elisir, che fa della cantabilità lirica e del rapporto fra voce e platea il suo perno.",
        suitability:
          "L'Elisir d'Amore al Teatro Nuovo è la combinazione giusta: l'opera è scritta per teatri di queste dimensioni, dove l'orchestra non deve coprire la voce e la platea sente ogni sfumatura del recitativo. Per il pubblico significa visione e ascolto centrati sulla qualità musicale piuttosto che sull'effetto scenico.",
        atmosphere:
          "Atmosfera di teatro lirico storico, pubblico attento, applausi nei momenti giusti, silenzio durante i passaggi più delicati. Spoleto ha una tradizione musicale che parte dal Festival dei Due Mondi: il pubblico è educato all'ascolto e questa è una delle ragioni per cui la Stagione Lirica Sperimentale qui funziona.",
        paragraphs: [
          "Il teatro è intitolato a Gian Carlo Menotti, compositore italoamericano che a Spoleto fondò nel 1958 il Festival dei Due Mondi. Per la Stagione Lirica Sperimentale A. Belli è la casa storica, sede della maggior parte delle produzioni dell'anno.",
        ],
        bullets: [
          "Acustica: progettata per voce lirica e orchestra",
          "Capienza: circa 800 posti, ferro di cavallo tradizionale",
          "Posizione: centro storico di Spoleto, raggiungibile a piedi",
          "Storia: sede della Stagione Lirica Sperimentale A. Belli e legato al Festival dei Due Mondi",
        ],
        locationImage:
          "https://ticketitalia.com/image/cache/wp/gj/Luoghi%20banner/344506502072015142421_galleriamedia1-1400x300.webp",
        nearbyParking: [
          {
            name: "Parcheggio della Posterna",
            distanceOnFoot: "10 min a piedi",
            type: "a pagamento",
            notes: "454 posti, €1,20/ora. Tapis roulant sotterraneo con uscita nei pressi del Teatro Nuovo",
            mapsUrl: "https://maps.google.com/?q=Parcheggio+Posterna+Spoleto",
          },
          {
            name: "Parcheggio Spoletosfera",
            distanceOnFoot: "15 min a piedi",
            type: "a pagamento",
            notes: "414 posti coperti, aperto 24h. Raggiungibile da Viale dei Cappuccini",
            mapsUrl: "https://maps.google.com/?q=Parcheggio+Spoletosfera+Spoleto",
          },
          {
            name: "Parcheggio Pian di Boccio",
            distanceOnFoot: "20 min a piedi",
            type: "gratuito",
            notes: "Parcheggio gratuito nel weekend, collegato al centro storico",
            mapsUrl: "https://maps.google.com/?q=Pian+di+Boccio+Spoleto+parcheggio",
          },
        ],
        nearbyHotels: [
          {
            name: "Hotel San Luca",
            distanceOnFoot: "10 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://www.hotelsanluca.com/",
          },
          {
            name: "Hotel dei Duchi",
            distanceOnFoot: "8 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://www.hoteldeiduchi.com/",
          },
          {
            name: "Boutique Hotel Aurora & Private Spa",
            distanceOnFoot: "5 min a piedi",
            priceRange: "€€",
            bookingUrl: "https://www.hotelauroraspoleto.it/",
          },
        ],
      },
      liveExperience: {
        title: "Cosa aspettarsi dalle repliche",
        paragraphs: [
          "L'Elisir d'Amore al Teatro Nuovo è quasi due ore di opera, con un intervallo nel mezzo. La produzione della Stagione Lirica Sperimentale A. Belli punta sui giovani cantanti che hanno superato il concorso nazionale: aspettati voci fresche, regie a volte audaci, un'orchestra in buca con i tempi tradizionali del melodramma giocoso.",
        ],
        bullets: [
          "Durata: circa 2h con intervallo",
          "Lingua: italiano (sovratitoli tipicamente non necessari per il pubblico italofono)",
          "Cast: giovani cantanti della Stagione Lirica Sperimentale A. Belli",
          "Sezioni di spicco: 'Una furtiva lagrima' (aria celebre di Nemorino, secondo atto)",
        ],
      },
      practicalInfo: {
        title: "Come arrivare e informazioni pratiche",
        paragraphs: [
          "Spoleto è raggiungibile da Roma in circa 1h30 di auto (A1 uscita Orte, poi E45) o in treno con i diretti per Ancona/Foligno. Il Teatro Nuovo è in pieno centro storico, raggiungibile a piedi da tutti i parcheggi principali in 10-20 minuti. Il biglietto è elettronico: PDF via email, QR code all'ingresso.",
        ],
        bullets: [
          "Da Roma: A1 uscita Orte, poi SS204/E45 (~1h30)",
          "In treno: stazione Spoleto, poi 15 min a piedi al teatro",
          "Parcheggi: Posterna (con tapis roulant verso il teatro), Spoletosfera, Pian di Boccio (gratuito weekend)",
          "Apertura porte: in genere 30-45 minuti prima dell'inizio replica",
          "Biglietto: PDF elettronico via email, QR code all'ingresso",
        ],
      },
      internalLinks: [
        {
          label: "Francesco Renga al Teatro Nuovo di Spoleto",
          href: "/articoli/francesco-renga-spoleto-2026-biglietti-teatro-nuovo",
          description: "Stessa venue, format diverso: concerto teatrale di un grande del pop italiano.",
        },
        {
          label: "Claudio Baglioni in Piazza Duomo a Spoleto",
          href: "/articoli/claudio-baglioni-la-vita-e-adesso-grandtour-piazza-duomo-spoleto-15-luglio-2026",
          description: "Spoleto fuori dal teatro: la grande tappa estiva in piazza.",
        },
        {
          label: "Come usare Carta Cultura per gli eventi",
          href: "/come-usare-carta-cultura-carta-docente-biglietti-eventi",
          description: "Bonus utilizzabile su molte produzioni liriche: verifica prima di acquistare.",
        },
      ],
      sections: [
        {
          heading: "Perché l'Elisir d'Amore è il titolo giusto per iniziare con l'opera",
          paragraphs: [
            "Se non sei mai entrato in un teatro lirico, l'Elisir d'Amore è il titolo perfetto per cominciare. La trama è leggera e immediatamente comprensibile (chi cerca di conquistare chi, malintesi che si risolvono nel finale), la musica di Donizetti è cantabile, le arie più famose ('Una furtiva lagrima' su tutte) hanno la qualità di restare in testa anche a chi non ha mai ascoltato opera lirica.",
          ],
        },
        {
          heading: "Quale replica scegliere",
          paragraphs: [
            "Le tre date hanno orari diversi: venerdì 18 settembre alle 20:30 è la sera classica, sabato 19 alle 18:00 è la pomeridiana extended (si può cenare dopo a Spoleto), domenica 20 alle 17:00 è la pomeridiana classica con possibilità di rientro in giornata. Se vieni da Roma, la domenica 17:00 è la formula più comoda per chi non vuole fermarsi in città.",
          ],
        },
      ],
      faq: [
        {
          question: "Quanto costano i biglietti?",
          answer:
            "I prezzi partono da €21,50 finali al checkout su Ticket Italia, commissioni amministrative incluse. La fascia tariffaria completa varia per settore (platea, palchi, galleria): verifica la disponibilità della replica scelta sulla pagina evento.",
        },
        {
          question: "Quante repliche ci sono?",
          answer:
            "Tre repliche al Teatro Nuovo G.C. Menotti di Spoleto: venerdì 18 settembre 2026 alle 20:30, sabato 19 alle 18:00, domenica 20 alle 17:00.",
        },
        {
          question: "Cos'è la Stagione Lirica Sperimentale A. Belli?",
          answer:
            "È una delle stagioni liriche italiane più longeve, giunta nel 2026 all'80ª edizione. Mette in scena produzioni con giovani cantanti che hanno superato un concorso nazionale, spesso con regie sperimentali. È un riferimento per scoprire nuove voci del panorama operistico italiano.",
        },
        {
          question: "Dove parcheggiare a Spoleto?",
          answer:
            "I parcheggi consigliati sono la Posterna (10 min a piedi dal teatro, con tapis roulant sotterraneo), Spoletosfera (coperto, 15 min a piedi) e Pian di Boccio (gratuito nel weekend, 20 min a piedi). Tutti collegati al centro storico.",
        },
        {
          question: "Si può usare Carta Cultura?",
          answer:
            "Le produzioni liriche sono in genere ammesse al bonus Carta Cultura/Carta del Merito. Verifica direttamente al checkout su Ticket Italia se la singola data è compatibile e segui la procedura dal portale ufficiale del bonus.",
        },
      ],
      cta: {
        title: "Acquista i biglietti per L'Elisir d'Amore al Teatro Nuovo di Spoleto",
        text:
          "Tre repliche dal 18 al 20 settembre 2026 al Teatro Nuovo G.C. Menotti di Spoleto, 80ª Stagione Lirica Sperimentale A. Belli. Biglietti da €21,50 finali su Ticket Italia.",
        label: "Acquista su Ticket Italia",
        href: "https://ticketitalia.com/l-elisir-d-amore-teatro-nuovo-spoleto-dal-18-al-20-settembre-2026",
      },
    },
  },
];

export const publishedArticles = articles
  .filter((article) => article.status === "published")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPublishedArticles() {
  return publishedArticles;
}

export function getFeaturedArticles() {
  return publishedArticles.filter((article) => article.featured);
}

export function getSpotlightArticle() {
  return publishedArticles.find((article) => article.spotlight) ?? publishedArticles[0];
}

export function getArticleBySlug(slug: string) {
  return publishedArticles.find((article) => article.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryPath(slug: string) {
  return `/${slug}`;
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string) {
  return getCategoryBySlug(categorySlug)?.subcategories.find(
    (subcategory) => subcategory.slug === subcategorySlug,
  );
}

export function getSubcategoryPath(categorySlug: string, subcategorySlug: string) {
  return `/${categorySlug}/${subcategorySlug}`;
}

export function getArticlesByCategory(slug: string) {
  return publishedArticles.filter((article) => article.categorySlug === slug);
}

export function getArticlesBySubcategory(categorySlug: string, subcategorySlug: string) {
  return publishedArticles.filter(
    (article) => article.categorySlug === categorySlug && article.subcategorySlug === subcategorySlug,
  );
}

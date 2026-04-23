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
      }>;
      nearbyHotels?: Array<{
        name: string;
        distanceOnFoot: string;
        priceRange: string;
        bookingUrl?: string;
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
          { name: "Parcheggi fieristici Umbriafiere (Largo America, Oceania, Asia)", distanceOnFoot: "0 min a piedi", type: "gratuito", notes: "Parcheggi gratuiti segnalati, attivi durante le fiere con navetta inclusa" },
          { name: "Parcheggio di fronte alle Poste – Bastia Umbra", distanceOnFoot: "10 min a piedi", type: "gratuito", notes: "50 posti, con servizio camper. Vicino al centro di Bastia Umbra" },
          { name: "Parcheggi pubblici Via Roma – Bastia Umbra", distanceOnFoot: "15 min a piedi", type: "gratuito", notes: "Parcheggi lungo strada nel centro di Bastia Umbra" },
        ],
        nearbyHotels: [
          { name: "Hotel Santa Lucia", distanceOnFoot: "20 min a piedi", priceRange: "€", bookingUrl: "https://www.hotelsantaluciabastia.com/" },
          { name: "Hotel La Villa Excelsior", distanceOnFoot: "30 min a piedi", priceRange: "€€", bookingUrl: "https://la-villa-excelsior.umbriahotelsweb.com/en/" },
          { name: "Relais Madonna di Campagna", distanceOnFoot: "25 min in auto", priceRange: "€€", bookingUrl: "https://www.relaismadonnadicampagna.it/en/" },
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
        href: "https://ticketitalia.com/en/umbria-fiere-bastia-umbra-pg",
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
          { name: "Parcheggio della Posterna", distanceOnFoot: "10 min a piedi", type: "a pagamento", notes: "454 posti, €1,20/ora. Tapis roulant sotterraneo con uscita nei pressi del Teatro Nuovo" },
          { name: "Parcheggio Spoletosfera", distanceOnFoot: "15 min a piedi", type: "a pagamento", notes: "414 posti coperti, aperto 24h su 24. Raggiungibile da Viale dei Cappuccini" },
          { name: "Parcheggio Pian di Boccio", distanceOnFoot: "20 min a piedi", type: "gratuito", notes: "Parcheggio gratuito nel weekend, collegato al centro storico" },
        ],
        nearbyHotels: [
          { name: "Hotel San Luca", distanceOnFoot: "10 min a piedi", priceRange: "€€", bookingUrl: "https://www.hotelsanluca.com/en/index" },
          { name: "Hotel dei Duchi", distanceOnFoot: "8 min a piedi", priceRange: "€€", bookingUrl: "https://www.hoteldeiduchi.com/en/index" },
          { name: "Boutique Hotel Aurora & Private Spa", distanceOnFoot: "5 min a piedi", priceRange: "€€", bookingUrl: "https://www.boutiquehotelaurora.it/" },
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
          { name: "Parcheggio Piazza Partigiani", distanceOnFoot: "10 min a piedi", type: "a pagamento", notes: "Parcheggio custodito con scale mobili verso il centro storico" },
          { name: "Parcheggio Piazzale Europa", distanceOnFoot: "12 min a piedi", type: "a pagamento", notes: "Parcheggio custodito con scale mobili, vicino agli accessi principali al centro" },
          { name: "Parcheggio Mercato Coperto (Via del Mercato)", distanceOnFoot: "8 min a piedi", type: "a pagamento", notes: "Parcheggio con ascensore, posizione comoda per raggiungere i Giardini del Frontone" },
        ],
        nearbyHotels: [
          { name: "Sina Brufani", distanceOnFoot: "5 min a piedi", priceRange: "€€€", bookingUrl: "https://www.sinahotels.com/en/h/sina-brufani-perugia/" },
          { name: "Sangallo Palace Hotel", distanceOnFoot: "5 min a piedi", priceRange: "€€", bookingUrl: "https://www.booking.com/hotel/it/sangallopalace.html" },
          { name: "Chocohotel", distanceOnFoot: "20 min a piedi", priceRange: "€", bookingUrl: "https://www.chocohotel.it/en/" },
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
          "Layout: due zone con allestimenti distinti (area palco + zona lounge)",
          "Corte esterna: disponibile per ritrovo pre/post concerto",
          "Accessibilità: vicino al raccordo autostradale di Perugia, ampio parcheggio",
          "Indirizzo: Balanzano, Perugia (PG)",
        ],
        locationImage: "https://www.umbriafilmcommission.com/wp-content/uploads/2021/10/6171274fb2039-640x400.jpg",
        nearbyParking: [
          { name: "Parcheggio zona industriale Balanzano (area esterna venue)", distanceOnFoot: "0 min a piedi", type: "gratuito", notes: "Ampio parcheggio privato annesso al locale, capienza elevata" },
          { name: "Parcheggio P+R Ponte San Giovanni", distanceOnFoot: "15 min a piedi", type: "gratuito", notes: "Parcheggio di interscambio vicino alla stazione, con navetta per il centro" },
          { name: "Parcheggio Via della Gomma (strada pubblica)", distanceOnFoot: "2 min a piedi", type: "gratuito", notes: "Posti lungo la strada nella zona industriale, disponibili la sera" },
        ],
        nearbyHotels: [
          { name: "Perugia Park Hotel", distanceOnFoot: "20 min in auto", priceRange: "€€", bookingUrl: "https://www.perugiaparkhotel.com/" },
          { name: "Posta Donini 1579 – UNA Esperienze", distanceOnFoot: "15 min in auto", priceRange: "€€€", bookingUrl: "https://www.booking.com/hotel/it/postadonini.html" },
          { name: "Chocohotel Perugia", distanceOnFoot: "20 min in auto", priceRange: "€€", bookingUrl: "https://www.chocohotel.it/en/" },
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

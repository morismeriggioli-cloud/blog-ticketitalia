@AGENTS.md

# Blog Ticket Italia — Orchestrazione Agenti

Questo progetto usa tre agenti specializzati che operano in sequenza per produrre articoli pubblicabili sul blog di Ticket Italia.

## Pipeline

```
Scout → Redattore → SEO → output/articles/[slug].ts (draft)
```

### 1. Scout (`agents/scout/`)

**Ruolo**: Analizza la sitemap di ticketitalia.com e identifica gli eventi con maggiore potenziale editoriale e SEO.

**Input**: sitemap `https://ticketitalia.com//index.php?route=feed/advanced_sitemap`
**Output**: `output/articles/scout-report-[YYYY-MM-DD].json`

Avvia lo Scout con:
```
cd agents/scout && claude
```

---

### 2. Redattore (`agents/redattore/`)

**Ruolo**: Scrive articoli MDX completi per ogni opportunità selezionata dallo Scout, rispettando lo schema `Article` e le linee guida editoriali in `ARTICLE_STRUCTURE_GUIDE.md`.

**Input**: una riga del report Scout + pagina evento su ticketitalia.com
**Output**: `output/articles/[slug].ts` (status: draft)

Avvia il Redattore con:
```
cd agents/redattore && claude
```

Fornisci al Redattore il JSON dell'opportunità dallo scout report.

---

### 3. SEO (`agents/seo/`)

**Ruolo**: Ottimizza title, excerpt, slug, keyword density e internal links dell'articolo prodotto dal Redattore. Produce un report con le modifiche apportate.

**Input**: `output/articles/[slug].ts` + keyword dal report Scout
**Output**: articolo ottimizzato (stesso file) + `output/articles/[slug]-seo-report.md`

Avvia il SEO con:
```
cd agents/seo && claude
```

Fornisci al SEO il percorso del file articolo da ottimizzare.

---

## File Condivisi

| File | Scopo |
|------|-------|
| `shared/config.ts` | URL base, autore default, helper readTime |
| `shared/article-schema.ts` | Re-export tipi da `src/data/blog.ts` + costanti validazione |
| `ARTICLE_STRUCTURE_GUIDE.md` | Regole editoriali dettagliate (sezione location obbligatoria) |

## Output

Gli articoli generati finiscono in `output/articles/` con `status: "draft"`.
Il team editoriale li revisiona e li sposta manualmente in `src/data/blog.ts` per la pubblicazione.

## Regole Generali

- Gli agenti non pubblicano mai direttamente — solo il team umano può impostare `status: "published"`
- Nessun dato va inventato: date, prezzi e venue devono essere verificati su ticketitalia.com
- Ogni agente opera nella propria cartella e non modifica i file degli altri agenti
- I file in `output/` sono temporanei e non vanno committati finché non revisionati

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { getFeaturedArticles, publishedArticles } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { articlePath, formatDate } from "@/lib/utils";

export function FeaturedArticles() {
  const [lead] = getFeaturedArticles();
  const sideArticles = publishedArticles.filter((article) => article.slug !== lead?.slug).slice(0, 4);

  if (!lead) {
    return null;
  }

  return (
    <section className="bg-background py-18 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Front row"
            title="La selezione che apre la settimana"
            description="Non una lista qualsiasi: una prima pagina editoriale con priorita, ritmo e percorsi di lettura chiari."
          />
          <Link href="/articoli" className="mb-8 inline-flex items-center gap-2 font-black text-coral hover:text-ink">
            Tutto il magazine <ArrowUpRight className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)]">
          <article className="group relative min-h-[520px] overflow-hidden rounded-lg bg-ink text-white shadow-lift">
            <Image
              src={lead.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition duration-700 ease-entrance group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,17,20,0.04),rgba(16,17,20,0.90))]" />
            <Link href={articlePath(lead.slug)} className="absolute inset-0 flex flex-col justify-end p-6 sm:p-9">
              <div className="max-w-3xl">
                <Badge variant="accent">{lead.category}</Badge>
                <h3 className="mt-5 text-4xl font-black leading-[0.98] tracking-normal sm:text-6xl">
                  {lead.title}
                </h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{lead.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-bold text-white/70">
                  <span>{formatDate(lead.date)}</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="size-4" aria-hidden="true" />
                    {lead.readTime}
                  </span>
                </div>
              </div>
            </Link>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {sideArticles.map((article, index) => (
              <article key={article.slug} className="group rounded-lg border border-line bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-lift">
                <Link href={articlePath(article.slug)} className="grid gap-4 sm:grid-cols-[132px_1fr] lg:grid-cols-[150px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-ink sm:aspect-auto">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="180px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="self-center">
                    <p className="mb-2 text-xs font-black uppercase tracking-normal text-coral">
                      0{index + 1} / {article.category}
                    </p>
                    <h3 className="line-clamp-3 text-xl font-black leading-tight tracking-normal text-ink group-hover:text-coral">
                      {article.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{article.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

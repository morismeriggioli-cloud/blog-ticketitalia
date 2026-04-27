import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Article } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { articlePath, formatDate } from "@/lib/utils";

type HomeFeaturedArticlesProps = {
  lead: Article;
  articles: Article[];
};

export function HomeFeaturedArticles({ lead, articles }: HomeFeaturedArticlesProps) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-normal text-secondary-500">
              Storie scelte con cura
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-normal text-ink sm:text-5xl">
              Dietro ogni biglietto, una serata da raccontare.
            </h2>
          </div>
          <Link href="/articoli" className="inline-flex items-center gap-2 font-black text-secondary-500 transition hover:text-ink">
            Tutti gli articoli
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)]">
          <article className="group overflow-hidden rounded-md bg-ink p-4 text-white shadow-lift sm:p-5">
            <Link href={articlePath(lead.slug)} className="block">
              <div className="relative aspect-[16/9] max-h-[360px] overflow-hidden rounded-md bg-neutral-950">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition duration-700 ease-entrance group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,24,0),rgba(17,19,24,0.28))]" />
              </div>

              <div className="p-2 pt-6 sm:p-4 sm:pt-7">
                <Badge variant="accent">{lead.category}</Badge>
                <h3 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-5xl">
                  {lead.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
                  {lead.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-bold text-white/68">
                  <span>{formatDate(lead.date)}</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="size-4" aria-hidden="true" />
                    {lead.readTime}
                  </span>
                </div>
              </div>
            </Link>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {articles.slice(0, 4).map((article, index) => (
              <article
                key={article.slug}
                className="group rounded-md border border-line bg-surface p-4 shadow-sm transition duration-300 ease-event hover:-translate-y-1 hover:border-ink hover:shadow-lift"
              >
                <Link href={articlePath(article.slug)} className="grid gap-4 sm:grid-cols-[132px_1fr] lg:grid-cols-[148px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-ink sm:aspect-auto">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="180px"
                      className="object-cover transition duration-500 ease-entrance group-hover:scale-105"
                    />
                  </div>
                  <div className="self-center">
                    <p className="mb-2 text-xs font-black uppercase tracking-normal text-secondary-500">
                      0{index + 1} / {article.category}
                    </p>
                    <h3 className="line-clamp-3 text-xl font-black leading-tight tracking-normal text-ink group-hover:text-secondary-500">
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

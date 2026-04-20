import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/blog";
import { ArticleCard } from "@/components/ui/ArticleCard";

type HomeTrendsProps = {
  articles: Article[];
};

export function HomeTrends({ articles }: HomeTrendsProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-normal text-secondary-500">
              Trend / Ultime news
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-normal text-ink sm:text-5xl">
              Segnali freschi per decidere cosa mettere in agenda.
            </h2>
          </div>
          <Link href="/articoli" className="inline-flex items-center gap-2 font-black text-secondary-500 transition hover:text-ink">
            Tutti gli aggiornamenti
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 6).map((article, index) => (
            <ArticleCard key={article.slug} article={article} priority={index < 2} compact={index > 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

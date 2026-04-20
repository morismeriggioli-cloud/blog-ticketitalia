import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import { publishedArticles } from "@/data/blog";
import { ArticleCard } from "@/components/ui/ArticleCard";

export function LatestArticles() {
  const trend = publishedArticles.slice(0, 6);

  return (
    <section className="py-18 sm:py-24">
      <div className="container-page">
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-coral">
              <Radio className="size-4" aria-hidden="true" />
              Trend / ultime news
            </p>
            <h2 className="max-w-3xl text-3xl font-black tracking-normal text-ink sm:text-5xl">
              Cosa sta girando adesso nel mondo live.
            </h2>
          </div>
          <Link href="/articoli" className="inline-flex items-center gap-2 font-black text-coral hover:text-ink">
            Vedi archivio <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trend.map((article, index) => (
            <div key={article.slug} className={index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <ArticleCard article={article} priority={index < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

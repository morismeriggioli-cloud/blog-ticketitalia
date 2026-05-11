import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { categories, getCategoryPath, publishedArticles } from "@/data/blog";

export const metadata: Metadata = {
  title: "Articoli",
  description:
    "Archivio articoli Ticket Italia su concerti, festival, teatro, sport, family e nightlife.",
  alternates: {
    canonical: "/articoli",
  },
  openGraph: {
    title: "Articoli | Ticket Italia Blog",
    description: "Guide e storie per scegliere i migliori eventi live in Italia.",
    url: "/articoli",
  },
};

export default function ArticlesPage() {
  return (
    <section className="py-12 sm:py-18">
      <div className="container-page">
        <div className="mb-10 rounded-lg bg-ink p-6 text-white sm:p-10">
          <Badge variant="accent">Archivio editoriale</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-normal sm:text-6xl">
            Tutte le idee per il tuo prossimo evento live.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
            Cerca tra guide, trend e consigli pratici. La ricerca e pronta per diventare dinamica con CMS o API.
          </p>
          <div className="mt-7 max-w-2xl">
            <SearchBar />
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={getCategoryPath(category.slug)}
              className="shrink-0 rounded-md border border-line bg-white px-4 py-2 text-sm font-bold text-muted transition hover:border-ink hover:text-ink"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedArticles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, getArticlesByCategory, getCategoryPath, getSubcategoryPath } from "@/data/blog";

export const metadata: Metadata = {
  title: "Categorie",
  description: "Esplora le categorie editoriali del blog Ticket Italia: concerti, teatro, festival, sport, nightlife, guide e news.",
};

export default function CategoriesPage() {
  return (
    <section className="bg-background py-12 sm:py-18">
      <div className="container-page">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-black uppercase tracking-normal text-coral">Rubriche</p>
          <h1 className="text-4xl font-black leading-[0.98] tracking-normal text-ink sm:text-6xl">
            Tutti i mondi live di Ticket Italia.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Una struttura editoriale chiara, pensata per navigare articoli, guide e aggiornamenti per area tematica.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = getArticlesByCategory(category.slug).length;

            return (
              <article
                key={category.slug}
                className="group rounded-lg border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-lift"
              >
                <Link href={getCategoryPath(category.slug)} className="block">
                  <span className={`mb-6 inline-flex rounded-md px-3 py-1 text-xs font-black uppercase tracking-normal ${category.accentClass}`}>
                    {category.eyebrow}
                  </span>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h2 className="text-2xl font-black tracking-normal text-ink">{category.name}</h2>
                      <p className="mt-3 leading-7 text-muted">{category.description}</p>
                      <p className="mt-5 text-sm font-black uppercase tracking-normal text-coral">{count} articoli</p>
                    </div>
                    <ArrowUpRight className="size-6 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-coral" aria-hidden="true" />
                  </div>
                </Link>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.slug}
                      href={getSubcategoryPath(category.slug, subcategory.slug)}
                      className="rounded-md bg-background px-2.5 py-1 text-xs font-bold text-muted transition hover:bg-ink hover:text-white"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

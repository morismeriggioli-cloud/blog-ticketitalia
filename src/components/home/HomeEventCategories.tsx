import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeCategoryCards } from "@/data/homepage";
import { getArticlesByCategory, getCategoryPath } from "@/data/blog";

export function HomeEventCategories() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container-page">
        <div className="mb-8 grid gap-4 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-normal text-secondary-500">
              Categorie live
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-normal text-ink sm:text-5xl">
              Entra dal mood giusto.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted lg:justify-self-end">
            Ogni area editoriale ha un colore, un ritmo e una promessa precisa: meno rumore, piu eventi da vivere.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {homeCategoryCards.map((category, index) => (
            <Link
              key={category.slug}
              href={getCategoryPath(category.slug)}
              className={
                index === 0
                  ? "group flex min-h-80 flex-col rounded-md border border-line bg-surface p-5 shadow-sm transition duration-300 ease-event hover:-translate-y-1 hover:border-ink hover:shadow-lift sm:col-span-2 lg:col-span-4"
                  : "group flex min-h-80 flex-col rounded-md border border-line bg-surface p-5 shadow-sm transition duration-300 ease-event hover:-translate-y-1 hover:border-ink hover:shadow-lift lg:col-span-2"
              }
            >
              <div>
                <div className={`mb-7 grid size-12 place-items-center rounded-md ${category.className}`}>
                  <category.icon className="size-6" aria-hidden="true" />
                </div>
                <p className="text-xs font-black uppercase tracking-normal text-muted">
                  0{index + 1} / {category.shortName}
                </p>
                <h3 className="mt-3 text-2xl font-black leading-tight tracking-normal text-ink">
                  {category.name}
                </h3>
                <p className={index === 0 ? "mt-3 max-w-sm text-base leading-7 text-muted" : "mt-3 text-sm leading-6 text-muted"}>
                  {category.description}
                </p>
              </div>

              <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <span className="max-w-[9rem] text-sm font-black leading-5 text-secondary-500">
                  {category.cue}
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-ink text-white transition group-hover:bg-secondary-500">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
              </div>
              <p className="sr-only">{getArticlesByCategory(category.slug).length} articoli disponibili</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

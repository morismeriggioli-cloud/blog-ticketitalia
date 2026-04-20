import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/ui/ArticleCard";
import {
  categories,
  getArticlesByCategory,
  getArticlesBySubcategory,
  getCategoryBySlug,
  getCategoryPath,
  getSubcategoryBySlug,
  getSubcategoryPath,
} from "@/data/blog";
import { articlePath } from "@/lib/utils";

type EditorialListingPageProps = {
  params: Promise<{ categorySlug: string; subcategorySlug?: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.flatMap((category) => [
    { categorySlug: category.slug, subcategorySlug: [] },
    ...category.subcategories.map((subcategory) => ({
      categorySlug: category.slug,
      subcategorySlug: [subcategory.slug],
    })),
  ]);
}

export async function generateMetadata({ params }: EditorialListingPageProps): Promise<Metadata> {
  const { categorySlug, subcategorySlug = [] } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category || subcategorySlug.length > 1) {
    return { title: "Sezione non trovata" };
  }

  const subcategory = subcategorySlug[0]
    ? getSubcategoryBySlug(category.slug, subcategorySlug[0])
    : undefined;

  if (subcategorySlug[0] && !subcategory) {
    return { title: "Sottocategoria non trovata" };
  }

  const title = subcategory ? `${subcategory.name} | ${category.name}` : category.name;
  const description = subcategory?.description ?? category.description;

  return {
    title,
    description,
    alternates: {
      canonical: subcategory
        ? getSubcategoryPath(category.slug, subcategory.slug)
        : getCategoryPath(category.slug),
    },
    openGraph: {
      title: `${title} | Ticket Italia Blog`,
      description,
    },
  };
}

export default async function EditorialListingPage({ params }: EditorialListingPageProps) {
  const { categorySlug, subcategorySlug = [] } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category || subcategorySlug.length > 1) {
    notFound();
  }

  const subcategory = subcategorySlug[0]
    ? getSubcategoryBySlug(category.slug, subcategorySlug[0])
    : undefined;

  if (subcategorySlug[0] && !subcategory) {
    notFound();
  }

  const articles = subcategory
    ? getArticlesBySubcategory(category.slug, subcategory.slug)
    : getArticlesByCategory(category.slug);
  const [lead, ...rest] = articles;

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="container-page">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 rounded-md text-sm font-black text-muted transition hover:text-ink">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Torna alla home
        </Link>

        <header className="mb-8 rounded-lg bg-white p-6 shadow-sm ring-1 ring-line sm:p-10">
          <span className={`mb-5 inline-flex rounded-md px-3 py-1 text-xs font-black uppercase tracking-normal ${category.accentClass}`}>
            {subcategory?.name ?? category.eyebrow}
          </span>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-black leading-[0.98] tracking-normal text-ink sm:text-6xl">
                {subcategory?.name ?? category.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
                {subcategory?.description ?? category.description}
              </p>
            </div>
            <div className="rounded-lg bg-background p-5">
              <p className="text-sm font-black uppercase tracking-normal text-coral">Articoli pubblicati</p>
              <p className="mt-2 text-3xl font-black tracking-normal text-ink">{articles.length}</p>
            </div>
          </div>
        </header>

        <nav aria-label="Sottocategorie" className="mb-10 flex flex-wrap gap-2">
          <Link
            href={getCategoryPath(category.slug)}
            className="rounded-md border border-line bg-white px-3 py-2 text-sm font-bold text-muted transition hover:border-ink hover:text-ink"
          >
            Tutto {category.name}
          </Link>
          {category.subcategories.map((item) => (
            <Link
              key={item.slug}
              href={getSubcategoryPath(category.slug, item.slug)}
              className="rounded-md border border-line bg-white px-3 py-2 text-sm font-bold text-muted transition hover:border-ink hover:text-ink"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {lead ? (
          <div className="mb-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <ArticleCard article={lead} priority />
            <div className="rounded-lg bg-ink p-6 text-white sm:p-8">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-neon">In evidenza</p>
              <h2 className="text-3xl font-black leading-tight tracking-normal sm:text-4xl">{lead.title}</h2>
              <p className="mt-4 leading-8 text-white/70">{lead.excerpt}</p>
              <Link href={articlePath(lead.slug)} className="mt-6 inline-flex items-center gap-2 font-black text-neon hover:text-white">
                Leggi ora <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-line bg-white p-8 text-muted">
            <h2 className="text-2xl font-black tracking-normal text-ink">Nessun articolo pubblicato</h2>
            <p className="mt-3 leading-7">Questa sezione e pronta per i prossimi contenuti editoriali Ticket Italia.</p>
          </div>
        )}

        {rest.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

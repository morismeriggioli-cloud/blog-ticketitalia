import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryBySlug, getCategoryPath } from "@/data/blog";
import { categories } from "@/data/blog";

type LegacyCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: LegacyCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: category ? `${category.name} — redirect` : "Redirect",
    robots: { index: false, follow: true },
    alternates: {
      canonical: category ? getCategoryPath(category.slug) : "/categorie",
    },
  };
}

export default async function LegacyCategoryPage({ params }: LegacyCategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const target = category ? getCategoryPath(category.slug) : "/categorie";

  return (
    <main className="container-page py-16">
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <h1 className="text-3xl font-black text-ink">Ti stiamo portando alla sezione corretta.</h1>
      <p className="mt-4 text-muted">
        Se il reindirizzamento non parte automaticamente, apri la pagina corretta da qui.
      </p>
      <Link href={target} className="btn-primary mt-6">
        Vai alla sezione
      </Link>
    </main>
  );
}

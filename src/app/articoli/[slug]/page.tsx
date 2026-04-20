import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, publishedArticles } from "@/data/blog";
import { ArticleDetail } from "@/components/article/ArticleDetail";
import { articlePath } from "@/lib/utils";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Articolo non trovato" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: articlePath(article.slug),
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.image, alt: article.title }],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}

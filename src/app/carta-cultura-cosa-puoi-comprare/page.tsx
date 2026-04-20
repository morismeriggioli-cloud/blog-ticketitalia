import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/article/ArticleDetail";
import { getArticleBySlug } from "@/data/blog";

const slug = "carta-cultura-cosa-puoi-comprare";

export const metadata: Metadata = {
  title: "Carta Cultura: cosa puoi comprare davvero nel 2026",
  description:
    "Guida chiara su cosa puoi comprare con Carta Cultura nel 2026: libri, musica, concerti, teatro, cinema, eventi culturali e cosa resta escluso.",
  alternates: {
    canonical: `/${slug}`,
  },
  openGraph: {
    title: "Carta Cultura: cosa puoi comprare davvero nel 2026",
    description:
      "Scopri cosa e acquistabile con Carta Cultura, quando puoi usarla per concerti ed eventi e quali errori evitare.",
    type: "article",
    publishedTime: "2026-04-18",
  },
};

export default function CartaCulturaCosaPuoiComprarePage() {
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Ticket Italia",
    },
    mainEntityOfPage: `/${slug}`,
    image: article.image,
    mainEntity: article.body.faq?.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetail article={article} />
    </>
  );
}

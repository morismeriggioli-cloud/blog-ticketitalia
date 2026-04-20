import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/article/ArticleDetail";
import { getArticleBySlug } from "@/data/blog";

const slug = "carta-cultura-concerti-come-usarla";

export const metadata: Metadata = {
  title: "Come usare Carta Cultura per concerti: guida completa",
  description:
    "Guida completa per usare Carta Cultura per concerti: quando e possibile, quali eventi sono idonei, come generare il buono e acquistare su Ticket Italia.",
  alternates: {
    canonical: `/${slug}`,
  },
  openGraph: {
    title: "Come usare Carta Cultura per concerti: guida completa",
    description:
      "Scopri come usare Carta Cultura per concerti idonei, quali errori evitare e come verificare il pagamento nel checkout.",
    type: "article",
    publishedTime: "2026-04-19",
  },
};

export default function CartaCulturaConcertiArticlePage() {
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

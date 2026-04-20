import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/article/ArticleDetail";
import { getArticleBySlug } from "@/data/blog";

const slug = "come-usare-carta-cultura-carta-docente-biglietti-eventi";

export const metadata: Metadata = {
  title: "Come usare Carta Cultura e Carta Docente per acquistare biglietti eventi",
  description:
    "Guida pratica per usare Carta Cultura e Carta Docente per biglietti eventi, teatro, concerti e spettacoli dal vivo su canali abilitati.",
  alternates: {
    canonical: `/${slug}`,
  },
  openGraph: {
    title: "Come usare Carta Cultura e Carta Docente per acquistare biglietti eventi",
    description:
      "Scopri come generare il buono, quali eventi sono ammessi e come usarlo nel checkout quando disponibile.",
    type: "article",
    publishedTime: "2026-04-17",
  },
};

export default function CartaCulturaCartaDocenteArticlePage() {
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

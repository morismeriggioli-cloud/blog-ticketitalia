import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/article/ArticleDetail";
import { getArticleBySlug } from "@/data/blog";

const slug = "agriumbria-evento-biglietti-guida";

export const metadata: Metadata = {
  title: "Agriumbria: com'è andata l'ultima edizione e come partecipare",
  description:
    "Guida editoriale ad Agriumbria: bilancio dell'ultima edizione, informazioni utili, biglietti e consigli per partecipare alle prossime edizioni.",
  alternates: {
    canonical: `/${slug}`,
  },
  openGraph: {
    title: "Agriumbria: com'è andata l'ultima edizione e come partecipare",
    description:
      "Scopri com'e andata Agriumbria, perche e un evento importante e come acquistare i biglietti per partecipare.",
    type: "article",
    publishedTime: "2026-04-20",
  },
};

export default function AgriumbriaArticlePage() {
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

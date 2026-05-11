import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, publishedArticles } from "@/data/blog";
import { ArticleDetail } from "@/components/article/ArticleDetail";
import { articlePath } from "@/lib/utils";
import { siteConfig } from "../../../../shared/config";

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

  const canonical = articlePath(article.slug);

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt ?? article.date,
      authors: [article.author],
      images: [{ url: article.image, alt: article.title }],
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const articleUrl = `${baseUrl}${articlePath(article.slug)}/`;
  const imageUrl = article.image.startsWith("http")
    ? article.image
    : `${baseUrl}${article.image.startsWith("/") ? "" : "/"}${article.image}`;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.publishedAt ?? article.date,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Ticket Italia",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo%20ticket%20italia%20(3).png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: imageUrl,
  };

  const faqJsonLd = article.body.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.body.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <ArticleDetail article={article} />
    </>
  );
}

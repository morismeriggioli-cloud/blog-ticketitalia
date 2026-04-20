import type { MetadataRoute } from "next";
import { categories, getSubcategoryPath, publishedArticles } from "@/data/blog";
import { articlePath } from "@/lib/utils";
import { siteConfig } from "../../shared/config";

const baseUrl = siteConfig.url.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

export const dynamic = "force-static";

function absoluteUrl(path: string) {
  if (path === "/") {
    return baseUrl;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}/`.replace(/([^:]\/)\/+/g, "$1");
}

function latestDate(dates: string[]) {
  return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
}

function lastModified(date: string) {
  return new Date(date).getTime() > new Date(today).getTime() ? today : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestArticleDate = lastModified(latestDate(publishedArticles.map((article) => article.date)));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/articoli"),
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/categorie"),
      lastModified: latestArticleDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.flatMap((category) => {
    const categoryArticles = publishedArticles.filter(
      (article) => article.categorySlug === category.slug,
    );
    const categoryDate = latestDate(categoryArticles.map((article) => article.date)) ?? latestArticleDate;

    return [
      {
        url: absoluteUrl(`/${category.slug}`),
        lastModified: lastModified(categoryDate),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      ...category.subcategories.map((subcategory) => {
        const subcategoryArticles = publishedArticles.filter(
          (article) =>
            article.categorySlug === category.slug &&
            article.subcategorySlug === subcategory.slug,
        );
        const subcategoryDate =
          latestDate(subcategoryArticles.map((article) => article.date)) ?? categoryDate;

        return {
          url: absoluteUrl(getSubcategoryPath(category.slug, subcategory.slug)),
          lastModified: lastModified(subcategoryDate),
          changeFrequency: "weekly" as const,
          priority: 0.65,
        };
      }),
    ];
  });

  const articlePages: MetadataRoute.Sitemap = publishedArticles.map((article) => ({
    url: absoluteUrl(articlePath(article.slug)),
    lastModified: lastModified(article.publishedAt ?? article.date),
    changeFrequency: "monthly",
    priority: article.featured || article.spotlight ? 0.9 : 0.85,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}

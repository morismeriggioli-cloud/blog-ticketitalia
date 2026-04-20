export const siteConfig = {
  name: "Ticket Italia Blog",
  url: "https://blog.ticketitalia.com",
  ticketitaliaBaseUrl: "https://www.ticketitalia.com",
  defaultAuthor: "Redazione Ticket Italia",
  defaultCategory: "concerti",
  sitemapUrl: "https://ticketitalia.com//index.php?route=feed/advanced_sitemap",
} as const;

export const articleDefaults = {
  status: "draft" as const,
  author: siteConfig.defaultAuthor,
  imagePlaceholder: (slug: string) => `/images/${slug}-hero.jpg`,
  estimateReadTime: (wordCount: number) =>
    `${Math.max(1, Math.round(wordCount / 200))} min`,
} as const;

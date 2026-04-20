import { HomeEventCategories } from "@/components/home/HomeEventCategories";
import { HomeFeaturedArticles } from "@/components/home/HomeFeaturedArticles";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
import { HomeGuides } from "@/components/home/HomeGuides";
import { HomeHeroWow } from "@/components/home/HomeHeroWow";
import { HomeTrends } from "@/components/home/HomeTrends";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { getFeaturedArticles, getSpotlightArticle, publishedArticles } from "@/data/blog";

export default function Home() {
  const spotlight = getSpotlightArticle();
  const featured = getFeaturedArticles();
  const heroFeatured = publishedArticles
    .filter((article) => article.slug !== spotlight?.slug)
    .slice(0, 3);
  const [editorialLead] = featured.length > 0 ? featured : publishedArticles;
  const editorialSide = publishedArticles
    .filter((article) => article.slug !== editorialLead?.slug)
    .slice(0, 4);
  const trendArticles = publishedArticles
    .filter((article) => article.slug !== spotlight?.slug && article.slug !== editorialLead?.slug)
    .slice(0, 6);

  if (!spotlight || !editorialLead) {
    return null;
  }

  return (
    <>
      <HomeHeroWow lead={spotlight} featured={heroFeatured} />
      <HomeFeaturedArticles lead={editorialLead} articles={editorialSide} />
      <HomeEventCategories />
      <HomeTrends articles={trendArticles} />
      <HomeGuides />
      <NewsletterSection />
      <HomeFinalCta />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { publishedArticles } from "@/data/blog";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SectionIntro } from "./SectionIntro";
import { StaggerGroup, staggerItem } from "@/components/motion/StaggerGroup";

export function AnimatedArticleCards() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container-page">
        <SectionIntro
          eyebrow="Guide / approfondimenti"
          title="Letture veloci per scegliere meglio."
          text="Card modulari, immagini forti e informazioni essenziali: categoria, tag, tempo di lettura e titolo sempre in primo piano."
        />

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedArticles.slice(0, 6).map((article, index) => (
            <motion.div key={article.slug} variants={staggerItem}>
              <ArticleCard article={article} priority={index < 2} />
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

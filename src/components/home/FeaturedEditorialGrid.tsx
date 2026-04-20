"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { getFeaturedArticles, publishedArticles } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { StaggerGroup, staggerItem } from "@/components/motion/StaggerGroup";
import { SectionIntro } from "./SectionIntro";
import { articlePath, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { motionDuration, motionEase } from "@/lib/motion";

export function FeaturedEditorialGrid() {
  const [lead] = getFeaturedArticles();
  const sideArticles = publishedArticles.filter((article) => article.slug !== lead?.slug).slice(0, 4);

  if (!lead) {
    return null;
  }

  return (
    <section className="bg-ink py-16 text-white sm:py-24">
      <div className="container-page">
        <SectionIntro
          eyebrow="Scopri cosa succede"
          title="Una prima pagina per orientarti nel rumore del live."
          text="Storie in evidenza, guide veloci e segnali utili per capire dove vale la pena esserci."
          inverted
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <MotionWrapper y={34}>
            <article className="group relative min-h-[460px] overflow-hidden rounded-lg bg-neutral-950 shadow-lift sm:min-h-[560px]">
              <ImageReveal className="absolute inset-0">
                <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </ImageReveal>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,17,20,0.02),rgba(16,17,20,0.92))]" />
              <Link href={articlePath(lead.slug)} className="absolute inset-0 flex flex-col justify-end p-6 sm:p-9">
                <Badge variant="accent">{lead.category}</Badge>
                <h3 className="mt-5 max-w-3xl text-3xl font-black leading-[1] tracking-normal sm:text-6xl sm:leading-[0.96] ">
                  {lead.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/74 sm:mt-5 sm:text-lg sm:leading-8">{lead.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-bold text-white/68">
                  <span>{formatDate(lead.date)}</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="size-4" aria-hidden="true" />
                    {lead.readTime}
                  </span>
                </div>
              </Link>
            </article>
          </MotionWrapper>

          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {sideArticles.map((article, index) => (
              <motion.article
                key={`${article.slug}-${index}`}
                variants={staggerItem}
                className="group rounded-lg border border-white/15 bg-white/8 p-4 backdrop-blur transition-colors duration-300 hover:bg-white hover:text-ink"
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: motionDuration.hover, ease: motionEase.standard }}
              >
                <Link href={articlePath(article.slug)} className="grid gap-4 sm:grid-cols-[132px_1fr] lg:grid-cols-[150px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-neutral-950 sm:aspect-auto">
                    <Image src={article.image} alt="" fill sizes="180px" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="self-center">
                    <p className="mb-2 text-xs font-black uppercase tracking-normal text-neon transition group-hover:text-coral">
                      0{index + 1} / {article.category}
                    </p>
                    <h3 className="line-clamp-3 text-xl font-black leading-tight tracking-normal">
                      {article.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/60 transition group-hover:text-muted">{article.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </StaggerGroup>
        </div>

        <MotionWrapper className="mt-8 flex justify-end" y={18}>
          <Link href="/articoli" className="inline-flex items-center gap-2 font-black text-neon hover:text-white">
            Apri tutto il magazine <ArrowUpRight className="size-5" aria-hidden="true" />
          </Link>
        </MotionWrapper>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Ticket } from "lucide-react";
import { getSpotlightArticle, publishedArticles } from "@/data/blog";
import { editorialPills, sensoryNotes } from "@/data/home";
import { Badge } from "@/components/ui/Badge";
import { RevealText } from "@/components/motion/RevealText";
import { MagneticCta } from "@/components/motion/MagneticCta";
import { motionDuration, motionEase } from "@/lib/motion";
import { articlePath } from "@/lib/utils";

export function HeroImmersive() {
  const spotlight = getSpotlightArticle();
  const side = publishedArticles.filter((article) => article.slug !== spotlight?.slug).slice(0, 2);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.45], [0, prefersReducedMotion ? 0 : 90]);
  const panelY = useTransform(scrollYProgress, [0, 0.45], [0, prefersReducedMotion ? 0 : -36]);

  if (!spotlight) {
    return null;
  }

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-0 -z-20" style={{ y: imageY }}>
        <Image src={spotlight.image} alt="" fill priority sizes="100vw" className="object-cover opacity-65" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,9,12,0.96),rgba(16,17,20,0.72)_48%,rgba(16,17,20,0.24))]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 event-grid opacity-30" aria-hidden="true" />

      <div className="container-page grid min-h-[calc(100svh-4.5rem)] gap-7 py-7 sm:gap-8 sm:py-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:py-12">
        <div className="flex min-h-[64svh] flex-col justify-end pb-4 sm:min-h-[70svh] sm:pb-6 lg:pb-10">
          <motion.div
            className="mb-5 flex flex-wrap gap-2 sm:mb-6"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.section, ease: motionEase.premium }}
          >
            {editorialPills.map((pill) => (
              <span key={pill.label} className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-normal text-white/85 backdrop-blur">
                <pill.icon className="size-3.5 text-neon sm:size-4" aria-hidden="true" />
                {pill.label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.section, delay: 0.08, ease: motionEase.premium }}
          >
            <Badge variant="accent">Ticket Italia Experience</Badge>
          </motion.div>

          <RevealText as="h1" delay={0.12} className="mt-5 max-w-5xl text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl sm:leading-[0.88] lg:text-8xl">
            Ogni evento ha una storia. Inizia da qui.
          </RevealText>

          <motion.p
            className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:mt-6 sm:text-xl sm:leading-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.section, delay: 0.42, ease: motionEase.premium }}
          >
            Gli eventi non si leggono soltanto. Si sentono, si immaginano, si vivono. Ticket Italia racconta il ritmo del live e ti porta piu vicino al palco.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.section, delay: 0.54, ease: motionEase.premium }}
          >
            <MagneticCta href="https://www.ticketitalia.com" className="w-full sm:w-auto">
              <Ticket className="size-5" aria-hidden="true" />
              Esplora eventi
            </MagneticCta>
            <MagneticCta href="/articoli" variant="ghost" className="w-full sm:w-auto">
              Leggi le guide
              <ArrowRight className="size-5" aria-hidden="true" />
            </MagneticCta>
          </motion.div>
        </div>

        <motion.div className="grid gap-3 pb-4 lg:pb-10" style={{ y: panelY }}>
          <Link href={articlePath(spotlight.slug)} className="group overflow-hidden rounded-lg border border-white/15 bg-white/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-ink">
            <div className="grid grid-cols-[104px_1fr] gap-3 p-3 sm:grid-cols-[144px_1fr] sm:gap-4">
              <div className="relative min-h-32 overflow-hidden rounded-md bg-ink">
                <Image src={spotlight.image} alt="" fill sizes="180px" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="self-center">
                <Badge variant="accent">{spotlight.category}</Badge>
                <h2 className="mt-3 line-clamp-3 text-lg font-black leading-tight tracking-normal sm:text-2xl ">
                  {spotlight.title}
                </h2>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white/65 transition group-hover:text-muted">
                  <Play className="size-4" aria-hidden="true" />
                  Apri la storia
                </p>
              </div>
            </div>
          </Link>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {side.map((article) => (
              <Link key={article.slug} href={articlePath(article.slug)} className="group rounded-lg border border-white/15 bg-ink/62 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-neon hover:bg-white hover:text-ink">
                <p className="mb-3 text-xs font-black uppercase tracking-normal text-neon transition group-hover:text-coral">
                  {article.category} / {article.readTime}
                </p>
                <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-normal">{article.title}</h3>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container-page relative grid gap-3 pb-8 sm:-mt-8 sm:grid-cols-3">
        {sensoryNotes.map((note) => (
          <motion.div
            key={note.label}
            className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionDuration.reveal, ease: motionEase.premium }}
          >
            <note.icon className="mb-3 size-5 text-neon" aria-hidden="true" />
            <p className="font-black uppercase tracking-normal">{note.label}</p>
            <p className="text-sm text-white/65">{note.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

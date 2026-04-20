"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { storyBeats } from "@/data/home";
import { SectionIntro } from "./SectionIntro";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { ImageReveal } from "@/components/motion/ImageReveal";

export function HorizontalStoryBlock() {
  return (
    <section className="bg-ink py-16 text-white sm:py-24">
      <div className="container-page">
        <SectionIntro
          eyebrow="Dallo schermo al palco"
          title="Un percorso che trasforma l'idea in presenza."
          text="La landing non vende solo click. Accompagna l'utente dentro una sequenza: scoprire, scegliere, vivere."
          inverted
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {storyBeats.map((beat, index) => (
            <MotionWrapper key={beat.title} delay={index * 0.08} y={34}>
              <article className="group overflow-hidden rounded-lg border border-white/15 bg-white/8">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-950">
                  <ImageReveal className="absolute inset-0">
                    <Image src={beat.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </ImageReveal>
                  <motion.div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,17,20,0.04),rgba(16,17,20,0.72))]"
                    whileHover={{ opacity: 0.82 }}
                    transition={{ duration: 0.28 }}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="mb-3 text-xs font-black uppercase tracking-normal text-neon">{beat.eyebrow}</p>
                  <h3 className="text-2xl font-black leading-tight tracking-normal">{beat.title}</h3>
                  <p className="mt-3 leading-7 text-white/65">{beat.text}</p>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

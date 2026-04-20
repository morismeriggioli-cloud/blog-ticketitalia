"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { energyCards } from "@/data/home";
import { SectionIntro } from "./SectionIntro";
import { StaggerGroup, staggerItem } from "@/components/motion/StaggerGroup";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { motionDuration, motionEase } from "@/lib/motion";

export function EnergyManifesto() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <SectionIntro
            eyebrow="L'energia degli eventi"
            title="Prima ancora del palco, c'e un momento in cui lo senti."
            text="Il live comincia quando una data ti resta in testa. La homepage segue quel battito: scoperta, scelta, attesa, presenza."
          />
          <motion.blockquote
            className="rounded-lg bg-ink p-6 text-2xl font-black leading-tight tracking-normal text-white shadow-lift sm:p-8 sm:text-4xl"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: motionDuration.section, ease: motionEase.premium }}
          >
            Gli eventi non si leggono soltanto. Si sentono, si immaginano, si vivono.
          </motion.blockquote>
        </div>

        <StaggerGroup className="mt-8 grid gap-4 md:grid-cols-3">
          {energyCards.map((card, index) => (
            <motion.article
              key={card.title}
              variants={staggerItem}
              className="group relative min-h-[360px] overflow-hidden rounded-lg bg-ink text-white shadow-sm sm:min-h-[420px]"
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: motionDuration.hover, ease: motionEase.standard }}
            >
              <ImageReveal className="absolute inset-0">
                <Image src={card.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </ImageReveal>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,17,20,0.08),rgba(16,17,20,0.88))]" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="mb-3 text-xs font-black uppercase tracking-normal text-neon">0{index + 1}</p>
                <h3 className="text-2xl font-black leading-tight tracking-normal">{card.title}</h3>
                <p className="mt-3 leading-7 text-white/70">{card.text}</p>
              </div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

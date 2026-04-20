"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { homeCategories } from "@/data/home";
import { SectionIntro } from "./SectionIntro";
import { StaggerGroup, staggerItem } from "@/components/motion/StaggerGroup";
import { motionDuration, motionEase } from "@/lib/motion";
import { getCategoryPath } from "@/data/blog";

export function EventCategoriesShowcase() {
  return (
    <section id="categorie" className="overflow-hidden bg-background py-16 sm:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionIntro
            eyebrow="Categorie eventi"
            title="Ogni scena ha il suo ritmo."
            text="Concerti, festival, teatro, sport e nightlife non hanno lo stesso passo. La UI cambia tono senza perdere coerenza."
          />
          <p className="max-w-2xl text-lg leading-8 text-muted lg:justify-self-end">
            Colori dedicati, icone pulite, hover fisici e card ad alto contrasto rendono la navigazione immediata anche su mobile.
          </p>
        </div>

        <StaggerGroup className="mt-2 grid gap-4 md:grid-cols-6">
          {homeCategories.map((category, index) => (
            <motion.div
              key={category.slug}
              variants={staggerItem}
              className={index === 0 || index === 4 ? "md:col-span-3 lg:col-span-2" : "md:col-span-3 lg:col-span-2"}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: motionDuration.hover, ease: motionEase.standard }}
            >
              <Link href={getCategoryPath(category.slug)} className="group relative block min-h-64 overflow-hidden rounded-lg p-5 shadow-sm transition-shadow duration-300 hover:shadow-lift sm:min-h-72">
                <div className={`absolute inset-0 ${category.className}`} aria-hidden="true" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,17,20,0)_0%,rgba(16,17,20,0.28)_100%)]" aria-hidden="true" />
                <div className="relative flex min-h-52 flex-col justify-between sm:min-h-60">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-md bg-white/20 backdrop-blur">
                      <category.icon className="size-6" aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="size-6 transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-black uppercase tracking-normal opacity-75">{category.imageHint}</p>
                    <h3 className="text-3xl font-black tracking-normal">{category.name}</h3>
                    <p className="mt-3 max-w-xs text-sm font-semibold leading-6 opacity-78">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

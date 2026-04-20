import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guideItems } from "@/data/home";

export function GuidesSection() {
  return (
    <section className="bg-white py-18 sm:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="mb-3 text-sm font-black uppercase tracking-normal text-coral">Guide & consigli</p>
            <h2 className="text-3xl font-black tracking-normal text-ink sm:text-5xl">
              Meno dubbi, piu serate riuscite.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-8 text-muted">
              Contenuti pratici per scegliere meglio: non solo cosa comprare, ma come vivere l&apos;evento senza stress.
            </p>
            <Link href="/articoli" className="btn-secondary mt-7">
              Sfoglia le guide
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4">
            {guideItems.map((guide, index) => (
              <article
                key={guide.title}
                className="group grid gap-5 rounded-lg border border-line bg-background p-5 transition duration-300 hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-white hover:shadow-lift sm:grid-cols-[84px_1fr]"
              >
                <div className="grid size-16 place-items-center rounded-md bg-primary-500 text-ink sm:size-20">
                  <guide.icon className="size-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-normal text-coral transition group-hover:text-neon">
                    0{index + 1} / {guide.kicker}
                  </p>
                  <h3 className="text-2xl font-black leading-tight tracking-normal sm:text-3xl">
                    {guide.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-7 text-muted transition group-hover:text-white/70">
                    {guide.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

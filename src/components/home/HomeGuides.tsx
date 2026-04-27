import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { guidePanels } from "@/data/homepage";

export function HomeGuides() {
  return (
    <section className="bg-ink py-16 text-white sm:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="mb-3 text-sm font-black uppercase tracking-normal text-primary-400">
              Guide & consigli
            </p>
            <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-normal sm:text-5xl">
              Sapere prima, godere di più.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/68">
              Bonus, prevendite, settori, posti veri: tutto quello che vorresti sapesse un amico esperto, raccontato senza giri di parole.
            </p>
            <Link href="/categorie/guide" className="mt-7 inline-flex items-center gap-2 font-black text-primary-400 transition hover:text-white">
              Tutte le guide
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4">
            {guidePanels.map((guide, index) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group grid gap-5 rounded-md border border-white/12 bg-white/8 p-5 transition duration-300 ease-event hover:-translate-y-1 hover:bg-white hover:text-ink sm:grid-cols-[72px_1fr_auto] sm:items-center sm:p-6"
              >
                <span className="grid size-14 place-items-center rounded-md bg-primary-500 text-neutral-950 transition group-hover:bg-primary-600">
                  <guide.icon className="size-7" aria-hidden="true" />
                </span>
                <span>
                  <span className="text-xs font-black uppercase tracking-normal text-primary-400 transition group-hover:text-secondary-500">
                    0{index + 1} / {guide.kicker}
                  </span>
                  <span className="mt-2 block text-2xl font-black leading-tight tracking-normal">{guide.title}</span>
                  <span className="mt-3 block leading-7 text-white/64 transition group-hover:text-muted">{guide.excerpt}</span>
                </span>
                <span className="grid size-11 place-items-center rounded-md border border-white/15 text-white transition group-hover:border-ink group-hover:text-ink">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

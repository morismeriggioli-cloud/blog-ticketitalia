import Link from "next/link";
import { ArrowRight, CalendarDays, Ticket } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="bg-background pb-18 sm:pb-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-lg bg-ink p-6 text-white sm:p-10 lg:p-14">
          <div className="absolute inset-0 event-grid opacity-35" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-md bg-primary-500 px-3 py-1 text-sm font-black text-ink">
                <CalendarDays className="size-4" aria-hidden="true" />
                Prossima uscita
              </span>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-normal sm:text-6xl">
                Non perderti i prossimi eventi.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                Dal magazine alla biglietteria: trova la storia giusta, poi scegli il posto da cui viverla.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a href="https://www.ticketitalia.com" className="btn-primary">
                <Ticket className="size-5" aria-hidden="true" />
                Vai su Ticket Italia
              </a>
              <Link href="/articoli" className="btn-ghost border-white/20 px-5 text-white hover:text-neon">
                Continua a leggere
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


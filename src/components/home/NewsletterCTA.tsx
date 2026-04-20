"use client";

import { Mail, Sparkles, Ticket } from "lucide-react";
import { MagneticCta } from "@/components/motion/MagneticCta";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { scaleIn } from "@/lib/motion";

export function NewsletterCTA() {
  return (
    <section id="newsletter" className="bg-background py-16 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-lg bg-primary-500 text-ink shadow-glow">
          <div className="absolute inset-0 event-grid opacity-25 mix-blend-multiply" aria-hidden="true" />
          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.92fr] lg:p-14">
            <MotionWrapper y={26}>
              <span className="mb-5 inline-flex items-center gap-2 rounded-md bg-ink px-3 py-1 text-sm font-black text-white">
                <Sparkles className="size-4 text-primary-500" aria-hidden="true" />
                Backstage pass
              </span>
              <h2 className="max-w-2xl text-3xl font-black leading-[1] tracking-normal sm:text-6xl sm:leading-[0.98] ">
                Il meglio degli eventi prima che diventi sold out.
              </h2>
              <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-ink/72 sm:text-lg sm:leading-8">
                Una mail essenziale con nuove date, guide pratiche e idee per il weekend. Niente rumore, solo cose da vivere.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.12} variant={scaleIn} className="self-end">
              <form className="rounded-lg border border-ink/12 bg-white p-4 shadow-lift">
                <label htmlFor="newsletter-email" className="mb-3 block text-sm font-black uppercase tracking-normal text-muted">
                  Email
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="nome@email.it"
                      className="h-12 w-full rounded-md border border-line bg-white pl-12 pr-4 text-ink outline-none placeholder:text-muted/60 focus:border-ink focus:ring-4 focus:ring-secondary-500/30"
                    />
                  </div>
                  <button type="submit" className="h-12 rounded-md bg-ink px-5 font-black text-white transition hover:bg-coral">
                    Iscrivimi
                  </button>
                </div>
                <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-muted">Dal racconto al biglietto, senza perdere il momento.</p>
                  <MagneticCta href="https://www.ticketitalia.com" variant="primary">
                    <Ticket className="size-5" aria-hidden="true" />
                    Vai agli eventi
                  </MagneticCta>
                </div>
              </form>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}

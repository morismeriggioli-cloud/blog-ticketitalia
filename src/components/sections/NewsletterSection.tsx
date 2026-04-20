import { Mail, Sparkles } from "lucide-react";

export function NewsletterSection() {
  return (
    <section id="newsletter" className="bg-white py-16 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-md bg-primary-500 text-neutral-950 shadow-glow">
          <div className="absolute inset-0 event-grid opacity-25 mix-blend-multiply" aria-hidden="true" />
          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-md bg-ink px-3 py-1 text-sm font-black text-white">
                <Sparkles className="size-4 text-primary-500" aria-hidden="true" />
                Backstage pass
              </span>
              <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-normal sm:text-6xl">
                Il meglio degli eventi prima che diventi sold out.
              </h2>
              <p className="mt-4 max-w-xl text-lg font-semibold leading-8 text-neutral-950/72">
                Una mail essenziale con nuove date, guide pratiche e idee per il weekend. Niente rumore, solo cose da vivere.
              </p>
            </div>
            <form className="self-end rounded-md border border-ink/12 bg-white p-4 shadow-lift">
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
              <p className="mt-3 text-xs font-semibold leading-5 text-muted">
                Arriva solo quando c&apos;e qualcosa che merita davvero attenzione.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

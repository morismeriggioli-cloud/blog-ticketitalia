import Link from "next/link";
import { finalHomeCta } from "@/data/homepage";

export function HomeFinalCta() {
  const PrimaryIcon = finalHomeCta.primary.icon;
  const SecondaryIcon = finalHomeCta.secondary.icon;

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-md bg-ink p-6 text-white shadow-lift-strong sm:p-10 lg:p-14">
          <div className="absolute inset-0 event-grid opacity-20" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.48fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-primary-400">
                {finalHomeCta.eyebrow}
              </p>
              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-6xl">
                {finalHomeCta.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{finalHomeCta.text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={finalHomeCta.primary.href} className="btn-primary w-full">
                <PrimaryIcon className="size-5" aria-hidden="true" />
                {finalHomeCta.primary.label}
              </a>
              <Link href={finalHomeCta.secondary.href} className="btn-ghost w-full border-white/18 bg-white/8 text-white">
                <SecondaryIcon className="size-5" aria-hidden="true" />
                {finalHomeCta.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

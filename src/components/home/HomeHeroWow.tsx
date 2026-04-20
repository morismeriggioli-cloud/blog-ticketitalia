import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Ticket } from "lucide-react";
import { homepageHero } from "@/data/homepage";
import type { Article } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { articlePath } from "@/lib/utils";

type HomeHeroWowProps = {
  lead: Article;
  featured: Article[];
};

export function HomeHeroWow({ lead, featured }: HomeHeroWowProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-20">
        <Image
          src={homepageHero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-72"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,8,11,0.96),rgba(17,19,24,0.78)_48%,rgba(17,19,24,0.34))]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 event-grid opacity-30" aria-hidden="true" />

      <div className="container-page grid min-h-[calc(100svh-4rem)] gap-6 py-6 sm:min-h-[calc(100svh-4.5rem)] sm:py-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start lg:pt-28 lg:pb-10">
        <div className="flex min-h-[58svh] flex-col justify-center pb-2 sm:min-h-[60svh] lg:min-h-0 lg:justify-start lg:pb-0">
          <div className="animate-rise mb-5 flex flex-wrap gap-2">
            {homepageHero.features.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-normal text-white/86 backdrop-blur"
              >
                <item.icon className="size-4 text-primary-400" aria-hidden="true" />
                {item.label}
              </span>
            ))}
          </div>

          <Badge variant="accent">{homepageHero.eyebrow}</Badge>
          <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.92] tracking-normal sm:text-7xl sm:leading-[0.9] lg:text-8xl">
            {homepageHero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-xl sm:leading-8">
            {homepageHero.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={homepageHero.primaryCta.href} className="btn-primary w-full sm:w-auto">
              <Ticket className="size-5" aria-hidden="true" />
              {homepageHero.primaryCta.label}
            </a>
            <Link href={homepageHero.secondaryCta.href} className="btn-ghost w-full border-white/18 bg-white/8 text-white sm:w-auto">
              {homepageHero.secondaryCta.label}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid gap-3 pb-5 lg:pb-0 lg:pt-14">
          <Link
            href={articlePath(lead.slug)}
            className="group overflow-hidden rounded-md border border-white/15 bg-white/10 backdrop-blur transition duration-300 ease-event hover:-translate-y-1 hover:bg-white hover:text-ink"
          >
            <div className="grid grid-cols-[112px_1fr] gap-3 p-3 sm:grid-cols-[150px_1fr] sm:gap-4">
              <div className="relative min-h-36 overflow-hidden rounded-md bg-neutral-950">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-cover transition duration-500 ease-entrance group-hover:scale-105"
                />
              </div>
              <div className="self-center">
                <Badge variant="accent">{lead.category}</Badge>
                <h2 className="mt-3 line-clamp-3 text-lg font-black leading-tight tracking-normal sm:text-2xl">
                  {lead.title}
                </h2>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white/65 transition group-hover:text-muted">
                  <Play className="size-4" aria-hidden="true" />
                  Apri la storia
                </p>
              </div>
            </div>
          </Link>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {featured.slice(0, 2).map((article) => (
              <Link
                key={article.slug}
                href={articlePath(article.slug)}
                className="group rounded-md border border-white/15 bg-ink/64 p-4 backdrop-blur transition duration-300 ease-event hover:-translate-y-1 hover:border-primary-400 hover:bg-white hover:text-ink"
              >
                <p className="mb-3 text-xs font-black uppercase tracking-normal text-primary-400 transition group-hover:text-secondary-500">
                  {article.category} / {article.readTime}
                </p>
                <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-normal">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page grid gap-3 pb-8 sm:-mt-4 sm:grid-cols-3 lg:-mt-6">
        {homepageHero.features.map((item) => (
          <div key={item.value} className="rounded-md border border-white/15 bg-white/10 p-4 backdrop-blur">
            <item.icon className="mb-3 size-5 text-primary-400" aria-hidden="true" />
            <p className="text-sm font-black uppercase tracking-normal text-white">{item.value}</p>
            <p className="mt-1 text-sm text-white/62">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

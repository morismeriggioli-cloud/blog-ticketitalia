import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Play, Ticket } from "lucide-react";
import { getSpotlightArticle, publishedArticles } from "@/data/blog";
import { editorialPills, homeStats } from "@/data/home";
import { Badge } from "@/components/ui/Badge";
import { articlePath, formatDate } from "@/lib/utils";

export function HeroSection() {
  const spotlight = getSpotlightArticle();
  const sideArticles = publishedArticles.filter((article) => article.slug !== spotlight?.slug).slice(0, 2);

  if (!spotlight) {
    return null;
  }

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src={spotlight.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,9,12,0.94)_0%,rgba(16,17,20,0.78)_44%,rgba(16,17,20,0.35)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 event-grid opacity-35" aria-hidden="true" />

      <div className="container-page grid min-h-[calc(100svh-4.5rem)] gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:py-10">
        <div className="flex min-h-[68svh] flex-col justify-end pb-6 sm:min-h-[72svh] lg:pb-10">
          <div className="mb-6 flex flex-wrap gap-2">
            {editorialPills.map((pill) => (
              <span key={pill.label} className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-normal text-white/85 backdrop-blur">
                <pill.icon className="size-4 text-neon" aria-hidden="true" />
                {pill.label}
              </span>
            ))}
          </div>

          <Badge variant="accent">Ticket Italia Magazine</Badge>
          <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl">
            Scopri gli eventi che non puoi perdere.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
            Concerti, festival, teatro, sport e nightlife raccontati come un magazine: rapido, visivo, utile per decidere cosa vivere dal vivo.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="https://www.ticketitalia.com" className="btn-primary">
              <Ticket className="size-5" aria-hidden="true" />
              Esplora eventi
            </a>
            <Link href="/articoli" className="btn-ghost border-white/20 px-5 text-white hover:text-neon">
              Leggi le guide
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
            {homeStats.map((stat) => (
              <div key={stat.label} className="border-l border-white/18 pl-3">
                <p className="text-2xl font-black tracking-normal text-neon sm:text-3xl">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-normal text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 pb-4 lg:pb-10">
          <article className="group overflow-hidden rounded-lg border border-white/15 bg-white/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-ink">
            <Link href={articlePath(spotlight.slug)} className="grid grid-cols-[112px_1fr] gap-4 p-3 sm:grid-cols-[144px_1fr]">
              <div className="relative min-h-32 overflow-hidden rounded-md bg-ink">
                <Image src={spotlight.image} alt="" fill sizes="180px" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="self-center">
                <Badge variant="accent">{spotlight.category}</Badge>
                <h2 className="mt-3 line-clamp-3 text-xl font-black leading-tight tracking-normal sm:text-2xl">
                  {spotlight.title}
                </h2>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white/65 transition group-hover:text-muted">
                  <Play className="size-4" aria-hidden="true" />
                  Spotlight editoriale
                </p>
              </div>
            </Link>
          </article>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {sideArticles.map((article) => (
              <Link
                key={article.slug}
                href={articlePath(article.slug)}
                className="group rounded-lg border border-white/15 bg-ink/62 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-neon hover:bg-white hover:text-ink"
              >
                <div className="mb-3 flex items-center justify-between gap-3 text-xs font-black uppercase tracking-normal text-white/55 transition group-hover:text-muted">
                  <span>{article.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-normal">
                  {article.title}
                </h3>
                <p className="mt-3 text-xs font-bold uppercase tracking-normal text-neon transition group-hover:text-coral">
                  {formatDate(article.date)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

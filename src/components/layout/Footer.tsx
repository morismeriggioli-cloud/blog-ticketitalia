import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Send } from "lucide-react";
import { categories, getCategoryPath } from "@/data/blog";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-10 py-12 sm:py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="mb-5 flex w-fit items-center gap-3 rounded-md font-black">
            <span className="grid h-10 w-12 place-items-center rounded-md">
              <Image
                src="/images/logo-ticket-italia.png"
                alt=""
                width={48}
                height={31}
                className="h-8 w-11 object-contain"
              />
            </span>
            <span>
              Ticket Italia <span className="text-primary-400">BLOG</span>
            </span>
          </Link>
          <p className="max-w-md text-white/70">
            Idee, guide e storie per scegliere il prossimo evento da vivere dal vivo.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-black uppercase tracking-normal text-neon">Categorie</h2>
          <div className="grid gap-2">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.slug} href={getCategoryPath(category.slug)} className="w-fit rounded-md py-1 text-white/70 transition hover:text-white">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-black uppercase tracking-normal text-neon">Contatti</h2>
          <div className="grid gap-3 text-white/70">
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" aria-hidden="true" />
              blog@ticketitalia.it
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              Italia, eventi live
            </span>
            <span className="inline-flex items-center gap-2">
              <Send className="size-4" aria-hidden="true" />
              @ticketitalia
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col gap-2 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Ticket Italia. Tutti i diritti riservati.</p>
          <p>Privacy / Cookie / Termini</p>
        </div>
      </div>
    </footer>
  );
}

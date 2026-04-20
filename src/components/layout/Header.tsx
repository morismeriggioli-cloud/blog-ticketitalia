"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { categories, getCategoryPath, getSubcategoryPath } from "@/data/blog";
import { cn } from "@/lib/utils";

const desktopCategoryLabels: Record<string, string> = {
  concerti: "Concerti",
  "teatro-spettacoli": "Teatro",
  "eventi-festival": "Festival",
  sport: "Sport",
  "nightlife-experience": "Nightlife",
  guide: "Guide",
  "news-ticket-italia": "News",
};

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-18">
        <Link href="/" className="flex min-h-11 shrink-0 items-center gap-3 rounded-md font-black tracking-normal">
          <span className="grid h-10 w-14 place-items-center rounded-md">
            <Image
              src="/images/logo-ticket-italia.png"
              alt=""
              width={48}
              height={31}
              priority
              className="h-8 w-12 object-contain"
            />
          </span>
          <span className="whitespace-nowrap text-base leading-none xl:text-lg">
            Ticket Italia <span className="text-primary-400">BLOG</span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 xl:flex" aria-label="Navigazione principale">
          {categories.map((category) => (
            <div key={category.slug} className="group relative">
              <Link
                href={getCategoryPath(category.slug)}
                className="inline-flex min-h-10 items-center gap-1 rounded-md px-2.5 py-2 text-sm font-bold leading-none text-white/76 transition hover:bg-white/10 hover:text-neon 2xl:px-3"
              >
                <span className="whitespace-nowrap">{desktopCategoryLabels[category.slug] ?? category.name}</span>
                <ChevronDown className="size-3.5 transition group-hover:rotate-180" aria-hidden="true" />
              </Link>
              <div className="invisible absolute left-0 top-full w-72 translate-y-2 rounded-lg border border-white/10 bg-ink p-3 opacity-0 shadow-lift transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link
                  href={getCategoryPath(category.slug)}
                  className="block rounded-md px-3 py-2 text-sm font-black text-white transition hover:bg-white/10 hover:text-neon"
                >
                  Tutto {category.name}
                </Link>
                <div className="mt-2 grid gap-1">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.slug}
                      href={getSubcategoryPath(category.slug, subcategory.slug)}
                      className="rounded-md px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-neon"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <Link href="/articoli" className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-3 text-sm font-bold text-white transition hover:border-neon hover:text-neon xl:px-4">
            <Search className="size-4" aria-hidden="true" />
            Cerca
          </Link>
          <a href="https://www.ticketitalia.com" className="inline-flex h-10 items-center rounded-md bg-neon px-3 text-sm font-black text-ink transition hover:bg-white xl:px-4">
            Trova eventi
          </a>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-md border border-white/15 xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Apri menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div id="mobile-menu" className={cn("border-t border-white/10 bg-ink transition xl:hidden", open ? "block" : "hidden")}>
        <nav className="container-page grid gap-3 py-4" aria-label="Menu mobile">
          <Link
            href="/articoli"
            className="min-h-12 rounded-md px-3 py-3 text-base font-bold text-white/80 hover:bg-white/10 hover:text-neon"
            onClick={() => setOpen(false)}
          >
            Tutti gli articoli
          </Link>
          {categories.map((category) => (
            <div key={category.slug} className="rounded-lg border border-white/10 p-2">
              <Link
                href={getCategoryPath(category.slug)}
                className="block min-h-12 rounded-md px-3 py-3 text-base font-black text-white hover:bg-white/10 hover:text-neon"
                onClick={() => setOpen(false)}
              >
                {category.name}
              </Link>
              <div className="grid gap-1 pb-2 pl-3">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={getSubcategoryPath(category.slug, subcategory.slug)}
                    className="min-h-10 rounded-md px-3 py-2 text-sm font-semibold text-white/65 hover:bg-white/10 hover:text-neon"
                    onClick={() => setOpen(false)}
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <a href="https://www.ticketitalia.com" className="mt-2 min-h-12 rounded-md bg-neon px-3 py-3 text-center font-black text-ink">
            Trova eventi
          </a>
        </nav>
      </div>
    </header>
  );
}

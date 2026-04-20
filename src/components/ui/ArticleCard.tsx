"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Article } from "@/data/blog";
import { articlePath, formatDate } from "@/lib/utils";
import { Badge } from "./Badge";
import { HoverCard } from "@/components/motion/HoverCard";

type ArticleCardProps = {
  article: Article;
  priority?: boolean;
  compact?: boolean;
};

export function ArticleCard({ article, priority = false, compact = false }: ArticleCardProps) {
  return (
    <HoverCard className="group overflow-hidden rounded-lg border border-line bg-white shadow-sm transition-colors duration-300 hover:border-ink hover:shadow-lift">
      <Link href={articlePath(article.slug)} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          <Image
            src={article.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4">
            <Badge variant="accent">{article.category}</Badge>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-normal text-muted">
            <span>{formatDate(article.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {article.readTime}
            </span>
          </div>
          <h3 className="text-xl font-black leading-tight tracking-normal text-ink group-hover:text-coral sm:text-2xl">
            {article.title}
          </h3>
          {!compact ? <p className="mt-3 line-clamp-3 leading-7 text-muted">{article.excerpt}</p> : null}
          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-md bg-background px-2.5 py-1 text-xs font-bold text-muted">
                  #{tag}
                </span>
              ))}
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-ink text-white transition group-hover:bg-coral">
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </HoverCard>
  );
}

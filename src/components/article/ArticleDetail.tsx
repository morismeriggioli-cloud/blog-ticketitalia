import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Clock, HelpCircle, UserRound } from "lucide-react";
import type { Article } from "@/data/blog";
import { getCategoryPath, publishedArticles } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { formatDate } from "@/lib/utils";

type ArticleDetailProps = {
  article: Article;
};

const inlineLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInlineLinks(text: string) {
  const parts: Array<string | ReactElement> = [];
  let lastIndex = 0;

  for (const match of text.matchAll(inlineLinkPattern)) {
    const [fullMatch, label, href] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    parts.push(
      <Link
        key={`${href}-${index}`}
        href={href}
        className="font-bold text-primary-700 underline decoration-primary-500/40 underline-offset-4 transition hover:text-ink"
      >
        {label}
      </Link>,
    );

    lastIndex = index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const sameCategory = publishedArticles.filter(
    (item) => item.slug !== article.slug && item.categorySlug === article.categorySlug,
  );
  const fallbackArticles = publishedArticles.filter(
    (item) => item.slug !== article.slug && item.categorySlug !== article.categorySlug,
  );
  const related = [...sameCategory, ...fallbackArticles].slice(0, 3);

  return (
    <>
      <article className="py-10 sm:py-14">
        <div className="container-page">
          <Breadcrumbs
            current={article.title}
            category={{ label: article.category, href: getCategoryPath(article.categorySlug) }}
          />

          <header className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <Badge variant="accent">{article.category}</Badge>
              <h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-normal text-ink sm:text-6xl">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted sm:text-xl">{article.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-muted">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  {formatDate(article.date)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4" aria-hidden="true" />
                  {article.readTime}
                </span>
                <span className="inline-flex items-center gap-2">
                  <UserRound className="size-4" aria-hidden="true" />
                  {article.author}
                </span>
              </div>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg bg-ink">
              <Image src={article.image} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,760px)_1fr]">
            <div className="article-content rounded-lg bg-white p-6 shadow-sm ring-1 ring-line sm:p-10">
              <p className="text-xl font-semibold leading-9 text-ink">{renderInlineLinks(article.body.intro)}</p>

              {article.body.quickAnswer ? (
                <aside className="my-8 rounded-lg border border-primary-500/30 bg-primary-50 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary-700" aria-hidden="true" />
                    <h2 className="m-0 text-xl font-black tracking-normal text-ink">
                      {article.body.quickAnswer.title}
                    </h2>
                  </div>
                  <p>{renderInlineLinks(article.body.quickAnswer.text)}</p>
                  <ul>
                    {article.body.quickAnswer.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </aside>
              ) : null}

              {article.body.internalLinks ? (
                <aside className="my-8 rounded-lg border border-line bg-background p-5">
                  <p className="mb-3 text-sm font-black uppercase tracking-normal text-coral">
                    Approfondimento collegato
                  </p>
                  <div className="grid gap-3">
                    {article.body.internalLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="group block rounded-md bg-white p-4 ring-1 ring-line transition hover:ring-ink">
                        <span className="font-black text-ink group-hover:text-primary-700">{link.label}</span>
                        <span className="mt-2 block text-sm leading-6 text-muted">{link.description}</span>
                      </Link>
                    ))}
                  </div>
                </aside>
              ) : null}

              {article.body.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                  ))}
                  {section.subSections?.map((subSection) => (
                    <div key={subSection.heading}>
                      <h3>{subSection.heading}</h3>
                      {subSection.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                      ))}
                    </div>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.ordered ? (
                    <ol>
                      {section.ordered.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  ) : null}
                </section>
              ))}

              {article.body.faq ? (
                <section>
                  <h2>FAQ</h2>
                  <div className="grid gap-3">
                    {article.body.faq.map((item) => (
                      <details key={item.question} className="group rounded-lg border border-line bg-background p-4">
                        <summary className="flex cursor-pointer list-none items-start gap-3 font-black text-ink">
                          <HelpCircle className="mt-0.5 size-5 shrink-0 text-primary-700" aria-hidden="true" />
                          {item.question}
                        </summary>
                        <p className="mb-0 pl-8">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {article.body.cta ? (
                <aside className="mt-10 rounded-lg bg-ink p-6 text-white">
                  <h2 className="m-0 text-2xl font-black tracking-normal text-white">{article.body.cta.title}</h2>
                  <p className="text-white/70">{article.body.cta.text}</p>
                  <a href={article.body.cta.href} className="btn-primary mt-4">
                    {article.body.cta.label}
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </a>
                </aside>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg bg-ink p-6 text-white">
                <h2 className="text-xl font-black tracking-normal">Tag articolo</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-white/75">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link href={getCategoryPath(article.categorySlug)} className="mt-4 flex rounded-lg border border-line bg-white p-5 font-black text-ink transition hover:border-ink">
                Leggi altri articoli in {article.category}
              </Link>
            </aside>
          </div>
        </div>
      </article>

      <section className="pb-8">
        <div className="container-page">
          <h2 className="mb-6 text-3xl font-black tracking-normal text-ink">Continua a leggere</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} compact />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}

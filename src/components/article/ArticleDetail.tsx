import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { ArrowRight, Building2, CalendarDays, Car, CheckCircle2, Clock, HelpCircle, MapPin, UserRound } from "lucide-react";
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

              {article.body.quickInfo ? (
                <aside className="my-8 rounded-lg border border-primary-500/30 bg-primary-50 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary-700" aria-hidden="true" />
                    <h2 className="m-0 text-xl font-black tracking-normal text-ink">
                      {article.body.quickInfo.title}
                    </h2>
                  </div>
                  <p>{renderInlineLinks(article.body.quickInfo.text)}</p>
                  <ul>
                    {article.body.quickInfo.bullets.map((bullet) => (
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

              {article.body.tickets ? (
                <section>
                  <h2>{article.body.tickets.title}</h2>
                  <p>{renderInlineLinks(article.body.tickets.text)}</p>
                  <ul>
                    {article.body.tickets.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {article.body.artistContext ? (
                <section>
                  <h2>{article.body.artistContext.title}</h2>
                  {article.body.artistContext.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                  ))}
                  {article.body.artistContext.bullets ? (
                    <ul>
                      {article.body.artistContext.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ) : null}

              {article.body.location ? (
                <section>
                  {article.body.location.locationImage ? (
                    <div className="not-prose relative mb-6 aspect-[21/8] overflow-hidden rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.body.location.locationImage}
                        alt={article.body.location.title}
                        className="size-full object-cover"
                      />
                    </div>
                  ) : null}

                  <h2>{article.body.location.title}</h2>
                  <p className="font-semibold text-muted">{article.body.location.venueType}</p>
                  <p>{article.body.location.experience}</p>
                  <p>{article.body.location.suitability}</p>
                  <p>{article.body.location.atmosphere}</p>
                  {article.body.location.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {article.body.location.bullets ? (
                    <ul>
                      {article.body.location.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}

                  {article.body.location.nearbyParking?.length ? (
                    <div className="not-prose my-6 rounded-lg border border-line bg-background p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <Car className="size-5 text-primary-700" aria-hidden="true" />
                        <h3 className="text-base font-black text-ink">Parcheggi vicini</h3>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {article.body.location.nearbyParking.map((parking) => {
                          const mapsHref =
                            parking.mapsUrl ??
                            `https://maps.google.com/?q=${encodeURIComponent(parking.name)}`;
                          return (
                            <div key={parking.name} className="flex flex-col rounded-md bg-white p-4 ring-1 ring-line">
                              <p className="font-bold text-ink">{parking.name}</p>
                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="flex items-center gap-1 text-sm text-muted">
                                  <MapPin className="size-3.5" aria-hidden="true" />
                                  {parking.distanceOnFoot}
                                </span>
                                <span
                                  className={`rounded px-2 py-0.5 text-xs font-bold ${
                                    parking.type === "gratuito"
                                      ? "bg-green-50 text-green-700"
                                      : "bg-orange-50 text-orange-700"
                                  }`}
                                >
                                  {parking.type}
                                </span>
                              </div>
                              {parking.notes ? (
                                <p className="mt-1 text-sm text-muted">{parking.notes}</p>
                              ) : null}
                              <a
                                href={mapsHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary-700 hover:text-ink"
                              >
                                Vai al parcheggio
                                <ArrowRight className="size-3.5" aria-hidden="true" />
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {article.body.location.nearbyHotels?.length ? (
                    <div className="not-prose my-6 rounded-lg border border-line bg-background p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <Building2 className="size-5 text-primary-700" aria-hidden="true" />
                        <h3 className="text-base font-black text-ink">Hotel vicini</h3>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {article.body.location.nearbyHotels.map((hotel) => (
                          <div key={hotel.name} className="flex flex-col overflow-hidden rounded-md bg-white ring-1 ring-line">
                            {hotel.images?.length ? (
                              <div className="grid grid-cols-3 gap-px">
                                {hotel.images.slice(0, 3).map((src, i) => (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    key={i}
                                    src={src}
                                    alt=""
                                    className="aspect-[4/3] w-full object-cover"
                                  />
                                ))}
                              </div>
                            ) : null}
                            <div className="flex flex-1 flex-col p-4">
                              <p className="font-bold text-ink">{hotel.name}</p>
                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="flex items-center gap-1 text-sm text-muted">
                                  <MapPin className="size-3.5" aria-hidden="true" />
                                  {hotel.distanceOnFoot}
                                </span>
                                <span className="rounded bg-ink/5 px-2 py-0.5 text-xs font-bold text-ink">
                                  {hotel.priceRange}
                                </span>
                              </div>
                              {hotel.bookingUrl ? (
                                <a
                                  href={hotel.bookingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary-700 hover:text-ink"
                                >
                                  Prenota hotel
                                  <ArrowRight className="size-3.5" aria-hidden="true" />
                                </a>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>
              ) : null}

              {article.body.liveExperience ? (
                <section>
                  <h2>{article.body.liveExperience.title}</h2>
                  {article.body.liveExperience.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                  ))}
                  {article.body.liveExperience.bullets ? (
                    <ul>
                      {article.body.liveExperience.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ) : null}

              {article.body.practicalInfo ? (
                <section>
                  <h2>{article.body.practicalInfo.title}</h2>
                  {article.body.practicalInfo.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                  ))}
                  {article.body.practicalInfo.bullets ? (
                    <ul>
                      {article.body.practicalInfo.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
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
                <aside className="article-cta mt-10 rounded-lg bg-ink p-6 text-white">
                  <h2 className="m-0 text-2xl font-black tracking-normal text-white">{article.body.cta.title}</h2>
                  <p>{article.body.cta.text}</p>
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

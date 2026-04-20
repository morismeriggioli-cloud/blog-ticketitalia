export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function articlePath(slug: string) {
  const rootArticleSlugs = [
    "come-usare-carta-cultura-carta-docente-biglietti-eventi",
    "carta-cultura-cosa-puoi-comprare",
    "carta-cultura-concerti-come-usarla",
    "agriumbria-evento-biglietti-guida",
  ];

  if (rootArticleSlugs.includes(slug)) {
    return `/${slug}`;
  }

  return `/articoli/${slug}`;
}

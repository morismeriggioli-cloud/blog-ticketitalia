import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbsProps = {
  current: string;
  category?: {
    label: string;
    href: string;
  };
};

export function Breadcrumbs({ current, category }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm">
      <Link href="/" className="inline-flex items-center gap-2 font-semibold text-muted hover:text-ink">
        <Home className="size-4" aria-hidden="true" />
        Home
      </Link>
      <ChevronRight className="size-4 text-muted" aria-hidden="true" />
      {category ? (
        <>
          <Link href={category.href} className="font-semibold text-muted hover:text-ink">
            {category.label}
          </Link>
          <ChevronRight className="size-4 text-muted" aria-hidden="true" />
        </>
      ) : null}
      <span className="line-clamp-1 font-bold text-ink">{current}</span>
    </nav>
  );
}

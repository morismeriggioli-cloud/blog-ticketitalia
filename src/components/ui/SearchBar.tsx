import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <form className="relative w-full" role="search">
      <label htmlFor="site-search" className="sr-only">
        Cerca articoli
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted"
      />
      <input
        id="site-search"
        type="search"
        placeholder="Cerca concerti, festival, teatro..."
        className="h-13 w-full rounded-md border border-line bg-white pl-12 pr-4 text-sm font-medium text-ink outline-none transition focus:border-ink focus:ring-4 focus:ring-neon/40"
      />
    </form>
  );
}

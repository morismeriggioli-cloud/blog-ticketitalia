import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeCategories } from "@/data/home";
import { getCategoryPath } from "@/data/blog";

export function CategoryRail() {
  return (
    <section id="categorie" className="overflow-hidden bg-ink py-18 text-white sm:py-24">
      <div className="container-page">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-normal text-neon">Categorie live</p>
            <h2 className="text-3xl font-black tracking-normal sm:text-5xl">
              Entra dal mood giusto.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/68 lg:justify-self-end">
            Ogni categoria ha un colore, un ritmo e un tipo di serata. La navigazione resta semplice, ma il colpo d&apos;occhio fa subito capire dove andare.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-6">
          {homeCategories.map((category, index) => (
            <Link
              key={category.slug}
              href={getCategoryPath(category.slug)}
              className={`group relative min-h-72 overflow-hidden rounded-lg p-5 transition duration-300 hover:-translate-y-1 md:col-span-2 ${
                index === 0 || index === 4 ? "lg:col-span-2" : ""
              }`}
            >
              <div className={`absolute inset-0 ${category.className}`} aria-hidden="true" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,17,20,0)_0%,rgba(16,17,20,0.34)_100%)] opacity-70" aria-hidden="true" />
              <div className="relative flex h-full min-h-60 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-md bg-white/18 text-current backdrop-blur">
                    <category.icon className="size-6" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="size-6 transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-normal opacity-75">
                    {category.imageHint}
                  </p>
                  <h3 className="text-3xl font-black tracking-normal">{category.name}</h3>
                  <p className="mt-3 max-w-xs text-sm font-semibold leading-6 opacity-78">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

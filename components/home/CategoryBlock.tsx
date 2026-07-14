import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { Clock, Eye } from "lucide-react";

type CategoryBlockProps = {
  title: string;
  slug: string;
  articles?: Article[];
};

export default function CategoryBlock({
  title,
  slug,
  articles = [],
}: CategoryBlockProps) {
  if (articles.length === 0) {
    return null;
  }

  const featured = articles[0];

  if (!featured) {
    return null;
  }

  const list = articles.slice(1, 4);

  return (
    <section className="py-12 border-b border-border/80 last:border-b-0 transition-colors duration-300">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-6 w-[3px] bg-accent" />
          <h2 className="font-sans text-2xl font-black text-foreground">
            {title}
          </h2>
        </div>

        <Link
          href={`/${slug}`}
          className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent hover:underline focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
        >
          Bütün Yazılar →
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left Side: Feature Card */}
        <Link
          href={`/${featured.category.slug}/${featured.slug}`}
          className="group flex flex-col gap-5 lg:col-span-7"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted border border-border">
            <Image
              src={featured.coverImage ?? "/images/placeholder.jpg"}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-103"
            />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent block">
              {featured.category.name}
            </span>

            <h3 className="font-sans text-2xl font-black leading-tight text-foreground group-hover:text-accent transition-colors duration-200">
              {featured.title}
            </h3>

            <p className="font-sans text-sm leading-6 text-muted-foreground line-clamp-3">
              {featured.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-[10px] text-muted-foreground">
              <span className="font-semibold text-foreground">
                {featured.author.name} {featured.author.surname}
              </span>
              <span>•</span>
              <span>{featured.readingTime} DƏQ</span>
              <span>•</span>
              <span>{featured.viewCount.toLocaleString()} BAXIŞ</span>
            </div>
          </div>
        </Link>

        {/* Right Side: Editorial List Grid */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          {list.map((article) => (
            <Link
              key={article.id}
              href={`/${article.category.slug}/${article.slug}`}
              className="group flex gap-4 rounded-lg border border-border bg-card p-4 hover:border-accent transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={article.coverImage ?? "/images/placeholder.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-between min-w-0 flex-1">
                <div className="space-y-1">
                  <h4 className="font-sans text-sm font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3 font-mono text-[9px] text-muted-foreground pt-2">
                  <span className="font-semibold text-foreground truncate">
                    {article.author.name.charAt(0)}. {article.author.surname}
                  </span>
                  <span>•</span>
                  <span>{article.readingTime} DƏQ</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
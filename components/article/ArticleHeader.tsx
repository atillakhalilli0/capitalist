import Image from "next/image";
import { Clock, Eye, Calendar } from "lucide-react";
import type { Article } from "@/types/article";

type ArticleHeaderProps = {
  article: Article;
};

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="border-b border-border bg-card/15 py-12 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 space-y-6">
        {/* Category badge */}
        <div>
          <span className="inline-flex rounded bg-accent/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent">
            {article.category.name}
          </span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="font-sans text-3xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
          {article.title}
        </h1>

        {/* Subtitle / Dek */}
        {article.subtitle && (
          <p className="font-serif text-lg leading-8 text-muted-foreground">
            {article.subtitle}
          </p>
        )}

        {/* Author & Timing Row */}
        <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted border border-border">
              <Image
                src={article.author.avatar ?? "/images/avatar-placeholder.png"}
                alt={`${article.author.name} ${article.author.surname}`}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-sm font-bold text-foreground">
                {article.author.name} {article.author.surname}
              </h3>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                {article.author.role.replaceAll("_", " ")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("az-AZ", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime ?? 0} dəq oxu</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              <span>{article.viewCount.toLocaleString()} baxış</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-md border border-border bg-muted">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>
    </header>
  );
}
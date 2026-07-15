import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { Eye } from "lucide-react";
import {
  getArticleCoverImage,
  getArticleExcerpt,
  getArticleReadingTime,
  getArticleUrl,
  getAuthorFullName,
} from "@/utils/publicHelpers";

type ArticleCardProps = {
  article: Article;
  featured?: boolean;
  compact?: boolean;
};

export default function ArticleCard({
  article,
  featured = false,
  compact = false,
}: ArticleCardProps) {
  const articleUrl = getArticleUrl(article);
  const coverImage = getArticleCoverImage(article);
  const excerpt = getArticleExcerpt(article);
  const readingTime = getArticleReadingTime(article);
  const authorName = getAuthorFullName(article.author);

  // 1. Featured Variant (Large banner style)
  if (featured) {
    return (
      <article className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-6 md:p-8 hover:border-accent transition-all duration-300">
        <Link href={articleUrl} className="flex flex-col gap-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
            <Image
              src={coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-103"
            />
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent">
              {article.category?.name}
            </span>

            <h3 className="font-sans text-2xl font-black leading-tight tracking-tight text-foreground md:text-3xl group-hover:text-accent transition-colors duration-200">
              {article.title}
            </h3>

            <p className="font-sans text-sm leading-6 text-muted-foreground line-clamp-3">
              {excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/60 font-mono text-[10px] text-muted-foreground">
              <span className="font-semibold text-foreground">{authorName}</span>
              <span>•</span>
              <span>{readingTime} DƏQ</span>
              <span>•</span>
              <span>{article.viewCount.toLocaleString()} BAXIŞ</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // 2. Compact Variant (Horizontal feed style)
  if (compact) {
    return (
      <article className="group flex gap-4 rounded-lg border border-border bg-card p-4 hover:border-accent transition-all duration-300">
        <Link href={articleUrl} className="flex flex-row gap-4 w-full">
          {/* Side Image */}
          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between min-w-0 flex-1">
            <div className="space-y-1">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-accent block">
                {article.category?.name}
              </span>

              <h4 className="font-sans text-sm font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
                {article.title}
              </h4>
            </div>

            <div className="flex items-center gap-3 font-mono text-[9px] text-muted-foreground pt-2">
              <span className="font-semibold text-foreground truncate">{authorName}</span>
              <span>•</span>
              <span>{readingTime} DƏQ</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // 3. Standard Grid Variant
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-5 hover:border-accent transition-all duration-300">
      <Link href={articleUrl} className="flex flex-col gap-4">
        {/* Cover Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-103"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent block">
            {article.category?.name}
          </span>

          <h3 className="font-sans text-lg font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-3">
            {article.title}
          </h3>

          <p className="font-sans text-xs leading-5 text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
        </div>
      </Link>

      {/* Footer Info */}
      <div className="mt-5 flex items-center gap-4 border-t border-border/60 pt-3 font-mono text-[10px] text-muted-foreground">
        <span className="font-semibold text-foreground">{authorName}</span>
        <span>•</span>
        <span>{readingTime} DƏQ</span>
        <span className="ml-auto flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {article.viewCount.toLocaleString()}
        </span>
      </div>
    </article>
  );
}

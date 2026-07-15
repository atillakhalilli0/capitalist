import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { Clock, Eye, Calendar, Sparkles } from "lucide-react";

import { articleService } from "@/services/article.service";
import { ArticleStatus } from "@/types/article";
import {
  getArticleCoverImage,
  getArticleExcerpt,
  getArticleReadingTime,
  getArticleUrl,
  getAuthorFullName,
} from "@/utils/publicHelpers";

export default async function HeroSection() {
  const { items } = await articleService.getAll({
    pageNumber: 1,
    pageSize: 4,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  const featuredArticle = items[0];
  const sidebarArticles = items.slice(1, 4);

  if (!featuredArticle) return null;

  return (
    <section className="py-10 lg:py-14 transition-colors duration-300">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Main Hero Story */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-6 md:p-8 lg:col-span-8 hover:border-accent transition-all duration-300">
            <Link href={getArticleUrl(featuredArticle)} className="flex flex-col gap-6">
              {/* Image Container with Custom Ratio */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
                <Image
                  src={getArticleCoverImage(featuredArticle)}
                  alt={featuredArticle.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                />
                {/* Visual Label - Təqvim timing indicator */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded bg-primary/90 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Əsas Məqalə
                </div>
              </div>

              {/* Text Block */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent">
                    {featuredArticle.category?.name}
                  </span>
                </div>

                <h1 className="font-sans text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl group-hover:text-accent transition-colors duration-200">
                  {featuredArticle.title}
                </h1>

                <p className="font-sans text-base leading-7 text-muted-foreground line-clamp-3">
                  {getArticleExcerpt(featuredArticle)}
                </p>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/80 font-mono text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {getAuthorFullName(featuredArticle.author)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {featuredArticle.publishedAt
                      ? new Date(featuredArticle.publishedAt).toLocaleDateString("az-AZ")
                      : "-"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {getArticleReadingTime(featuredArticle)} DƏQ
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <Eye className="h-3.5 w-3.5" />
                    {featuredArticle.viewCount.toLocaleString()} BAXIŞ
                  </span>
                </div>
              </div>
            </Link>
          </article>

          {/* Sidebar - Asymmetric Editorial Board */}
          <aside className="flex flex-col gap-6 lg:col-span-4">
            <div className="border-b border-border pb-4">
              <h2 className="font-mono text-xs font-black uppercase tracking-[0.25em] text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Günün Nəbzi
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {sidebarArticles.map((article) => (
                <Link
                  key={article.id}
                  href={getArticleUrl(article)}
                  className="group relative flex flex-col justify-between rounded-lg border border-border bg-card p-5 hover:border-accent transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent">
                        {article.category?.name}
                      </span>
                    </div>

                    <h3 className="font-sans text-base font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-3">
                      {article.title}
                    </h3>
                  </div>

                  <div className="mt-5 flex items-center gap-4 border-t border-border/60 pt-3 font-mono text-[10px] text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {getAuthorFullName(article.author)}
                    </span>
                    <span>{getArticleReadingTime(article)} DƏQ</span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

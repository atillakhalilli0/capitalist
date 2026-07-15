"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import ArticleCard from "@/components/article/ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import { ArticleStatus } from "@/types/article";

const PAGE_SIZE = 12;

export default function LatestNewsSection() {
  const [visibleCount, setVisibleCount] = useState(3);

  const { data, isLoading } = useArticles({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  const articles = data?.items ?? [];

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, articles.length));
  };

  const hasMore = visibleCount < articles.length;

  if (!isLoading && articles.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 border-t border-border bg-card/25 transition-colors duration-300">
      <Container>
        {/* Header Block */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border/80 pb-6">
          <div>
            <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-accent">
              Chronicle
            </span>
            <h2 className="mt-2 text-3xl font-black text-foreground">Son xəbərlər</h2>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {articles.slice(0, visibleCount).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="rounded-md border border-accent/40 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-accent hover:bg-accent/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-colors"
            >
              Daha çox göstər
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

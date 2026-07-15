"use client";

import Link from "next/link";
import { Award } from "lucide-react";
import ArticleCard from "@/components/article/ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import { ArticleStatus } from "@/types/article";

export default function EditorsPickSection() {
  // The backend has no "editor's pick" flag, so the most-viewed published
  // articles are used as a stand-in for editorial highlights.
  const { data, isLoading } = useArticles({
    pageNumber: 1,
    pageSize: 4,
    sortBy: "viewCount",
    sortOrder: "desc",
  });

  const items = data?.items ?? [];
  const featured = items[0];
  const others = items.slice(1, 4);

  if (isLoading || !featured) return null;

  return (
    <section className="py-16 lg:py-24 border-t border-border bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header Block */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border pb-6">
          <div>
            <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-accent flex items-center gap-2">
              <Award className="h-4 w-4" />
              Redaksiya
            </span>
            <h2 className="mt-2 text-3xl font-black text-foreground">Redaksiyanın seçimi</h2>
          </div>

          <Link
            href="/axtaris"
            className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent hover:underline focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          >
            Bütün Seçimlər →
          </Link>
        </div>

        {/* Layout: Main featured story next to list of smaller articles */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Main Editorial Pick */}
          <div className="lg:col-span-7">
            <ArticleCard article={featured} featured />
          </div>

          {/* Sidebar of other choice stories */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {others.map((article) => (
              <ArticleCard key={article.id} article={article} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

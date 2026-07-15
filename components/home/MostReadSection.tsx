"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TrendingUp, Clock, Eye } from "lucide-react";
import { useArticles } from "@/hooks/useArticles";
import { ArticleStatus } from "@/types/article";
import {
  getArticleReadingTime,
  getArticleUrl,
  getAuthorFullName,
} from "@/utils/publicHelpers";

type Range = "today" | "week" | "month" | "all";

const tabs: { key: Range; label: string }[] = [
  { key: "today", label: "Bugün" },
  { key: "week", label: "Həftə" },
  { key: "month", label: "Ay" },
  { key: "all", label: "Bütün vaxtlar" },
];

function getStartDate(range: Range): string | undefined {
  if (range === "all") return undefined;

  const now = new Date();
  const days = range === "today" ? 1 : range === "week" ? 7 : 30;
  const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return start.toISOString();
}

export default function MostReadSection() {
  const [active, setActive] = useState<Range>("today");

  const filter = useMemo(
    () => ({
      pageNumber: 1,
      pageSize: 5,
      sortBy: "viewCount",
      sortOrder: "desc" as const,
      startDate: getStartDate(active),
    }),
    [active]
  );

  const { data, isLoading } = useArticles(filter);
  const articles = data?.items ?? [];

  if (!isLoading && articles.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 border-t border-border bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header Block with Tab Filter */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-border pb-6">
          <div>
            <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-accent flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Bazar Trendləri
            </span>
            <h2 className="mt-2 text-3xl font-black text-foreground">Ən çox oxunanlar</h2>
          </div>

          {/* Custom Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`rounded border px-4 py-2 font-sans text-xs font-extrabold uppercase tracking-wider transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  active === tab.key
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Board List */}
        <div className="grid gap-px border border-border bg-border rounded-lg overflow-hidden lg:grid-cols-2">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={getArticleUrl(article)}
              className="group flex items-start gap-6 bg-card p-6 hover:bg-secondary/40 transition-colors duration-200"
            >
              {/* Number Index */}
              <span className="font-mono text-3xl font-black tracking-tighter text-border group-hover:text-accent transition-colors duration-200 shrink-0">
                {(index + 1).toString().padStart(2, "0")}
              </span>

              {/* Story Description */}
              <div className="min-w-0 flex-1 space-y-2">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent block">
                  {article.category?.name}
                </span>

                <h3 className="font-sans text-base font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {getAuthorFullName(article.author)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {getArticleReadingTime(article)} DƏQ
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <Eye className="h-3.5 w-3.5" />
                    {article.viewCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

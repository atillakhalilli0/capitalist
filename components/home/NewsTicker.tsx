"use client";

import Link from "next/link";
import { useArticles } from "@/hooks/useArticles";
import { ArticleStatus } from "@/types/article";
import { getArticleUrl } from "@/utils/publicHelpers";

export default function NewsTicker() {
  // The backend has no "breaking news" flag, so the most recently
  // published articles are used to drive the live ticker.
  const { data } = useArticles({
    pageNumber: 1,
    pageSize: 8,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  const alerts = data?.items ?? [];

  if (alerts.length === 0) return null;

  return (
    <section
      className="border-b border-border bg-card text-foreground transition-colors duration-300"
      aria-label="Breaking News"
    >
      <div className="flex h-12 items-center overflow-hidden">
        {/* Live Badge */}
        <div className="shrink-0 bg-accent px-5 py-4 text-xs font-black uppercase tracking-[0.25em] text-accent-foreground flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          CANLI
        </div>

        {/* Ticker Container */}
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker flex min-w-max items-center gap-16 px-6 font-mono text-[11px] font-semibold uppercase tracking-wider">
            {[...alerts, ...alerts, ...alerts].map((item, index) => (
              <Link
                key={`${item.id}-${index}`}
                href={getArticleUrl(item)}
                className="flex items-center gap-3 whitespace-nowrap transition-colors duration-200 hover:text-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="text-accent">•</span>
                <span className="text-foreground">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { getBreakingArticles } from "@/mocks/articles";

export default function NewsTicker() {
  const breakingNews = getBreakingArticles();

  // If there are no breaking articles, use some fallback mock alerts
  const displayAlerts = breakingNews.length > 0 
    ? breakingNews 
    : [
        {
          id: "alert-1",
          title: "Azərbaycan Mərkəzi Bankı faiz dərəcəsini sabit saxladı",
          slug: "amb-faiz-dehlizini-sabit-saxladi",
          category: { slug: "maliyye" }
        },
        {
          id: "alert-2",
          title: "SOCAR yeni bərpa olunan enerji layihələrinə investisiya ayırır",
          slug: "yasil-enerji-layihelerine-investisiya",
          category: { slug: "enerji" }
        },
        {
          id: "alert-3",
          title: "Startap ekosisteminə ayrılan dövlət investisiyaları artırıldı",
          slug: "kob-dovlet-desteyi-proqrami",
          category: { slug: "startap" }
        }
      ];

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
            {[...displayAlerts, ...displayAlerts, ...displayAlerts].map((item, index) => (
              <Link
                key={`${item.id}-${index}`}
                href={`/${item.category.slug}/${item.slug}`}
                className="flex items-center gap-3 whitespace-nowrap transition-colors duration-200 hover:text-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="text-accent">•</span>
                <span className="text-muted-foreground">[{new Date().toLocaleTimeString("az-AZ", {hour: '2-digit', minute:'2-digit'})}]</span>
                <span className="text-foreground">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Headphones, Play, Mic, Volume2 } from "lucide-react";
import { podcasts } from "@/mocks/podcasts";

export default function PodcastBlock() {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!podcasts.length) return null;

  const featured = podcasts[0];
  const episodes = podcasts.slice(1, 4);

  return (
    <section className="py-16 border-t border-border bg-card/15 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header Block */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-border pb-6">
          <div>
            <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-accent flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Podcast Səsləri
            </span>
            <h2 className="mt-2 text-3xl font-black text-foreground">
              Son epizodlar
            </h2>
          </div>

          <Link
            href="/podcast"
            className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent hover:underline focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          >
            Bütün Epizodlar →
          </Link>
        </div>

        {/* Layout Grid */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Main Podcast Cover and Info */}
          <div className="overflow-hidden rounded-lg border border-border bg-card lg:col-span-7 flex flex-col justify-between">
            <div className="relative aspect-video w-full bg-muted overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover"
              />
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 text-accent-foreground backdrop-blur shadow-2xl transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                aria-label={isPlaying ? "Durdur" : "Dinlə"}
              >
                {isPlaying ? <Volume2 className="h-8 w-8 animate-pulse" /> : <Play className="h-8 w-8 fill-current ml-1" />}
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em]">
                  Epizod {featured.id.split("-")[1] || "1"}
                </span>
              </div>

              <h3 className="font-sans text-2xl font-black leading-tight text-foreground">
                <Link href={`/podcast/${featured.slug}`} className="hover:text-accent transition-colors">
                  {featured.title}
                </Link>
              </h3>

              <p className="font-sans text-sm leading-6 text-muted-foreground">
                {featured.description}
              </p>

              {/* Action and Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
                <div className="flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground">{featured.guest}</span>
                  <span>•</span>
                  <span>{featured.duration}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`/podcast/${featured.slug}`}
                    className="rounded bg-accent px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-foreground transition hover:opacity-90"
                  >
                    Səhifəyə Get
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Episode List */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/podcast/${episode.slug}`}
                className="group flex gap-4 rounded-lg border border-border bg-card p-4 hover:border-accent transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={episode.coverImage}
                    alt={episode.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between min-w-0 flex-1">
                  <div className="space-y-1">
                    <h4 className="font-sans text-sm font-bold leading-snug text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
                      {episode.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate">{episode.guest}</p>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[9px] text-muted-foreground pt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {episode.duration}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
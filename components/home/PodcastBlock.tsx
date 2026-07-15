"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Headphones,
  Mic,
  Play,
  Volume2,
} from "lucide-react";

import { usePodcasts } from "@/hooks/usePodcasts";

export default function PodcastBlock() {
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    data,
    isLoading,
  } = usePodcasts({
    page: 1,
    pageSize: 4,
  });

  const podcasts = data?.items ?? [];

  const featured = podcasts[0];
  const episodes = podcasts.slice(1, 4);

  return (
    <section className="border-t border-border bg-card/15 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.25em] text-accent">
              <Mic className="h-4 w-4" />
              Podcast Səsləri
            </span>

            <h2 className="mt-2 text-3xl font-black text-foreground">
              Son epizodlar
            </h2>
          </div>

          <Link
            href="/podcast"
            className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent hover:underline"
          >
            Bütün Epizodlar →
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="overflow-hidden rounded-lg border border-border bg-card lg:col-span-7">
            <div className="flex aspect-video items-center justify-center bg-muted">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground"
              >
                {isPlaying ? (
                  <Volume2 className="h-8 w-8" />
                ) : (
                  <Play className="ml-1 h-8 w-8 fill-current" />
                )}
              </button>
            </div>

            <div className="space-y-4 p-8">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent">
                PODCAST
              </div>

              <h3 className="text-2xl font-black">
                <Link href={`/podcast/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h3>

              <p className="text-sm text-muted-foreground">
                {featured.description}
              </p>

              <div className="flex flex-wrap items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <Headphones className="h-4 w-4" />
                  <span>{featured.hostName || "Capitalist"}</span>
                </div>

                <Link
                  href={`/podcast/${featured.slug}`}
                  className="rounded bg-accent px-4 py-2 text-xs font-bold text-accent-foreground"
                >
                  Aç
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5">
            {episodes.map((episode: typeof featured) => (
              <Link
                key={episode.id}
                href={`/podcast/${episode.slug}`}
                className="rounded-lg border border-border bg-card p-4 transition hover:border-accent"
              >
                <h4 className="font-bold">
                  {episode.title}
                </h4>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {episode.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {episode.hostName || "Capitalist"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
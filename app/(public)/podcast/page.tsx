import Image from "next/image";
import Link from "next/link";
import { Headphones, Clock3, PlayCircle } from "lucide-react";

import { podcasts } from "@/mocks/podcasts";

export default function PodcastPage() {
  const featured = podcasts[0];
  const episodes = podcasts.slice(1);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
            Capitalist Podcasts
          </span>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Podcast
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
            Biznes, maliyyə, startaplar, texnologiya və iqtisadiyyat
            haqqında müsahibələr, analizlər və həftəlik söhbətlər.
          </p>
        </div>

        {featured && (
          <Link
            href={`/podcast/${featured.slug}`}
            className="group mb-16 grid gap-8 overflow-hidden rounded-3xl border border-border bg-card p-8 lg:grid-cols-2"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/90 p-4 text-black shadow-xl">
                  <PlayCircle className="h-12 w-12" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
                Son epizod
              </span>

              <h2 className="mt-3 text-4xl font-black leading-tight">
                {featured.title}
              </h2>

              <p className="mt-5 text-muted-foreground">
                {featured.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground">
                <span>{featured.guest}</span>

                <span className="flex items-center gap-1">
                  <Clock3 className="h-4 w-4" />
                  {featured.duration}
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              href={`/podcast/${episode.slug}`}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={episode.coverImage}
                  alt={episode.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="line-clamp-2 text-xl font-bold transition group-hover:text-emerald-600">
                  {episode.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                  {episode.description}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Headphones className="h-4 w-4" />
                    {episode.guest}
                  </span>

                  <span>{episode.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
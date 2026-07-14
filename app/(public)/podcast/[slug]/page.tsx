import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock3, Headphones, CalendarDays, PlayCircle } from "lucide-react";

import { podcasts } from "@/mocks/podcasts";

type PodcastEpisodePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PodcastEpisodePage({
  params,
}: PodcastEpisodePageProps) {
  const { slug } = await params;

  const episode = podcasts.find((item) => item.slug === slug);

  if (!episode) {
    notFound();
  }

  const relatedEpisodes = podcasts
    .filter((item) => item.id !== episode.id)
    .slice(0, 3);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-border">
              <Image
                src={episode.coverImage}
                alt={episode.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Podcast Episode
            </span>

            <h1 className="mt-3 text-4xl font-black leading-tight">
              {episode.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {episode.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                {episode.guest}
              </span>

              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {episode.duration}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {new Date(episode.publishedAt).toLocaleDateString("az-AZ")}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={episode.audioUrl}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                <PlayCircle className="h-5 w-5" />
                Dinlə
              </a>

              {episode.spotifyUrl && (
                <a
                  href={episode.spotifyUrl}
                  target="_blank"
                  className="rounded-2xl border border-border px-6 py-3 font-semibold hover:bg-muted"
                >
                  Spotify
                </a>
              )}

              {episode.applePodcastUrl && (
                <a
                  href={episode.applePodcastUrl}
                  target="_blank"
                  className="rounded-2xl border border-border px-6 py-3 font-semibold hover:bg-muted"
                >
                  Apple Podcasts
                </a>
              )}

              {episode.youtubeUrl && (
                <a
                  href={episode.youtubeUrl}
                  target="_blank"
                  className="rounded-2xl border border-border px-6 py-3 font-semibold hover:bg-muted"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-border p-8">
          <h2 className="text-2xl font-bold">
            Epizod haqqında
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            {episode.description}
          </p>
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-black">
            Digər epizodlar
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedEpisodes.map((item) => (
              <a
                key={item.id}
                href={`/podcast/${item.slug}`}
                className="rounded-3xl border border-border overflow-hidden bg-card transition hover:-translate-y-1"
              >
                <div className="relative aspect-video">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="line-clamp-2 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-5 text-sm text-muted-foreground">
                    {item.duration}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
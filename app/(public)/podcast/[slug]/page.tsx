import Image from "next/image";
import { notFound } from "next/navigation";
import { Headphones, Rss } from "lucide-react";

import { podcastService } from "@/services/podcast.service";
import { getPodcastCoverImage } from "@/utils/publicHelpers";

type PodcastPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PodcastDetailPage({ params }: PodcastPageProps) {
  const { slug } = await params;

  // No "get podcast by slug" endpoint exists, so the full list is
  // fetched and matched by slug on the server.
  const podcasts = await podcastService.getAll();
  const podcast = podcasts.find((item) => item.slug === slug && item.isActive);

  if (!podcast) {
    notFound();
  }

  const relatedPodcasts = podcasts
    .filter((item) => item.id !== podcast.id && item.isActive)
    .slice(0, 3);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-border">
              <Image
                src={getPodcastCoverImage(podcast)}
                alt={podcast.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Podcast
            </span>

            <h1 className="mt-3 text-4xl font-black leading-tight">{podcast.title}</h1>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">{podcast.description}</p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                {podcast.hostName || "Capitalist"}
              </span>
            </div>

            {podcast.rssFeedUrl && (
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={podcast.rssFeedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Rss className="h-5 w-5" />
                  RSS-ə abunə ol
                </a>
              </div>
            )}
          </div>
        </div>

        {relatedPodcasts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-3xl font-black">Digər podcastlar</h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPodcasts.map((item) => (
                <a
                  key={item.id}
                  href={`/podcast/${item.slug}`}
                  className="overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={getPodcastCoverImage(item)}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="line-clamp-2 text-xl font-bold">{item.title}</h3>

                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

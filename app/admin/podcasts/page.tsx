"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Headphones,
  Pencil,
  Plus,
  Search,
  Loader2,
  Mic2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { usePodcasts } from "@/hooks/usePodcasts";

export default function AdminPodcastsPage() {
  const { data: podcasts, isLoading, isError } = usePodcasts();
  const [search, setSearch] = useState("");

  const filteredPodcasts = podcasts?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center text-destructive">
        Podcastlar yüklənərkən xəta baş verdi.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Podcastlar
          </h1>

          <p className="mt-2 text-muted-foreground">
            Podcast epizodlarını idarə edin.
          </p>
        </div>

        <Link
          href="/admin/podcasts/create"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni podcast
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Podcast axtar..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Podcast
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Aparıcı
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                RSS Feed URL
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredPodcasts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                  Podcast tapılmadı.
                </td>
              </tr>
            ) : (
              filteredPodcasts.map((podcast) => (
                <tr
                  key={podcast.id}
                  className="border-b last:border-none"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-muted border text-muted-foreground">
                        <Mic2 className="h-6 w-6" />
                      </div>

                      <div>
                        <div className="font-semibold">
                          {podcast.title}
                        </div>

                        <div className="mt-1 text-xs text-muted-foreground">
                          {podcast.slug || podcast.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {podcast.hostName || "-"}
                  </td>

                  <td className="px-6 py-4 text-muted-foreground text-sm truncate max-w-xs">
                    {podcast.rssFeedUrl || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
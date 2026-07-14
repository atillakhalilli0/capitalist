import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Headphones,
  Pencil,
  Plus,
  Search,
} from "lucide-react";

import { podcasts } from "@/mocks/podcasts";
import { Input } from "@/components/ui/input";

export default function AdminPodcastsPage() {
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
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
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
                Qonaq
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Müddət
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Featured
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Əməliyyat
              </th>
            </tr>
          </thead>

          <tbody>
            {podcasts.map((podcast) => (
              <tr
                key={podcast.id}
                className="border-b last:border-none"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-24 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={podcast.coverImage}
                        alt={podcast.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <div className="font-semibold">
                        {podcast.title}
                      </div>

                      <div className="mt-1 text-xs text-muted-foreground">
                        {podcast.slug}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {podcast.guest}
                </td>

                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-muted-foreground" />
                    {podcast.duration}
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  {podcast.featured ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      Bəli
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      Xeyr
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/admin/podcasts/${podcast.id}`}
                      className="rounded-lg border border-border p-2 hover:bg-muted"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    <Link
                      href={`/admin/podcasts/${podcast.id}/edit`}
                      className="rounded-lg border border-border p-2 hover:bg-muted"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
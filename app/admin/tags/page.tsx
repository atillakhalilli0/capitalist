import Link from "next/link";
import { Plus, Search, Pencil, Eye, Tag } from "lucide-react";

import { Input } from "@/components/ui/input";
import { tags } from "@/mocks/tags";

export default function AdminTagsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Teqlər
          </h1>

          <p className="mt-2 text-muted-foreground">
            Məqalələrdə istifadə olunan teqləri idarə edin.
          </p>
        </div>

        <Link
          href="/admin/tags/create"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni teq
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          className="pl-10"
          placeholder="Teq axtar..."
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Ad
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Slug
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Əməliyyat
              </th>
            </tr>
          </thead>

          <tbody>
            {tags.map((tag) => (
              <tr
                key={tag.id}
                className="border-b last:border-none"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Tag className="h-4 w-4 text-emerald-600" />
                    {tag.name}
                  </div>
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {tag.slug}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/admin/tags/${tag.id}`}
                      className="rounded-lg border p-2 hover:bg-muted"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    <Link
                      href={`/admin/tags/${tag.id}/edit`}
                      className="rounded-lg border p-2 hover:bg-muted"
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
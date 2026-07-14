"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Trash2, Tag, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { useTags, useDeleteTag } from "@/hooks/useTags";

export default function AdminTagsPage() {
  const { data: tags, isLoading, isError, refetch } = useTags();
  const { mutate: deleteTag } = useDeleteTag();
  const [search, setSearch] = useState("");

  const handleDelete = (id: string, name: string) => {
    if (confirm(`"${name}" teqini silmək istədiyinizdən əminsiniz?`)) {
      deleteTag(id, {
        onSuccess: () => {
          toast.success("Teq uğurla silindi");
          refetch();
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Teq silinə bilmədi: ${detail}`);
        },
      });
    }
  };

  const filteredTags = tags?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
        Teqlər yüklənərkən xəta baş verdi.
      </div>
    );
  }

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
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
              <th className="px-6 py-4 text-center text-sm font-semibold w-[100px]">
                Əməliyyat
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTags.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                  Teq tapılmadı.
                </td>
              </tr>
            ) : (
              filteredTags.map((tag) => (
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
                    {tag.slug || tag.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleDelete(tag.id, tag.name)}
                        className="rounded-lg bg-destructive p-2 text-destructive-foreground transition hover:opacity-90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
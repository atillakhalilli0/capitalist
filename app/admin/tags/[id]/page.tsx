"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Tag, Loader2 } from "lucide-react";
import { useTag } from "@/hooks/useTags";

type TagPreviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function TagPreviewPage({
  params,
}: TagPreviewPageProps) {
  const { id } = use(params);
  const { data: tag, isLoading, isError } = useTag(id);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !tag) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
        <p className="text-destructive font-medium">Teq tapılmadı</p>
        <Link href="/admin/tags" className="text-sm underline">
          Teqlərə qayıt
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/tags"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Teqlərə qayıt
          </Link>

          <h1 className="text-3xl font-bold">
            Teq məlumatı
          </h1>
        </div>

        <Link
          href={`/admin/tags/${tag.id}/edit`}
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Redaktə et
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
            <Tag className="h-8 w-8 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {tag.name}
            </h2>

            <p className="text-muted-foreground">
              #{tag.slug || tag.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Ad
            </h3>

            <p className="text-lg font-semibold">
              {tag.name}
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Slug
            </h3>

            <p>{tag.slug || tag.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
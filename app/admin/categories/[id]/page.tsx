import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  FolderTree,
  Pencil,
  Hash,
  ListOrdered,
} from "lucide-react";

import { categories } from "@/mocks/categories";
import { articles as allArticles } from "@/mocks/articles";

type CategoryPreviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CategoryPreviewPage({
  params,
}: CategoryPreviewPageProps) {
  const { id } = await params;

  const category = categories.find((item) => item.id === id);

  if (!category) {
    notFound();
  }

  const articles = allArticles.filter(
    (article) => article.category.id === category.id
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/categories"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Kateqoriyalar
          </Link>

          <h1 className="text-3xl font-bold">
            Kateqoriya məlumatı
          </h1>
        </div>

        <Link
          href={`/admin/categories/${category.id}/edit`}
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Redaktə et
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <FolderTree className="h-7 w-7" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {category.name}
                </h2>

                <p className="text-muted-foreground">
                  {category.description || "Təsvir yoxdur."}
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  Slug
                </div>

                <p className="font-semibold">
                  {category.slug}
                </p>
              </div>

              <div className="rounded-xl border border-border p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <ListOrdered className="h-4 w-4" />
                  Sıralama
                </div>

                <p className="font-semibold">
                  {category.order}
                </p>
              </div>

              <div className="rounded-xl border border-border p-4">
                <p className="mb-2 text-muted-foreground">
                  Status
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${category.isActive
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                >
                  {category.isActive
                    ? "Aktiv"
                    : "Passiv"}
                </span>
              </div>

              <div className="rounded-xl border border-border p-4">
                <p className="mb-2 text-muted-foreground">
                  Parent
                </p>

                <p className="font-semibold">
                  {category.parentCategoryName || "Yoxdur"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Statistika
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Məqalə sayı</span>

                <span className="font-bold">
                  {articles.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Status</span>

                <span>
                  {category.isActive
                    ? "Aktiv"
                    : "Passiv"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Son məqalələr
            </h3>

            <div className="space-y-3">
              {articles.slice(0, 5).map((article) => (
                <Link
                  key={article.id}
                  href={`/admin/articles/${article.id}`}
                  className="block rounded-lg border border-border p-3 transition hover:bg-muted"
                >
                  <p className="line-clamp-2 font-medium">
                    {article.title}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {article.viewCount.toLocaleString()} baxış
                  </p>
                </Link>
              ))}

              {articles.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Bu kateqoriyada hələ məqalə yoxdur.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Eye,
  Pencil,
  Calendar,
  Clock3,
  BarChart3,
} from "lucide-react";

import { articles as allArticles } from "@/mocks/articles";

type ArticlePreviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArticlePreviewPage({
  params,
}: ArticlePreviewPageProps) {
  const { id } = await params;

  const article = allArticles.find((item) => item.id === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/articles"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Məqalələr
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">
            Məqaləyə baxış
          </h1>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/${article.category.slug}/${article.slug}`}
            target="_blank"
            className="inline-flex items-center rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted"
          >
            <Eye className="mr-2 h-4 w-4" />
            Saytda aç
          </Link>

          <Link
            href={`/admin/articles/${article.id}/edit`}
            className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Redaktə et
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          {article.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="rounded-3xl border border-border bg-card p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
              {article.category.name}
            </span>

            <h2 className="mt-4 text-4xl font-bold leading-tight">
              {article.title}
            </h2>

            {article.subtitle && (
              <p className="mt-4 text-xl text-muted-foreground">
                {article.subtitle}
              </p>
            )}

            {article.excerpt && (
              <p className="mt-8 leading-8 text-muted-foreground">
                {article.excerpt}
              </p>
            )}

            <div className="mt-10 rounded-2xl bg-muted/50 p-6">
              <h3 className="mb-4 font-semibold">
                Content Preview
              </h3>

              <pre className="overflow-x-auto whitespace-pre-wrap text-sm">
                {JSON.stringify(article.content, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="mb-5 text-lg font-semibold">
              Məlumat
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Status
                </span>

                <span className="font-semibold">
                  {article.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Müəllif
                </span>

                <span className="font-semibold">
                  {article.author.name} {article.author.surname}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Oxuma müddəti
                </span>

                <span className="flex items-center gap-1">
                  <Clock3 className="h-4 w-4" />
                  {article.readingTime} dəq
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Baxış sayı
                </span>

                <span className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  {article.viewCount.toLocaleString()}
                </span>
              </div>

              {article.publishedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Dərc olunub
                  </span>

                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(
                      article.publishedAt
                    ).toLocaleDateString("az-AZ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">
              SEO
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  SEO Title
                </p>

                <p className="mt-1 font-medium">
                  {article.seo.title}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  SEO Description
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {article.seo.description}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Teqlər
            </h3>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
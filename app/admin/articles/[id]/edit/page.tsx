import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

import { articles as allArticles } from "@/mocks/articles";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EditArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  const article = allArticles.find((item) => item.id === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/articles"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Məqalələrə qayıt
          </Link>

          <h1 className="text-3xl font-bold">
            Məqaləni redaktə et
          </h1>
        </div>

        <Link
          href="#"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          <Save className="mr-2 h-4 w-4" />
          Dəyişiklikləri saxla
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="space-y-5">
              <Input defaultValue={article.title} />

              <Input defaultValue={article.slug} />

              <Textarea
                rows={4}
                defaultValue={article.excerpt}
              />

              <Textarea
                rows={18}
                defaultValue={JSON.stringify(
                  article.content,
                  null,
                  2
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">
              Status
            </h3>

            <Input defaultValue={article.status} />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">
              Kateqoriya
            </h3>

            <Input
              defaultValue={article.category.name}
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">
              SEO
            </h3>

            <Input
              defaultValue={article.seo.title}
            />

            <Textarea
              rows={4}
              className="mt-4"
              defaultValue={
                article.seo.description
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
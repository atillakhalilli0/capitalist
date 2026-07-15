import Image from "next/image";
import { notFound } from "next/navigation";

import ArticleCard from "@/components/article/ArticleCard";

import { articleService } from "@/services/article.service";
import { ArticleStatus } from "@/types/article";
import {
  getArticleReadingTime,
  getAuthorAvatar,
  getAuthorFullName,
  getAuthorRoleLabel,
  getAuthorSlug,
} from "@/utils/publicHelpers";

type AuthorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  // There's no public "get user by slug" endpoint, and /api/Users is
  // admin-only, so the author is derived from the (public) author data
  // that's already embedded in each published article.
  const { items: publishedArticles } = await articleService.getAll({
    pageNumber: 1,
    pageSize: 200,
  });

  const authorArticles = publishedArticles.filter(
    (article) => getAuthorSlug(article.author) === slug
  );

  const author = authorArticles[0]?.author;

  if (!author) {
    notFound();
  }

  const totalReads = authorArticles.reduce((sum, article) => sum + article.viewCount, 0);

  const avgReadingTime =
    authorArticles.length > 0
      ? Math.round(
          authorArticles.reduce((sum, article) => sum + getArticleReadingTime(article), 0) /
            authorArticles.length
        )
      : 0;

  const authorName = getAuthorFullName(author);
  const authorRole = getAuthorRoleLabel(author);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border border-border bg-card p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="relative h-36 w-36 overflow-hidden rounded-3xl bg-muted">
              <Image
                src={getAuthorAvatar(author)}
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
                Müəllif
              </span>

              <h1 className="mt-2 text-4xl font-black">{authorName}</h1>

              <p className="mt-2 text-muted-foreground">
                {author.bio ??
                  "Biznes, iqtisadiyyat və texnologiya sahələrində araşdırmalar aparan müəllif."}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-border p-5">
                  <div className="text-3xl font-black">{authorArticles.length}</div>
                  <div className="mt-1 text-sm text-muted-foreground">Məqalə</div>
                </div>

                <div className="rounded-2xl border border-border p-5">
                  <div className="text-3xl font-black">{totalReads.toLocaleString("az-AZ")}</div>
                  <div className="mt-1 text-sm text-muted-foreground">Baxış</div>
                </div>

                <div className="rounded-2xl border border-border p-5">
                  <div className="text-3xl font-black">{avgReadingTime}</div>
                  <div className="mt-1 text-sm text-muted-foreground">Orta oxuma</div>
                </div>

                <div className="rounded-2xl border border-border p-5">
                  <div className="text-xl font-black">{authorRole || "-"}</div>
                  <div className="mt-1 text-sm text-muted-foreground">Rol</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="mb-8 text-3xl font-black">Müəllifin məqalələri</h2>

          {authorArticles.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {authorArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border py-20 text-center">
              <h3 className="text-2xl font-bold">Bu müəllifin məqaləsi tapılmadı.</h3>
              <p className="mt-3 text-muted-foreground">Tezliklə yeni məqalələr əlavə olunacaq.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

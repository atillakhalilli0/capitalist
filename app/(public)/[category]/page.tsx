import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import ArticleCard from "@/components/article/ArticleCard";

import { categoryService } from "@/services/category.service";
import { articleService } from "@/services/article.service";
import { ArticleStatus } from "@/types/article";
import {
  getArticleCoverImage,
  getArticleExcerpt,
  getArticleReadingTime,
  getArticleUrl,
  getAuthorFullName,
} from "@/utils/publicHelpers";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const categories = await categoryService.getAll();

  const currentCategory = categories.find((item) => item.slug === category);

  if (!currentCategory) {
    notFound();
  }

  const { items: categoryArticles } = await articleService.getAll({
  pageNumber: 1,
  pageSize: 30,
  categoryId: currentCategory.id,
  sortBy: "publishedAt",
  sortOrder: "desc",
});

  const featured = categoryArticles[0];
  const latest = categoryArticles.slice(1);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 border-b border-border pb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
            Kateqoriya
          </span>

          <h1 className="mt-3 text-5xl font-black tracking-tight">{currentCategory.name}</h1>
        </div>

        {featured && (
          <Link
            href={getArticleUrl(featured)}
            className="group mb-16 grid gap-8 overflow-hidden rounded-3xl border border-border bg-card p-8 lg:grid-cols-2"
          >
            <div className="flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
                Əsas məqalə
              </span>

              <h2 className="mt-4 text-4xl font-black leading-tight transition group-hover:text-emerald-600">
                {featured.title}
              </h2>

              <p className="mt-5 line-clamp-4 text-lg leading-8 text-muted-foreground">
                {getArticleExcerpt(featured)}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>{getAuthorFullName(featured.author)}</span>

                <span>•</span>

                <span>{getArticleReadingTime(featured)} dəq</span>

                <span>•</span>

                <span>{featured.viewCount.toLocaleString("az-AZ")} baxış</span>
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden rounded-3xl bg-muted">
              <Image
                src={getArticleCoverImage(featured)}
                alt={featured.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        )}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {categoryArticles.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border py-20 text-center">
            <h3 className="text-2xl font-bold">Bu kateqoriyada məqalə yoxdur.</h3>

            <p className="mt-3 text-muted-foreground">Tezliklə yeni məqalələr əlavə olunacaq.</p>
          </div>
        )}
      </div>
    </section>
  );
}

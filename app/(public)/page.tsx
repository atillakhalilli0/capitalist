import HeroSection from "@/components/home/HeroSection";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import EditorsPickSection from "@/components/home/EditorsPickSection";
import MostReadSection from "@/components/home/MostReadSection";
import CategoryBlock from "@/components/home/CategoryBlock";
import PodcastBlock from "@/components/home/PodcastBlock";
import NewsletterForm from "@/components/home/NewsletterForm";
import SpecialProjectsSection from "@/components/home/SpecialProjectsSection";

import { categoryService } from "@/services/category.service";
import { articleService } from "@/services/article.service";
import { ArticleStatus } from "@/types/article";

export default async function HomePage() {
  const [categories, latestArticlesResult] = await Promise.all([
    categoryService.getAll(),
    articleService.getAll({
      pageNumber: 1,
      pageSize: 10,
      sortBy: "publishedAt",
      sortOrder: "desc",
    }),
  ]);

  // Only top-level categories get their own homepage block.
  const topLevelCategories = categories.filter((category) => !category.parentCategoryId);

  const articlesByCategoryId = new Map<string, typeof latestArticlesResult.items>();

  for (const article of latestArticlesResult.items) {
    const categoryId = article.category?.id;
    if (!categoryId) continue;

    const list = articlesByCategoryId.get(categoryId) ?? [];
    list.push(article);
    articlesByCategoryId.set(categoryId, list);
  }

  return (
    <>
      <HeroSection />

      <LatestNewsSection />

      <EditorsPickSection />

      <MostReadSection />

      <div className="container mx-auto px-4 py-14">
        <h4 className="text-4xl underline font-bold">Kategoriyalar</h4>
        {topLevelCategories.map((category) => (
          <CategoryBlock
            key={category.id}
            title={category.name}
            slug={category.slug}
            articles={articlesByCategoryId.get(category.id) ?? []}
          />
        ))}
      </div>

      <PodcastBlock />

      <SpecialProjectsSection />

      <NewsletterForm />
    </>
  );
}

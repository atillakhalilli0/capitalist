import { notFound } from "next/navigation";

import ArticleHeader from "@/components/article/ArticleHeader";
import ReadingProgress from "@/components/article/ReadingProgress";
import ShareButtons from "@/components/article/ShareButtons";
import ArticleContent from "@/components/article/ArticleContent";
import AuthorBox from "@/components/article/AuthorBox";
import RelatedArticles from "@/components/article/RelatedArticles";
import NewsletterCTA from "@/components/article/NewsletterCTA";

import { articleService } from "@/services/article.service";
import { ArticleStatus } from "@/types/article";
import type { Article } from "@/types/article";

type ArticlePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;

  // The backend has no "get article by slug" endpoint, so published
  // articles are fetched and matched by slug + category on the server.
  const { items: articles } = await articleService.getAll({
    pageNumber: 1,
    pageSize: 10,
  });

  const article = articles.find(
    (item) => item.category?.slug === category && item.slug === slug
  );

  if (!article) {
    notFound();
  }

  const relatedArticles: Article[] = articles
    .filter((item) => item.id !== article.id && item.category?.slug === article.category?.slug)
    .slice(0, 3);

  const authorArticles = articles.filter((item) => item.author?.id === article.author?.id);
  const authorArticleCount = authorArticles.length;
  const authorTotalReads = authorArticles.reduce((sum, item) => sum + (item.viewCount ?? 0), 0);

  const articleUrl = `https://capitalist.az/${article.category?.slug}/${article.slug}`;

  return (
    <>
      <ReadingProgress />

      <ArticleHeader article={article} />

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 xl:grid-cols-[80px_minmax(0,760px)]">
          <ShareButtons url={articleUrl} title={article.title} />

          <div>
            <ArticleContent content={article.content} />

            <AuthorBox
              author={article.author}
              articleCount={authorArticleCount}
              totalReads={authorTotalReads}
            />

            <RelatedArticles articles={relatedArticles} />

            <NewsletterCTA />
          </div>
        </div>
      </section>
    </>
  );
}

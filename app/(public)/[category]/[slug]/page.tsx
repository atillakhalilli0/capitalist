import { notFound } from "next/navigation";

import ArticleHeader from "@/components/article/ArticleHeader";
import ReadingProgress from "@/components/article/ReadingProgress";
import ShareButtons from "@/components/article/ShareButtons";
import ArticleContent from "@/components/article/ArticleContent";
import AuthorBox from "@/components/article/AuthorBox";
import RelatedArticles from "@/components/article/RelatedArticles";
import SourcesBox from "@/components/article/SourcesBox";
import NewsletterCTA from "@/components/article/NewsletterCTA";

import { articles } from "@/mocks/articles";
import type { Article } from "@/types/article";

type ArticlePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { category, slug } = await params;

  const article = articles.find(
    (item) =>
      item.category.slug === category &&
      item.slug === slug
  );

  if (!article) {
    notFound();
  }

  const relatedArticles: Article[] = articles
    .filter(
      (item) =>
        item.id !== article.id &&
        item.category.slug === article.category.slug
    )
    .slice(0, 3);

  const articleUrl = `https://capitalist.az/${article.category.slug}/${article.slug}`;

  return (
    <>
      <ReadingProgress />

      <ArticleHeader article={article} />

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 xl:grid-cols-[80px_minmax(0,760px)]">
          <ShareButtons
            url={articleUrl}
            title={article.title}
          />

          <div>
            {typeof article.content === "string" ? (
              <div
                className="prose prose-neutral dark:prose-invert max-w-none font-serif text-lg leading-8 text-foreground/90"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <ArticleContent content={article.content} />
            )}
            <SourcesBox
              sources={[
                {
                  title: "Azərbaycan Mərkəzi Bankı",
                  url: "https://cbar.az",
                },
                {
                  title: "Dövlət Statistika Komitəsi",
                  url: "https://stat.gov.az",
                },
              ]}
            />

            <AuthorBox
              author={article.author}
              articleCount={42}
              totalReads={186500}
            />

            <RelatedArticles articles={relatedArticles} />

            <NewsletterCTA />
          </div>
        </div>
      </section>
    </>
  );
}
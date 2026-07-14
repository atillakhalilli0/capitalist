import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

type RelatedArticlesProps = {
  articles: Article[];
};

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="mt-20">
      <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <div>
          <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-accent flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Davamı
          </span>
          <h2 className="mt-2 text-2xl font-black text-foreground">
            Oxşar məqalələr
          </h2>
        </div>

        <Link
          href="/"
          className="hidden items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent hover:underline md:flex"
        >
          Ana səhifə
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
import { Article } from "@/types/article";

import { editorPickArticles } from "./editor-picks";
import { featuredArticles } from "./featured";
import { latestArticles } from "./latest";
import { popularArticles } from "./popular";

export {
  featuredArticles,
  latestArticles,
  popularArticles,
  editorPickArticles,
};

export const articles: Article[] = [
  ...featuredArticles,
  ...latestArticles,
  ...popularArticles,
  ...editorPickArticles,
];

const articleMap = new Map(articles.map((article) => [article.slug, article]));

export const getArticleBySlug = (slug: string) => {
  return articleMap.get(slug);
};

export const getArticleById = (id: string) => {
  return articles.find((article) => article.id === id);
};

export const getFeaturedArticles = () => featuredArticles;

export const getLatestArticles = () => latestArticles;

export const getPopularArticles = () => popularArticles;

export const getEditorPickArticles = () => editorPickArticles;

export const getArticlesByCategory = (categorySlug: string) => {
  return articles.filter(
    (article) => article.category.slug === categorySlug
  );
};

export const getArticlesByAuthor = (authorId: string) => {
  return articles.filter((article) => article.author.id === authorId);
};

export const getBreakingArticles = () => {
  return articles.filter((article) => article.isBreaking);
};

export const searchArticles = (query: string) => {
  const search = query.trim().toLowerCase();

  if (!search) return [];

  return articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(search) ||
      article.subtitle?.toLowerCase().includes(search) ||
      article.excerpt?.toLowerCase().includes(search) ||
      article.category.name.toLowerCase().includes(search) ||
      article.author.name.toLowerCase().includes(search) ||
      article.author.surname.toLowerCase().includes(search) ||
      article.tags.some((tag) =>
        tag.name.toLowerCase().includes(search)
      )
    );
  });
};
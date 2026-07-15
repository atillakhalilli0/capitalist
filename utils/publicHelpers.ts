import type { Article } from "@/types/article";
import type { User } from "@/types/user";
import type { Podcast } from "@/types/podcast";
import type { Project } from "@/types/project";
import { calculateReadingTime } from "./readingTime";
import { truncate } from "./truncate";
import { slugify } from "./slugify";

const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";
const PLACEHOLDER_AVATAR = "/images/avatar-placeholder.png";

/** Strips HTML tags so we can safely build plain-text excerpts / word counts. */
export function stripHtml(html?: string | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Full display name for a backend User (author/editor). */
export function getAuthorFullName(user?: Partial<User> | null): string {
  if (!user) return "Naməlum müəllif";

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

  return name || user.username || "Naməlum müəllif";
}

export function getAuthorAvatar(user?: Partial<User> | null): string {
  return user?.avatarUrl || PLACEHOLDER_AVATAR;
}

export function getAuthorRoleLabel(user?: Partial<User> | null): string {
  return user?.roleName ? user.roleName.replaceAll("_", " ") : "";
}

/** Slug used for /muellif/[slug] routes, derived from the author's name. */
export function getAuthorSlug(user?: Partial<User> | null): string {
  return slugify(getAuthorFullName(user));
}

export function getArticleCoverImage(article?: Pick<Article, "coverImageUrl"> | null): string {
  return article?.coverImageUrl || PLACEHOLDER_IMAGE;
}

/** Short teaser text for cards — prefers the editor-written summary, falls back to stripped content. */
export function getArticleExcerpt(
  article?: Pick<Article, "summary" | "content"> | null,
  length = 160
): string {
  if (!article) return "";

  if (article.summary && article.summary.trim()) {
    return truncate(article.summary.trim(), length);
  }

  return truncate(stripHtml(article.content), length);
}

/** Reading time in minutes, computed from the article body since the backend doesn't return one. */
export function getArticleReadingTime(article?: Pick<Article, "content"> | null): number {
  return calculateReadingTime(stripHtml(article?.content));
}

export function getArticleUrl(article?: Pick<Article, "slug" | "category"> | null): string {
  if (!article) return "/";
  return `/${article.category?.slug ?? ""}/${article.slug}`;
}

export function getPodcastCoverImage(podcast?: Pick<Podcast, "coverImageUrl"> | null): string {
  return podcast?.coverImageUrl || PLACEHOLDER_IMAGE;
}

/** The backend never returns a slug for special projects, so we derive a stable one from the title. */
export function getProjectSlug(project?: Pick<Project, "slug" | "title" | "id"> | null): string {
  if (!project) return "";
  return project.slug || slugify(project.title) || project.id;
}

export { PLACEHOLDER_IMAGE, PLACEHOLDER_AVATAR };

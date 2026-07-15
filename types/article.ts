import type { BaseEntity } from "./common";
import type { Category } from "./category";
import type { User } from "./user";

export type { Tag } from "./tag";

// TODO: confirm actual numeric values with the backend (schema only says "type: integer").
// These are placeholder orderings based on typical CMS workflows.
export enum ArticleStatus {
  DRAFT = 0,
  PUBLISHED = 2,
}

// TODO: confirm actual numeric values with the backend.
export enum ContentType {
  ARTICLE ,
  NEWS ,
  OPINION ,
  VIDEO ,
}

export interface Article extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  summary?: string | null;
  contentType: ContentType;
  author: User;
  editor?: User | null;
  category: Category;
  coverImageId?: string | null;
  coverImageUrl?: string | null;
  sponsorId?: string | null;
  tags: string[];
  status: ArticleStatus;
  viewCount: number;
  publishedAt?: string | null;
}

export interface ArticleVersion {
  versionNumber: number;
  title: string;
  content: string;
  editorId: string;
  changeNote?: string | null;
  createdAt: string;
}

/** Matches backend's CreateArticleCommand exactly. */
export interface CreateArticleRequest {
  title: string;
  content: string;
  summary?: string | null;
  contentType: ContentType;
  authorId: string;
  categoryId: string;
  coverImageId?: string | null;
  sponsorId?: string | null;
  tags: string[];
}

/** Matches backend's UpdateArticleCommand exactly (id is set from the URL param, not the body, when calling the service). */
export interface UpdateArticleRequest {
  title: string;
  content: string;
  summary?: string | null;
  categoryId: string;
  coverImageId?: string | null;
  sponsorId?: string | null;
  tags: string[];
  editorId: string;
  changeNote?: string | null;
}

export interface PublishArticleRequest {
  publish: boolean;
}

export interface RollbackArticleRequest {
  versionNumber: number;
}

/** Field names must match GET /api/Articles query params exactly (ASP.NET model binding is case-insensitive, but keep names 1:1). */
export interface ArticleFilter {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchQuery?: string;
  categoryId?: string;
  tagSlug?: string;
  contentType?: ContentType;
  status?: ArticleStatus;
  isSponsored?: boolean;
  startDate?: string;
  endDate?: string;
}

import type { BaseEntity, SeoMetadata } from "./common";
import type { Category } from "./category";
import type { User } from "./user";

export enum ArticleStatus {
  DRAFT = "DRAFT",
  IN_REVIEW = "IN_REVIEW",
  REVISION_REQUESTED = "REVISION_REQUESTED",
  APPROVED = "APPROVED",
  SCHEDULED = "SCHEDULED",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  REJECTED = "REJECTED",
}

export interface Tag extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
}

export interface ArticleContent {
  type: string;
  content?: ArticleContent[];
  attrs?: Record<string, unknown>;
  text?: string;
}

export interface Article extends BaseEntity {
  title: string;
  slug: string;

  subtitle?: string;

  excerpt?: string;

  content: ArticleContent | string;

  coverImage?: string;

  author: User;

  editor?: User;

  category: Category;

  tags: Tag[];

  status: ArticleStatus;

  readingTime?: number;

  viewCount: number;

  isFeatured: boolean;

  isBreaking: boolean;

  publishedAt?: string;

  scheduledAt?: string;

  seo: SeoMetadata;
}

export interface CreateArticleRequest {
  title: string;
  slug: string;

  subtitle?: string;

  excerpt?: string;

  content: string;

  coverImage?: string;

  categoryId: string;

  tagIds: string[];

  status: ArticleStatus;

  isFeatured: boolean;

  isBreaking: boolean;

  publishedAt?: string;

  scheduledAt?: string;

  seo: SeoMetadata;
}

export interface UpdateArticleRequest
  extends Partial<CreateArticleRequest> {}

// NOTE: field names must match the backend's actual query parameters
// (see GET /api/Articles in the swagger doc) or ASP.NET will silently
// ignore them and fall back to defaults.
export interface ArticleFilter {
  pageNumber?: number;
  pageSize?: number;

  searchQuery?: string;

  categoryId?: string;

  tagSlug?: string;

  status?: ArticleStatus;

  isSponsored?: boolean;

  startDate?: string;

  endDate?: string;

  sortBy?: string;

  sortOrder?: "asc" | "desc";
}
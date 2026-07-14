import BaseService from "./base.service";
import { categoryService } from "./category.service";
import type { Article, ArticleFilter, CreateArticleRequest, UpdateArticleRequest } from "@/types/article";
import type { PaginatedResponse } from "@/types/api";

class ArticleService extends BaseService {
  getAll(params?: ArticleFilter) {
    return this.get<PaginatedResponse<Article>>("/Articles", {
      params,
    });
  }

  getById(id: string) {
    return this.get<Article>(`/Articles/${id}`);
  }

  async getBySlug(slug: string) {
    // Backend only has GET by ID, search by slug client-side or filter
    const res = await this.getAll({ searchQuery: slug });
    return res.items.find((item) => item.slug === slug) ?? null;
  }

  getLatest(limit = 10) {
    return this.getAll({
      pageNumber: 1,
      pageSize: limit,
      sortBy: "publishedAt",
      sortOrder: "desc",
    }).then((res) => res.items);
  }

  getFeatured(limit = 6) {
    return this.getAll({
      pageNumber: 1,
      pageSize: limit,
      isSponsored: true,
    }).then((res) => res.items);
  }

  getPopular(limit = 6) {
    return this.getAll({
      pageNumber: 1,
      pageSize: limit,
      sortBy: "viewCount",
      sortOrder: "desc",
    }).then((res) => res.items);
  }

  async getByCategory(slug: string, params?: ArticleFilter) {
    const categories = await categoryService.getAll();
    const category = categories.find((c) => c.slug === slug);
    if (!category) {
      return {
        items: [] as Article[],
        pageNumber: 1,
        pageSize: params?.pageSize ?? 10,
        totalCount: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      } as PaginatedResponse<Article>;
    }
    return this.getAll({
      ...params,
      categoryId: category.id,
    });
  }

  getByAuthor(authorId: string, params?: ArticleFilter) {
    // Since authorId filter isn't directly exposed in the search query parameters,
    // we query all and perform a client-side filter or fallback.
    return this.getAll(params).then((res) => {
      const items = res.items.filter((item) => item.author?.id === authorId);
      return {
        ...res,
        items,
        totalCount: items.length,
      };
    });
  }

  search(query: string, params?: ArticleFilter) {
    return this.getAll({
      ...params,
      searchQuery: query,
    });
  }

  create(data: CreateArticleRequest) {
    // Map frontend CreateArticleRequest to CreateArticleCommand
    const payload = {
      title: data.title,
      content: data.content,
      summary: data.excerpt || data.subtitle || null,
      contentType: 0, // Default to standard article (0)
      authorId: (data as any).authorId || "00000000-0000-0000-0000-000000000000", // Will be overridden or set on the backend
      categoryId: data.categoryId,
      coverImageId: (data as any).coverImageId || null,
      sponsorId: (data as any).sponsorId || null,
      tags: data.tagIds || [],
    };

    return this.post<Article>("/Articles", payload);
  }

  update(id: string, data: UpdateArticleRequest) {
    // Map frontend UpdateArticleRequest to UpdateArticleCommand
    const payload = {
      id,
      title: data.title,
      content: data.content,
      summary: data.excerpt || data.subtitle || null,
      categoryId: data.categoryId,
      coverImageId: (data as any).coverImageId || null,
      sponsorId: (data as any).sponsorId || null,
      tags: data.tagIds || [],
      editorId: (data as any).editorId || "00000000-0000-0000-0000-000000000000",
      changeNote: (data as any).changeNote || null,
    };

    return this.put<Article>(`/Articles/${id}`, payload);
  }

  remove(id: string) {
    return this.delete<void>(`/Articles/${id}`);
  }

  publish(id: string, publish: boolean) {
    return this.post<void>(`/Articles/${id}/publish`, { publish });
  }

  rollback(id: string, versionNumber: number) {
    return this.post<void>(`/Articles/${id}/rollback`, { versionNumber });
  }

  getVersions(id: string) {
    return this.get<any[]>(`/Articles/${id}/versions`);
  }
}

export const articleService = new ArticleService();
export default ArticleService;
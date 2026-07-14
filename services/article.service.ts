import BaseService from "./base.service";

import type { Article, CreateArticleRequest, UpdateArticleRequest } from "@/types/article";

import type { PaginatedResponse, PaginationParams } from "@/types/api";

class ArticleService extends BaseService {
   getAll(params?: PaginationParams) {
      return this.get<PaginatedResponse<Article>>("/articles", {
         params,
      });
   }

   getById(id: string) {
      return this.get<Article>(`/articles/${id}`);
   }

   getBySlug(slug: string) {
      return this.get<Article>(`/articles/slug/${slug}`);
   }

   getLatest(limit = 10) {
      return this.get<Article[]>("/articles/latest", {
         params: {
            limit,
         },
      });
   }

   getFeatured(limit = 6) {
      return this.get<Article[]>("/articles/featured", {
         params: {
            limit,
         },
      });
   }

   getPopular(limit = 6) {
      return this.get<Article[]>("/articles/popular", {
         params: {
            limit,
         },
      });
   }

   getByCategory(slug: string, params?: PaginationParams) {
      return this.get<PaginatedResponse<Article>>(`/articles/category/${slug}`, {
         params,
      });
   }

   getByAuthor(authorId: string, params?: PaginationParams) {
      return this.get<PaginatedResponse<Article>>(`/articles/author/${authorId}`, {
         params,
      });
   }

   search(query: string, params?: PaginationParams) {
      return this.get<PaginatedResponse<Article>>("/articles/search", {
         params: {
            ...params,
            query,
         },
      });
   }

   create(data: CreateArticleRequest) {
      return this.post<Article>("/articles", data);
   }

   update(id: string, data: UpdateArticleRequest) {
      return this.put<Article>(`/articles/${id}`, data);
   }

   remove(id: string) {
      return super.delete<void>(`/articles/${id}`);
   }
}

export const articleService = new ArticleService();

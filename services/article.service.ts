import BaseService from "./base.service";

import type { Article, ArticleFilter, CreateArticleRequest, UpdateArticleRequest } from "@/types/article";

import type { PaginatedResponse } from "@/types/api";

class ArticleService extends BaseService {
   getAll(params?: ArticleFilter) {
      return this.get<PaginatedResponse<Article>>("/articles", {
         params,
      });
   }

   getById(id: string) {
      return this.get<Article>(`/articles/${id}`);
   }

   // TODO: none of the methods below (getBySlug, getLatest, getFeatured,
   // getPopular, getByCategory, getByAuthor, search) have a matching route
   // in the backend swagger - only GET /api/Articles, GET/PUT/DELETE
   // /api/Articles/{id}, POST /api/Articles, publish, rollback, and
   // versions exist there. These will 404 until the backend adds them,
   // or you can get the same results by calling getAll() with the right
   // ArticleFilter (e.g. { searchQuery, categoryId, status }).
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

   getByCategory(slug: string, params?: ArticleFilter) {
      return this.get<PaginatedResponse<Article>>(`/articles/category/${slug}`, {
         params,
      });
   }

   getByAuthor(authorId: string, params?: ArticleFilter) {
      return this.get<PaginatedResponse<Article>>(`/articles/author/${authorId}`, {
         params,
      });
   }

   search(query: string, params?: ArticleFilter) {
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
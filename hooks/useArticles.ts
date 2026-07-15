"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { articleService } from "@/services/article.service";
import { ArticleStatus } from "@/types/article";
import type {
  ArticleFilter,
  CreateArticleRequest,
  UpdateArticleRequest,
  PublishArticleRequest,
  RollbackArticleRequest,
} from "@/types/article";

const QUERY_KEY = "articles";

// The backend has no dedicated dashboard/stats endpoint, so this derives
// the numbers from GET /api/Articles. pageSize: 1 is enough to read
// `totalCount` per status without pulling the full list.
export function useDashboardStats() {
  return useQuery({
    queryKey: [QUERY_KEY, "dashboard-stats"],
    queryFn: async () => {
      const [all, published, draft] = await Promise.all([
        articleService.getAll({ pageNumber: 1, pageSize: 1 }),
        articleService.getAll({ pageNumber: 1, pageSize: 1, status: ArticleStatus.PUBLISHED }),
        articleService.getAll({ pageNumber: 1, pageSize: 1, status: ArticleStatus.DRAFT }),
      ]);

      const publishedArticles = await articleService.getAll({
        pageNumber: 1,
        pageSize: published.totalCount || 1,
        status: ArticleStatus.PUBLISHED,
      });

      const totalViews = publishedArticles.items.reduce(
        (sum, article) => sum + (article.viewCount ?? 0),
        0
      );

      return {
        totalArticles: all.totalCount,
        publishedArticles: published.totalCount,
        draftArticles: draft.totalCount,
        totalViews,
      };
    },
  });
}

export function useArticles(params?: ArticleFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => articleService.getAll(params),
  });
}

export function useArticle(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => articleService.getById(id!),
    enabled: !!id,
  });
}

export function useArticleVersions(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id, "versions"],
    queryFn: () => articleService.getVersions(id!),
    enabled: !!id,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateArticleRequest) => articleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateArticleRequest }) =>
      articleService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articleService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function usePublishArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PublishArticleRequest }) =>
      articleService.publish(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}

export function useRollbackArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RollbackArticleRequest }) =>
      articleService.rollback(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}

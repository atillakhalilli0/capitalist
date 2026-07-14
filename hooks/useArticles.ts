"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { articleService } from "@/services/article.service";

import type {
  ArticleFilter,
  CreateArticleRequest,
  UpdateArticleRequest,
} from "@/types/article";
import { ArticleStatus } from "@/types/article";

const QUERY_KEY = "articles";

// The backend has no dedicated dashboard/stats endpoint, so this derives
// the numbers from GET /api/Articles instead. pageSize: 1 is enough to
// read `totalCount` for each status without pulling the full list.
// totalViews is a best-effort sum over the published page we already have;
// swap this for a real aggregate endpoint if/when the backend adds one.
export function useDashboardStats() {
  return useQuery({
    queryKey: [QUERY_KEY, "dashboard-stats"],
    queryFn: async () => {
      const [all, published, draft] = await Promise.all([
        articleService.getAll({ pageNumber: 1, pageSize: 1 }),
        articleService.getAll({
          pageNumber: 1,
          pageSize: 1,
          status: ArticleStatus.PUBLISHED,
        }),
        articleService.getAll({
          pageNumber: 1,
          pageSize: 1,
          status: ArticleStatus.DRAFT,
        }),
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

export function useArticles(
  params?: ArticleFilter
) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () =>
      articleService.getAll(params),
  });
}

export function useArticle(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () =>
      articleService.getById(id!),
    enabled: !!id,
  });
}

export function useArticleBySlug(
  slug?: string
) {
  return useQuery({
    queryKey: [
      QUERY_KEY,
      "slug",
      slug,
    ],
    queryFn: () =>
      articleService.getBySlug(slug!),
    enabled: !!slug,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateArticleRequest
    ) => articleService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateArticleRequest;
    }) =>
      articleService.update(
        id,
        data
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });

      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY,
          variables.id,
        ],
      });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      articleService.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}
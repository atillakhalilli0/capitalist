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

const QUERY_KEY = "articles";

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
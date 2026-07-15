"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { commentService } from "@/services/comment.service";
import type { CommentFilter, CreateCommentRequest, ModerateCommentRequest } from "@/types/comment";

const QUERY_KEY = "comments";

export function useComments(params?: CommentFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => commentService.getAll(params),
  });
}

export function useComment(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => commentService.getById(id!),
    enabled: !!id,
  });
}

export function useArticleComments(articleId?: string, publicOnly = true) {
  return useQuery({
    queryKey: [QUERY_KEY, "article", articleId, publicOnly],
    queryFn: () => commentService.getByArticle(articleId!, publicOnly),
    enabled: !!articleId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => commentService.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "article", variables.articleId] });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => commentService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useModerateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ModerateCommentRequest }) =>
      commentService.moderate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

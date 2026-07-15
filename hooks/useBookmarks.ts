"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { bookmarkService } from "@/services/bookmark.service";
import type { BookmarkFilter, AddBookmarkRequest } from "@/types/bookmark";

const QUERY_KEY = "bookmarks";

export function useBookmarks(params?: BookmarkFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => bookmarkService.getAll(params),
  });
}

export function useAddBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddBookmarkRequest) => bookmarkService.add(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useRemoveBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId: string) => bookmarkService.remove(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

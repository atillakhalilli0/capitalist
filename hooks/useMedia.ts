"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { mediaService } from "@/services/media.service";

const QUERY_KEY = "media";

export function useMedia(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => mediaService.getAll(params),
  });
}

export function useMediaFile(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => mediaService.getById(id!),
    enabled: !!id,
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) =>
      mediaService.upload(file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}

export function useUploadManyMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (files: File[]) =>
      mediaService.uploadMany(files),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      mediaService.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}
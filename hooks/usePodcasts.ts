"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  podcastService,
  type CreatePodcastRequest,
  type UpdatePodcastRequest,
} from "@/services/podcast.service";

const QUERY_KEY = "podcasts";

export function usePodcasts(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => podcastService.getAll(params),
  });
}

export function usePodcast(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => podcastService.getById(id!),
    enabled: !!id,
  });
}

export function usePodcastBySlug(slug?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, "slug", slug],
    queryFn: () => podcastService.getBySlug(slug!),
    enabled: !!slug,
  });
}

export function useCreatePodcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePodcastRequest) =>
      podcastService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}

export function useUpdatePodcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdatePodcastRequest;
    }) => podcastService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.id],
      });
    },
  });
}

export function useDeletePodcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      podcastService.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { podcastService } from "@/services/podcast.service";
import type {
  CreatePodcastRequest,
  UpdatePodcastRequest,
  CreateEpisodeRequest,
} from "@/types/podcast";

const QUERY_KEY = "podcasts";

export function usePodcasts() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => podcastService.getAll(),
  });
}

export function usePodcast(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => podcastService.getById(id!),
    enabled: !!id,
  });
}

export function useCreatePodcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePodcastRequest) => podcastService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdatePodcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePodcastRequest }) =>
      podcastService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}

export function useDeletePodcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => podcastService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useAddEpisode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ podcastId, data }: { podcastId: string; data: CreateEpisodeRequest }) =>
      podcastService.addEpisode(podcastId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.podcastId] });
    },
  });
}

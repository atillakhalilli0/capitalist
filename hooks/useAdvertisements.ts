"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { advertisementService } from "@/services/advertisement.service";
import type {
  AdvertisementFilter,
  CreateAdvertisementRequest,
  UpdateAdvertisementRequest,
  TrackAdEventRequest,
} from "@/types/advertisement";

const QUERY_KEY = "advertisements";

export function useAdvertisements(params?: AdvertisementFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => advertisementService.getAll(params),
  });
}

export function useAdvertisement(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => advertisementService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateAdvertisement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAdvertisementRequest) => advertisementService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdateAdvertisement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdvertisementRequest }) =>
      advertisementService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteAdvertisement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => advertisementService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useTrackAdEvent() {
  return useMutation({
    mutationFn: (data: TrackAdEventRequest) => advertisementService.trackEvent(data),
  });
}

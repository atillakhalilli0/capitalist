"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  tagService,
  type CreateTagRequest,
  type UpdateTagRequest,
} from "@/services/tag.service";

const QUERY_KEY = "tags";

export function useTags(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => tagService.getAll(params),
  });
}

export function useTag(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => tagService.getById(id!),
    enabled: !!id,
  });
}

export function useTagBySlug(slug?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, "slug", slug],
    queryFn: () => tagService.getBySlug(slug!),
    enabled: !!slug,
  });
}

export function useTagList() {
  return useQuery({
    queryKey: [QUERY_KEY, "list"],
    queryFn: () => tagService.getList(),
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTagRequest) =>
      tagService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTagRequest;
    }) => tagService.update(id, data),

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

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      tagService.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}
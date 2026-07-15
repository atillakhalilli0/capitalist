"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { categoryService } from "@/services/category.service";
import type { CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category";

const QUERY_KEY = "categories";

export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => categoryService.getAll(),
  });
}

export function useCategory(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => categoryService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryRequest }) =>
      categoryService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

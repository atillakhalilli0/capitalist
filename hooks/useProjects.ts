"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";
import type { CreateProjectRequest, UpdateProjectRequest } from "@/types/project";

const QUERY_KEY = "projects";

export function useProjects() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => projectService.getAll(),
  });
}

export function useProject(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => projectService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => projectService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectRequest }) =>
      projectService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  projectService,
  type CreateProjectRequest,
  type UpdateProjectRequest,
} from "@/services/project.service";

const QUERY_KEY = "projects";

export function useProjects() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => projectService.getList(),
  });
}

export function useProject(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => projectService.getById(id!),
    enabled: !!id,
  });
}

export function useProjectBySlug(
  slug?: string
) {
  return useQuery({
    queryKey: [QUERY_KEY, "slug", slug],
    queryFn: () =>
      projectService.getBySlug(slug!),
    enabled: !!slug,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateProjectRequest
    ) => projectService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProjectRequest;
    }) =>
      projectService.update(id, data),

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
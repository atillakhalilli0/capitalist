"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { contactRequestService } from "@/services/contactRequest.service";
import type {
  ContactRequestFilter,
  CreateContactRequest,
  HandleContactRequest,
} from "@/types/contactRequest";

const QUERY_KEY = "contact-requests";

export function useContactRequests(params?: ContactRequestFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => contactRequestService.getAll(params),
  });
}

export function useContactRequest(id?: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => contactRequestService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateContactRequest() {
  return useMutation({
    mutationFn: (data: CreateContactRequest) => contactRequestService.create(data),
  });
}

export function useHandleContactRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: HandleContactRequest }) =>
      contactRequestService.handle(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
}

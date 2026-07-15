"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { subscriberService } from "@/services/subscriber.service";
import type {
  SubscriberFilter,
  SubscribeRequest,
  ConfirmSubscriptionRequest,
  UnsubscribeRequest,
} from "@/types/subscriber";

const QUERY_KEY = "subscribers";

export function useSubscribers(params?: SubscriberFilter) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => subscriberService.getAll(params),
  });
}

export function useSubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubscribeRequest) => subscriberService.subscribe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useConfirmSubscription() {
  return useMutation({
    mutationFn: (data: ConfirmSubscriptionRequest) => subscriberService.confirm(data),
  });
}

export function useUnsubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UnsubscribeRequest) => subscriberService.unsubscribe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useDeleteSubscriber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriberService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

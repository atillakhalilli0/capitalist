"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { authService } from "@/services/auth.service";

import type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
} from "@/types/auth";

const QUERY_KEY = "auth";

export function useProfile() {
  return useQuery({
    queryKey: [QUERY_KEY, "me"],
    queryFn: () => authService.me(),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      authService.login(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (
      data: RefreshTokenRequest
    ) => authService.refreshToken(data),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (
      data: ChangePasswordRequest
    ) =>
      authService.changePassword(data),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (
      data: ForgotPasswordRequest
    ) =>
      authService.forgotPassword(data),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (
      data: ResetPasswordRequest
    ) =>
      authService.resetPassword(data),
  });
}
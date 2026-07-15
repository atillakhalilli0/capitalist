"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";

import type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
} from "@/types/auth";

const QUERY_KEY = "auth";

// The backend has no /api/Auth/me route — "who am I" comes from
// GET /api/Users/profile instead.
export function useProfile(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [QUERY_KEY, "me"],
    queryFn: () => userService.getProfile(),
    enabled: options?.enabled,
  });
}

export function useRolesAndPermissions() {
  return useQuery({
    queryKey: [QUERY_KEY, "roles-permissions"],
    queryFn: () => userService.getRolesAndPermissions(),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (data: RefreshTokenRequest) => authService.refreshToken(data),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LogoutRequest) => authService.logout(data),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authService.changePassword(data),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authService.forgotPassword(data),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
  });
}

import { jwtDecode } from "jwt-decode";

import { useAuthStore } from "@/store/authStore";

interface JwtPayload {
  exp: number;
}

export function getAccessToken() {
  return useAuthStore
    .getState()
    .accessToken;
}

export function getRefreshToken() {
  return useAuthStore
    .getState()
    .refreshToken;
}

export function setTokens(
  accessToken: string,
  refreshToken: string
) {
  useAuthStore
    .getState()
    .setAccessToken(accessToken);

  useAuthStore
    .getState()
    .setRefreshToken(refreshToken);
}

export function clearAuth() {
  useAuthStore.getState().logout();
}

export function isTokenExpired(
  token?: string | null
) {
  if (!token) return true;

  try {
    const decoded =
      jwtDecode<JwtPayload>(token);

    return (
      decoded.exp * 1000 < Date.now()
    );
  } catch {
    return true;
  }
}

export function isAuthenticated() {
  const token = getAccessToken();

  return (
    !!token && !isTokenExpired(token)
  );
}
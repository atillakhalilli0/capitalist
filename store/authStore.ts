"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserProfile } from "@/types/auth";

interface AuthState {
  user: UserProfile | null;

  accessToken: string | null;

  refreshToken: string | null;

  isAuthenticated: boolean;

  login: (payload: {
    user: UserProfile;
    accessToken: string;
    refreshToken: string;
  }) => void;

  logout: () => void;

  setUser: (user: UserProfile) => void;

  setAccessToken: (token: string) => void;

  setRefreshToken: (token: string) => void;
}

// proxy.ts (server middleware) can only read cookies, not localStorage,
// so the access token has to be mirrored into a cookie here. This is a
// plain (non-httpOnly) cookie set from the client, which is fine for
// local dev but not how you'd want to do auth in production - a real
// setup would have the backend set an httpOnly cookie directly.
function setAccessTokenCookie(token: string | null) {
  if (typeof document === "undefined") return;

  if (!token) {
    document.cookie =
      "accessToken=; path=/; max-age=0";
    return;
  }

  document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,

      refreshToken: null,

      isAuthenticated: false,

      login: ({
        user,
        accessToken,
        refreshToken,
      }) => {
        setAccessTokenCookie(accessToken);

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        setAccessTokenCookie(null);

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      setUser: (user) =>
        set({
          user,
        }),

      setAccessToken: (accessToken) => {
        setAccessTokenCookie(accessToken);

        set({
          accessToken,
        });
      },

      setRefreshToken: (refreshToken) =>
        set({
          refreshToken,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserProfile } from "@/types/auth";

interface AuthState {
  user: UserProfile | null;

  accessToken: string | null;

  refreshToken: string | null;

  isAuthenticated: boolean;

  hydrated: boolean;

  login: (payload: {
    user: UserProfile;
    accessToken: string;
    refreshToken: string;
  }) => void;

  logout: () => void;

  setUser: (user: UserProfile) => void;

  setAccessToken: (token: string) => void;

  setRefreshToken: (token: string) => void;

  setHydrated: () => void;
}

function setAccessTokenCookie(token: string | null) {
  if (typeof document === "undefined") return;

  if (!token) {
    document.cookie =
      "accessToken=; Path=/; Max-Age=0; SameSite=Lax";
    return;
  }

  document.cookie = [
    `accessToken=${token}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 7}`,
    "SameSite=Lax",
  ].join("; ");
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,

      refreshToken: null,

      isAuthenticated: false,

      hydrated: false,

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
          isAuthenticated: !!accessToken,
        });
      },

      setRefreshToken: (refreshToken) =>
        set({
          refreshToken,
        }),

      setHydrated: () =>
        set({
          hydrated: true,
        }),
    }),
    {
      name: "auth-storage",

      onRehydrateStorage: () => (state) => {
        state?.setHydrated();

        const token = state?.accessToken ?? null;

        setAccessTokenCookie(token);
      },
    }
  )
);
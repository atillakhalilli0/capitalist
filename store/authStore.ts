"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types/user";

interface AuthState {
  user: User | null;

  accessToken: string | null;

  refreshToken: string | null;

  isAuthenticated: boolean;

  login: (payload: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;

  logout: () => void;

  setUser: (user: User) => void;

  setAccessToken: (token: string) => void;

  setRefreshToken: (token: string) => void;
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
      }) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      setAccessToken: (accessToken) =>
        set({
          accessToken,
        }),

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
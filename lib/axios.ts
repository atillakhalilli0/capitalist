import axios from "axios";

import { env } from "@/config/env";
import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/auth";

const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(
  error: unknown,
  token?: string
) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization =
              `Bearer ${token}`;

            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();

      const response = await axios.post(
        `${env.API_URL}/Auth/refresh`,
        {
          refreshToken,
        }
      );

      const {
        accessToken,
        refreshToken: newRefreshToken,
      } = response.data;

      setTokens(
        accessToken,
        newRefreshToken
      );

      processQueue(null, accessToken);

      originalRequest.headers.Authorization =
        `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(err);

      clearAuth();

      if (typeof window !== "undefined") {
        window.location.href =
          "/admin/login";
      }

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
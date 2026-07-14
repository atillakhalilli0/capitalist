import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

import { useAuthStore } from "@/store/authStore";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5239/api/v1";

class BaseService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // authStore (zustand `persist`) is the single source of truth for the
    // token, saved under the "auth-storage" localStorage key as a JSON
    // blob. Reading a plain "accessToken" key here (as before) never
    // matched anything, so every request after login was unauthenticated.
    this.api.interceptors.request.use((config) => {
      const token = useAuthStore.getState().accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
        }

        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.get<T>(
      url,
      config
    );

    return response.data;
  }

  protected async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.post<T>(
      url,
      data,
      config
    );

    return response.data;
  }

  protected async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.put<T>(
      url,
      data,
      config
    );

    return response.data;
  }

  protected async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.patch<T>(
      url,
      data,
      config
    );

    return response.data;
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.delete<T>(
      url,
      config
    );

    return response.data;
  }
}

export const baseService = new BaseService();
export default BaseService;
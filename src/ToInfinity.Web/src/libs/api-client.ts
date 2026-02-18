import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../config/env";
import { refreshToken } from "../features/auth/api/refresh-token";
import { snackbarEmitter } from "./snackbar-emitter";

interface ProblemDetails {
  title?: string;
  detail?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to unwrap data and handle errors
api.interceptors.response.use(
  (response) => {
    // Unwrap response data for cleaner API
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Don't retry refresh endpoint to prevent infinite loop
    const isRefreshEndpoint = originalRequest?.url?.includes("/auth/refresh");

    // Handle 401 errors with token refresh
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshEndpoint) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token (cookies will be updated by backend)
        await refreshToken();
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to sign in
        window.location.href = "/auth/signin";
        return Promise.reject(refreshError);
      }
    }

    // Show error snackbar for non-401 errors (401 is handled by refresh logic above)
    if (error.response && error.response.status !== 401) {
      const data = error.response.data as ProblemDetails | undefined;
      const message =
        data?.title || data?.detail || "Something went wrong. Please try again.";
      snackbarEmitter.emit(message, "error");
    } else if (!error.response) {
      snackbarEmitter.emit("Network error. Please check your connection.", "error");
    }

    return Promise.reject(error);
  }
);

export default api;

import { api } from "../../../libs/api-client";
import type { User } from "../types";
import { AxiosError } from "axios";

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    return await api.get("/api/auth/me");
  } catch (error) {
    // Return null for 401 (not authenticated) - don't redirect
    if (error instanceof AxiosError && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

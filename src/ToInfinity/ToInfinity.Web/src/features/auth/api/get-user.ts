import { api } from "../../../libs/api-client";
import type { User } from "../types";

export const getCurrentUser = (): Promise<User> => {
  return api.get("/api/auth/me");
};

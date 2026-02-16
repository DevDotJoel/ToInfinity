import { api } from "../../../libs/api-client";

export const refreshToken = (): Promise<{ message: string }> => {
  return api.post("/api/auth/refresh");
};

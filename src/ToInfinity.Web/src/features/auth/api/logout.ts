import { api } from "../../../libs/api-client";

export const logoutUser = (): Promise<{ message: string }> => {
  return api.post("/api/auth/logout");
};

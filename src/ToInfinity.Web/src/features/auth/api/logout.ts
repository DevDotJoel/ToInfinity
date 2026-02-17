import { api } from "../../../libs/api-client";

export const logoutUser = (_?: void): Promise<{ message: string }> => {
  return api.post("/api/auth/logout");
};

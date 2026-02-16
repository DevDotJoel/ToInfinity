import { api } from "../../../libs/api-client";
import type { RegisterRequest, AuthResult } from "../types";

export const registerUser = (data: RegisterRequest): Promise<AuthResult> => {
  return api.post("/api/auth/register", data);
};

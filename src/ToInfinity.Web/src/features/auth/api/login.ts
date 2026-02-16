import { api } from "../../../libs/api-client";
import type { LoginRequest, AuthResult } from "../types";

export const loginWithEmailAndPassword = (
  data: LoginRequest
): Promise<AuthResult> => {
  return api.post("/api/auth/login", data);
};

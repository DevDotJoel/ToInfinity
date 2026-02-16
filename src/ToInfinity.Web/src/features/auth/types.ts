export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResult {
  userId: string;
  message: string;
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  currentPlan: string;
  subscriptionStatus: string;
  subscriptionExpiresAt: string | null;
}

export interface GoogleAuthUrlResponse {
  url: string;
}

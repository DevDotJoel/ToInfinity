// Export pages
export { SignInPage, SignUpPage } from "./pages";

// Export routes
export { AuthRoutes } from "./routes";

// Export hooks
export { useLogin } from "./hooks/use-login";
export { useRegister } from "./hooks/use-register";
export { useLogout } from "./hooks/use-logout";
export { useUser } from "./hooks/use-user";

// Export context
export { AuthProvider, useAuth } from "./context/auth-provider";

// Export types
export type { User, LoginRequest, RegisterRequest, AuthResult } from "./types";

// Export API functions
export { handleGoogleLogin } from "./api/google-auth";

import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../hooks/use-user";
import { AuthContext } from "./auth-context";
import type { AuthContextValue } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const location = useLocation();
  // Only fetch user for protected routes (those under /app)
  const isProtectedRoute = location.pathname.startsWith("/app");
  const { data: user, isLoading } = useUser({ enabled: isProtectedRoute });

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

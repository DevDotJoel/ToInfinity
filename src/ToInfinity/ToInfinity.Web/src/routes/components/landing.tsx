import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth";
import { LoadingFallback } from "../../components/loading-fallback";

export function Landing() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingFallback minHeight="100vh" />;
  }

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, redirect to home
  return <Navigate to="/home" replace />;
}

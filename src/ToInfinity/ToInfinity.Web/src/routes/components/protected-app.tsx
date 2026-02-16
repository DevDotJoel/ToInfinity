import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppLayout } from "../../components/layout/app-layout";
import { LoadingFallback } from "../../components/loading-fallback";
import { useAuth } from "../../features/auth";

export function ProtectedApp() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingFallback minHeight="100vh" />;
  }

  if (!user) {
    return <Navigate replace to="/auth/signin" />;
  }

  return (
    <AppLayout>
      <Suspense fallback={<LoadingFallback minHeight="100vh" />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}

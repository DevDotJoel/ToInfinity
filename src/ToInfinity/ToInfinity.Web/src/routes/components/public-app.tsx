import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { PublicLayout } from "../../components/layout/public-layout";
import { LoadingFallback } from "../../components/loading-fallback";

export function PublicApp() {
  return (
    <PublicLayout>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  );
}

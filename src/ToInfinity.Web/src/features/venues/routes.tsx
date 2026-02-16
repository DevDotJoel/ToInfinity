import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingFallback } from "../../components/loading-fallback";

const VenuesPage = lazy(() => import("./pages/venues-page"));

export const VenuesRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<VenuesPage />} />
      </Routes>
    </Suspense>
  );
};

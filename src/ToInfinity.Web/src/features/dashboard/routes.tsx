import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard-page";

export function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
    </Routes>
  );
}

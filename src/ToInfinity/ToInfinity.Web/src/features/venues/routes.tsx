import { Route, Routes } from "react-router-dom";
import VenuesPage from "./pages/venues-page";

export const VenuesRoutes = () => {
  return (
    <Routes>
      <Route index element={<VenuesPage />} />
    </Routes>
  );
};

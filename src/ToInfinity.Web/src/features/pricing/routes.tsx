import { Route, Routes } from "react-router-dom";
import PricingPage from "./pages/pricing-page";

const PricingRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PricingPage />} />
    </Routes>
  );
};

export default PricingRoutes;

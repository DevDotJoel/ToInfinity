import { Route, Routes } from "react-router-dom";
import PricingPage from "./pages/pricing-page";
import PaymentCancelPage from "./pages/payment-cancel-page";
import PaymentSuccessPage from "./pages/payment-success-page";

const PricingRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PricingPage />} />
      <Route path="cancel" element={<PaymentCancelPage />} />
      <Route path="success" element={<PaymentSuccessPage />} />
    </Routes>
  );
};

export default PricingRoutes;

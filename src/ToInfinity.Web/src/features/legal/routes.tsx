import { Route, Routes } from "react-router-dom";
import { TermsPage, PrivacyPage } from "./pages";

const LegalRoutes = () => {
  return (
    <Routes>
      <Route path="terms" element={<TermsPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
    </Routes>
  );
};

export default LegalRoutes;

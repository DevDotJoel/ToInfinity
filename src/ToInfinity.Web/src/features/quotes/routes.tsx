import { Route, Routes } from "react-router-dom";
import QuotesPage from "./pages/quotes-page";

const QuotesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<QuotesPage />} />
    </Routes>
  );
};

export default QuotesRoutes;

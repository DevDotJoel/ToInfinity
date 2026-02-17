import { Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages";

export const AboutRoutes = () => {
  return (
    <Routes>
      <Route index element={<AboutPage />} />
    </Routes>
  );
};

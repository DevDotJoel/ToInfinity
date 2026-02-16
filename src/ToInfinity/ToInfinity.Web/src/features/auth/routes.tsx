import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
    </Routes>
  );
};

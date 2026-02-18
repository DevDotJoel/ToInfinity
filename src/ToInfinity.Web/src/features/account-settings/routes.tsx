import { Route, Routes } from "react-router-dom";
import AccountSettingsPage from "./pages/account-settings-page";

const AccountSettingsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AccountSettingsPage />} />
    </Routes>
  );
};

export default AccountSettingsRoutes;

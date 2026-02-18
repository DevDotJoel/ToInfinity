import Box from "@mui/material/Box";
import { ProtectedApp } from "./components/protected-app";
import { lazyImport } from "../utils/lazyImport";

const { PricingRoutes } = lazyImport(
  () => import("../features/pricing"),
  "PricingRoutes",
);

const { AccountSettingsRoutes } = lazyImport(
  () => import("../features/account-settings"),
  "AccountSettingsRoutes",
);

export const protectedRoutes = [
  {
    path: "/app",
    element: <ProtectedApp />,
    children: [
      {
        path: "dashboard",
        element: (
          <Box sx={{ p: 4 }}>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
          </Box>
        ),
      },
      {
        path: "pricing/*",
        element: <PricingRoutes />,
      },
      {
        path: "settings/*",
        element: <AccountSettingsRoutes />,
      },
    ],
  },
];

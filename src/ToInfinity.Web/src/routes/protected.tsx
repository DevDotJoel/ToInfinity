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

const { QuotesRoutes } = lazyImport(
  () => import("../features/quotes"),
  "QuotesRoutes",
);

const { DashboardRoutes } = lazyImport(
  () => import("../features/dashboard"),
  "DashboardRoutes",
);

const { MyVenuesRoutes } = lazyImport(
  () => import("../features/venues"),
  "MyVenuesRoutes",
);

export const protectedRoutes = [
  {
    path: "/app",
    element: <ProtectedApp />,
    children: [
      {
        path: "dashboard/*",
        element: <DashboardRoutes />,
      },
      {
        path: "venues/*",
        element: <MyVenuesRoutes />,
      },
      {
        path: "quotes/*",
        element: <QuotesRoutes />,
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

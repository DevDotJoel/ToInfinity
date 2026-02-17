import { Navigate } from "react-router-dom";
import { lazyImport } from "../utils/lazyImport";
import { PublicApp } from "./components/public-app";

const { AuthRoutes } = lazyImport(
  () => import("../features/auth"),
  "AuthRoutes",
);

const { HomeRoutes } = lazyImport(
  () => import("../features/home"),
  "HomeRoutes",
);

const { AboutRoutes } = lazyImport(
  () => import("../features/about"),
  "AboutRoutes",
);

const { LegalRoutes } = lazyImport(
  () => import("../features/legal"),
  "LegalRoutes",
);

const { VenuesRoutes } = lazyImport(
  () => import("../features/venues"),
  "VenuesRoutes",
);

export const publicRoutes = [
  {
    path: "/",
    element: <PublicApp />,
    children: [
      {
        path: "home",
        element: <HomeRoutes />,
      },
      {
        path: "about",
        element: <AboutRoutes />,
      },
      {
        path: "legal/*",
        element: <LegalRoutes />,
      },
      {
        path: "venues",
        element: <VenuesRoutes />,
      },
      {
        path: "auth/*",
        element: <AuthRoutes />,
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

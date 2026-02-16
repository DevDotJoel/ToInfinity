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
        path: "/",
        element: <HomeRoutes />,
      },
      {
        path: "/venues",
        element: <VenuesRoutes />,
      },
      {
        path: "/auth/*",
        element: <AuthRoutes />,
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

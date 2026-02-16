import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import HomePage from "../pages/home-page";
import NotFoundPage from "../pages/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/venues",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>Venues Page - Coming Soon</div>,
      },
    ],
  },
  {
    path: "/catering",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>Catering Page - Coming Soon</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import HomePage from "../pages/home-page";
import VenuesPage from "../pages/venues-page";
import NotFoundPage from "../pages/not-found-page.tsx";

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
        element: <VenuesPage />,
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
    path: "/signin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>Sign In Page - Coming Soon</div>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>Sign Up Page - Coming Soon</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

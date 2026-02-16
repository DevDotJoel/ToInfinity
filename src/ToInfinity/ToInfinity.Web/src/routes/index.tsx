import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import HomePage from "../pages/home-page";
import VenuesPage from "../pages/venues-page";
import SignInPage from "../pages/sign-in-page";
import SignUpPage from "../pages/sign-up-page";
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
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

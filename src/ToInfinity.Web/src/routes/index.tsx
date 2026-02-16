import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { Landing } from "./components/landing";

export const AppRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Landing />,
    },
    ...protectedRoutes,
    ...publicRoutes,
  ]);
  return <>{element}</>;
};

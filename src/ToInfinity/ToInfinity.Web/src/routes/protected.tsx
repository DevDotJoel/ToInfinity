import Box from "@mui/material/Box";
import { ProtectedApp } from "./components/protected-app";

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <ProtectedApp />,
    children: [
      {
        index: true,
        element: (
          <Box sx={{ p: 4 }}>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
          </Box>
        ),
      },
    ],
  },
];

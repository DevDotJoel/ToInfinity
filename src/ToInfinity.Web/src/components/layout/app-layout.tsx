import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import AuthenticatedNavbar from "../navbar/authenticated-navbar";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AuthenticatedNavbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: "56px", sm: "64px" }, // Account for fixed navbar height
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

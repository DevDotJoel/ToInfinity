import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Navbar from "../navbar/navbar";

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
      <Navbar isLoggedIn={true} />
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

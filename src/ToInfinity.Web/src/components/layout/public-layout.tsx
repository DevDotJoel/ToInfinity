import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Navbar from "../navbar/navbar";
import Footer from "./footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar isLoggedIn={false} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: "64px", md: "72px" }, // Match navbar Toolbar minHeight
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

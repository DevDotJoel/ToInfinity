import Box from "@mui/material/Box";
import Navbar from "./navbar";
import Footer from "./footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: "64px", md: "72px" },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

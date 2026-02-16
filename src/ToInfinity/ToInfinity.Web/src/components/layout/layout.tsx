import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "../navbar/navbar";
import Footer from "./footer";

const Layout = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Navbar />
      <Box
        component="main"
        sx={{ width: "100%", pt: { xs: "64px", md: "72px" } }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

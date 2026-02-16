import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "../navbar/navbar";
import Footer from "./footer";

const Layout = () => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Navbar />
      <Box component="main" sx={{ width: "100%" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

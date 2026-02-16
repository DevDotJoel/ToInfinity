import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../components/navbar/navbar";
import HeroSection from "../components/hero/hero-section";
import FeaturedVenues from "../components/featured-venues/featured-venues";
import CateringHighlights from "../components/catering-highlights/catering-highlights";
import HowItWorks from "../components/how-it-works/how-it-works";
import Footer from "../components/layout/footer";

const HomePage = () => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Navbar />
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
      <Box component="main" sx={{ width: "100%" }}>
        <HeroSection />
        <FeaturedVenues />
        <CateringHighlights />
        <HowItWorks />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;

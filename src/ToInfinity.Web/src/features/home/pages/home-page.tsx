import Box from "@mui/material/Box";
import Navbar from "../../../components/navbar/navbar";
import HeroSection from "../../../components/hero/hero-section";
import FeaturedVenues from "../../../components/featured-venues/featured-venues";
import CateringHighlights from "../../../components/catering-highlights/catering-highlights";
import HowItWorks from "../../../components/how-it-works/how-it-works";
import Footer from "../../../components/layout/footer";

const HomePage = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Navbar />
      <Box
        component="main"
        sx={{ width: "100%", pt: { xs: "64px", md: "72px" } }}
      >
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

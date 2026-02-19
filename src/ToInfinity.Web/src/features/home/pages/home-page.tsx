import Box from "@mui/material/Box";
import HeroSection from "../../../components/hero/hero-section";
import FeaturedVenues from "../../../components/featured-venues/featured-venues";
import CateringHighlights from "../../../components/catering-highlights/catering-highlights";
import HowItWorks from "../../../components/how-it-works/how-it-works";

const HomePage = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <HeroSection />
      <FeaturedVenues />
      <CateringHighlights />
      <HowItWorks />
    </Box>
  );
};

export default HomePage;

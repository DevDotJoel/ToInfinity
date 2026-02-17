import Box from "@mui/material/Box";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/layout/footer";
import {
  AboutHero,
  AboutStory,
  AboutStats,
  AboutValues,
  AboutTestimonials,
  AboutCta,
} from "../components";

const AboutPage = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Navbar />
      <Box
        component="main"
        sx={{ width: "100%", pt: { xs: "64px", md: "72px" } }}
      >
        <AboutHero />
        <AboutStory />
        <AboutStats />
        <AboutValues />
        <AboutTestimonials />
        <AboutCta />
      </Box>
      <Footer />
    </Box>
  );
};

export default AboutPage;

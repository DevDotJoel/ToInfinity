import Box from "@mui/material/Box";
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
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutValues />
      <AboutTestimonials />
      <AboutCta />
    </Box>
  );
};

export default AboutPage;

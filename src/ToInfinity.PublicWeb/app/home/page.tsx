import type { Metadata } from "next";
import Box from "@mui/material/Box";
import PublicLayout from "@/components/layout/public-layout";
import HeroSection from "@/components/home/hero-section";
import FeaturedVenues from "@/components/home/featured-venues";
import CateringHighlights from "@/components/home/catering-highlights";
import HowItWorks from "@/components/home/how-it-works";

export const metadata: Metadata = {
  title: "Home - TooInfinity",
  description:
    "Find your perfect wedding venue. Discover stunning venues and connect with the best vendors for your special day.",
};

export default function HomePage() {
  return (
    <PublicLayout>
      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <HeroSection />
        <FeaturedVenues />
        <CateringHighlights />
        <HowItWorks />
      </Box>
    </PublicLayout>
  );
}

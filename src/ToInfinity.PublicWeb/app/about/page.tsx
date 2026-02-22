import type { Metadata } from "next";
import Box from "@mui/material/Box";
import PublicLayout from "@/components/layout/public-layout";
import AboutHero from "@/components/about/about-hero";
import AboutStory from "@/components/about/about-story";
import AboutStats from "@/components/about/about-stats";
import AboutValues from "@/components/about/about-values";
import AboutTestimonials from "@/components/about/about-testimonials";
import AboutCta from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About Us - TooInfinity",
  description:
    "Learn more about TooInfinity and our mission to help couples find their perfect wedding venue.",
};

export default function AboutPage() {
  return (
    <PublicLayout>
      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <AboutHero />
        <AboutStory />
        <AboutStats />
        <AboutValues />
        <AboutTestimonials />
        <AboutCta />
      </Box>
    </PublicLayout>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { getVenue } from "@/lib/api";
import PublicLayout from "@/components/layout/public-layout";
import VenueHero from "@/components/venues/venue-detail/venue-hero";
import VenueAbout from "@/components/venues/venue-detail/venue-about";
import VenueCta from "@/components/venues/venue-detail/venue-cta";
import type { Venue } from "@/types/venue";

// Generate metadata dynamically for SEO and social sharing
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const venue = await getVenue(id);

    return {
      title: `${venue.name} - Wedding Venue | TooInfinity`,
      description:
        venue.description?.substring(0, 160) ||
        `Discover ${venue.name}, a beautiful wedding venue.`,
      openGraph: {
        title: venue.name,
        description: venue.description || "",
        images: venue.mainImageUrl ? [venue.mainImageUrl] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: venue.name,
        description: venue.description || "",
        images: venue.mainImageUrl ? [venue.mainImageUrl] : [],
      },
    };
  } catch {
    return {
      title: "Venue Not Found | TooInfinity",
    };
  }
}

// Fetch venue data server-side using shared API function

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let venue: Venue;
  try {
    venue = await getVenue(id);
  } catch {
    notFound();
  }

  // Use postal code for location display
  const locationLabel = venue.postalCode;

  return (
    <PublicLayout>
      <Box sx={{ bgcolor: "background.default", py: 4 }}>
        <Container maxWidth="lg">
          <Link href="/venues" style={{ textDecoration: "none" }}>
            <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
              Back to Venues
            </Button>
          </Link>

          <VenueHero venue={venue} locationLabel={locationLabel} />
          <VenueAbout venue={venue} />
          <VenueCta />
        </Container>
      </Box>
    </PublicLayout>
  );
}

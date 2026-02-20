import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePublicVenue } from "../hooks";
import { useLocations } from "../../locations";
import {
  VenueHero,
  VenueAbout,
  VenueAmenities,
  VenueSections,
  VenueContactInfo,
  VenueLocationMap,
  VenueCtaBanner,
} from "../components/venue-detail";

export default function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: venue, isLoading, isError } = usePublicVenue(id ?? "");
  const { data: locationsData } = useLocations();

  // Resolve municipalityId → "Municipality, District, Country"
  const locationLabel = useMemo(() => {
    if (!venue || !locationsData) return "";
    for (const country of locationsData.countries) {
      for (const district of country.districts) {
        const municipality = district.municipalities.find(
          (m) => m.id === venue.municipalityId,
        );
        if (municipality) {
          return `${municipality.name}, ${district.name}, ${country.name}`;
        }
      }
    }
    return "";
  }, [venue, locationsData]);

  const handleGetQuote = () => {
    // TODO: implement quote dialog
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress sx={{ color: "secondary.main" }} />
      </Box>
    );
  }

  if (isError || !venue) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Playfair Display', serif",
            color: "primary.main",
            mb: 2,
          }}
        >
          Venue not found
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 3 }}>
          The venue you're looking for doesn't exist or has been removed.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/venues")}
          sx={{
            bgcolor: "secondary.main",
            color: "#fff",
            textTransform: "none",
            "&:hover": { bgcolor: "secondary.dark" },
          }}
        >
          Browse Venues
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* Back button */}
        <Button
          onClick={() => navigate("/venues")}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2, color: "text.secondary", textTransform: "none" }}
        >
          Back to Venues
        </Button>

        {/* Hero: Image + Sidebar */}
        <VenueHero
          venue={venue}
          locationLabel={locationLabel}
          onGetQuote={handleGetQuote}
        />

        {/* Detailed sections */}
        <Box sx={{ mt: 6 }}>
          <VenueAbout description={venue.description} styles={venue.styles} />

          <VenueAmenities amenities={venue.amenities} />

          <VenueSections
            spacesDescription={venue.spacesDescription}
            servicesDescription={venue.servicesDescription}
            gastronomyDescription={venue.gastronomyDescription}
            locationDescription={venue.locationDescription}
          />

          <VenueContactInfo
            phone={venue.phone}
            email={venue.email}
            website={venue.website}
            closingTime={venue.closingTime}
          />

          <VenueLocationMap
            latitude={venue.latitude}
            longitude={venue.longitude}
            locationLabel={locationLabel}
            venueName={venue.name}
            street={venue.street}
            postalCode={venue.postalCode}
          />

          <VenueCtaBanner venueName={venue.name} onGetQuote={handleGetQuote} />
        </Box>
      </Container>
    </Box>
  );
}

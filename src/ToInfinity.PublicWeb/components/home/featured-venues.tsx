import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import type { Venue } from "@/types/venue";

// Mock data for featured venues
const mockVenues: Venue[] = [
  {
    id: "1",
    userId: "",
    name: "The Grand Ballroom Estate",
    description:
      "An elegant ballroom featuring crystal chandeliers, marble floors, and floor-to-ceiling windows with stunning city views. Perfect for luxurious wedding celebrations.",
    venueType: 1,
    street: "123 Luxury Drive",
    postalCode: "Beverly Hills, CA 90210",
    municipalityId: 1,
    minCapacity: 100,
    maxCapacity: 350,
    pricePerPerson: 150,
    rentalPrice: 15000,
    mainImageUrl: "",
    styles: 0,
    amenities: 0,
    spacesDescription: null,
    servicesDescription: null,
    gastronomyDescription: null,
    locationDescription: null,
    latitude: null,
    longitude: null,
    phone: null,
    email: null,
    website: null,
    closingTime: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "",
    name: "Rustic Barn Retreat",
    description:
      "A charming rustic barn surrounded by vineyards, offering an authentic countryside experience with modern amenities and breathtaking sunset views.",
    venueType: 2,
    street: "456 Vineyard Lane",
    postalCode: "Napa Valley, CA 94558",
    municipalityId: 2,
    minCapacity: 50,
    maxCapacity: 200,
    pricePerPerson: 125,
    rentalPrice: 8500,
    mainImageUrl: "",
    styles: 0,
    amenities: 0,
    spacesDescription: null,
    servicesDescription: null,
    gastronomyDescription: null,
    locationDescription: null,
    latitude: null,
    longitude: null,
    phone: null,
    email: null,
    website: null,
    closingTime: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "",
    name: "Oceanview Beach Club",
    description:
      "Experience the magic of a beachfront celebration with pristine white sands, crystal-clear waters, and spectacular Pacific Ocean sunsets.",
    venueType: 3,
    street: "789 Pacific Coast Highway",
    postalCode: "Malibu, CA 90265",
    municipalityId: 3,
    minCapacity: 80,
    maxCapacity: 250,
    pricePerPerson: 200,
    rentalPrice: 20000,
    mainImageUrl: "",
    styles: 0,
    amenities: 0,
    spacesDescription: null,
    servicesDescription: null,
    gastronomyDescription: null,
    locationDescription: null,
    latitude: null,
    longitude: null,
    phone: null,
    email: null,
    website: null,
    closingTime: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface FeaturedVenuesProps {
  venues?: Venue[];
}

export default function FeaturedVenues({
  venues = mockVenues,
}: FeaturedVenuesProps) {
  const featured = venues.slice(0, 3);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              letterSpacing: "0.08em",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            Handpicked For You
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.8rem" },
              color: "primary.main",
              mt: 1,
              mb: 2,
            }}
          >
            Featured Venues
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 560,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Explore our most sought-after wedding venues, each offering a unique
            atmosphere for your special day.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {featured.map((venue) => (
            <Link
              key={venue.id}
              href={`/venues/${venue.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardActionArea
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 240,
                      overflow: "hidden",
                      bgcolor: "grey.200",
                      backgroundImage: venue.mainImageUrl
                        ? `url(${venue.mainImageUrl})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        color: "primary.main",
                        mb: 0.5,
                        fontSize: "1.1rem",
                      }}
                    >
                      {venue.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 1,
                      }}
                    >
                      <LocationOnIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {venue.postalCode}
                      </Typography>
                    </Box>
                    {venue.maxCapacity && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <PeopleIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Up to {venue.maxCapacity} guests
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </Box>

        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Link href="/venues" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: "secondary.main",
                color: "secondary.main",
                px: 4,
                py: 1.2,
                fontSize: "0.95rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderColor: "secondary.dark",
                  bgcolor: "rgba(196, 114, 78, 0.04)",
                },
              }}
            >
              View All Venues
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { venues } from "../../lib/data";

const FeaturedVenues = () => {
  const featured = venues.slice(0, 3);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            HANDPICKED FOR YOU
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
            <Card
              key={venue.id}
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
                component={RouterLink}
                to={`/venues/${venue.id}`}
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h4" sx={{ color: "grey.400" }}>
                    {venue.type}
                  </Typography>
                  <Chip
                    label={venue.type}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "rgba(255,255,255,0.92)",
                      color: "primary.main",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
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
                      {venue.location}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <Rating
                      value={venue.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {venue.rating} ({venue.reviewCount})
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PeopleIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Up to {venue.capacity}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, color: "secondary.main" }}
                    >
                      ${venue.price.toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/venues"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              px: 4,
              "&:hover": {
                borderColor: "secondary.main",
                color: "secondary.main",
                bgcolor: "rgba(196, 114, 78, 0.04)",
              },
            }}
          >
            View All Venues
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedVenues;

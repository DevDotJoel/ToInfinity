import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import GroupIcon from "@mui/icons-material/Group";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Mock data for catering services (until backend API is ready)
const catering = [
  {
    id: "1",
    name: "Elegance Fine Dining",
    rating: 4.9,
    reviewCount: 203,
    specialties: ["Truffle Risotto", "Pan-seared Sea Bass"],
    minGuests: 50,
    pricePerHead: 150,
  },
  {
    id: "2",
    name: "Harvest Table Catering",
    rating: 4.8,
    reviewCount: 167,
    specialties: ["Seasonal Salads", "Herb-roasted Chicken"],
    minGuests: 30,
    pricePerHead: 95,
  },
  {
    id: "3",
    name: "Sugar Bloom Desserts",
    rating: 4.9,
    reviewCount: 241,
    specialties: ["Custom Wedding Cakes", "Macaron Towers"],
    minGuests: 20,
    pricePerHead: 45,
  },
];

export default function CateringHighlights() {
  const featured = catering.slice(0, 3);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
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
            Exquisite Cuisine
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
            Catering Services
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
            From fine dining to rustic farm-to-table, find the perfect culinary
            experience for your guests.
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
          {featured.map((item) => (
            <Link
              key={item.id}
              href={`/catering/${item.id}`}
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ color: "grey.400", textAlign: "center", px: 2 }}
                    >
                      {item.specialties[0]}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        color: "primary.main",
                        mb: 1,
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1.5,
                      }}
                    >
                      <Rating
                        value={item.rating}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.rating} ({item.reviewCount})
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        mb: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.specialties.map((specialty, index) => (
                        <Chip
                          key={index}
                          label={specialty}
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            height: 24,
                            bgcolor: "rgba(196, 114, 78, 0.08)",
                            color: "secondary.dark",
                          }}
                        />
                      ))}
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
                        <GroupIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Min. {item.minGuests} guests
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: "secondary.main" }}
                      >
                        ${item.pricePerHead}/head
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </Box>

        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Link href="/catering" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                px: 4,
                textTransform: "none",
                "&:hover": {
                  borderColor: "secondary.main",
                  color: "secondary.main",
                  bgcolor: "rgba(196, 114, 78, 0.04)",
                },
              }}
            >
              View All Catering
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

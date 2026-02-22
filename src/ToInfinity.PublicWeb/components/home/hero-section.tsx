import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "85vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        backgroundImage: "url(/weddingbackground.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 720, color: "white" }}>
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255, 255, 255, 0.95)",
              letterSpacing: "0.08em",
              fontSize: "0.8rem",
              fontWeight: 600,
              mb: 2,
              display: "block",
            }}
          >
            Wedding Venues & Catering
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: 700,
              lineHeight: 1.15,
              mb: 3,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Your perfect day deserves a perfect place
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", md: "1.15rem" },
              fontWeight: 400,
              lineHeight: 1.6,
              mb: 4,
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: 580,
            }}
          >
            Discover handpicked wedding venues and exceptional catering services
            to create the celebration of your dreams.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Link href="/venues" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Explore Venues
            </Button>
            </Link>
            <a href={`${APP_URL}/auth/signup`} style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderWidth: 2,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderWidth: 2,
                  },
                }}
              >
                Find Your Venue
              </Button>
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const AboutCta = () => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        py: { xs: 6, md: 8 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <FavoriteIcon sx={{ color: "#fff", fontSize: 32, mb: 2 }} />
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: "#fff",
            fontSize: { xs: "1.5rem", md: "2rem" },
            mb: 1.5,
          }}
        >
          Ready to start planning?
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "1rem",
            lineHeight: 1.6,
            mb: 3.5,
          }}
        >
          Browse hundreds of curated venues and catering services across
          Portugal, and request a free personalised quote today.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            component={Link}
            to="/venues"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "#fff",
              color: "secondary.main",
              fontWeight: 700,
              px: 3.5,
              py: 1.3,
              fontSize: "0.95rem",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            Explore Venues
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/venues"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: "rgba(255,255,255,0.5)",
              color: "#fff",
              fontWeight: 600,
              px: 3.5,
              py: 1.3,
              fontSize: "0.95rem",
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            View Catering
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutCta;

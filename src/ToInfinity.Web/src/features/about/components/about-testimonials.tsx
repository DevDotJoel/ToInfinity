import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  {
    quote:
      "ToInfinity made planning our wedding so much easier. We found our dream venue in Sintra within a week and the quote process was seamless.",
    name: "Ana & Pedro",
    location: "Lisbon",
  },
  {
    quote:
      "The team was incredibly helpful and responsive. They understood exactly what we were looking for and connected us with the perfect caterer.",
    name: "Maria & Tiago",
    location: "Porto",
  },
  {
    quote:
      "We were overwhelmed with options until we found ToInfinity. The filters and honest pricing made it easy to compare and decide.",
    name: "Sara & Miguel",
    location: "Algarve",
  },
];

const AboutTestimonials = () => {
  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: "0.8rem",
              mb: 1,
              display: "block",
            }}
          >
            Happy Couples
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: "text.primary",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            What our couples say
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {testimonials.map((t) => (
            <Box
              key={t.name}
              sx={{
                flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" },
              }}
            >
              <Box
                sx={{
                  p: 4,
                  bgcolor: "background.paper",
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <FormatQuoteIcon
                  sx={{
                    color: "rgba(196,114,78,0.15)",
                    fontSize: 40,
                    mb: 1,
                  }}
                />
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    flex: 1,
                    mb: 3,
                  }}
                >
                  {t.quote}
                </Typography>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      fontSize: "0.92rem",
                    }}
                  >
                    {t.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.4,
                      mt: 0.3,
                    }}
                  >
                    <LocationOnIcon
                      sx={{
                        color: "secondary.main",
                        fontSize: 14,
                      }}
                    />
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.8rem",
                      }}
                    >
                      {t.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AboutTestimonials;

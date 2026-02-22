"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const values = [
  {
    icon: <VerifiedIcon sx={{ fontSize: 28 }} />,
    title: "Curated Quality",
    description:
      "Every venue and caterer is personally vetted by our team. We visit each location and taste the menus, so you only see the best.",
  },
  {
    icon: <HandshakeIcon sx={{ fontSize: 28 }} />,
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprises. We show real per-person pricing upfront so you can plan your budget with confidence.",
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 28 }} />,
    title: "Personal Support",
    description:
      "Our team is with you from the first search to the final toast. Got questions? We respond within 24 hours.",
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
    title: "Local Expertise",
    description:
      "We know Portugal inside out. From the Algarve coast to the Douro Valley, we connect you with the finest local venues.",
  },
];

export default function AboutValues() {
  return (
    <Box sx={{ bgcolor: "background.paper", py: { xs: 7, md: 10 } }}>
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
            Why ToInfinity
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
            What makes us different
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {values.map((value) => (
            <Box
              key={value.title}
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 12px)",
                  md: "1 1 calc(25% - 18px)",
                },
              }}
            >
              <Box
                sx={{
                  p: 3.5,
                  borderRadius: 3,
                  bgcolor: "background.default",
                  height: "100%",
                  transition: "box-shadow 0.25s, transform 0.25s",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(61,47,37,0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2,
                    bgcolor: "rgba(196,114,78,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "secondary.main",
                    mb: 2.5,
                  }}
                >
                  {value.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: "1.05rem",
                    mb: 1,
                  }}
                >
                  {value.title}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                  }}
                >
                  {value.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

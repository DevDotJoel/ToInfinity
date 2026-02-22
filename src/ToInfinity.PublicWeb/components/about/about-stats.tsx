"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const stats = [
  { value: "500+", label: "Venues Listed" },
  { value: "12,000+", label: "Couples Served" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24h", label: "Avg. Response Time" },
];

export default function AboutStats() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        py: { xs: 5, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {stats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                flex: {
                  xs: "1 1 calc(50% - 12px)",
                  md: "1 1 calc(25% - 18px)",
                },
                textAlign: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: "secondary.main",
                  fontSize: { xs: "1.8rem", md: "2.4rem" },
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: { xs: "0.82rem", md: "0.92rem" },
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface LegalHeroProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
}

export default function LegalHero({
  title,
  subtitle,
  lastUpdated,
}: LegalHeroProps) {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.5rem" },
            mb: 2,
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              color: "rgba(247, 243, 240, 0.8)",
              textAlign: "center",
              mb: 2,
            }}
          >
            {subtitle}
          </Typography>
        )}
        {lastUpdated && (
          <Typography
            variant="body2"
            sx={{
              color: "rgba(247, 243, 240, 0.6)",
              textAlign: "center",
            }}
          >
            Last updated: {lastUpdated}
          </Typography>
        )}
      </Container>
    </Box>
  );
}

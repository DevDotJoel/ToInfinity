import { Box, Chip, Container, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PricingHeaderProps {
  title: string;
  subtitle: string | ReactNode;
  badge: string;
}

const PricingHeader = ({ title, subtitle, badge }: PricingHeaderProps) => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        pt: { xs: 10, md: 14 },
        pb: { xs: 6, md: 8 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Chip
          label={badge}
          sx={{
            bgcolor: "rgba(196, 114, 78, 0.2)",
            color: "secondary.light",
            fontWeight: 600,
            fontSize: "0.8rem",
            mb: 2.5,
            height: 28,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.8rem" },
            mb: 1.5,
            lineHeight: 1.2,
            color: "#f7f3f0",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "1.15rem" },
            color: "rgba(247, 243, 240, 0.7)",
            maxWidth: 520,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </Typography>
      </Container>
    </Box>
  );
};

export default PricingHeader;

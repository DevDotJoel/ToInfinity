import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { TrustItem } from "../types";

interface TrustSectionProps {
  title: string | ReactNode;
  items: TrustItem[];
}

const TrustSection = ({ title, items }: TrustSectionProps) => {
  return (
    <Box
      sx={{
        mt: 6,
        p: { xs: 3, md: 4 },
        bgcolor: "primary.main",
        borderRadius: 3,
        color: "primary.contrastText",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontWeight: 700,
          mb: 3,
          textAlign: "center",
          color: "#f7f3f0",
          fontSize: { xs: "1.3rem", md: "1.5rem" },
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {items.map((item) => (
          <Box key={item.title} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.15rem",
                mb: 0.5,
                color: "secondary.light",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(247, 243, 240, 0.65)",
                fontSize: "0.85rem",
                lineHeight: 1.5,
              }}
            >
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TrustSection;

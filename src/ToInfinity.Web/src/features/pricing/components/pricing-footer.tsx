import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { ReactNode } from "react";

interface PricingFooterProps {
  title: string;
  description: string | ReactNode;
}

const PricingFooter = ({ title, description }: PricingFooterProps) => {
  return (
    <Box
      sx={{
        mt: 5,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
        <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: 17 }} />
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            fontSize: "0.85rem",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontSize: "0.85rem",
          lineHeight: 1.7,
          maxWidth: 480,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default PricingFooter;

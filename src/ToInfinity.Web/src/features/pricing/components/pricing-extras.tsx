import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import type { PricingPlanExtras } from "../types";

interface PricingExtrasProps {
  extras: PricingPlanExtras;
}

const PricingExtras = ({ extras }: PricingExtrasProps) => {
  return (
    <Box
      sx={{
        mt: 2.5,
        p: 2,
        borderRadius: 2,
        border: "1px dashed",
        borderColor: "secondary.main",
        bgcolor: "rgba(196, 114, 78, 0.04)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.8 }}>
        <AddCircleOutlineIcon sx={{ color: "secondary.main", fontSize: 18 }} />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: "secondary.dark",
            fontSize: "0.88rem",
          }}
        >
          {extras.label}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontSize: "0.82rem", ml: 3.2 }}
      >
        {extras.price}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontSize: "0.8rem", ml: 3.2, mt: 0.3 }}
      >
        {extras.note}
      </Typography>
    </Box>
  );
};

export default PricingExtras;

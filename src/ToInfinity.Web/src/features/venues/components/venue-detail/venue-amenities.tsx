import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { VenueAmenityLabels, AllVenueAmenities, hasFlag } from "../../types";

interface VenueAmenitiesProps {
  amenities: number;
}

export const VenueAmenities = ({ amenities }: VenueAmenitiesProps) => {
  const activeAmenities = AllVenueAmenities.filter((a) =>
    hasFlag(amenities, a),
  );

  if (activeAmenities.length === 0) return null;

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: "primary.main",
          fontSize: { xs: "1.15rem", md: "1.3rem" },
          mb: 2.5,
        }}
      >
        Amenities
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
        {activeAmenities.map((a) => (
          <Chip
            key={a}
            icon={
              <CheckCircleIcon
                sx={{
                  fontSize: "16px !important",
                  color: "#2e7d32 !important",
                }}
              />
            }
            label={VenueAmenityLabels[a]}
            variant="outlined"
            sx={{
              borderColor: "rgba(61,47,37,0.12)",
              fontSize: "0.85rem",
              py: 0.5,
              height: 36,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

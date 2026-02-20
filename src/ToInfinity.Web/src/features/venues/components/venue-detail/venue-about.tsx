import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { VenueStyleLabels, AllVenueStyles, hasFlag } from "../../types";

interface VenueAboutProps {
  description: string;
  styles: number;
}

export const VenueAbout = ({ description, styles }: VenueAboutProps) => {
  const activeStyles = AllVenueStyles.filter((s) => hasFlag(styles, s));

  return (
    <Box sx={{ mb: 5 }}>
      <SectionHeader title="About This Venue" />
      <Typography
        sx={{
          color: "text.secondary",
          lineHeight: 1.8,
          fontSize: { xs: "0.92rem", md: "1rem" },
          mb: 2.5,
        }}
      >
        {description}
      </Typography>
      {activeStyles.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {activeStyles.map((s) => (
            <Chip
              key={s}
              label={VenueStyleLabels[s]}
              size="small"
              sx={{
                bgcolor: "rgba(196,114,78,0.08)",
                color: "secondary.dark",
                fontWeight: 600,
                fontSize: "0.8rem",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

function SectionHeader({ title }: { title: string }) {
  return (
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
      {title}
    </Typography>
  );
}

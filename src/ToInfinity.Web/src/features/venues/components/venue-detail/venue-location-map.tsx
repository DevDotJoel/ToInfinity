import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface VenueLocationMapProps {
  latitude: number | null;
  longitude: number | null;
  locationLabel: string;
  venueName: string;
  street: string;
  postalCode: string;
}

export const VenueLocationMap = ({
  latitude,
  longitude,
  locationLabel,
  venueName,
  street,
  postalCode,
}: VenueLocationMapProps) => {
  if (!latitude || !longitude) return null;

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
        Location
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <LocationOnIcon
                sx={{ fontSize: 20, color: "secondary.main", mt: 0.2 }}
              />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    fontSize: "0.95rem",
                  }}
                >
                  {venueName}
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", fontSize: "0.88rem" }}
                >
                  {street}
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", fontSize: "0.88rem" }}
                >
                  {postalCode}
                </Typography>
                {locationLabel && (
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.88rem",
                      mt: 0.5,
                    }}
                  >
                    {locationLabel}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(61,47,37,0.08)",
              height: { xs: 220, md: 300 },
            }}
          >
            <iframe
              title={`Map of ${venueName}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
              allowFullScreen
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

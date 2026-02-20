import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { Venue } from "../../types";
import {
  VenueTypeLabels,
  VenueStyleLabels,
  VenueAmenityLabels,
  AllVenueStyles,
  AllVenueAmenities,
  hasFlag,
} from "../../types";

interface VenueHeroProps {
  venue: Venue;
  locationLabel: string;
  onGetQuote: () => void;
}

export const VenueHero = ({
  venue,
  locationLabel,
  onGetQuote,
}: VenueHeroProps) => {
  const activeStyles = AllVenueStyles.filter((s) => hasFlag(venue.styles, s));
  const activeAmenities = AllVenueAmenities.filter((a) =>
    hasFlag(venue.amenities, a),
  );

  return (
    <Grid container spacing={4}>
      {/* Image */}
      <Grid size={{ xs: 12, md: 7 }}>
        <Box
          sx={{
            position: "relative",
            height: { xs: 260, sm: 360, md: 440 },
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "grey.200",
          }}
        >
          {venue.mainImageUrl ? (
            <img
              src={venue.mainImageUrl}
              alt={venue.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.disabled" }}>
                No image available
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>

      {/* Sidebar */}
      <Grid size={{ xs: 12, md: 5 }}>
        {/* Type + Style chips */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={VenueTypeLabels[venue.venueType] ?? "Venue"}
            size="small"
            sx={{
              bgcolor: "secondary.main",
              color: "#fff",
              fontWeight: 600,
            }}
          />
          {activeStyles.slice(0, 2).map((s) => (
            <Chip
              key={s}
              label={VenueStyleLabels[s]}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "rgba(61,47,37,0.2)",
                fontSize: "0.78rem",
              }}
            />
          ))}
        </Box>

        {/* Name */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "primary.main",
            fontSize: { xs: "1.5rem", md: "2rem" },
            mb: 1,
          }}
        >
          {venue.name}
        </Typography>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {locationLabel || venue.postalCode}
          </Typography>
        </Box>

        {/* Rating (visual placeholder) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Rating value={4.5} precision={0.1} size="medium" readOnly />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            4.5 (0 reviews)
          </Typography>
        </Box>

        {/* Capacity */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: { xs: 1, md: 3 },
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PeopleIcon sx={{ fontSize: 20, color: "secondary.main" }} />
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
            >
              {venue.minCapacity}–{venue.maxCapacity} guests
            </Typography>
          </Box>
          {hasFlag(venue.amenities, 1 << 4) && (
            <Chip
              label="Exclusive venue"
              size="small"
              sx={{
                bgcolor: "rgba(46,125,50,0.08)",
                color: "#2e7d32",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>

        {/* Description excerpt */}
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.7,
            mb: 3,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {venue.description}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Amenities preview */}
        {activeAmenities.length > 0 && (
          <>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                color: "primary.main",
                mb: 1.5,
                fontSize: "1rem",
              }}
            >
              Amenities
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {activeAmenities.map((a) => (
                <Chip
                  key={a}
                  icon={
                    <CheckCircleIcon sx={{ fontSize: "16px !important" }} />
                  }
                  label={VenueAmenityLabels[a]}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(61,47,37,0.15)",
                    fontSize: "0.8rem",
                  }}
                />
              ))}
            </Box>
            <Divider sx={{ mb: 3 }} />
          </>
        )}

        {/* Pricing CTA */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "rgba(196,114,78,0.06)",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "rgba(196,114,78,0.15)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "secondary.main",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {venue.pricePerPerson}€
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              per person
            </Typography>
            {venue.rentalPrice && (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", ml: 1 }}
              >
                + {venue.rentalPrice}€ rental
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onGetQuote}
            sx={{
              bgcolor: "secondary.main",
              color: "#fff",
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "secondary.dark" },
            }}
          >
            Get a Quote
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

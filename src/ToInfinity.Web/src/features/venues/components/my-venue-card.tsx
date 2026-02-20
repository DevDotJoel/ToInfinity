import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EuroIcon from "@mui/icons-material/Euro";
import type { Venue } from "../types";
import { getVenueDetailUrl } from "../utils/venue-url";

interface MyVenueCardProps {
  venue: Venue;
}

export const MyVenueCard = ({ venue }: MyVenueCardProps) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid rgba(61,47,37,0.06)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          overflow: "hidden",
          transition: "box-shadow 0.2s, border-color 0.2s",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            borderColor: "rgba(196,114,78,0.15)",
          },
        }}
      >
        {/* Image */}
        <Box sx={{ position: "relative", height: 180 }}>
          <Box
            component="img"
            src={venue.mainImageUrl}
            alt={venue.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Status badge */}
          <Chip
            label="Active"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "rgba(46,125,50,0.9)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.72rem",
              height: 24,
            }}
          />
          {/* Actions overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "flex",
              gap: 0.5,
            }}
          >
            <Tooltip title="Edit venue">
              <IconButton
                size="small"
                component={RouterLink}
                to={`/app/venues/${venue.id}/edit`}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                <EditIcon sx={{ fontSize: 17, color: "primary.main" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View listing">
              <IconButton
                size="small"
                component={RouterLink}
                to={getVenueDetailUrl(venue.id, venue.name)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                <OpenInNewIcon sx={{ fontSize: 17, color: "primary.main" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2.5 }}>
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "primary.main",
              fontSize: "1.1rem",
              mb: 0.5,
            }}
          >
            {venue.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
              <LocationOnIcon sx={{ fontSize: 15, color: "text.secondary" }} />
              <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>
                {venue.postalCode}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
              <PeopleIcon sx={{ fontSize: 15, color: "text.secondary" }} />
              <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>
                Up to {venue.maxCapacity}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Stats row */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                py: 1,
                borderRadius: 2,
                bgcolor: "rgba(196,114,78,0.06)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  mb: 0.3,
                }}
              >
                <EuroIcon sx={{ fontSize: 16, color: "secondary.main" }} />
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "secondary.main",
                  }}
                >
                  {venue.pricePerPerson}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
                Per Person
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                py: 1,
                borderRadius: 2,
                bgcolor: "rgba(61,47,37,0.04)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "primary.main",
                  mb: 0.3,
                }}
              >
                {venue.maxCapacity}
              </Typography>
              <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
                Guests
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

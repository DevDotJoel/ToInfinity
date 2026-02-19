import { memo } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Venue } from "../types";

interface VenueGridCardProps {
  venue: Venue;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

export const VenueGridCard = memo(
  ({ venue, isFavorite, onFavoriteToggle }: VenueGridCardProps) => {
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: 200,
            overflow: "hidden",
            bgcolor: "grey.200",
          }}
        >
          <CardActionArea
            component={RouterLink}
            to={`/venues/${venue.id}`}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {venue.mainImageUrl ? (
              <img
                src={venue.mainImageUrl}
                alt={venue.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Typography variant="body2" sx={{ color: "text.disabled" }}>
                No image
              </Typography>
            )}
          </CardActionArea>
          <IconButton
            onClick={() => onFavoriteToggle(venue.id)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              width: 32,
              height: 32,
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "#e74c3c", fontSize: 18 }} />
            ) : (
              <FavoriteBorderIcon
                sx={{ color: "text.secondary", fontSize: 18 }}
              />
            )}
          </IconButton>
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 2, "&:last-child": { pb: 2 } }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to={`/venues/${venue.id}`}
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              color: "primary.main",
              fontSize: "1rem",
              textDecoration: "none",
              "&:hover": { color: "secondary.main" },
              display: "block",
              mb: 0.3,
            }}
          >
            {venue.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
            <LocationOnIcon sx={{ color: "text.secondary", fontSize: 14 }} />
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.78rem" }}
            >
              {venue.postalCode}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              mb: 1.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                fontSize: "0.88rem",
              }}
            >
              €{venue.pricePerPerson} / person
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
              <PeopleIcon sx={{ color: "text.secondary", fontSize: 15 }} />
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontSize: "0.75rem" }}
              >
                {venue.capacity}
              </Typography>
            </Box>
          </Box>
          <Button
            component={RouterLink}
            to={`/venues/${venue.id}`}
            variant="contained"
            fullWidth
            size="small"
            sx={{
              bgcolor: "secondary.main",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.8rem",
              py: 0.7,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: "secondary.dark" },
            }}
          >
            Get a Quote
          </Button>
        </CardContent>
      </Card>
    );
  },
);

VenueGridCard.displayName = "VenueGridCard";

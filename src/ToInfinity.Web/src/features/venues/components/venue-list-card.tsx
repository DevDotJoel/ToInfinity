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
import EuroIcon from "@mui/icons-material/Euro";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Venue } from "../types";
import { getVenueDetailUrl } from "../utils/venue-url";

interface VenueListCardProps {
  venue: Venue;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

export const VenueListCard = memo(
  ({ venue, isFavorite, onFavoriteToggle }: VenueListCardProps) => {
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          overflow: "hidden",
          transition: "box-shadow 0.25s ease",
          "&:hover": {
            boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: 300 },
            minHeight: { xs: 200, sm: 240 },
            flexShrink: 0,
            overflow: "hidden",
            bgcolor: "grey.200",
          }}
        >
          <CardActionArea
            component={RouterLink}
            to={getVenueDetailUrl(venue.id, venue.name)}
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
          {/* Favorite button */}
          <IconButton
            onClick={() => onFavoriteToggle(venue.id)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              width: 36,
              height: 36,
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "#e74c3c", fontSize: 20 }} />
            ) : (
              <FavoriteBorderIcon
                sx={{ color: "text.secondary", fontSize: 20 }}
              />
            )}
          </IconButton>
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: { xs: 2, sm: 2.5 },
            "&:last-child": { pb: { xs: 2, sm: 2.5 } },
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 1,
                mb: 0.5,
              }}
            >
              <Typography
                variant="h6"
                component={RouterLink}
                to={getVenueDetailUrl(venue.id, venue.name)}
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  color: "primary.main",
                  fontSize: { xs: "1.05rem", sm: "1.15rem" },
                  textDecoration: "none",
                  "&:hover": { color: "secondary.main" },
                  lineHeight: 1.3,
                }}
              >
                {venue.name}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}
            >
              <LocationOnIcon sx={{ color: "text.secondary", fontSize: 16 }} />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.85rem" }}
              >
                {venue.postalCode}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
                fontSize: "0.88rem",
                mb: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {venue.description}
            </Typography>
          </Box>

          {/* Bottom row: price, capacity, rating, CTA */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1.5,
              pt: 1.5,
              borderTop: "1px solid",
              borderColor: "rgba(61,47,37,0.06)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <EuroIcon sx={{ color: "secondary.main", fontSize: 17 }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    fontSize: "0.9rem",
                  }}
                >
                  €{venue.pricePerPerson} / person
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <PeopleIcon sx={{ color: "text.secondary", fontSize: 17 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "0.85rem" }}
                >
                  {venue.minCapacity}–{venue.maxCapacity} guests
                </Typography>
              </Box>
            </Box>

            <Button
              component={RouterLink}
              to={getVenueDetailUrl(venue.id, venue.name)}
              variant="contained"
              size="small"
              sx={{
                bgcolor: "secondary.main",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.82rem",
                px: 2.5,
                py: 0.8,
                borderRadius: 2,
                whiteSpace: "nowrap",
                textTransform: "none",
                "&:hover": { bgcolor: "secondary.dark" },
              }}
            >
              Get a Quote
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  },
);

VenueListCard.displayName = "VenueListCard";

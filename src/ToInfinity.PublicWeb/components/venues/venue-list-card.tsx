"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
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
import type { Venue } from "@/types/venue";

interface VenueListCardProps {
  venue: Venue;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

export const VenueListCard = memo(
  ({ venue, isFavorite, onFavoriteToggle }: VenueListCardProps) => {
    const getVenueUrl = (id: string, name: string) => {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return `/venues/${id}/${slug}`;
    };

    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          overflow: "hidden",
          mb: 3,
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
            height: { xs: 200, sm: 240 },
            flexShrink: 0,
            overflow: "hidden",
            bgcolor: "grey.200",
          }}
        >
          <Link href={getVenueUrl(venue.id, venue.name)} style={{ display: "block", height: "100%" }}>
            <CardActionArea
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
            {venue.mainImageUrl ? (
              <Image
                src={venue.mainImageUrl}
                alt={venue.name}
                fill
                sizes="(max-width: 600px) 100vw, 300px"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Typography variant="body2" sx={{ color: "text.disabled" }}>
                No image
              </Typography>
            )}
            </CardActionArea>
          </Link>
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
              <Link
                href={getVenueUrl(venue.id, venue.name)}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    color: "primary.main",
                    fontSize: { xs: "1.05rem", sm: "1.15rem" },
                    "&:hover": { color: "secondary.main" },
                    lineHeight: 1.3,
                  }}
                >
                  {venue.name}
                </Typography>
              </Link>
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
                mb: 2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.6,
              }}
            >
              {venue.description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <EuroIcon sx={{ color: "secondary.main", fontSize: 18 }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "primary.main" }}
                >
                  €{venue.pricePerPerson} / person
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <PeopleIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "0.9rem" }}
                >
                  {venue.minCapacity}–{venue.maxCapacity} guests
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Link
              href={getVenueUrl(venue.id, venue.name)}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "secondary.main",
                    bgcolor: "rgba(196,114,78,0.04)",
                  },
                }}
              >
                View Details
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    );
  },
);

VenueListCard.displayName = "VenueListCard";

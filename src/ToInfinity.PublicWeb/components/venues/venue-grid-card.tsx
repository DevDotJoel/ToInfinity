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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Venue } from "@/types/venue";

interface VenueGridCardProps {
  venue: Venue;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

export const VenueGridCard = memo(
  ({ venue, isFavorite, onFavoriteToggle }: VenueGridCardProps) => {
    const getVenueUrl = (id: string, name: string) => {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return `/venues/${id}/${slug}`;
    };

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
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Typography variant="body2" sx={{ color: "text.disabled" }}>
                No image
              </Typography>
            )}
            </CardActionArea>
          </Link>
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
                fontSize: "1rem",
                "&:hover": { color: "secondary.main" },
                display: "block",
                mb: 0.3,
              }}
            >
              {venue.name}
            </Typography>
          </Link>
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
                {venue.minCapacity}–{venue.maxCapacity}
              </Typography>
            </Box>
          </Box>
          <Link
            href={getVenueUrl(venue.id, venue.name)}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                fontSize: "0.8rem",
                py: 0.5,
                "&:hover": {
                  borderColor: "secondary.main",
                  bgcolor: "rgba(196,114,78,0.04)",
                },
              }}
            >
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  },
);

VenueGridCard.displayName = "VenueGridCard";

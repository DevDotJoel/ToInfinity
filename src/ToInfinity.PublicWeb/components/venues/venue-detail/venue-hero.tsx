"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import type { Venue } from "@/types/venue";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface VenueHeroProps {
  venue: Venue;
  locationLabel: string;
}

export default function VenueHero({ venue, locationLabel }: VenueHeroProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 400,
            bgcolor: "background.default",
            borderRadius: 2,
            overflow: "hidden",
            backgroundImage: venue.mainImageUrl
              ? `url(${venue.mainImageUrl})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 2,
            height: "100%",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            {venue.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              color: "text.secondary",
            }}
          >
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography variant="body1">{locationLabel}</Typography>
          </Box>

          {venue.maxCapacity && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                color: "text.secondary",
              }}
            >
              <PeopleIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                {venue.minCapacity && `${venue.minCapacity} - `}
                {venue.maxCapacity} guests
              </Typography>
            </Box>
          )}

          <a href={`${APP_URL}/auth/signin`} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              sx={{ mb: 2 }}
            >
              Request Quote
            </Button>
          </a>

          {venue.phone && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {venue.phone}
            </Typography>
          )}
          {venue.email && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> {venue.email}
            </Typography>
          )}
          {venue.website && (
            <Typography variant="body2">
              <strong>Website:</strong>{" "}
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
                {venue.website}
              </a>
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

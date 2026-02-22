"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import type { Venue } from "@/types/venue";

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link href={`/venues/${venue.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-4px)",
            transition: "all 0.3s ease",
          },
        }}
      >
        <CardMedia
          component="div"
          sx={{
            height: 200,
            bgcolor: "background.default",
            backgroundImage: venue.mainImageUrl
              ? `url(${venue.mainImageUrl})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            {venue.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              color: "text.secondary",
            }}
          >
            <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{venue.postalCode}</Typography>
          </Box>
          {venue.maxCapacity && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <PeopleIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">
                Up to {venue.maxCapacity} guests
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

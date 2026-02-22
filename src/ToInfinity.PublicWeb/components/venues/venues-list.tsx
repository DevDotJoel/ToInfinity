"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VenueCard from "./venue-card";
import type { Venue } from "@/types/venue";

interface VenuesListProps {
  venues: Venue[];
}

export default function VenuesList({ venues }: VenuesListProps) {
  if (venues.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No venues found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
      }}
    >
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </Box>
  );
}

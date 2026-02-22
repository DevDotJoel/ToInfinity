"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import type { Venue } from "@/types/venue";

interface VenueAboutProps {
  venue: Venue;
}

export default function VenueAbout({ venue }: VenueAboutProps) {
  return (
    <Paper sx={{ p: 4, mb: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 600,
          color: "primary.main",
        }}
      >
        About This Venue
      </Typography>
      <Typography variant="body1" paragraph sx={{ whiteSpace: "pre-line" }}>
        {venue.description || "No description available."}
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontFamily: "'Playfair Display', serif" }}
        >
          Address
        </Typography>
        <Typography variant="body1">
          {venue.street}
          <br />
          {venue.postalCode}
        </Typography>
      </Box>
    </Paper>
  );
}

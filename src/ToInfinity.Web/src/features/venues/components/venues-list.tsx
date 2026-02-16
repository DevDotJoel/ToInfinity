import { Box, CircularProgress, Alert, Typography } from "@mui/material";
import { useVenues, useDeleteVenue } from "../hooks";
import VenueCard from "./venue-card";
import type { Venue } from "../types";

interface VenuesListProps {
  onEdit?: (venue: Venue) => void;
}

const VenuesList = ({ onEdit }: VenuesListProps) => {
  const { data: venues, isLoading, error } = useVenues();
  const deleteVenue = useDeleteVenue();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      deleteVenue.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load venues. Please try again later.
      </Alert>
    );
  }

  if (!venues || venues.length === 0) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No venues found.
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
        <VenueCard
          key={venue.id}
          venue={venue}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </Box>
  );
};

export default VenuesList;

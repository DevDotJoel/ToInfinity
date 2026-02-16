import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { LocationOn, People } from "@mui/icons-material";
import type { Venue } from "../types";

interface VenueCardProps {
  venue: Venue;
  onEdit?: (venue: Venue) => void;
  onDelete?: (id: string) => void;
}

const VenueCard = ({ venue, onEdit, onDelete }: VenueCardProps) => {
  return (
    <Card>
      {venue.imageUrl && (
        <Box
          component="img"
          src={venue.imageUrl}
          alt={venue.name}
          sx={{ width: "100%", height: 200, objectFit: "cover" }}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {venue.name}
        </Typography>
        <Typography color="text.secondary" paragraph>
          {venue.description}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOn sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {venue.location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <People sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            Capacity: {venue.capacity}
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ${venue.pricePerDay}/day
        </Typography>
      </CardContent>
      <CardActions>
        {onEdit && (
          <Button size="small" onClick={() => onEdit(venue)}>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button size="small" color="error" onClick={() => onDelete(venue.id)}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default VenueCard;

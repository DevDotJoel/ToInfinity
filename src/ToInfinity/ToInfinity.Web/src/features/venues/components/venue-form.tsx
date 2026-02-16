import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import type { CreateVenueRequest, Venue } from "../types";

const venueSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  location: z.string().min(1, "Location is required").max(200),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  pricePerDay: z.number().min(0, "Price must be positive"),
  imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

interface VenueFormProps {
  venue?: Venue;
  onSubmit: (data: CreateVenueRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const VenueForm = ({
  venue,
  onSubmit,
  onCancel,
  isLoading,
}: VenueFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVenueRequest>({
    resolver: zodResolver(venueSchema),
    defaultValues: venue
      ? {
          name: venue.name,
          description: venue.description,
          location: venue.location,
          capacity: venue.capacity,
          pricePerDay: venue.pricePerDay,
          imageUrl: venue.imageUrl || "",
        }
      : undefined,
  });

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {venue ? "Edit Venue" : "Create New Venue"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            {...register("name")}
            label="Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isLoading}
          />
          <TextField
            {...register("description")}
            label="Description"
            fullWidth
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isLoading}
          />
          <TextField
            {...register("location")}
            label="Location"
            fullWidth
            error={!!errors.location}
            helperText={errors.location?.message}
            disabled={isLoading}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              {...register("capacity", { valueAsNumber: true })}
              label="Capacity"
              type="number"
              fullWidth
              error={!!errors.capacity}
              helperText={errors.capacity?.message}
              disabled={isLoading}
            />
            <TextField
              {...register("pricePerDay", { valueAsNumber: true })}
              label="Price Per Day"
              type="number"
              fullWidth
              error={!!errors.pricePerDay}
              helperText={errors.pricePerDay?.message}
              disabled={isLoading}
            />
          </Box>
          <TextField
            {...register("imageUrl")}
            label="Image URL (optional)"
            fullWidth
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message}
            disabled={isLoading}
          />
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {venue ? "Update" : "Create"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default VenueForm;

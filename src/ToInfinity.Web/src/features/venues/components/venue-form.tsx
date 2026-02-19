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
import type { Venue } from "../types";

const venueSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  street: z.string().min(1, "Street is required").max(200),
  city: z.string().min(1, "City is required").max(200),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  minPrice: z.number().min(0, "Min price must be positive"),
  maxPrice: z.number().min(0, "Max price must be positive"),
});

type VenueFormData = z.infer<typeof venueSchema>;

interface VenueFormProps {
  venue?: Venue;
  onSubmit: (data: VenueFormData) => void;
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
  } = useForm<VenueFormData>({
    resolver: zodResolver(venueSchema),
    defaultValues: venue
      ? {
          name: venue.name,
          description: venue.description,
          street: venue.street,
          city: venue.city,
          capacity: venue.capacity,
          minPrice: venue.minPrice,
          maxPrice: venue.maxPrice,
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
            {...register("city")}
            label="City"
            fullWidth
            error={!!errors.city}
            helperText={errors.city?.message}
            disabled={isLoading}
          />
          <TextField
            {...register("street")}
            label="Street"
            fullWidth
            error={!!errors.street}
            helperText={errors.street?.message}
            disabled={isLoading}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
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
              {...register("minPrice", { valueAsNumber: true })}
              label="Min Price"
              type="number"
              fullWidth
              error={!!errors.minPrice}
              helperText={errors.minPrice?.message}
              disabled={isLoading}
            />
            <TextField
              {...register("maxPrice", { valueAsNumber: true })}
              label="Max Price"
              type="number"
              fullWidth
              error={!!errors.maxPrice}
              helperText={errors.maxPrice?.message}
              disabled={isLoading}
            />
          </Box>
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

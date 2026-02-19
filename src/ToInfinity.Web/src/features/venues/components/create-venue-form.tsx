import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import EuroIcon from "@mui/icons-material/Euro";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  createVenueSchema,
  type CreateVenueFormData,
} from "../schemas/create-venue.schema";
import { VenueImageUpload } from "./venue-image-upload";

interface CreateVenueFormProps {
  onSubmit: (data: CreateVenueFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  serverError?: string;
}

const SectionCard = ({
  title,
  subtitle,
  stepNumber,
  children,
}: {
  title: string;
  subtitle: string;
  stepNumber: number;
  children: React.ReactNode;
}) => (
  <Card
    sx={{
      p: { xs: 2.5, md: 3.5 },
      mb: 3,
      borderRadius: 3,
      border: "1px solid rgba(61,47,37,0.06)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
      position: "relative",
      overflow: "visible",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          bgcolor: "secondary.main",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "0.9rem",
          flexShrink: 0,
          mt: 0.3,
        }}
      >
        {stepNumber}
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "primary.main",
            fontSize: "1.15rem",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ color: "text.secondary", fontSize: "0.85rem", mt: 0.2 }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
    {children}
  </Card>
);

export const CreateVenueForm = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
  serverError,
}: CreateVenueFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateVenueFormData>({
    resolver: zodResolver(createVenueSchema),
    defaultValues: {
      name: "",
      description: "",
      street: "",
      city: "",
      capacity: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      mainImage: undefined,
    },
  });

  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");
  const capacity = watch("capacity");

  const handleImageSelect = (file: File) => {
    setValue("mainImage", file, { shouldValidate: true });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setValue("mainImage", undefined as unknown as File, {
      shouldValidate: true,
    });
    setImagePreview(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError && (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
          {serverError}
        </Alert>
      )}

      {/* Step 1: Basic Info */}
      <SectionCard
        title="Basic Information"
        subtitle="Tell couples about your venue"
        stepNumber={1}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            {...register("name")}
            fullWidth
            label="Venue Name"
            placeholder="e.g. Quinta da Serra"
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isSubmitting}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FavoriteIcon
                      sx={{ color: "text.secondary", fontSize: 18 }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          <TextField
            {...register("description")}
            fullWidth
            label="Description"
            placeholder="Describe your venue, its atmosphere, special features..."
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isSubmitting}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </Box>
      </SectionCard>

      {/* Step 2: Photos */}
      <SectionCard
        title="Venue Photo"
        subtitle="Upload a cover photo to attract more couples"
        stepNumber={2}
      >
        <Controller
          name="mainImage"
          control={control}
          render={() => (
            <VenueImageUpload
              imagePreview={imagePreview}
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
              error={errors.mainImage?.message}
            />
          )}
        />
      </SectionCard>

      {/* Step 3: Location */}
      <SectionCard
        title="Location"
        subtitle="Help couples find your venue"
        stepNumber={3}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("city")}
                fullWidth
                label="City"
                placeholder="e.g. Lisbon"
                error={!!errors.city}
                helperText={errors.city?.message}
                disabled={isSubmitting}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon
                          sx={{ color: "text.secondary", fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("street")}
                fullWidth
                label="Street Address"
                placeholder="e.g. Rua da Serra 45, 2710-512"
                error={!!errors.street}
                helperText={errors.street?.message}
                disabled={isSubmitting}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon
                          sx={{ color: "text.secondary", fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
        </Box>
      </SectionCard>

      {/* Step 4: Pricing & Capacity */}
      <SectionCard
        title="Pricing & Capacity"
        subtitle="Set your pricing range and guest limits"
        stepNumber={4}
      >
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              {...register("minPrice", { valueAsNumber: true })}
              fullWidth
              label="Min price per person"
              placeholder="e.g. 80"
              type="number"
              error={!!errors.minPrice}
              helperText={errors.minPrice?.message}
              disabled={isSubmitting}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon
                        sx={{ color: "text.secondary", fontSize: 18 }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              {...register("maxPrice", { valueAsNumber: true })}
              fullWidth
              label="Max price per person"
              placeholder="e.g. 150"
              type="number"
              error={!!errors.maxPrice}
              helperText={errors.maxPrice?.message}
              disabled={isSubmitting}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon
                        sx={{ color: "text.secondary", fontSize: 18 }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              {...register("capacity", { valueAsNumber: true })}
              fullWidth
              label="Maximum Capacity"
              placeholder="e.g. 250"
              type="number"
              error={!!errors.capacity}
              helperText={errors.capacity?.message}
              disabled={isSubmitting}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PeopleIcon
                        sx={{ color: "text.secondary", fontSize: 18 }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography
                        sx={{ color: "text.secondary", fontSize: "0.82rem" }}
                      >
                        guests
                      </Typography>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>

          {minPrice > 0 && maxPrice > 0 && capacity > 0 && (
            <Grid size={12}>
              <Box
                sx={{
                  bgcolor: "rgba(196,114,78,0.05)",
                  border: "1px solid rgba(196,114,78,0.12)",
                  borderRadius: 2,
                  px: 2.5,
                  py: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{ color: "text.secondary", fontSize: "0.85rem" }}
                >
                  Estimated full-capacity revenue:
                </Typography>
                <Typography
                  sx={{
                    color: "secondary.main",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                  }}
                >
                  {(minPrice * capacity).toLocaleString("pt-PT")}
                  {"\u20AC"} - {(maxPrice * capacity).toLocaleString("pt-PT")}
                  {"\u20AC"}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </SectionCard>

      {/* Submit */}
      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Button
          onClick={onCancel}
          disabled={isSubmitting}
          sx={{
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": { color: "secondary.main" },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={18} sx={{ color: "#fff" }} />
            ) : undefined
          }
          sx={{
            bgcolor: "secondary.main",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.85rem",
            px: 3,
            py: 0.8,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(196,114,78,0.3)",
            "&:hover": {
              bgcolor: "secondary.dark",
              boxShadow: "0 4px 16px rgba(196,114,78,0.4)",
            },
            "&:disabled": {
              bgcolor: "rgba(196,114,78,0.5)",
              color: "#fff",
            },
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Venue"}
        </Button>
      </Box>
    </Box>
  );
};

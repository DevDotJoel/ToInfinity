import { useState, useMemo } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import EuroIcon from "@mui/icons-material/Euro";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  createVenueSchema,
  type CreateVenueFormData,
} from "../schemas/create-venue.schema";
import { VenueImageUpload } from "./venue-image-upload";
import { useLocations } from "../../locations";
import { VenueTypeLabels, AllVenueTypes } from "../types";

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
  const [selectedCountryId, setSelectedCountryId] = useState<number | "">("");
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | "">("");

  const { data: locationsData, isLoading: isLoadingLocations } = useLocations();

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
      venueType: undefined,
      street: "",
      postalCode: "",
      municipalityId: undefined,
      minCapacity: undefined,
      maxCapacity: undefined,
      pricePerPerson: undefined,
      mainImage: undefined,
    },
  });

  const pricePerPerson = watch("pricePerPerson");
  const maxCapacity = watch("maxCapacity");

  const countries = locationsData?.countries ?? [];

  const districts = useMemo(() => {
    if (!selectedCountryId) return [];
    return countries.find((c) => c.id === selectedCountryId)?.districts ?? [];
  }, [countries, selectedCountryId]);

  const municipalities = useMemo(() => {
    if (!selectedDistrictId) return [];
    return (
      districts.find((d) => d.id === selectedDistrictId)?.municipalities ?? []
    );
  }, [districts, selectedDistrictId]);

  const handleCountryChange = (countryId: number) => {
    setSelectedCountryId(countryId);
    setSelectedDistrictId("");
    setValue("municipalityId", undefined as unknown as number, {
      shouldValidate: false,
    });
  };

  const handleDistrictChange = (districtId: number) => {
    setSelectedDistrictId(districtId);
    setValue("municipalityId", undefined as unknown as number, {
      shouldValidate: false,
    });
  };

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
          <Controller
            name="venueType"
            control={control}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Venue Type"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.venueType}
                helperText={errors.venueType?.message}
                disabled={isSubmitting}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              >
                {AllVenueTypes.map((value) => (
                  <MenuItem key={value} value={value}>
                    {VenueTypeLabels[value]}
                  </MenuItem>
                ))}
              </TextField>
            )}
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
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                label="Country"
                value={selectedCountryId}
                onChange={(e) => handleCountryChange(Number(e.target.value))}
                disabled={isSubmitting || isLoadingLocations}
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
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                fullWidth
                label="District"
                value={selectedDistrictId}
                onChange={(e) => handleDistrictChange(Number(e.target.value))}
                disabled={isSubmitting || !selectedCountryId}
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
              >
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="municipalityId"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    label="Municipality"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={!!errors.municipalityId}
                    helperText={errors.municipalityId?.message}
                    disabled={isSubmitting || !selectedDistrictId}
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
                  >
                    {municipalities.map((municipality) => (
                      <MenuItem key={municipality.id} value={municipality.id}>
                        {municipality.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("street")}
                fullWidth
                label="Street Address"
                placeholder="e.g. Rua da Serra 45"
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("postalCode")}
                fullWidth
                label="Postal Code"
                placeholder="e.g. 2710-512"
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
                disabled={isSubmitting}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
        </Box>
      </SectionCard>

      {/* Step 4: Pricing & Capacity */}
      <SectionCard
        title="Pricing & Capacity"
        subtitle="Set your pricing and guest limits"
        stepNumber={4}
      >
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("pricePerPerson", { valueAsNumber: true })}
              fullWidth
              label="Price per person"
              placeholder="e.g. 120"
              type="number"
              error={!!errors.pricePerPerson}
              helperText={errors.pricePerPerson?.message}
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
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              {...register("minCapacity", { valueAsNumber: true })}
              fullWidth
              label="Min Capacity"
              placeholder="e.g. 50"
              type="number"
              error={!!errors.minCapacity}
              helperText={errors.minCapacity?.message}
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
                },
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              {...register("maxCapacity", { valueAsNumber: true })}
              fullWidth
              label="Max Capacity"
              placeholder="e.g. 300"
              type="number"
              error={!!errors.maxCapacity}
              helperText={errors.maxCapacity?.message}
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

          {pricePerPerson > 0 && maxCapacity > 0 && (
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
                  {(pricePerPerson * maxCapacity).toLocaleString("pt-PT")}
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

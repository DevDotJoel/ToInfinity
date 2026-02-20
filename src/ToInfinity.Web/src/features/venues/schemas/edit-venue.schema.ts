import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const editVenueSchema = z.object({
  name: z
    .string()
    .min(1, "Venue name is required")
    .max(200, "Name must not exceed 200 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description must not exceed 2000 characters"),
  venueType: z
    .number({ error: "Venue type is required" })
    .int()
    .min(0, "Please select a venue type")
    .max(7, "Invalid venue type"),
  street: z.string().min(1, "Street address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  municipalityId: z
    .number({ error: "Municipality is required" })
    .int()
    .positive("Please select a municipality"),
  minCapacity: z
    .number({ error: "Minimum capacity is required" })
    .int("Capacity must be a whole number")
    .min(1, "Minimum capacity must be at least 1"),
  maxCapacity: z
    .number({ error: "Maximum capacity is required" })
    .int("Capacity must be a whole number")
    .min(1, "Maximum capacity must be at least 1"),
  pricePerPerson: z
    .number({ error: "Price per person is required" })
    .min(0, "Price per person must be 0 or more"),
  mainImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Image must be less than 5MB"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPG, PNG, and WebP images are accepted"
    )
    .optional(),
  rentalPrice: z.number().min(0, "Rental price must be 0 or more").optional().nullable(),
  styles: z.number().int().optional().nullable(),
  amenities: z.number().int().optional().nullable(),
  spacesDescription: z.string().max(5000, "Must not exceed 5000 characters").optional().nullable(),
  servicesDescription: z.string().max(5000, "Must not exceed 5000 characters").optional().nullable(),
  gastronomyDescription: z.string().max(5000, "Must not exceed 5000 characters").optional().nullable(),
  locationDescription: z.string().max(5000, "Must not exceed 5000 characters").optional().nullable(),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  phone: z.string().max(20, "Phone must not exceed 20 characters").optional().nullable(),
  email: z.string().email("Invalid email").max(200).optional().nullable().or(z.literal("")),
  website: z.string().url("Invalid URL").max(500).optional().nullable().or(z.literal("")),
  closingTime: z.string().optional().nullable(),
}).refine((data) => data.maxCapacity >= data.minCapacity, {
  message: "Maximum capacity must be greater than or equal to minimum capacity",
  path: ["maxCapacity"],
});

export type EditVenueFormData = z.infer<typeof editVenueSchema>;

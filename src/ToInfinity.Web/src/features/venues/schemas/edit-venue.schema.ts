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
  street: z.string().min(1, "Street address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  municipalityId: z
    .number({ error: "Municipality is required" })
    .int()
    .positive("Please select a municipality"),
  capacity: z
    .number({ error: "Capacity is required" })
    .int("Capacity must be a whole number")
    .min(1, "Capacity must be at least 1"),
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
});

export type EditVenueFormData = z.infer<typeof editVenueSchema>;

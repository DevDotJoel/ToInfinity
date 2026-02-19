import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const createVenueSchema = z
  .object({
    name: z
      .string()
      .min(1, "Venue name is required")
      .max(200, "Name must not exceed 200 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(2000, "Description must not exceed 2000 characters"),
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    capacity: z
      .number({ error: "Capacity is required" })
      .int("Capacity must be a whole number")
      .min(1, "Capacity must be at least 1"),
    minPrice: z
      .number({ error: "Minimum price is required" })
      .min(0, "Minimum price must be 0 or more"),
    maxPrice: z
      .number({ error: "Maximum price is required" })
      .min(0, "Maximum price must be 0 or more"),
    mainImage: z
      .instanceof(File, { message: "Please upload a main image" })
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "Image must be less than 10MB"
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only JPG, PNG, and WebP images are accepted"
      ),
  })
  .refine((data) => data.maxPrice >= data.minPrice, {
    message: "Maximum price must be greater than or equal to minimum price",
    path: ["maxPrice"],
  });

export type CreateVenueFormData = z.infer<typeof createVenueSchema>;

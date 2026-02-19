import { api } from "../../libs/api-client";
import type { Venue } from "./types";
import type { CreateVenueFormData } from "./schemas/create-venue.schema";

export const getVenues = async (): Promise<Venue[]> => {
  return api.get("/venues");
};

export const getMyVenues = async (): Promise<Venue[]> => {
  return api.get("/venues/mine");
};

export const getVenue = async (id: string): Promise<Venue> => {
  return api.get(`/venues/${id}`);
};

export const createVenue = async (data: CreateVenueFormData): Promise<void> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("street", data.street);
  formData.append("city", data.city);
  formData.append("capacity", data.capacity.toString());
  formData.append("minPrice", data.minPrice.toString());
  formData.append("maxPrice", data.maxPrice.toString());
  formData.append("mainImage", data.mainImage);

  return api.post("/venues", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteVenue = async (id: string): Promise<void> => {
  return api.delete(`/venues/${id}`);
};

import { api } from "../../libs/api-client";
import type { Venue, SearchVenuesParams } from "./types";
import type { CreateVenueFormData } from "./schemas/create-venue.schema";
import type { EditVenueFormData } from "./schemas/edit-venue.schema";

export const searchVenues = async (
  params: SearchVenuesParams = {}
): Promise<Venue[]> => {
  return api.get("/api/venues/search", { params });
};

export const getVenues = async (): Promise<Venue[]> => {
  return api.get("/api/venues");
};

export const getMyVenues = async (): Promise<Venue[]> => {
  return api.get("/api/venues/mine");
};

export const getVenue = async (id: string): Promise<Venue> => {
  return api.get(`/api/venues/${id}`);
};

export const createVenue = async (data: CreateVenueFormData): Promise<void> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("street", data.street);
  formData.append("postalCode", data.postalCode);
  formData.append("municipalityId", data.municipalityId.toString());
  formData.append("capacity", data.capacity.toString());
  formData.append("pricePerPerson", data.pricePerPerson.toString());
  formData.append("mainImage", data.mainImage);

  return api.post("/api/venues", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateVenue = async ({
  id,
  data,
}: {
  id: string;
  data: EditVenueFormData;
}): Promise<void> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("street", data.street);
  formData.append("postalCode", data.postalCode);
  formData.append("municipalityId", data.municipalityId.toString());
  formData.append("capacity", data.capacity.toString());
  formData.append("pricePerPerson", data.pricePerPerson.toString());
  if (data.mainImage) {
    formData.append("mainImage", data.mainImage);
  }

  return api.put(`/api/venues/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteVenue = async (id: string): Promise<void> => {
  return api.delete(`/api/venues/${id}`);
};

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

/** Authenticated — verifies the requesting user owns this venue */
export const getVenue = async (id: string): Promise<Venue> => {
  return api.get(`/api/venues/mine/${id}`);
};

/** Public — does not require authentication */
export const getPublicVenue = async (id: string): Promise<Venue> => {
  return api.get(`/api/venues/${id}`);
};

export const createVenue = async (data: CreateVenueFormData): Promise<void> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("venueType", data.venueType.toString());
  formData.append("street", data.street);
  formData.append("postalCode", data.postalCode);
  formData.append("municipalityId", data.municipalityId.toString());
  formData.append("minCapacity", data.minCapacity.toString());
  formData.append("maxCapacity", data.maxCapacity.toString());
  formData.append("pricePerPerson", data.pricePerPerson.toString());
  formData.append("mainImage", data.mainImage);
  appendOptional(formData, "rentalPrice", data.rentalPrice);
  appendOptional(formData, "styles", data.styles);
  appendOptional(formData, "amenities", data.amenities);
  appendOptional(formData, "spacesDescription", data.spacesDescription);
  appendOptional(formData, "servicesDescription", data.servicesDescription);
  appendOptional(formData, "gastronomyDescription", data.gastronomyDescription);
  appendOptional(formData, "locationDescription", data.locationDescription);
  appendOptional(formData, "latitude", data.latitude);
  appendOptional(formData, "longitude", data.longitude);
  appendOptional(formData, "phone", data.phone);
  appendOptional(formData, "email", data.email);
  appendOptional(formData, "website", data.website);
  appendOptional(formData, "closingTime", data.closingTime);

  return api.post("/api/venues", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const appendOptional = (formData: FormData, key: string, value: unknown) => {
  if (value !== undefined && value !== null && value !== "") {
    formData.append(key, String(value));
  }
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
  formData.append("venueType", data.venueType.toString());
  formData.append("street", data.street);
  formData.append("postalCode", data.postalCode);
  formData.append("municipalityId", data.municipalityId.toString());
  formData.append("minCapacity", data.minCapacity.toString());
  formData.append("maxCapacity", data.maxCapacity.toString());
  formData.append("pricePerPerson", data.pricePerPerson.toString());
  if (data.mainImage) {
    formData.append("mainImage", data.mainImage);
  }
  appendOptional(formData, "rentalPrice", data.rentalPrice);
  appendOptional(formData, "styles", data.styles);
  appendOptional(formData, "amenities", data.amenities);
  appendOptional(formData, "spacesDescription", data.spacesDescription);
  appendOptional(formData, "servicesDescription", data.servicesDescription);
  appendOptional(formData, "gastronomyDescription", data.gastronomyDescription);
  appendOptional(formData, "locationDescription", data.locationDescription);
  appendOptional(formData, "latitude", data.latitude);
  appendOptional(formData, "longitude", data.longitude);
  appendOptional(formData, "phone", data.phone);
  appendOptional(formData, "email", data.email);
  appendOptional(formData, "website", data.website);
  appendOptional(formData, "closingTime", data.closingTime);

  return api.put(`/api/venues/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteVenue = async (id: string): Promise<void> => {
  return api.delete(`/api/venues/${id}`);
};

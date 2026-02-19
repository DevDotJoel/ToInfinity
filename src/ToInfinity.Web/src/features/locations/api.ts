import { api } from "../../libs/api-client";
import type { LocationsResponse } from "./types";

export const getLocations = async (): Promise<LocationsResponse> => {
  return api.get("/api/locations");
};

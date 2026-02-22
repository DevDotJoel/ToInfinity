import type { Venue, SearchVenuesParams } from "@/types/venue";
import type { Country } from "@/types/location";

const API_URL = process.env.API_URL || "https://localhost:7232";

export async function getVenues(): Promise<Venue[]> {
  const res = await fetch(`${API_URL}/api/venues`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch venues");
  }

  return res.json();
}

export async function getVenue(id: string): Promise<Venue> {
  const res = await fetch(`${API_URL}/api/venues/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch venue");
  }

  return res.json();
}

export async function searchVenues(
  params: SearchVenuesParams
): Promise<Venue[]> {
  const queryParams = new URLSearchParams();

  if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
  if (params.countryId)
    queryParams.append("countryId", params.countryId.toString());
  if (params.districtId)
    queryParams.append("districtId", params.districtId.toString());
  if (params.municipalityId)
    queryParams.append("municipalityId", params.municipalityId.toString());
  if (params.venueType !== undefined)
    queryParams.append("venueType", params.venueType.toString());
  if (params.styles) queryParams.append("styles", params.styles.toString());
  if (params.amenities)
    queryParams.append("amenities", params.amenities.toString());
  if (params.minCapacity)
    queryParams.append("minCapacity", params.minCapacity.toString());
  if (params.maxCapacity)
    queryParams.append("maxCapacity", params.maxCapacity.toString());
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.size) queryParams.append("size", params.size.toString());

  const query = queryParams.toString();
  const url = `${API_URL}/api/venues/search${query ? `?${query}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to search venues");
  }

  return res.json();
}

export async function getLocations(): Promise<{ countries: Country[] }> {
  const res = await fetch(`${API_URL}/api/locations`, {
    cache: "force-cache",
    next: { revalidate: 86400 }, // 24h — locations rarely change
  });

  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }

  return res.json();
}

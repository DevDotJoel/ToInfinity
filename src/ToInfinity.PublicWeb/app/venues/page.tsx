import type { Metadata } from "next";
import PublicLayout from "@/components/layout/public-layout";
import VenuesClient from "@/components/venues/venues-client";
import { getVenues, searchVenues, getLocations } from "@/lib/api";
import type { Venue } from "@/types/venue";
import type { Country } from "@/types/location";

export const metadata: Metadata = {
  title: "Wedding Venues - Browse Stunning Venues | TooInfinity",
  description:
    "Browse our collection of stunning wedding venues. Find your perfect venue for your special day.",
};

interface VenuesPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function VenuesPage({ searchParams }: VenuesPageProps) {
  const params = await searchParams;

  const hasFilters =
    params.searchTerm ||
    params.countryId ||
    params.districtId ||
    params.municipalityId ||
    params.venueType ||
    params.styles ||
    params.amenities ||
    params.sortBy;

  // Locations are cached 24h (force-cache) — never re-fetched on filter change
  // Venues are fetched fresh based on current URL params
  const [venues, locationsData] = await Promise.all([
    hasFilters
      ? searchVenues({
          searchTerm: params.searchTerm,
          countryId: params.countryId ? Number(params.countryId) : undefined,
          districtId: params.districtId ? Number(params.districtId) : undefined,
          municipalityId: params.municipalityId
            ? Number(params.municipalityId)
            : undefined,
          venueType: params.venueType ? Number(params.venueType) : undefined,
          styles: params.styles ? Number(params.styles) : undefined,
          amenities: params.amenities ? Number(params.amenities) : undefined,
          sortBy: params.sortBy,
        }).catch(() => [] as Venue[])
      : getVenues().catch(() => [] as Venue[]),
    getLocations().catch(() => ({ countries: [] as Country[] })),
  ]);

  return (
    <PublicLayout>
      <VenuesClient
        venues={venues}
        countries={locationsData.countries}
        currentFilters={{
          searchTerm: params.searchTerm ?? "",
          countryId: params.countryId ? Number(params.countryId) : null,
          districtId: params.districtId ? Number(params.districtId) : null,
          municipalityId: params.municipalityId
            ? Number(params.municipalityId)
            : null,
          venueType:
            params.venueType !== undefined ? Number(params.venueType) : null,
          styles: params.styles ? Number(params.styles) : 0,
          amenities: params.amenities ? Number(params.amenities) : 0,
          sortBy: params.sortBy ?? "",
        }}
      />
    </PublicLayout>
  );
}

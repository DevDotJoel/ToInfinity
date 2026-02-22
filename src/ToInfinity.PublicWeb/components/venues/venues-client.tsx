"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import type { Venue } from "@/types/venue";
import type { Country } from "@/types/location";
import VenueSearchBar from "./venue-search-bar";
import VenueFiltersSidebar from "./venue-filters-sidebar";
import { VenueListCard } from "./venue-list-card";
import { VenueGridCard } from "./venue-grid-card";

interface VenueFilters {
  searchTerm: string;
  countryId: number | null;
  districtId: number | null;
  municipalityId: number | null;
  venueType: number | null;
  styles: number;
  amenities: number;
  sortBy: string;
}

interface VenuesClientProps {
  venues: Venue[];
  countries: Country[];
  currentFilters: VenueFilters;
}

function buildQuery(filters: Partial<VenueFilters>): string {
  const params = new URLSearchParams();
  if (filters.searchTerm) params.set("searchTerm", filters.searchTerm);
  if (filters.countryId) params.set("countryId", String(filters.countryId));
  if (filters.districtId) params.set("districtId", String(filters.districtId));
  if (filters.municipalityId)
    params.set("municipalityId", String(filters.municipalityId));
  if (filters.venueType !== null && filters.venueType !== undefined)
    params.set("venueType", String(filters.venueType));
  if (filters.styles && filters.styles > 0)
    params.set("styles", String(filters.styles));
  if (filters.amenities && filters.amenities > 0)
    params.set("amenities", String(filters.amenities));
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  const q = params.toString();
  return q ? `?${q}` : "";
}

export default function VenuesClient({
  venues,
  countries,
  currentFilters,
}: VenuesClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Local state only for the search text input (committed on submit)
  const [searchInput, setSearchInput] = useState(currentFilters.searchTerm);
  // UI-only state (not in URL)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filterCount =
    (currentFilters.venueType !== null ? 1 : 0) +
    (currentFilters.styles > 0 ? 1 : 0) +
    (currentFilters.amenities > 0 ? 1 : 0);

  // Navigate to /venues with new query params — triggers SSR
  const navigate = useCallback(
    (overrides: Partial<VenueFilters>) => {
      const next = { ...currentFilters, ...overrides };
      startTransition(() => {
        router.push(`/venues${buildQuery(next)}`);
      });
    },
    [router, currentFilters],
  );

  const handleSearchSubmit = () => {
    navigate({ searchTerm: searchInput || "" });
  };

  const handleCountryChange = (id: number | null) => {
    navigate({ countryId: id, districtId: null, municipalityId: null });
  };

  const handleDistrictChange = (id: number | null) => {
    navigate({ districtId: id, municipalityId: null });
  };

  const handleMunicipalityChange = (id: number | null) => {
    navigate({ municipalityId: id });
  };

  const handleSortChange = (value: string) => {
    navigate({ sortBy: value });
  };

  const handleTypeChange = (type: number | null) => {
    navigate({ venueType: type });
  };

  const handleStylesChange = (value: number) => {
    navigate({ styles: value });
  };

  const handleAmenitiesChange = (value: number) => {
    navigate({ amenities: value });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    startTransition(() => {
      router.push("/venues");
    });
  };

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const loading = isPending;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.8rem", md: "2.3rem" },
              color: "primary.main",
              mb: 1,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Wedding Venues
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 500, lineHeight: 1.6 }}
          >
            Browse our curated selection of stunning venues for your perfect
            celebration.
          </Typography>
        </Box>

        {/* Search Bar */}
        <VenueSearchBar
          searchTerm={searchInput}
          onSearchChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          countries={countries}
          selectedCountryId={currentFilters.countryId}
          selectedDistrictId={currentFilters.districtId}
          selectedMunicipalityId={currentFilters.municipalityId}
          onCountryChange={handleCountryChange}
          onDistrictChange={handleDistrictChange}
          onMunicipalityChange={handleMunicipalityChange}
          sortBy={currentFilters.sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filterCount={filterCount}
          onOpenFilters={() => setMobileFiltersOpen(true)}
        />

        {/* Main Content: Sidebar + Results */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Desktop Sidebar */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <VenueFiltersSidebar
              selectedType={currentFilters.venueType}
              onTypeChange={handleTypeChange}
              selectedStyles={currentFilters.styles}
              onStylesChange={handleStylesChange}
              selectedAmenities={currentFilters.amenities}
              onAmenitiesChange={handleAmenitiesChange}
              onClearAll={handleClearFilters}
            />
          </Box>

          {/* Results */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {loading ? "Searching..." : `${venues.length} venues found`}
            </Typography>

            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 300,
                }}
              >
                <CircularProgress />
              </Box>
            )}

            {!loading && venues.length > 0 && (
              <>
                {viewMode === "list" ? (
                  <Box>
                    {venues.map((venue) => (
                      <VenueListCard
                        key={venue.id}
                        venue={venue}
                        isFavorite={favorites.has(venue.id)}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ))}
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {venues.map((venue) => (
                      <Grid key={venue.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <VenueGridCard
                          venue={venue}
                          isFavorite={favorites.has(venue.id)}
                          onFavoriteToggle={handleFavoriteToggle}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {!loading && venues.length === 0 && (
              <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No venues found
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Try adjusting your filters or search terms
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      borderColor: "secondary.main",
                      bgcolor: "rgba(196,114,78,0.04)",
                    },
                  }}
                >
                  Clear All Filters
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="right"
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: "85%",
              maxWidth: 360,
            },
          }}
        >
          <VenueFiltersSidebar
            selectedType={currentFilters.venueType}
            onTypeChange={handleTypeChange}
            selectedStyles={currentFilters.styles}
            onStylesChange={handleStylesChange}
            selectedAmenities={currentFilters.amenities}
            onAmenitiesChange={handleAmenitiesChange}
            onClearAll={handleClearFilters}
            isMobile
            onClose={() => setMobileFiltersOpen(false)}
          />
        </Drawer>
      </Container>
    </Box>
  );
}

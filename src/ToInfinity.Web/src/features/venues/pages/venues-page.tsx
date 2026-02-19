import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSearchVenues } from "../hooks";
import { VenueListCard } from "../components/venue-list-card";
import { VenueGridCard } from "../components/venue-grid-card";
import { VenueFiltersSidebar } from "../components/venue-filters-sidebar";
import { VenueSearchBar } from "../components/venue-search-bar";

const SIDEBAR_WIDTH = 280;

const VENUE_TYPES = [
  "All",
  "Ballroom",
  "Barn",
  "Beach",
  "Garden",
  "Hotel",
  "Restaurant",
];

interface LocationFilter {
  countryId?: number;
  districtId?: number;
  municipalityId?: number;
}

export default function VenuesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive location filter from URL search params
  const locationFilter: LocationFilter = useMemo(() => {
    const countryId = searchParams.get("countryId");
    const districtId = searchParams.get("districtId");
    const municipalityId = searchParams.get("municipalityId");
    return {
      countryId: countryId ? Number(countryId) : undefined,
      districtId: districtId ? Number(districtId) : undefined,
      municipalityId: municipalityId ? Number(municipalityId) : undefined,
    };
  }, [searchParams]);

  // Derive search term and sort from URL search params
  const searchTerm = searchParams.get("search") ?? "";
  const sortBy = searchParams.get("sortBy") ?? "price-low";

  const setLocationFilter = useCallback(
    (filter: LocationFilter) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          // Clear old location params
          next.delete("countryId");
          next.delete("districtId");
          next.delete("municipalityId");
          // Set new ones
          if (filter.countryId !== undefined)
            next.set("countryId", String(filter.countryId));
          if (filter.districtId !== undefined)
            next.set("districtId", String(filter.districtId));
          if (filter.municipalityId !== undefined)
            next.set("municipalityId", String(filter.municipalityId));
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // Filter state
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Fetch venues from API with all filters (backend handles search, sort, location)
  const { data: venues = [], isLoading } = useSearchVenues({
    searchTerm: searchTerm || undefined,
    countryId: locationFilter.countryId,
    districtId: locationFilter.districtId,
    municipalityId: locationFilter.municipalityId,
    sortBy,
  });

  const handleSearchSubmit = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (searchInput.trim()) {
          next.set("search", searchInput.trim());
        } else {
          next.delete("search");
        }
        return next;
      },
      { replace: true },
    );
  }, [searchInput, setSearchParams]);

  const handleSortChange = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value && value !== "price-low") {
            next.set("sortBy", value);
          } else {
            next.delete("sortBy");
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const handleTypeToggle = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }, []);

  const handleFavoriteToggle = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setLocationFilter({});
    setSelectedTypes([]);
    setSearchInput("");
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("search");
        next.delete("sortBy");
        next.delete("countryId");
        next.delete("districtId");
        next.delete("municipalityId");
        return next;
      },
      { replace: true },
    );
  }, [setLocationFilter, setSearchParams]);

  const activeFilterCount =
    (locationFilter.countryId ? 1 : 0) +
    (locationFilter.districtId ? 1 : 0) +
    (locationFilter.municipalityId ? 1 : 0) +
    selectedTypes.length;

  return (
    <Box sx={{ py: { xs: 4, md: 5 } }}>
      <Container maxWidth="xl">
        {/* Page Header */}
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
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          locationFilter={locationFilter}
          onLocationFilterChange={setLocationFilter}
          isMobile={isMobile}
          onOpenFilters={() => setDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Results count */}
        {!isLoading && (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 2.5, fontSize: "0.88rem" }}
          >
            <Box
              component="span"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              {venues.length}
            </Box>{" "}
            {venues.length === 1 ? "result" : "results"} found
          </Typography>
        )}

        {/* Main layout: sidebar + results */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
          {/* Desktop sidebar */}
          {!isMobile && (
            <Paper
              elevation={0}
              sx={{
                width: SIDEBAR_WIDTH,
                flexShrink: 0,
                border: "1px solid",
                borderColor: "rgba(61,47,37,0.08)",
                borderRadius: 2.5,
                bgcolor: "background.paper",
                position: "sticky",
                top: 20,
                maxHeight: "calc(100vh - 40px)",
                overflowY: "auto",
                "&::-webkit-scrollbar": { width: 5 },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: "rgba(61,47,37,0.12)",
                  borderRadius: 3,
                },
              }}
            >
              <VenueFiltersSidebar
                venueTypes={VENUE_TYPES}
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle}
                onClearAll={() => setSelectedTypes([])}
              />
            </Paper>
          )}

          {/* Mobile drawer */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: {
                width: 300,
                maxWidth: "85vw",
                bgcolor: "background.paper",
              },
            }}
          >
            <VenueFiltersSidebar
              venueTypes={VENUE_TYPES}
              selectedTypes={selectedTypes}
              onTypeToggle={handleTypeToggle}
              onClearAll={() => setSelectedTypes([])}
              isMobile
              onClose={() => setDrawerOpen(false)}
            />
          </Drawer>

          {/* Results */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 8,
                }}
              >
                <CircularProgress sx={{ color: "secondary.main" }} />
              </Box>
            ) : venues.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: "rgba(61,47,37,0.08)",
                  borderRadius: 2.5,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.secondary",
                    fontFamily: "'Playfair Display', serif",
                    mb: 1,
                  }}
                >
                  No venues found
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  Try adjusting your search or filters.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchInput("");
                    clearAllFilters();
                  }}
                  sx={{
                    borderColor: "secondary.main",
                    color: "secondary.main",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "secondary.dark",
                      bgcolor: "rgba(196,114,78,0.05)",
                    },
                  }}
                >
                  Reset search
                </Button>
              </Paper>
            ) : viewMode === "list" || isMobile ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {venues.map((venue) => (
                  <VenueListCard
                    key={venue.id}
                    venue={venue}
                    isFavorite={favorites.includes(venue.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  gap: 2.5,
                }}
              >
                {venues.map((venue) => (
                  <VenueGridCard
                    key={venue.id}
                    venue={venue}
                    isFavorite={favorites.includes(venue.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

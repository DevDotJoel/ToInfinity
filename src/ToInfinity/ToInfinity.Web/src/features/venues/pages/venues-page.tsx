import { useState, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { venues, venueTypes } from "../../../lib/data";
import { VenueListCard } from "../components/venue-list-card";
import { VenueGridCard } from "../components/venue-grid-card";
import { VenueFiltersSidebar } from "../components/venue-filters-sidebar";
import { VenueSearchBar } from "../components/venue-search-bar";

const SIDEBAR_WIDTH = 280;

export default function VenuesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filter state
  const [searchInput, setSearchInput] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [favorites, setFavorites] = useState<string[]>([]);

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
    setSelectedTypes([]);
  }, []);

  // Client-side filtering for mock data (will be replaced with API params)
  const filtered = useMemo(() => {
    const searchLower = searchInput.toLowerCase();
    const result = venues.filter((v) => {
      const matchesSearch =
        !searchInput || v.name.toLowerCase().includes(searchLower);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(v.type);
      return matchesSearch && matchesType;
    });

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "capacity") {
      result.sort((a, b) => b.capacity - a.capacity);
    }

    return result;
  }, [searchInput, selectedTypes, sortBy]);

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
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedTypes={selectedTypes}
          onTypeRemove={handleTypeToggle}
          onClearAll={clearAllFilters}
          isMobile={isMobile}
          onOpenFilters={() => setDrawerOpen(true)}
          activeFilterCount={selectedTypes.length}
        />

        {/* Results count */}
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 2.5, fontSize: "0.88rem" }}
        >
          <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
            {filtered.length}
          </Box>{" "}
          {filtered.length === 1 ? "result" : "results"} found
        </Typography>

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
                venueTypes={venueTypes}
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle}
                onClearAll={clearAllFilters}
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
              venueTypes={venueTypes}
              selectedTypes={selectedTypes}
              onTypeToggle={handleTypeToggle}
              onClearAll={clearAllFilters}
              isMobile
              onClose={() => setDrawerOpen(false)}
            />
          </Drawer>

          {/* Results */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {filtered.length === 0 ? (
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
                {filtered.map((venue) => (
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
                {filtered.map((venue) => (
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

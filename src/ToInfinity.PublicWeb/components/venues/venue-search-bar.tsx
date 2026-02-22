"use client";

import { useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FilterListIcon from "@mui/icons-material/FilterList";
import type { Country } from "@/types/location";

interface VenueSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  countries: Country[];
  selectedCountryId: number | null;
  selectedDistrictId: number | null;
  selectedMunicipalityId: number | null;
  onCountryChange: (countryId: number | null) => void;
  onDistrictChange: (districtId: number | null) => void;
  onMunicipalityChange: (municipalityId: number | null) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  filterCount: number;
  onOpenFilters: () => void;
}

export default function VenueSearchBar({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  countries,
  selectedCountryId,
  selectedDistrictId,
  selectedMunicipalityId,
  onCountryChange,
  onDistrictChange,
  onMunicipalityChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  filterCount,
  onOpenFilters,
}: VenueSearchBarProps) {
  const selectedCountry = useMemo(
    () => countries.find((c) => c.id === selectedCountryId),
    [countries, selectedCountryId],
  );

  const districts = useMemo(
    () => selectedCountry?.districts || [],
    [selectedCountry],
  );

  const selectedDistrict = useMemo(
    () => districts.find((d) => d.id === selectedDistrictId),
    [districts, selectedDistrictId],
  );

  const municipalities = useMemo(
    () => selectedDistrict?.municipalities || [],
    [selectedDistrict],
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        mb: 3,
      }}
    >
      {/* Search Input */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "secondary.main",
              },
            },
          }}
        />
      </Box>

      {/* Location Filters + Sort + View Toggle */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: { xs: "stretch", md: "center" },
        }}
      >
        {/* Country Select */}
        <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
          <InputLabel>Country</InputLabel>
          <Select
            value={selectedCountryId || ""}
            onChange={(e) => {
              const value = e.target.value;
              onCountryChange(value ? Number(value) : null);
            }}
            label="Country"
          >
            <MenuItem value="">
              <em>All Countries</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* District Select */}
        <FormControl
          size="small"
          sx={{ flex: 1, minWidth: 120 }}
          disabled={!selectedCountryId}
        >
          <InputLabel>District</InputLabel>
          <Select
            value={selectedDistrictId || ""}
            onChange={(e) => {
              const value = e.target.value;
              onDistrictChange(value ? Number(value) : null);
            }}
            label="District"
          >
            <MenuItem value="">
              <em>All Districts</em>
            </MenuItem>
            {districts.map((district) => (
              <MenuItem key={district.id} value={district.id}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Municipality Select */}
        <FormControl
          size="small"
          sx={{ flex: 1, minWidth: 120 }}
          disabled={!selectedDistrictId}
        >
          <InputLabel>Municipality</InputLabel>
          <Select
            value={selectedMunicipalityId || ""}
            onChange={(e) => {
              const value = e.target.value;
              onMunicipalityChange(value ? Number(value) : null);
            }}
            label="Municipality"
          >
            <MenuItem value="">
              <em>All Municipalities</em>
            </MenuItem>
            {municipalities.map((municipality) => (
              <MenuItem key={municipality.id} value={municipality.id}>
                {municipality.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort Select */}
        <FormControl size="small" sx={{ flex: 1, minWidth: 140 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="">
              <em>Default</em>
            </MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="capacity">Capacity</MenuItem>
          </Select>
        </FormControl>

        {/* View Toggle (Desktop) + Filter Button (Mobile) */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: { xs: "space-between", md: "flex-end" },
          }}
        >
          {/* Mobile Filter Button */}
          <Button
            variant="outlined"
            size="small"
            onClick={onOpenFilters}
            startIcon={<FilterListIcon />}
            sx={{
              display: { xs: "flex", md: "none" },
              borderColor: "primary.main",
              color: "primary.main",
            }}
          >
            <Badge badgeContent={filterCount} color="secondary">
              <Box sx={{ mr: 1 }}>Filters</Box>
            </Badge>
          </Button>

          {/* View Toggle (Desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => onViewModeChange("list")}
              sx={{
                bgcolor: viewMode === "list" ? "primary.main" : "transparent",
                color: viewMode === "list" ? "white" : "text.secondary",
                "&:hover": {
                  bgcolor: viewMode === "list" ? "primary.dark" : "grey.100",
                },
              }}
            >
              <ViewListIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onViewModeChange("grid")}
              sx={{
                bgcolor: viewMode === "grid" ? "primary.main" : "transparent",
                color: viewMode === "grid" ? "white" : "text.secondary",
                "&:hover": {
                  bgcolor: viewMode === "grid" ? "primary.dark" : "grey.100",
                },
              }}
            >
              <ViewModuleIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import { useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { useLocations } from "../../locations";

interface LocationFilter {
  countryId?: number;
  districtId?: number;
  municipalityId?: number;
}

interface VenueSearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "list" | "grid";
  onViewModeChange: (value: "list" | "grid") => void;
  locationFilter: LocationFilter;
  onLocationFilterChange: (filter: LocationFilter) => void;
  isMobile?: boolean;
  onOpenFilters?: () => void;
  activeFilterCount?: number;
}

export const VenueSearchBar = ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  locationFilter,
  onLocationFilterChange,
  isMobile = false,
  onOpenFilters,
  activeFilterCount = 0,
}: VenueSearchBarProps) => {
  const { data: locationsData } = useLocations();
  const countries = locationsData?.countries ?? [];

  const selectedCountry = useMemo(
    () => countries.find((c) => c.id === locationFilter.countryId),
    [countries, locationFilter.countryId],
  );

  const districts = selectedCountry?.districts ?? [];

  const selectedDistrict = useMemo(
    () => districts.find((d) => d.id === locationFilter.districtId),
    [districts, locationFilter.districtId],
  );

  const municipalities = selectedDistrict?.municipalities ?? [];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        border: "1px solid",
        borderColor: "rgba(61,47,37,0.1)",
        borderRadius: 2.5,
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {/* Search input */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search venue by name... (press Enter)"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchSubmit();
            }
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            flex: 1,
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        {/* Location: Country */}
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Country</InputLabel>
          <Select
            value={locationFilter.countryId ?? ""}
            label="Country"
            onChange={(e) => {
              const val = e.target.value as number | "";
              onLocationFilterChange({
                countryId: val === "" ? undefined : val,
                districtId: undefined,
                municipalityId: undefined,
              });
            }}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Location: District */}
        <FormControl
          size="small"
          sx={{ minWidth: 140 }}
          disabled={!locationFilter.countryId}
        >
          <InputLabel>District</InputLabel>
          <Select
            value={locationFilter.districtId ?? ""}
            label="District"
            onChange={(e) => {
              const val = e.target.value as number | "";
              onLocationFilterChange({
                ...locationFilter,
                districtId: val === "" ? undefined : val,
                municipalityId: undefined,
              });
            }}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {districts.map((district) => (
              <MenuItem key={district.id} value={district.id}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Location: Municipality */}
        <FormControl
          size="small"
          sx={{ minWidth: 150 }}
          disabled={!locationFilter.districtId}
        >
          <InputLabel>Municipality</InputLabel>
          <Select
            value={locationFilter.municipalityId ?? ""}
            label="Municipality"
            onChange={(e) => {
              const val = e.target.value as number | "";
              onLocationFilterChange({
                ...locationFilter,
                municipalityId: val === "" ? undefined : val,
              });
            }}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {municipalities.map((municipality) => (
              <MenuItem key={municipality.id} value={municipality.id}>
                {municipality.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort */}
        <FormControl size="small" sx={{ minWidth: 155 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="capacity">Capacity</MenuItem>
          </Select>
        </FormControl>

        {/* View toggle (desktop only) */}
        {!isMobile && (
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, val) => val && onViewModeChange(val)}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                border: "1px solid",
                borderColor: "rgba(61,47,37,0.15)",
                color: "text.secondary",
                px: 1.2,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  "&:hover": { bgcolor: "primary.dark" },
                },
              },
            }}
          >
            <ToggleButton value="list" aria-label="List view">
              <ViewListIcon sx={{ fontSize: 20 }} />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="Grid view">
              <GridViewIcon sx={{ fontSize: 20 }} />
            </ToggleButton>
          </ToggleButtonGroup>
        )}

        {/* Mobile filter button */}
        {isMobile && onOpenFilters && (
          <Button
            variant="outlined"
            startIcon={<TuneIcon />}
            onClick={onOpenFilters}
            sx={{
              borderColor: "rgba(61,47,37,0.2)",
              color: "primary.main",
              fontWeight: 600,
              whiteSpace: "nowrap",
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

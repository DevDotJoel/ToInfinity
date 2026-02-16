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
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";

interface VenueSearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "list" | "grid";
  onViewModeChange: (value: "list" | "grid") => void;
  selectedTypes: string[];
  onTypeRemove: (type: string) => void;
  onClearAll: () => void;
  isMobile?: boolean;
  onOpenFilters?: () => void;
  activeFilterCount?: number;
}

export const VenueSearchBar = ({
  searchValue,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  selectedTypes,
  onTypeRemove,
  onClearAll,
  isMobile = false,
  onOpenFilters,
  activeFilterCount = 0,
}: VenueSearchBarProps) => {
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
          placeholder="Search venue by name..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
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

        {/* Sort */}
        <FormControl size="small" sx={{ minWidth: 155 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="rating">Top Rated</MenuItem>
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

      {/* Active filter chips */}
      {selectedTypes.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.8,
            mt: 1.5,
            pt: 1.5,
            borderTop: "1px solid",
            borderColor: "rgba(61,47,37,0.06)",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", mr: 0.5, fontSize: "0.78rem" }}
          >
            Active:
          </Typography>
          {selectedTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              size="small"
              onDelete={() => onTypeRemove(type)}
              sx={{
                bgcolor: "rgba(196,114,78,0.1)",
                color: "secondary.dark",
                fontWeight: 600,
                fontSize: "0.75rem",
                height: 26,
                "& .MuiChip-deleteIcon": {
                  color: "secondary.main",
                  fontSize: 16,
                },
              }}
            />
          ))}
          <Button
            size="small"
            onClick={onClearAll}
            sx={{
              color: "secondary.main",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.75rem",
              p: 0,
              ml: 0.5,
              minWidth: 0,
              "&:hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Clear all
          </Button>
        </Box>
      )}
    </Paper>
  );
};

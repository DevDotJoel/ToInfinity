import { useState, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import EuroIcon from "@mui/icons-material/Euro";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { venues, venueTypes } from "../lib/data";

const SIDEBAR_WIDTH = 280;

/* ---- Collapsible Section Header ---- */
const SectionHeader = ({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) => (
  <Box
    onClick={onToggle}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      py: 1,
      userSelect: "none",
      "&:hover": { opacity: 0.8 },
    }}
  >
    <Typography
      variant="subtitle2"
      sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.9rem" }}
    >
      {label}
    </Typography>
    {open ? (
      <ExpandLessIcon sx={{ color: "text.secondary", fontSize: 20 }} />
    ) : (
      <ExpandMoreIcon sx={{ color: "text.secondary", fontSize: 20 }} />
    )}
  </Box>
);

export default function VenuesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filter state
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 25000]);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Collapsible sidebar sections
  const [typeOpen, setTypeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const activeFilterCount = [
    selectedTypes.length > 0,
    priceRange[0] > 0 || priceRange[1] < 25000,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setPriceRange([0, 25000]);
  };

  const filtered = useMemo(() => {
    const result = [...venues].filter((v) => {
      const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(v.type);
      const matchesPrice = v.price >= priceRange[0] && v.price <= priceRange[1];
      return matchesSearch && matchesType && matchesPrice;
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
  }, [search, selectedTypes, priceRange, sortBy]);

  /* ---- Sidebar Filter Content ---- */
  const filterContent = (
    <Box sx={{ p: 2.5 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            color: "primary.main",
            fontSize: "1.05rem",
          }}
        >
          Filters
        </Typography>
        {isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            aria-label="Close filters"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {activeFilterCount > 0 && (
        <Button
          size="small"
          onClick={clearAllFilters}
          sx={{
            mb: 1.5,
            color: "secondary.main",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.8rem",
            p: 0,
            minWidth: 0,
            "&:hover": {
              bgcolor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Clear all filters
        </Button>
      )}

      <Divider sx={{ mb: 1.5 }} />

      {/* Venue Type */}
      <SectionHeader
        label="Venue Type"
        open={typeOpen}
        onToggle={() => setTypeOpen(!typeOpen)}
      />
      <Collapse in={typeOpen}>
        <FormGroup sx={{ pl: 0.5, pb: 1.5 }}>
          {venueTypes
            .filter((t) => t !== "All")
            .map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    sx={{
                      color: "rgba(61,47,37,0.3)",
                      "&.Mui-checked": { color: "secondary.main" },
                      py: 0.4,
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: "0.88rem" }}
                  >
                    {type}
                  </Typography>
                }
              />
            ))}
        </FormGroup>
      </Collapse>

      <Divider sx={{ mb: 1.5 }} />

      {/* Price Range */}
      <SectionHeader
        label="Price Range"
        open={priceOpen}
        onToggle={() => setPriceOpen(!priceOpen)}
      />
      <Collapse in={priceOpen}>
        <Box sx={{ px: 0.5, pt: 0.5, pb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              mb: 1.5,
              fontSize: "0.82rem",
            }}
          >
            {priceRange[0].toLocaleString("de-DE")} € -{" "}
            {priceRange[1].toLocaleString("de-DE")} €
          </Typography>
          <Slider
            value={priceRange}
            onChange={(_, val) => setPriceRange(val as number[])}
            min={0}
            max={25000}
            step={500}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${v.toLocaleString("de-DE")}€`}
            sx={{
              color: "secondary.main",
              "& .MuiSlider-thumb": {
                width: 18,
                height: 18,
                bgcolor: "#fff",
                border: "2px solid",
                borderColor: "secondary.main",
                "&:hover": {
                  boxShadow: "0 0 0 6px rgba(196,114,78,0.15)",
                },
              },
              "& .MuiSlider-track": {
                height: 4,
              },
              "& .MuiSlider-rail": {
                height: 4,
                bgcolor: "rgba(61,47,37,0.12)",
              },
            }}
          />
        </Box>
      </Collapse>
    </Box>
  );

  /* ---- List View Card ---- */
  const ListCard = ({ venue }: { venue: (typeof venues)[0] }) => (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        overflow: "hidden",
        transition: "box-shadow 0.25s ease",
        "&:hover": {
          boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: 300 },
          minHeight: { xs: 200, sm: 240 },
          flexShrink: 0,
          overflow: "hidden",
          bgcolor: "grey.200",
        }}
      >
        <CardActionArea
          component={RouterLink}
          to={`/venues/${venue.id}`}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {venue.image ? (
            <img
              src={venue.image}
              alt={venue.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography variant="body2" sx={{ color: "text.disabled" }}>
              No image
            </Typography>
          )}
        </CardActionArea>
        {/* Favorite button */}
        <IconButton
          onClick={() => handleFavoriteToggle(venue.id)}
          aria-label={
            favorites.includes(venue.id)
              ? "Remove from favorites"
              : "Add to favorites"
          }
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(255,255,255,0.9)",
            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            width: 36,
            height: 36,
          }}
        >
          {favorites.includes(venue.id) ? (
            <FavoriteIcon sx={{ color: "#e74c3c", fontSize: 20 }} />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: "text.secondary", fontSize: 20 }}
            />
          )}
        </IconButton>
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: { xs: 2, sm: 2.5 },
          "&:last-child": { pb: { xs: 2, sm: 2.5 } },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography
              variant="h6"
              component={RouterLink}
              to={`/venues/${venue.id}`}
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                color: "primary.main",
                fontSize: { xs: "1.05rem", sm: "1.15rem" },
                textDecoration: "none",
                "&:hover": { color: "secondary.main" },
                lineHeight: 1.3,
              }}
            >
              {venue.name}
            </Typography>
            <Chip
              label={venue.type}
              size="small"
              sx={{
                bgcolor: "rgba(196,114,78,0.1)",
                color: "secondary.dark",
                fontWeight: 600,
                fontSize: "0.72rem",
                flexShrink: 0,
                height: 24,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
            <LocationOnIcon sx={{ color: "text.secondary", fontSize: 16 }} />
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: "0.85rem" }}
            >
              {venue.location}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              fontSize: "0.88rem",
              mb: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {venue.description}
          </Typography>
        </Box>

        {/* Bottom row: price, capacity, rating, CTA */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
            pt: 1.5,
            borderTop: "1px solid",
            borderColor: "rgba(61,47,37,0.06)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <EuroIcon sx={{ color: "secondary.main", fontSize: 17 }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: "0.9rem",
                }}
              >
                From {venue.price.toLocaleString("de-DE")}€
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PeopleIcon sx={{ color: "text.secondary", fontSize: 17 }} />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.85rem" }}
              >
                Up to {venue.capacity}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Rating
                value={venue.rating}
                precision={0.1}
                size="small"
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": { color: "#d4a853" },
                  fontSize: "1rem",
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontSize: "0.78rem" }}
              >
                ({venue.reviewCount})
              </Typography>
            </Box>
          </Box>

          <Button
            component={RouterLink}
            to={`/venues/${venue.id}`}
            variant="contained"
            size="small"
            sx={{
              bgcolor: "secondary.main",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.82rem",
              px: 2.5,
              py: 0.8,
              borderRadius: 2,
              whiteSpace: "nowrap",
              textTransform: "none",
              "&:hover": { bgcolor: "secondary.dark" },
            }}
          >
            Get a Quote
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  /* ---- Grid View Card ---- */
  const GridCard = ({ venue }: { venue: (typeof venues)[0] }) => (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          bgcolor: "grey.200",
        }}
      >
        <CardActionArea
          component={RouterLink}
          to={`/venues/${venue.id}`}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {venue.image ? (
            <img
              src={venue.image}
              alt={venue.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography variant="body2" sx={{ color: "text.disabled" }}>
              No image
            </Typography>
          )}
        </CardActionArea>
        <Chip
          label={venue.type}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: "rgba(255,255,255,0.92)",
            color: "primary.main",
            fontWeight: 600,
            fontSize: "0.72rem",
          }}
        />
        <IconButton
          onClick={() => handleFavoriteToggle(venue.id)}
          aria-label={
            favorites.includes(venue.id)
              ? "Remove from favorites"
              : "Add to favorites"
          }
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.9)",
            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
            width: 32,
            height: 32,
          }}
        >
          {favorites.includes(venue.id) ? (
            <FavoriteIcon sx={{ color: "#e74c3c", fontSize: 18 }} />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: "text.secondary", fontSize: 18 }}
            />
          )}
        </IconButton>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2, "&:last-child": { pb: 2 } }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to={`/venues/${venue.id}`}
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            color: "primary.main",
            fontSize: "1rem",
            textDecoration: "none",
            "&:hover": { color: "secondary.main" },
            display: "block",
            mb: 0.3,
          }}
        >
          {venue.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <LocationOnIcon sx={{ color: "text.secondary", fontSize: 14 }} />
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: "0.78rem" }}
          >
            {venue.location}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            mb: 1.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              fontSize: "0.88rem",
            }}
          >
            From {venue.price.toLocaleString("de-DE")}€
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <PeopleIcon sx={{ color: "text.secondary", fontSize: 15 }} />
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
              {venue.capacity}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <Rating
            value={venue.rating}
            precision={0.1}
            size="small"
            readOnly
            sx={{
              "& .MuiRating-iconFilled": { color: "#d4a853" },
              fontSize: "0.9rem",
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: "0.72rem" }}
          >
            ({venue.reviewCount})
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to={`/venues/${venue.id}`}
          variant="contained"
          fullWidth
          size="small"
          sx={{
            bgcolor: "secondary.main",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.8rem",
            py: 0.7,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { bgcolor: "secondary.dark" },
          }}
        >
          Get a Quote
        </Button>
      </CardContent>
    </Card>
  );

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

        {/* Top Search Bar */}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ color: "text.secondary", fontSize: 20 }}
                      />
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
                onChange={(e) => setSortBy(e.target.value)}
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
                onChange={(_, val) => val && setViewMode(val)}
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
            {isMobile && (
              <Button
                variant="outlined"
                startIcon={<TuneIcon />}
                onClick={() => setDrawerOpen(true)}
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
          {(selectedTypes.length > 0 ||
            priceRange[0] > 0 ||
            priceRange[1] < 25000) && (
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
                  onDelete={() => handleTypeToggle(type)}
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
              {(priceRange[0] > 0 || priceRange[1] < 25000) && (
                <Chip
                  label={`${priceRange[0].toLocaleString("de-DE")}€ - ${priceRange[1].toLocaleString("de-DE")}€`}
                  size="small"
                  onDelete={() => setPriceRange([0, 25000])}
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
              )}
              <Button
                size="small"
                onClick={clearAllFilters}
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
              {filterContent}
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
            {filterContent}
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
                    setSearch("");
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
                  <ListCard key={venue.id} venue={venue} />
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
                  <GridCard key={venue.id} venue={venue} />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

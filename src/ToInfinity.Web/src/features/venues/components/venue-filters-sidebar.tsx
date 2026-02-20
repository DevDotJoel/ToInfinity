import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import {
  VenueTypeLabels,
  AllVenueTypes,
  VenueStyleLabels,
  AllVenueStyles,
  VenueAmenityLabels,
  AllVenueAmenities,
  hasFlag,
  toggleFlag,
} from "../types";

interface VenueFiltersSidebarProps {
  selectedType: number | undefined;
  onTypeChange: (type: number | undefined) => void;
  selectedStyles: number;
  onStylesChange: (styles: number) => void;
  selectedAmenities: number;
  onAmenitiesChange: (amenities: number) => void;
  onClearAll: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

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

export const VenueFiltersSidebar = ({
  selectedType,
  onTypeChange,
  selectedStyles,
  onStylesChange,
  selectedAmenities,
  onAmenitiesChange,
  onClearAll,
  isMobile = false,
  onClose,
}: VenueFiltersSidebarProps) => {
  const activeFilterCount =
    (selectedType !== undefined ? 1 : 0) +
    (selectedStyles > 0 ? 1 : 0) +
    (selectedAmenities > 0 ? 1 : 0);

  const [typeOpen, setTypeOpen] = useState(true);
  const [stylesOpen, setStylesOpen] = useState(true);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);

  const venueTypeValues = AllVenueTypes;

  return (
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
        {isMobile && onClose && (
          <IconButton onClick={onClose} size="small" aria-label="Close filters">
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {activeFilterCount > 0 && (
        <Button
          size="small"
          onClick={onClearAll}
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.75,
            pl: 0.5,
            pb: 1.5,
          }}
        >
          {venueTypeValues.map((value) => {
            const selected = selectedType === value;
            return (
              <Chip
                key={value}
                label={VenueTypeLabels[value]}
                size="small"
                onClick={() => onTypeChange(selected ? undefined : value)}
                variant={selected ? "filled" : "outlined"}
                sx={{
                  fontWeight: selected ? 600 : 400,
                  fontSize: "0.82rem",
                  borderColor: selected
                    ? "secondary.main"
                    : "rgba(61,47,37,0.2)",
                  bgcolor: selected ? "rgba(196,114,78,0.12)" : "transparent",
                  color: selected ? "secondary.dark" : "text.secondary",
                  "&:hover": {
                    bgcolor: selected
                      ? "rgba(196,114,78,0.18)"
                      : "rgba(61,47,37,0.04)",
                  },
                  transition: "all 0.15s ease",
                }}
              />
            );
          })}
        </Box>
      </Collapse>

      <Divider sx={{ mb: 1.5 }} />

      {/* Venue Styles */}
      <SectionHeader
        label="Styles"
        open={stylesOpen}
        onToggle={() => setStylesOpen(!stylesOpen)}
      />
      <Collapse in={stylesOpen}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.75,
            pl: 0.5,
            pb: 1.5,
          }}
        >
          {AllVenueStyles.map((flag) => {
            const selected = hasFlag(selectedStyles, flag);
            return (
              <Chip
                key={flag}
                label={VenueStyleLabels[flag]}
                size="small"
                onClick={() => onStylesChange(toggleFlag(selectedStyles, flag))}
                variant={selected ? "filled" : "outlined"}
                sx={{
                  fontWeight: selected ? 600 : 400,
                  fontSize: "0.82rem",
                  borderColor: selected
                    ? "secondary.main"
                    : "rgba(61,47,37,0.2)",
                  bgcolor: selected ? "rgba(196,114,78,0.12)" : "transparent",
                  color: selected ? "secondary.dark" : "text.secondary",
                  "&:hover": {
                    bgcolor: selected
                      ? "rgba(196,114,78,0.18)"
                      : "rgba(61,47,37,0.04)",
                  },
                  transition: "all 0.15s ease",
                }}
              />
            );
          })}
        </Box>
      </Collapse>

      <Divider sx={{ mb: 1.5 }} />

      {/* Amenities */}
      <SectionHeader
        label="Amenities"
        open={amenitiesOpen}
        onToggle={() => setAmenitiesOpen(!amenitiesOpen)}
      />
      <Collapse in={amenitiesOpen}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.75,
            pl: 0.5,
            pb: 1.5,
          }}
        >
          {AllVenueAmenities.map((flag) => {
            const selected = hasFlag(selectedAmenities, flag);
            return (
              <Chip
                key={flag}
                label={VenueAmenityLabels[flag]}
                size="small"
                onClick={() =>
                  onAmenitiesChange(toggleFlag(selectedAmenities, flag))
                }
                variant={selected ? "filled" : "outlined"}
                sx={{
                  fontWeight: selected ? 600 : 400,
                  fontSize: "0.82rem",
                  borderColor: selected
                    ? "secondary.main"
                    : "rgba(61,47,37,0.2)",
                  bgcolor: selected ? "rgba(196,114,78,0.12)" : "transparent",
                  color: selected ? "secondary.dark" : "text.secondary",
                  "&:hover": {
                    bgcolor: selected
                      ? "rgba(196,114,78,0.18)"
                      : "rgba(61,47,37,0.04)",
                  },
                  transition: "all 0.15s ease",
                }}
              />
            );
          })}
        </Box>
      </Collapse>

      <Divider sx={{ mb: 1.5 }} />
    </Box>
  );
};

"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import {
  VenueTypeLabels,
  AllVenueTypes,
  VenueStyleLabels,
  AllVenueStyles,
  VenueAmenityLabels,
  AllVenueAmenities,
  hasFlag,
  toggleFlag,
} from "@/types/venue-enums";

interface VenueFiltersSidebarProps {
  selectedType: number | null;
  onTypeChange: (type: number | null) => void;
  selectedStyles: number;
  onStylesChange: (styles: number) => void;
  selectedAmenities: number;
  onAmenitiesChange: (amenities: number) => void;
  onClearAll: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

interface SectionHeaderProps {
  label: string;
  open: boolean;
  onToggle: () => void;
}

function SectionHeader({ label, open, onToggle }: SectionHeaderProps) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        py: 1,
        "&:hover": {
          "& .MuiTypography-root": {
            color: "secondary.main",
          },
        },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          fontSize: "0.95rem",
          transition: "color 0.2s",
        }}
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
}

export default function VenueFiltersSidebar({
  selectedType,
  onTypeChange,
  selectedStyles,
  onStylesChange,
  selectedAmenities,
  onAmenitiesChange,
  onClearAll,
  isMobile = false,
  onClose,
}: VenueFiltersSidebarProps) {
  const [typeOpen, setTypeOpen] = useState(true);
  const [stylesOpen, setStylesOpen] = useState(true);
  const [amenitiesOpen, setAmenitiesOpen] = useState(true);

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : 280,
        bgcolor: "white",
        p: { xs: 2, md: 2.5 },
        borderRadius: isMobile ? 0 : 2,
        boxShadow: isMobile ? "none" : "0 2px 8px rgba(0,0,0,0.08)",
        height: isMobile ? "100%" : "fit-content",
        position: isMobile ? "relative" : "sticky",
        top: isMobile ? 0 : 20,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            fontSize: "1.1rem",
          }}
        >
          Filters
        </Typography>
        {isMobile && onClose && (
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Clear All Button */}
      <Button
        fullWidth
        variant="text"
        size="small"
        onClick={onClearAll}
        sx={{
          mb: 2,
          color: "secondary.main",
          "&:hover": {
            bgcolor: "rgba(196,114,78,0.08)",
          },
        }}
      >
        Clear All Filters
      </Button>

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
          {AllVenueTypes.map((type) => {
            const selected = selectedType === type;
            return (
              <Chip
                key={type}
                label={VenueTypeLabels[type]}
                size="small"
                onClick={() => onTypeChange(selected ? null : type)}
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

      {/* Styles */}
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
}

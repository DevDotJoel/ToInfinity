import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface VenueFiltersSidebarProps {
  venueTypes: string[];
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
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
  venueTypes,
  selectedTypes,
  onTypeToggle,
  onClearAll,
  isMobile = false,
  onClose,
}: VenueFiltersSidebarProps) => {
  const activeFilterCount = selectedTypes.length;
  const typeOpen = true;

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
      <SectionHeader label="Venue Type" open={typeOpen} onToggle={() => {}} />
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
                    onChange={() => onTypeToggle(type)}
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
    </Box>
  );
};

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link as RouterLink } from "react-router-dom";
import type { QuoteRequest } from "../../../lib/data";
import { STATUS_CONFIG } from "../quotes.constants";
import { timeAgo, formatDate } from "../quotes.utils";

interface QuoteCardProps {
  quote: QuoteRequest;
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  const statusCfg = STATUS_CONFIG[quote.status];

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1.5, md: 2.5 },
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 2.5 },
        transition: "background 0.15s",
        "&:hover": { bgcolor: "rgba(196,114,78,0.02)" },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          width: { xs: 70, md: 100 },
          height: { xs: 70, md: 80 },
          borderRadius: 2,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={quote.serviceImage}
          alt={quote.serviceName}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            mb: 0.5,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "primary.main",
                fontSize: { xs: "0.92rem", md: "1rem" },
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {quote.serviceName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mt: 0.3,
              }}
            >
              <Chip
                label={quote.serviceType === "venue" ? "Venue" : "Catering"}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  bgcolor: "rgba(61,47,37,0.06)",
                  color: "text.secondary",
                }}
              />
              {quote.location && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.2,
                  }}
                >
                  <LocationOnIcon
                    sx={{ fontSize: 13, color: "text.secondary" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.72rem",
                    }}
                  >
                    {quote.location}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Status chip */}
          <Chip
            icon={statusCfg.icon as React.ReactElement}
            label={statusCfg.label}
            size="small"
            sx={{
              bgcolor: statusCfg.bgcolor,
              color: statusCfg.color,
              fontWeight: 700,
              fontSize: "0.75rem",
              height: 26,
              flexShrink: 0,
              "& .MuiChip-icon": { color: statusCfg.color },
            }}
          />
        </Box>

        {/* Details */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.4,
            }}
          >
            <CalendarMonthIcon sx={{ fontSize: 15, color: "text.secondary" }} />
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.78rem" }}
            >
              {quote.eventMonth} {quote.eventYear}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.4,
            }}
          >
            <PeopleIcon sx={{ fontSize: 15, color: "text.secondary" }} />
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.78rem" }}
            >
              {quote.guestRange} guests
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              fontSize: "0.78rem",
            }}
          >
            {quote.priceLabel}
          </Typography>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: "0.72rem" }}
          >
            Submitted {timeAgo(quote.submittedAt)}
            {quote.repliedAt && ` · Replied ${formatDate(quote.repliedAt)}`}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.3 }}>
            <Tooltip title="View venue">
              <IconButton
                size="small"
                component={RouterLink}
                to={`/venues/${quote.serviceName
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")}`}
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "secondary.main" },
                }}
              >
                <OpenInNewIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove">
              <IconButton
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "#c44e4e" },
                }}
              >
                <DeleteOutlineIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuoteCard;

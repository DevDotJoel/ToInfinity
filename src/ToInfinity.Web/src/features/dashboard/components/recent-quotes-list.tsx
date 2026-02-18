import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import type { QuoteRequest } from "../../../lib/data";
import { STATUS_COLORS } from "../dashboard.constants";

interface RecentQuotesListProps {
  quotes: QuoteRequest[];
}

export function RecentQuotesList({ quotes }: RecentQuotesListProps) {
  const getStatusColor = (status: string) => {
    return (
      STATUS_COLORS[status as keyof typeof STATUS_COLORS] ||
      STATUS_COLORS.declined
    );
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(61,47,37,0.06)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            color: "primary.main",
            fontSize: "1.1rem",
          }}
        >
          Recent Quote Requests
        </Typography>
        <Button
          component={Link}
          to="/app/quotes"
          size="small"
          endIcon={<ArrowForwardIcon sx={{ fontSize: "16px !important" }} />}
          sx={{
            color: "secondary.main",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.82rem",
            "&:hover": { bgcolor: "rgba(196,114,78,0.06)" },
          }}
        >
          View all
        </Button>
      </Box>
      <Divider />
      <Box sx={{ flex: 1 }}>
        {quotes.map((quote, i) => {
          const statusColor = getStatusColor(quote.status);
          return (
            <Box key={quote.id}>
              {i > 0 && <Divider />}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  px: 2.5,
                  py: 1.5,
                  transition: "background 0.15s",
                  "&:hover": { bgcolor: "rgba(196,114,78,0.02)" },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    bgcolor:
                      quote.serviceType === "venue"
                        ? "rgba(61,47,37,0.06)"
                        : "rgba(196,114,78,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {quote.serviceType === "venue" ? (
                    <StoreIcon sx={{ fontSize: 20, color: "#3d2f25" }} />
                  ) : (
                    <ReceiptLongIcon sx={{ fontSize: 20, color: "#c4724e" }} />
                  )}
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.92rem",
                      color: "primary.main",
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
                      gap: 1.5,
                      mt: 0.3,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.4 }}
                    >
                      <CalendarMonthIcon
                        sx={{ fontSize: 13, color: "text.secondary" }}
                      />
                      <Typography
                        sx={{ fontSize: "0.78rem", color: "text.secondary" }}
                      >
                        {quote.eventMonth} {quote.eventYear}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.4 }}
                    >
                      <PeopleIcon
                        sx={{ fontSize: 13, color: "text.secondary" }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.78rem",
                          color: "secondary.main",
                          fontWeight: 600,
                        }}
                      >
                        {quote.guestRange} guests
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ fontSize: "0.75rem", color: "text.disabled" }}
                    >
                      {new Date(quote.submittedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={
                    quote.status.charAt(0).toUpperCase() + quote.status.slice(1)
                  }
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.74rem",
                    height: 26,
                    flexShrink: 0,
                    bgcolor: statusColor.bg,
                    color: statusColor.color,
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}

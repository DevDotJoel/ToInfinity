import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { STATUS_COLORS } from "../dashboard.constants";

interface QuoteCountsType {
  total: number;
  pending: number;
  replied: number;
  accepted: number;
  declined?: number;
}

interface QuoteStatusBreakdownProps {
  counts: QuoteCountsType;
}

export function QuoteStatusBreakdown({ counts }: QuoteStatusBreakdownProps) {
  const statusBreakdown = [
    {
      key: "pending" as const,
      count: counts.pending,
      ...STATUS_COLORS.pending,
    },
    {
      key: "replied" as const,
      count: counts.replied,
      ...STATUS_COLORS.replied,
    },
    {
      key: "accepted" as const,
      count: counts.accepted,
      ...STATUS_COLORS.accepted,
    },
  ];

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
          Quote Status
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
      <Box
        sx={{
          p: 2.5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {statusBreakdown.map((item) => (
          <Box key={item.key}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: item.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    color: "text.primary",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
              <Typography
                sx={{ fontWeight: 800, fontSize: "1.3rem", color: item.color }}
              >
                {item.count}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={counts.total > 0 ? (item.count / counts.total) * 100 : 0}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: "rgba(61,47,37,0.04)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: item.color,
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Card>
  );
}

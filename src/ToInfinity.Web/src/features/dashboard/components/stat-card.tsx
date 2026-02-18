import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: ReactNode;
  color: string;
  bg: string;
}

export function StatCard({
  label,
  value,
  sub,
  icon,
  color,
  bg,
}: StatCardProps) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid rgba(61,47,37,0.06)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2.5,
            bgcolor: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
          }}
        >
          {icon}
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: color,
            fontSize: { xs: "1.6rem", md: "2rem" },
            lineHeight: 1,
            mb: 0.5,
          }}
        >
          {value}
        </Typography>
        <Typography
          sx={{ color: "text.secondary", fontSize: "0.85rem", fontWeight: 500 }}
        >
          {label}
        </Typography>
        {sub && (
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              mt: 0.3,
              opacity: 0.7,
            }}
          >
            {sub}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

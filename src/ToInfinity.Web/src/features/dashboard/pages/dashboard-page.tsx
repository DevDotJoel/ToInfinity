import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../../../features/auth";
import { mockQuoteRequests, venues } from "../../../lib/data";
import { StatCard } from "../components/stat-card";
import { QuoteStatusBreakdown } from "../components/quote-status-breakdown";
import { RecentQuotesList } from "../components/recent-quotes-list";
import { calculateQuoteCounts, getRecentQuotes } from "../dashboard.utils";
import { STAT_CARD_COLORS } from "../dashboard.constants";

export function DashboardPage() {
  const { user } = useAuth();

  const quoteCounts = calculateQuoteCounts(mockQuoteRequests);
  const recentQuotes = getRecentQuotes(mockQuoteRequests, 4);

  // Filter user venues (Beverly Hills/Napa Valley for demo)
  const userVenues = venues.filter(
    (v: { location: string }) =>
      v.location === "Beverly Hills, CA" || v.location === "Napa Valley, CA",
  );

  const totalViews = 1247;
  const quotesToday = 2;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{ color: "text.secondary", fontSize: "0.9rem", mb: 0.3 }}
          >
            Welcome back,
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              color: "primary.main",
              fontSize: { xs: "1.5rem", md: "1.85rem" },
            }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>
      </Box>

      {/* Stats row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            label: "Total Venues",
            value: userVenues.length,
            icon: <StoreIcon sx={{ fontSize: 24 }} />,
            ...STAT_CARD_COLORS.venues,
            sub: "Active listings",
          },
          {
            label: "Total Quotes",
            value: quoteCounts.total,
            icon: <ReceiptLongIcon sx={{ fontSize: 24 }} />,
            ...STAT_CARD_COLORS.quotes,
            sub: `${quoteCounts.pending} pending`,
          },
          {
            label: "Quotes Today",
            value: quotesToday,
            icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
            ...STAT_CARD_COLORS.quotesDaily,
            sub: "+12% vs yesterday",
          },
          {
            label: "Profile Views",
            value: totalViews.toLocaleString(),
            icon: <VisibilityIcon sx={{ fontSize: 24 }} />,
            ...STAT_CARD_COLORS.views,
            sub: "Last 30 days",
          },
        ].map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
            <StatCard
              label={stat.label}
              value={stat.value}
              sub={stat.sub}
              icon={stat.icon}
              color={stat.color}
              bg={stat.bg}
            />
          </Grid>
        ))}
      </Grid>

      {/* Main content: 3-column layout */}
      <Grid container spacing={3}>
        {/* Quote status breakdown */}
        <Grid size={{ xs: 12, md: 4 }}>
          <QuoteStatusBreakdown counts={quoteCounts} />
        </Grid>

        {/* Recent quotes */}
        <Grid size={{ xs: 12, md: 8 }}>
          <RecentQuotesList quotes={recentQuotes} />
        </Grid>
      </Grid>
    </Container>
  );
}

import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import StoreIcon from "@mui/icons-material/Store";
import { useMyVenues } from "../hooks";
import { MyVenueCard } from "../components/my-venue-card";

export default function MyVenuesPage() {
  const { data: venues, isLoading } = useMyVenues();

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40vh",
          }}
        >
          <CircularProgress sx={{ color: "secondary.main" }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "primary.main",
            fontSize: { xs: "1.3rem", md: "1.6rem" },
          }}
        >
          My Venues
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/app/venues/create"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "secondary.main",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            "&:hover": { bgcolor: "secondary.dark" },
          }}
        >
          Add Venue
        </Button>
      </Box>

      {!venues || venues.length === 0 ? (
        <Card
          sx={{
            borderRadius: 3,
            border: "1px solid rgba(61,47,37,0.06)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            textAlign: "center",
            py: 10,
            px: 3,
          }}
        >
          <StoreIcon
            sx={{ fontSize: 56, color: "rgba(61,47,37,0.12)", mb: 2 }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: "text.secondary",
              mb: 1,
            }}
          >
            No venues yet
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.9rem",
              mb: 3,
              maxWidth: 400,
              mx: "auto",
            }}
          >
            List your first wedding venue and start receiving quote requests
            from couples.
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/app/venues/create"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "secondary.main",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": { bgcolor: "secondary.dark" },
            }}
          >
            Add Your First Venue
          </Button>
        </Card>
      ) : (
        <Grid container spacing={2.5}>
          {venues.map((venue) => (
            <MyVenueCard key={venue.id} venue={venue} />
          ))}
        </Grid>
      )}
    </Container>
  );
}

import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useVenue, useUpdateVenue } from "../hooks";
import { VenueForm } from "../components/venue-form";
import type { EditVenueFormData } from "../schemas/edit-venue.schema";

export default function EditVenuePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const { data: venue, isLoading: isLoadingVenue } = useVenue(id!);

  const { mutate: updateVenue, isPending } = useUpdateVenue({
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        navigate("/app/venues");
      }, 2000);
    },
    onError: () => {
      setServerError("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (data: EditVenueFormData) => {
    setServerError("");
    updateVenue({ id: id!, data });
  };

  if (isLoadingVenue) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          py: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress sx={{ color: "secondary.main" }} />
      </Container>
    );
  }

  if (!venue) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography sx={{ color: "text.secondary" }}>
          Venue not found.
        </Typography>
      </Container>
    );
  }

  if (success) {
    return (
      <Fade in>
        <Container
          maxWidth="xl"
          sx={{
            py: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "rgba(46,125,50,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2.5,
            }}
          >
            <CheckCircleIcon sx={{ color: "#2e7d32", fontSize: 40 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "primary.main",
              mb: 1,
            }}
          >
            Venue updated!
          </Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: "0.95rem", mb: 1 }}
          >
            Your changes have been saved successfully.
          </Typography>
          <CircularProgress size={20} sx={{ mt: 1, color: "secondary.main" }} />
          <Typography
            sx={{ color: "text.secondary", fontSize: "0.82rem", mt: 1 }}
          >
            Redirecting to My Venues...
          </Typography>
        </Container>
      </Fade>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <IconButton
          component={RouterLink}
          to="/app/venues"
          size="small"
          sx={{
            bgcolor: "rgba(61,47,37,0.06)",
            "&:hover": { bgcolor: "rgba(196,114,78,0.1)" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "primary.main",
              fontSize: { xs: "1.4rem", md: "1.7rem" },
            }}
          >
            Edit venue
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.88rem" }}>
            Update your venue details below.
          </Typography>
        </Box>
      </Box>

      <VenueForm
        mode="edit"
        venue={venue}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/app/venues")}
        isSubmitting={isPending}
        serverError={serverError}
      />
    </Container>
  );
}

import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCreateVenue } from "../hooks";
import { CreateVenueForm } from "../components/create-venue-form";
import type { CreateVenueFormData } from "../schemas/create-venue.schema";

export default function CreateVenuePage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const { mutate: createVenue, isPending } = useCreateVenue({
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

  const handleSubmit = (data: CreateVenueFormData) => {
    setServerError("");
    createVenue(data);
  };

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
            Venue submitted!
          </Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: "0.95rem", mb: 1 }}
          >
            Your venue is now under review. We will notify you once it is
            published.
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
            List your venue
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.88rem" }}>
            Fill in the details below to showcase your venue to thousands of
            couples.
          </Typography>
        </Box>
      </Box>

      <CreateVenueForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/app/venues")}
        isSubmitting={isPending}
        serverError={serverError}
      />
    </Container>
  );
}

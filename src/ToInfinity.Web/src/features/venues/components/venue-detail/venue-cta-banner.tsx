import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

interface VenueCtaBannerProps {
  venueName: string;
  onGetQuote: () => void;
}

export const VenueCtaBanner = ({
  venueName,
  onGetQuote,
}: VenueCtaBannerProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        bgcolor: "primary.main",
        textAlign: "center",
        mt: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: "#fff",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          mb: 1,
        }}
      >
        Interested in {venueName}?
      </Typography>
      <Typography
        sx={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.95rem",
          mb: 3,
          maxWidth: 480,
          mx: "auto",
        }}
      >
        Request a personalized quote and our team will get back to you within 24
        hours.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={onGetQuote}
        sx={{
          bgcolor: "secondary.main",
          color: "#fff",
          px: 5,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 700,
          textTransform: "none",
          "&:hover": { bgcolor: "secondary.dark" },
        }}
      >
        Get a Quote
      </Button>
    </Paper>
  );
};

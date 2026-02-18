import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link as RouterLink } from "react-router-dom";

const QuoteEmptyState = () => {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <ReceiptLongIcon
        sx={{ fontSize: 48, color: "rgba(61,47,37,0.15)", mb: 2 }}
      />
      <Typography
        variant="h6"
        sx={{
          fontFamily: "var(--font-serif), Georgia, serif",
          color: "text.secondary",
          mb: 1,
        }}
      >
        No quotes found
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        You have no quote requests with this status yet.
      </Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to="/venues"
        sx={{
          bgcolor: "secondary.main",
          color: "#fff",
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 2,
          "&:hover": { bgcolor: "secondary.dark" },
        }}
      >
        Browse Venues
      </Button>
    </Box>
  );
};

export default QuoteEmptyState;

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import BlockIcon from "@mui/icons-material/Block";
import { Link } from "react-router-dom";

const PaymentCancelPage = () => {
  return (
    <Container maxWidth="sm" sx={{ pt: { xs: 8, md: 12 }, pb: 8 }}>
      {/* Error icon */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "rgba(211, 47, 47, 0.07)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 44, color: "#d32f2f" }} />
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 700,
            color: "text.primary",
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            mb: 1,
          }}
        >
          Payment unsuccessful
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "1.05rem",
            lineHeight: 1.6,
            maxWidth: 420,
            mx: "auto",
          }}
        >
          Your payment could not be processed. No charges were made to your
          account.
        </Typography>
      </Box>

      {/* Common reasons */}
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid rgba(61,47,37,0.08)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 700,
            color: "text.primary",
            fontSize: "1rem",
            mb: 2,
          }}
        >
          Common reasons this may happen
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {[
            {
              icon: (
                <CreditCardIcon
                  sx={{ fontSize: 18, color: "text.secondary" }}
                />
              ),
              text: "Insufficient funds or card limit reached",
            },
            {
              icon: (
                <BlockIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              ),
              text: "Card declined by your bank",
            },
            {
              icon: (
                <WifiOffIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              ),
              text: "Connection interrupted during checkout",
            },
          ].map((reason) => (
            <Box
              key={reason.text}
              sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 1.5,
                  bgcolor: "rgba(61, 47, 37, 0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {reason.icon}
              </Box>
              <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                {reason.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>

      {/* Actions */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
        <Button
          fullWidth
          variant="contained"
          component={Link}
          to="/app/pricing"
          startIcon={<RefreshIcon sx={{ fontSize: 20 }} />}
          sx={{
            bgcolor: "secondary.main",
            color: "#fff",
            py: 1.5,
            fontWeight: 700,
            fontSize: "0.95rem",
            borderRadius: 2,
            "&:hover": { bgcolor: "secondary.dark" },
          }}
        >
          Try again
        </Button>

        <Button
          fullWidth
          variant="outlined"
          component="a"
          href="mailto:support@tooinfinity.com"
          startIcon={<SupportAgentIcon sx={{ fontSize: 20 }} />}
          sx={{
            borderColor: "rgba(61, 47, 37, 0.2)",
            color: "text.primary",
            py: 1.5,
            fontWeight: 600,
            fontSize: "0.95rem",
            borderRadius: 2,
            "&:hover": {
              borderColor: "secondary.main",
              color: "secondary.main",
              bgcolor: "rgba(196, 114, 78, 0.04)",
            },
          }}
        >
          Contact support
        </Button>
      </Box>

      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
        sx={{
          color: "text.secondary",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.88rem",
          display: "flex",
          mx: "auto",
          "&:hover": { color: "secondary.main", bgcolor: "transparent" },
        }}
      >
        Back to home
      </Button>
    </Container>
  );
};

export default PaymentCancelPage;

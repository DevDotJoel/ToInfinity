import { useSearchParams, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteIcon from "@mui/icons-material/Favorite";

const planDetails: Record<string, { name: string; price: string }> = {
  basic: { name: "Basic", price: "713" },
  professional: { name: "Professional", price: "1,353" },
  elite: { name: "Elite", price: "2,337" },
};

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const planKey = searchParams.get("plan") || "professional";
  const plan = planDetails[planKey] || planDetails.professional;

  return (
    <Container maxWidth="sm" sx={{ pt: { xs: 8, md: 12 }, pb: 8 }}>
      {/* Success icon */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "rgba(46, 125, 50, 0.08)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 44, color: "#2e7d32" }} />
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
          Payment successful!
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "1.05rem",
            lineHeight: 1.6,
            maxWidth: 400,
            mx: "auto",
          }}
        >
          Your subscription is now active. Welcome to TooInfinity.
        </Typography>
      </Box>

      {/* Order summary card */}
      <Card
        sx={{
          p: 0,
          borderRadius: 3,
          border: "1px solid rgba(61,47,37,0.08)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          overflow: "hidden",
          mb: 4,
        }}
      >
        {/* Plan header */}
        <Box
          sx={{
            bgcolor: "primary.main",
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <FavoriteIcon sx={{ color: "secondary.light", fontSize: 20 }} />
            <Typography
              sx={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontWeight: 700,
                color: "#f7f3f0",
                fontSize: "1.15rem",
              }}
            >
              {plan.name} Plan
            </Typography>
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              color: "secondary.light",
              fontSize: "1.1rem",
            }}
          >
            {plan.price}€/year
          </Typography>
        </Box>

        {/* Details */}
        <Box sx={{ px: 3, py: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.2,
            }}
          >
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
              Subscription
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: "text.primary",
                fontSize: "0.9rem",
              }}
            >
              {plan.name} Annual
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.2,
            }}
          >
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
              Status
            </Typography>
            <Box
              sx={{
                bgcolor: "rgba(46, 125, 50, 0.08)",
                color: "#2e7d32",
                fontWeight: 700,
                fontSize: "0.8rem",
                px: 1.5,
                py: 0.3,
                borderRadius: 1.5,
              }}
            >
              Active
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.2,
            }}
          >
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
              Billing cycle
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: "text.primary",
                fontSize: "0.9rem",
              }}
            >
              Annual
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.2,
            }}
          >
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
              Next renewal
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: "text.primary",
                fontSize: "0.9rem",
              }}
            >
              {new Date(
                new Date().setFullYear(new Date().getFullYear() + 1),
              ).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* Next steps */}
      <Typography
        sx={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontWeight: 700,
          color: "text.primary",
          fontSize: "1.1rem",
          mb: 2,
          textAlign: "center",
        }}
      >
        What to do next
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 4 }}>
        {[
          {
            icon: <StoreIcon sx={{ fontSize: 20, color: "secondary.main" }} />,
            title: "Set up your venue profile",
            desc: "Add photos, description, and pricing to attract couples.",
            to: "/app/dashboard/venues",
          },
          {
            icon: (
              <ReceiptLongIcon sx={{ fontSize: 20, color: "secondary.main" }} />
            ),
            title: "Manage incoming quotes",
            desc: "View and respond to quote requests from couples.",
            to: "/app/dashboard/quotes",
          },
          {
            icon: (
              <DashboardIcon sx={{ fontSize: 20, color: "secondary.main" }} />
            ),
            title: "View your dashboard",
            desc: "Track your venue performance and analytics.",
            to: "/app/dashboard",
          },
        ].map((step) => (
          <Card
            key={step.title}
            component={Link}
            to={step.to}
            sx={{
              p: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
              textDecoration: "none",
              border: "1px solid rgba(61,47,37,0.06)",
              borderRadius: 2.5,
              boxShadow: "none",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "secondary.main",
                bgcolor: "rgba(196, 114, 78, 0.03)",
                boxShadow: "0 2px 12px rgba(196,114,78,0.08)",
              },
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: "rgba(196, 114, 78, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {step.icon}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  fontSize: "0.92rem",
                }}
              >
                {step.title}
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.82rem" }}>
                {step.desc}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>

      {/* CTA */}
      <Button
        fullWidth
        variant="contained"
        component={Link}
        to="/app/dashboard"
        sx={{
          bgcolor: "secondary.main",
          color: "#fff",
          py: 1.5,
          fontWeight: 700,
          fontSize: "1rem",
          borderRadius: 2,
          "&:hover": { bgcolor: "secondary.dark" },
        }}
      >
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default PaymentSuccessPage;

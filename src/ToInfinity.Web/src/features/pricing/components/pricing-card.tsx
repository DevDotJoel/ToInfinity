import { Box, Button, Card, Chip, Divider, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import type { PricingPlan } from "../types";
import PricingExtras from "./pricing-extras";
import { useCreateCheckoutSession } from "../hooks";

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const createCheckoutSession = useCreateCheckoutSession();

  const handleCTA = () => {
    createCheckoutSession.mutate(plan.name);
  };

  return (
    <Card
      sx={{
        p: 0,
        position: "relative",
        border: plan.highlighted ? "2px solid" : "1px solid",
        borderColor: plan.highlighted
          ? "secondary.main"
          : "rgba(61, 47, 37, 0.1)",
        borderRadius: 3,
        overflow: "visible",
        boxShadow: plan.highlighted
          ? "0 8px 32px rgba(196, 114, 78, 0.18)"
          : "0 2px 12px rgba(0,0,0,0.05)",
        transform: plan.highlighted ? { md: "scale(1.04)" } : "none",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        "&:hover": {
          boxShadow: plan.highlighted
            ? "0 12px 40px rgba(196, 114, 78, 0.25)"
            : "0 6px 24px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Recommended badge */}
      {plan.highlighted && (
        <Box
          sx={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <Chip
            icon={
              <StarIcon
                sx={{ fontSize: "15px !important", color: "#fff !important" }}
              />
            }
            label="Recommended"
            sx={{
              bgcolor: "secondary.main",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.78rem",
              height: 28,
              px: 0.5,
            }}
          />
        </Box>
      )}

      <Box sx={{ p: { xs: 3, md: 3.5 } }}>
        {/* Plan name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          {plan.name === "Elite" && (
            <WorkspacePremiumIcon
              sx={{ color: "secondary.main", fontSize: 22 }}
            />
          )}
          <Typography
            variant="h5"
            sx={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontWeight: 700,
              color: "text.primary",
              fontSize: "1.35rem",
            }}
          >
            {plan.number ? `PLAN ${plan.number} — ${plan.name}` : plan.name}
            {plan.highlighted && !plan.number && " (Recommended)"}
          </Typography>
        </Box>

        {/* Price */}
        <Box
          sx={{ display: "flex", alignItems: "baseline", gap: 0.5, mb: 0.5 }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "2.8rem",
              color: plan.highlighted ? "secondary.main" : "text.primary",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {plan.price}€
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 2.5,
            fontSize: "0.88rem",
          }}
        >
          per year
        </Typography>

        {/* Best for */}
        <Box
          sx={{
            bgcolor: plan.highlighted
              ? "rgba(196, 114, 78, 0.06)"
              : "rgba(61, 47, 37, 0.03)",
            borderRadius: 2,
            p: 1.5,
            mb: 2.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontSize: "0.7rem",
            }}
          >
            Best for
          </Typography>
          {plan.bestFor.map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{ color: "text.primary", fontSize: "0.85rem", mt: 0.3 }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* CTA */}
        <Button
          fullWidth
          variant={plan.highlighted ? "contained" : "outlined"}
          size="large"
          onClick={handleCTA}
          disabled={createCheckoutSession.isPending}
          sx={
            plan.highlighted
              ? {
                  bgcolor: "secondary.main",
                  color: "#fff",
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "secondary.dark" },
                }
              : {
                  borderColor:
                    plan.name === "Elite"
                      ? "secondary.main"
                      : "rgba(61, 47, 37, 0.25)",
                  color:
                    plan.name === "Elite" ? "secondary.main" : "text.primary",
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "secondary.main",
                    bgcolor: "rgba(196, 114, 78, 0.04)",
                    color: "secondary.main",
                  },
                }
          }
        >
          {plan.cta}
        </Button>

        <Divider sx={{ my: 2.5 }} />

        {/* Features */}
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: "text.secondary",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontSize: "0.7rem",
            display: "block",
            mb: 1.5,
          }}
        >
          Includes
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {plan.features.map((feature) => (
            <Box
              key={feature}
              sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 18,
                  color: plan.highlighted
                    ? "secondary.main"
                    : "rgba(61, 47, 37, 0.4)",
                  mt: 0.15,
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  fontSize: "0.88rem",
                  lineHeight: 1.5,
                }}
              >
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Extras for Professional */}
        {plan.extras && <PricingExtras extras={plan.extras} />}
      </Box>
    </Card>
  );
};

export default PricingCard;

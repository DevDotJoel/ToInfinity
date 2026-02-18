import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { User } from "../../../features/auth/types";

interface AccountSubscriptionProps {
  user: User;
}

const PLAN_DETAILS: Record<string, { label: string; color: string }> = {
  Basic: { label: "Basic", color: "#6b5e54" },
  Professional: { label: "Professional", color: "#c4724e" },
  Elite: { label: "Elite", color: "#3d2f25" },
};

const AccountSubscription = ({ user }: AccountSubscriptionProps) => {
  const hasSubscription =
    user.currentPlan &&
    user.currentPlan !== "None" &&
    user.subscriptionExpiresAt;

  const venueSlots = 1; // TODO: Get from backend or derive from plan

  return (
    <Card
      sx={{
        p: 0,
        border: "1px solid",
        borderColor: "rgba(61,47,37,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 700,
            color: "primary.main",
            fontSize: "1.1rem",
            mb: 0.5,
          }}
        >
          Subscription
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.88rem",
            mb: 2.5,
          }}
        >
          Manage your plan for listing wedding venues on TooInfinity
        </Typography>

        {hasSubscription ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                p: 2.5,
                borderRadius: 2.5,
                bgcolor:
                  user.currentPlan === "Professional"
                    ? "rgba(196,114,78,0.06)"
                    : "rgba(247,243,240,0.5)",
                border: "1px solid",
                borderColor:
                  user.currentPlan === "Professional"
                    ? "rgba(196,114,78,0.2)"
                    : "rgba(61,47,37,0.08)",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{ color: "#2e7d32", fontSize: 20 }}
                  />
                  <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                    {PLAN_DETAILS[user.currentPlan]?.label || user.currentPlan}{" "}
                    Plan
                  </Typography>
                  <Chip
                    label="Active"
                    size="small"
                    sx={{
                      bgcolor: "rgba(46,125,50,0.1)",
                      color: "#2e7d32",
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      height: 22,
                    }}
                  />
                </Box>
                {user.subscriptionExpiresAt && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.84rem",
                    }}
                  >
                    Expires on{" "}
                    {new Date(user.subscriptionExpiresAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.84rem",
                    mt: 0.3,
                  }}
                >
                  {venueSlots} venue slot{venueSlots > 1 ? "s" : ""} included
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  component={RouterLink}
                  to="/app/pricing"
                  sx={{
                    color: "secondary.main",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    "&:hover": { bgcolor: "rgba(196,114,78,0.06)" },
                  }}
                >
                  Upgrade
                </Button>
                <Button
                  sx={{
                    color: "text.secondary",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    "&:hover": { bgcolor: "rgba(61,47,37,0.04)" },
                  }}
                >
                  Cancel Plan
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 3, md: 4 },
              px: 2,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                bgcolor: "rgba(196,114,78,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <AddCircleOutlineIcon
                sx={{ color: "secondary.main", fontSize: 28 }}
              />
            </Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "primary.main",
                fontSize: "1.05rem",
                mb: 0.5,
              }}
            >
              No active subscription
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                maxWidth: 380,
                mx: "auto",
                mb: 3,
                lineHeight: 1.6,
                fontSize: "0.9rem",
              }}
            >
              Subscribe to a plan to list your wedding venue on TooInfinity and
              start receiving quote requests from couples.
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/app/pricing"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
              sx={{
                bgcolor: "secondary.main",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                px: 4,
                py: 1.2,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(196,114,78,0.25)",
                "&:hover": {
                  bgcolor: "secondary.dark",
                  boxShadow: "0 4px 12px rgba(196,114,78,0.35)",
                },
              }}
            >
              View Plans
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default AccountSubscription;

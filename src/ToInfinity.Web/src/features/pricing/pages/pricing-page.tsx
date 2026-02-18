import { Box, Container } from "@mui/material";
import {
  PricingHeader,
  PricingCard,
  TrustSection,
  PricingFooter,
} from "../components";
import { PRICING_PLANS, TRUST_ITEMS } from "../pricing.constants";

const PricingPage = () => {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <PricingHeader
        badge="For Venue Owners"
        title="Choose your annual subscription"
        subtitle={
          <>
            Each subscription covers one wedding venue.
            <br />
            Billing is yearly.
          </>
        }
      />

      {/* Plans grid */}
      <Container
        maxWidth="lg"
        sx={{ mt: { xs: -4, md: -5 }, pb: 8, position: "relative", zIndex: 1 }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            alignItems: "start",
          }}
        >
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </Box>

        {/* Footer note */}
        <PricingFooter
          title="Important information"
          description={
            <>
              Annual billing. Access activates after payment.
              <br />
              Each physical venue requires its own paid slot.
            </>
          }
        />

        {/* Trust section */}
        <TrustSection title="Why choose TooInfinity?" items={TRUST_ITEMS} />
      </Container>
    </Box>
  );
};

export default PricingPage;

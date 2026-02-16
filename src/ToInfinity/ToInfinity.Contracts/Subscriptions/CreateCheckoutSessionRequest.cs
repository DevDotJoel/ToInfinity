namespace ToInfinity.Contracts.Subscriptions;

public record CreateCheckoutSessionRequest(
    string PlanType // "Basic", "Professional", or "Elite"
);

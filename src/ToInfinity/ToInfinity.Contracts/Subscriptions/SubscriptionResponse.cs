namespace ToInfinity.Contracts.Subscriptions;

public record SubscriptionResponse(
    Guid Id,
    string PlanType,
    string Status,
    DateTime StartDate,
    DateTime? ExpiresAt,
    decimal Amount,
    string Currency,
    bool IsActive
);

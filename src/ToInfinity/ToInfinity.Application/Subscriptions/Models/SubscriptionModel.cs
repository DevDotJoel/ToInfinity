namespace ToInfinity.Application.Subscriptions.Models;

public record SubscriptionModel(
    Guid Id,
    Guid UserId,
    string PlanType,
    string Status,
    DateTime StartDate,
    DateTime? ExpiresAt,
    decimal Amount,
    string Currency,
    bool IsActive);

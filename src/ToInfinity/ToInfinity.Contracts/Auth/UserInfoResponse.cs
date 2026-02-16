namespace ToInfinity.Contracts.Auth;

public record UserInfoResponse(
    Guid UserId,
    string Email,
    string FirstName,
    string LastName,
    string CurrentPlan,
    string SubscriptionStatus,
    DateTime? SubscriptionExpiresAt);

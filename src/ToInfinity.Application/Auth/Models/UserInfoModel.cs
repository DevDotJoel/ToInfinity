namespace ToInfinity.Application.Auth.Models;

public record UserInfoModel(
    Guid UserId,
    string Email,
    string FirstName,
    string LastName,
    string CurrentPlan,
    string SubscriptionStatus,
    DateTime? SubscriptionExpiresAt);

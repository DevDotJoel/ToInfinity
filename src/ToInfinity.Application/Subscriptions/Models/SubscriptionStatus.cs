namespace ToInfinity.Application.Subscriptions.Models;

public enum SubscriptionStatus
{
    None = 0,
    Active = 1,
    PastDue = 2,
    Canceled = 3,
    Expired = 4,
    Trialing = 5
}

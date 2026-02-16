using Microsoft.AspNetCore.Identity;
using ToInfinity.Application.Subscriptions.Models;
using ToInfinity.Infrastructure.Identity.Subscriptions.Entities;

namespace ToInfinity.Infrastructure.Identity;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }

    // Current subscription state (denormalized for fast access)
    public PlanType CurrentPlan { get; set; } = PlanType.None;
    public SubscriptionStatus SubscriptionStatus { get; set; } = SubscriptionStatus.None;
    public DateTime? SubscriptionExpiresAt { get; set; }
    public string? StripeCustomerId { get; set; }

    // Current subscription reference
    public Guid? CurrentSubscriptionId { get; set; }
    public Subscription? CurrentSubscription { get; set; }

    // Subscription history
    public ICollection<Subscription> SubscriptionHistory { get; set; } = new List<Subscription>();
}

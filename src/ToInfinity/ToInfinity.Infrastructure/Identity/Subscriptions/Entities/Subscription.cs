using ToInfinity.Application.Subscriptions.Models;

namespace ToInfinity.Infrastructure.Identity.Subscriptions.Entities;

public class Subscription
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public ApplicationUser User { get; set; } = null!;

    public PlanType PlanType { get; set; }
    public SubscriptionStatus Status { get; set; }

    public string StripeSubscriptionId { get; set; } = null!;
    public string StripeCustomerId { get; set; } = null!;

    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? CanceledAt { get; set; }

    public decimal Amount { get; set; }
    public string Currency { get; set; } = "EUR";

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

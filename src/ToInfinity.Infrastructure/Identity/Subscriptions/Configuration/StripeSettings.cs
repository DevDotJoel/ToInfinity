namespace ToInfinity.Infrastructure.Identity.Subscriptions.Configuration;

public class StripeSettings
{
    public string SecretKey { get; set; } = null!;
    public string PublishableKey { get; set; } = null!;
    public string WebhookSecret { get; set; } = null!;
    public string SuccessUrl { get; set; } = null!;
    public string CancelUrl { get; set; } = null!;
    public Dictionary<string, StripePlanConfig> Plans { get; set; } = new();
}

public class StripePlanConfig
{
    public string PriceId { get; set; } = null!;
    public decimal Amount { get; set; }
    public string Name { get; set; } = null!;
}

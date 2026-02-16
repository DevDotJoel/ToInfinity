using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using ToInfinity.Application.Common.Services;
using ToInfinity.Application.Subscriptions.Models;
using ToInfinity.Infrastructure.Identity.Subscriptions.Configuration;
using ToInfinity.Infrastructure.Identity.Subscriptions.Entities;
using ToInfinity.Infrastructure.Persistence;
using StripeSubscription = Stripe.Subscription;
using StripeSubscriptionService = Stripe.SubscriptionService;

namespace ToInfinity.Infrastructure.Identity.Subscriptions.Services;

public class SubscriptionService : ISubscriptionService
{
    private readonly ApplicationDbContext _context;
    private readonly StripeSettings _stripeSettings;

    public SubscriptionService(
        ApplicationDbContext context,
        IOptions<StripeSettings> stripeSettings)
    {
        _context = context;
        _stripeSettings = stripeSettings.Value;
    }

    public async Task<bool> HasActiveSubscriptionAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .Where(u => u.Id == userId)
            .Select(u => new
            {
                u.SubscriptionStatus,
                u.SubscriptionExpiresAt
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (user == null) return false;

        return user.SubscriptionStatus == SubscriptionStatus.Active &&
               user.SubscriptionExpiresAt.HasValue &&
               user.SubscriptionExpiresAt.Value > DateTime.UtcNow;
    }

    public async Task<SubscriptionModel?> GetUserSubscriptionAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        // Get the current subscription (using CurrentSubscriptionId)
        var user = await _context.Users
            .Include(u => u.CurrentSubscription)
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync(cancellationToken);

        if (user?.CurrentSubscription == null)
            return null;

        var subscription = user.CurrentSubscription;

        return new SubscriptionModel(
            Id: subscription.Id,
            UserId: subscription.UserId,
            PlanType: subscription.PlanType.ToString(),
            Status: subscription.Status.ToString(),
            StartDate: subscription.StartDate,
            ExpiresAt: subscription.EndDate,
            Amount: subscription.Amount,
            Currency: subscription.Currency,
            IsActive: subscription.Status == SubscriptionStatus.Active &&
                     subscription.EndDate.HasValue &&
                     subscription.EndDate.Value > DateTime.UtcNow
        );
    }

    public async Task<SubscriptionModel?> GetActiveSubscriptionAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var subscription = await GetUserSubscriptionAsync(userId, cancellationToken);

        return subscription?.IsActive == true ? subscription : null;
    }

    public async Task<List<SubscriptionModel>> GetSubscriptionHistoryAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var subscriptions = await _context.Subscriptions
            .Where(s => s.UserId == userId)
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync(cancellationToken);

        return subscriptions.Select(s => new SubscriptionModel(
            Id: s.Id,
            UserId: s.UserId,
            PlanType: s.PlanType.ToString(),
            Status: s.Status.ToString(),
            StartDate: s.StartDate,
            ExpiresAt: s.EndDate,
            Amount: s.Amount,
            Currency: s.Currency,
            IsActive: s.Status == SubscriptionStatus.Active &&
                     s.EndDate.HasValue &&
                     s.EndDate.Value > DateTime.UtcNow
        )).ToList();
    }

    public async Task<string> CreateSubscriptionCheckoutAsync(
        Guid userId,
        PlanType planType,
        CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync(cancellationToken);

        if (user == null)
            throw new InvalidOperationException("User not found");

        // Get plan configuration
        var planConfig = _stripeSettings.Plans[planType.ToString()];

        // Create Stripe Checkout Session
        var options = new SessionCreateOptions
        {
            Mode = "subscription",
            CustomerEmail = user.Email,
            LineItems = new List<SessionLineItemOptions>
            {
                new()
                {
                    Price = planConfig.PriceId,
                    Quantity = 1
                }
            },
            SuccessUrl = _stripeSettings.SuccessUrl,
            CancelUrl = _stripeSettings.CancelUrl,
            Metadata = new Dictionary<string, string>
            {
                { "userId", userId.ToString() },
                { "planType", planType.ToString() }
            }
        };

        var service = new SessionService();
        var session = await service.CreateAsync(options, cancellationToken: cancellationToken);

        return session.Url;
    }

    public async Task CompleteSubscriptionCheckoutAsync(
        string checkoutSessionId,
        CancellationToken cancellationToken = default)
    {
        // Retrieve Stripe session
        var sessionService = new SessionService();
        var session = await sessionService.GetAsync(
            checkoutSessionId,
            new SessionGetOptions
            {
                Expand = new List<string> { "subscription" }
            },
            cancellationToken: cancellationToken);

        // Extract metadata
        var userId = Guid.Parse(session.Metadata["userId"]);
        var planType = Enum.Parse<PlanType>(session.Metadata["planType"]);

        // Get subscription ID and fetch full details
        var subscriptionId = session.SubscriptionId;
        var stripeSvc = new StripeSubscriptionService();
        var stripeSubscription = await stripeSvc.GetAsync(subscriptionId, cancellationToken: cancellationToken);

        var planConfig = _stripeSettings.Plans[planType.ToString()];

        // Stripe subscriptions are annual, expire 1 year from now
        var periodEnd = DateTime.UtcNow.AddYears(1);

        // Create subscription record
        var subscription = new Entities.Subscription
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            PlanType = planType,
            Status = SubscriptionStatus.Active,
            StripeSubscriptionId = stripeSubscription.Id,
            StripeCustomerId = session.CustomerId!,
            StartDate = DateTime.UtcNow,
            EndDate = periodEnd,
            Amount = planConfig.Amount,
            Currency = "EUR",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _context.Subscriptions.AddAsync(subscription, cancellationToken);

        // Update user
        var user = await _context.Users.FindAsync(new object[] { userId }, cancellationToken);
        if (user != null)
        {
            user.CurrentPlan = planType;
            user.SubscriptionStatus = SubscriptionStatus.Active;
            user.SubscriptionExpiresAt = periodEnd;
            user.StripeCustomerId = session.CustomerId!;
            user.CurrentSubscriptionId = subscription.Id;
        }

        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task SyncSubscriptionStatusAsync(
        string externalSubscriptionId,
        CancellationToken cancellationToken = default)
    {
        // Get subscription from Stripe
        var subscriptionService = new StripeSubscriptionService();
        StripeSubscription stripeSubscription = await subscriptionService.GetAsync(
            externalSubscriptionId,
            cancellationToken: cancellationToken);

        // Find subscription in DB
        var subscription = await _context.Subscriptions
            .Include(s => s.User)
            .FirstOrDefaultAsync(
                s => s.StripeSubscriptionId == externalSubscriptionId,
                cancellationToken);

        if (subscription == null)
            return;

        // Map Stripe status to our status
        var subscriptionStatus = stripeSubscription.Status switch
        {
            "active" => SubscriptionStatus.Active,
            "past_due" => SubscriptionStatus.PastDue,
            "canceled" => SubscriptionStatus.Canceled,
            "unpaid" => SubscriptionStatus.Expired,
            _ => SubscriptionStatus.None
        };

        // Calculate period end - in real implementation, parse from Stripe's raw JSON response
        // For now, use the EndDate from our DB or calculate based on subscription start
        var periodEnd = subscription.EndDate ?? DateTime.UtcNow.AddYears(1);

        subscription.Status = subscriptionStatus;
        subscription.EndDate = periodEnd;
        subscription.UpdatedAt = DateTime.UtcNow;

        if (subscriptionStatus == SubscriptionStatus.Canceled)
        {
            subscription.CanceledAt = DateTime.UtcNow;
        }

        // Update user
        subscription.User.SubscriptionStatus = subscriptionStatus;
        subscription.User.SubscriptionExpiresAt = periodEnd;

        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task CancelSubscriptionAsync(
        Guid userId,
        CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .Include(u => u.CurrentSubscription)
            .FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

        if (user?.CurrentSubscription == null)
            throw new InvalidOperationException("No active subscription");

        // Cancel in Stripe
        var service = new StripeSubscriptionService();
        await service.CancelAsync(
            user.CurrentSubscription.StripeSubscriptionId,
            cancellationToken: cancellationToken);

        // Update locally
        user.CurrentSubscription.Status = SubscriptionStatus.Canceled;
        user.CurrentSubscription.CanceledAt = DateTime.UtcNow;
        user.SubscriptionStatus = SubscriptionStatus.Canceled;

        await _context.SaveChangesAsync(cancellationToken);
    }
}

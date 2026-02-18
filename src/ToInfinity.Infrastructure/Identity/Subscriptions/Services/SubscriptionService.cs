using ErrorOr;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using ToInfinity.Application.Common.Services;
using ToInfinity.Application.Subscriptions.Models;
using ToInfinity.Domain.ValueObjects;
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

    public async Task<ErrorOr<bool>> HasActiveSubscriptionAsync(
        UserId userId,
        CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .Where(u => u.Id == userId.Value)
            .Select(u => new
            {
                u.SubscriptionStatus,
                u.SubscriptionExpiresAt
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null)
            return Error.NotFound("User.NotFound", "User not found");

        return user.SubscriptionStatus == SubscriptionStatus.Active &&
               user.SubscriptionExpiresAt.HasValue &&
               user.SubscriptionExpiresAt.Value > DateTime.UtcNow;
    }

    public async Task<ErrorOr<SubscriptionModel>> GetUserSubscriptionAsync(
        UserId userId,
        CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .Include(u => u.CurrentSubscription)
            .Where(u => u.Id == userId.Value)
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null)
            return Error.NotFound("User.NotFound", "User not found");

        if (user.CurrentSubscription is null)
            return Error.NotFound("Subscription.NotFound", "No subscription found for this user");

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

    public async Task<ErrorOr<SubscriptionModel>> GetActiveSubscriptionAsync(
        UserId userId,
        CancellationToken cancellationToken = default)
    {
        var result = await GetUserSubscriptionAsync(userId, cancellationToken);

        return result.Match<ErrorOr<SubscriptionModel>>(
            subscription => subscription.IsActive
                ? subscription
                : Error.NotFound("Subscription.NotActive", "No active subscription found"),
            errors => errors);
    }

    public async Task<ErrorOr<List<SubscriptionModel>>> GetSubscriptionHistoryAsync(
        UserId userId,
        CancellationToken cancellationToken = default)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == userId.Value, cancellationToken);
        if (!userExists)
            return Error.NotFound("User.NotFound", "User not found");

        var subscriptions = await _context.Subscriptions
            .Where(s => s.UserId == userId.Value)
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

    public async Task<ErrorOr<string>> CreateSubscriptionCheckoutAsync(
        UserId userId,
        PlanType planType,
        CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .Where(u => u.Id == userId.Value)
            .FirstOrDefaultAsync(cancellationToken);

        if (user is null)
            return Error.NotFound("User.NotFound", "User not found");

        if (string.IsNullOrEmpty(user.StripeCustomerId))
            return Error.Unexpected("User.NoStripeCustomer", "User has no Stripe customer ID");

        if (user.CurrentPlan == planType && user.SubscriptionStatus == SubscriptionStatus.Active)
            return Error.Conflict("Subscription.AlreadyActive", "Already subscribed to this plan");

        if (!_stripeSettings.Plans.TryGetValue(planType.ToString(), out var planConfig))
            return Error.NotFound("Plan.NotFound", $"Plan '{planType}' not found in configuration");

        var sessionService = new SessionService();
        var session = await sessionService.CreateAsync(new SessionCreateOptions
        {
            Customer = user.StripeCustomerId,
            Mode = "subscription",
            LineItems = new List<SessionLineItemOptions>
            {
                new() { Price = planConfig.PriceId, Quantity = 1 }
            },
            SuccessUrl = _stripeSettings.SuccessUrl + "?session_id={CHECKOUT_SESSION_ID}",
            CancelUrl = _stripeSettings.CancelUrl,
            Metadata = new Dictionary<string, string>
            {
                { "userId", userId.Value.ToString() },
                { "planType", planType.ToString() }
            }
        }, cancellationToken: cancellationToken);

        return session.Url;
    }

    public async Task<ErrorOr<Success>> HandleWebhookAsync(
        string json,
        string signature,
        CancellationToken cancellationToken = default)
    {
        Event stripeEvent;

        try
        {
            stripeEvent = EventUtility.ConstructEvent(json, signature, _stripeSettings.WebhookSecret);
        }
        catch (StripeException)
        {
            return Error.Validation("Webhook.InvalidSignature", "Invalid Stripe webhook signature");
        }

        switch (stripeEvent.Type)
        {
            case "checkout.session.completed":
                var session = stripeEvent.Data.Object as Session;
                if (session is not null)
                    await CompleteSubscriptionCheckoutAsync(session.Id, cancellationToken);
                break;

            case "customer.subscription.updated":
            case "customer.subscription.deleted":
                var subscription = stripeEvent.Data.Object as StripeSubscription;
                if (subscription is not null)
                    await SyncSubscriptionStatusAsync(subscription.Id, cancellationToken);
                break;
        }

        return Result.Success;
    }

    public async Task<ErrorOr<Success>> CancelSubscriptionAsync(
        UserId userId,
        CancellationToken cancellationToken = default)
    {
        var user = await _context.Users
            .Include(u => u.CurrentSubscription)
            .FirstOrDefaultAsync(u => u.Id == userId.Value, cancellationToken);

        if (user is null)
            return Error.NotFound("User.NotFound", "User not found");

        if (user.CurrentSubscription is null)
            return Error.NotFound("Subscription.NotFound", "No active subscription to cancel");

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

        return Result.Success;
    }

    private async Task CompleteSubscriptionCheckoutAsync(
        string checkoutSessionId,
        CancellationToken cancellationToken = default)
    {
        var sessionService = new SessionService();
        var session = await sessionService.GetAsync(
            checkoutSessionId,
            new SessionGetOptions
            {
                Expand = new List<string> { "subscription" }
            },
            cancellationToken: cancellationToken);

        var userId = Guid.Parse(session.Metadata["userId"]);
        var planType = Enum.Parse<PlanType>(session.Metadata["planType"]);

        var subscriptionId = session.SubscriptionId;
        var stripeSvc = new StripeSubscriptionService();
        var stripeSubscription = await stripeSvc.GetAsync(subscriptionId, cancellationToken: cancellationToken);

        var planConfig = _stripeSettings.Plans[planType.ToString()];
        var periodEnd = DateTime.UtcNow.AddYears(1);

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

        var user = await _context.Users.FindAsync(new object[] { userId }, cancellationToken);
        if (user is not null)
        {
            user.CurrentPlan = planType;
            user.SubscriptionStatus = SubscriptionStatus.Active;
            user.SubscriptionExpiresAt = periodEnd;
            user.CurrentSubscriptionId = subscription.Id;
        }

        await _context.SaveChangesAsync(cancellationToken);
    }

    private async Task SyncSubscriptionStatusAsync(
        string externalSubscriptionId,
        CancellationToken cancellationToken = default)
    {
        var subscriptionService = new StripeSubscriptionService();
        StripeSubscription stripeSubscription = await subscriptionService.GetAsync(
            externalSubscriptionId,
            cancellationToken: cancellationToken);

        var subscription = await _context.Subscriptions
            .Include(s => s.User)
            .FirstOrDefaultAsync(
                s => s.StripeSubscriptionId == externalSubscriptionId,
                cancellationToken);

        if (subscription is null)
            return;

        var subscriptionStatus = stripeSubscription.Status switch
        {
            "active" => SubscriptionStatus.Active,
            "past_due" => SubscriptionStatus.PastDue,
            "canceled" => SubscriptionStatus.Canceled,
            "unpaid" => SubscriptionStatus.Expired,
            _ => SubscriptionStatus.None
        };

        var periodEnd = subscription.EndDate ?? DateTime.UtcNow.AddYears(1);

        subscription.Status = subscriptionStatus;
        subscription.EndDate = periodEnd;
        subscription.UpdatedAt = DateTime.UtcNow;

        if (subscriptionStatus == SubscriptionStatus.Canceled)
        {
            subscription.CanceledAt = DateTime.UtcNow;
        }

        subscription.User.SubscriptionStatus = subscriptionStatus;
        subscription.User.SubscriptionExpiresAt = periodEnd;

        await _context.SaveChangesAsync(cancellationToken);
    }
}

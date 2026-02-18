using ErrorOr;
using ToInfinity.Application.Subscriptions.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Common.Services;

public interface ISubscriptionService
{
    Task<ErrorOr<bool>> HasActiveSubscriptionAsync(UserId userId, CancellationToken cancellationToken = default);
    Task<ErrorOr<SubscriptionModel>> GetUserSubscriptionAsync(UserId userId, CancellationToken cancellationToken = default);
    Task<ErrorOr<SubscriptionModel>> GetActiveSubscriptionAsync(UserId userId, CancellationToken cancellationToken = default);
    Task<ErrorOr<List<SubscriptionModel>>> GetSubscriptionHistoryAsync(UserId userId, CancellationToken cancellationToken = default);

    // Checkout and payment methods
    Task<ErrorOr<string>> CreateSubscriptionCheckoutAsync(UserId userId, PlanType planType, CancellationToken cancellationToken = default);
    Task<ErrorOr<Success>> HandleWebhookAsync(string json, string signature, CancellationToken cancellationToken = default);
    Task<ErrorOr<Success>> CancelSubscriptionAsync(UserId userId, CancellationToken cancellationToken = default);
}

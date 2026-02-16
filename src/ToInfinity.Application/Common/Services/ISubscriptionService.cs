using ToInfinity.Application.Subscriptions.Models;

namespace ToInfinity.Application.Common.Services;

public interface ISubscriptionService
{
    Task<bool> HasActiveSubscriptionAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<SubscriptionModel?> GetUserSubscriptionAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<SubscriptionModel?> GetActiveSubscriptionAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<List<SubscriptionModel>> GetSubscriptionHistoryAsync(Guid userId, CancellationToken cancellationToken = default);

    // Checkout and payment methods
    Task<string> CreateSubscriptionCheckoutAsync(Guid userId, PlanType planType, CancellationToken cancellationToken = default);
    Task CompleteSubscriptionCheckoutAsync(string checkoutSessionId, CancellationToken cancellationToken = default);
    Task SyncSubscriptionStatusAsync(string externalSubscriptionId, CancellationToken cancellationToken = default);
    Task CancelSubscriptionAsync(Guid userId, CancellationToken cancellationToken = default);
}

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Stripe;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Application.Common.Services;
using ToInfinity.Infrastructure.Identity;
using ToInfinity.Infrastructure.Identity.Subscriptions.Configuration;
using ToInfinity.Infrastructure.Persistence;
using ToInfinity.Infrastructure.Persistence.Repositories;
using SubscriptionService = ToInfinity.Infrastructure.Identity.Subscriptions.Services.SubscriptionService;

namespace ToInfinity.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));

        // Configure Stripe
        services.Configure<StripeSettings>(configuration.GetSection("Stripe"));
        StripeConfiguration.ApiKey = configuration["Stripe:SecretKey"];

        services.AddScoped<IWeddingVenueRepository, WeddingVenueRepository>();
        services.AddScoped<ISubscriptionService, SubscriptionService>();

        services.AddStorage(configuration);
        services.AddIdentityInfrastructure(configuration);

        return services;
    }
}

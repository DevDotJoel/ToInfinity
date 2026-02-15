using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Infrastructure.Identity;
using ToInfinity.Infrastructure.Persistence;
using ToInfinity.Infrastructure.Persistence.Repositories;

namespace ToInfinity.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped(typeof(IBaseRepository<,>), typeof(BaseRepository<,>));
        services.AddScoped<IWeddingVenueRepository, WeddingVenueRepository>();

        services.AddIdentityInfrastructure(configuration);

        return services;
    }
}

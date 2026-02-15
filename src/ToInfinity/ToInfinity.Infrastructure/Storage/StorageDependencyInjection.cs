using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ToInfinity.Application.Common.Storage;
using ToInfinity.Infrastructure.Storage;

namespace ToInfinity.Infrastructure;

public static class StorageDependencyInjection
{
    public static IServiceCollection AddStorage(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var azureStorageConnection = configuration["Azure:Storage"];

        services.AddScoped<IFileStorageService>(sp =>
            new AzureBlobStorageService(azureStorageConnection!));

        return services;
    }
}

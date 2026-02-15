using System.Reflection;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace ToInfinity.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
        });

        // Register FluentValidation validators
        var assembly = Assembly.GetExecutingAssembly();
        var validatorType = typeof(IValidator<>);
        var validatorTypes = assembly.GetTypes()
            .Where(t => t.GetInterfaces().Any(i =>
                i.IsGenericType &&
                i.GetGenericTypeDefinition() == validatorType))
            .ToList();

        foreach (var validator in validatorTypes)
        {
            var interfaces = validator.GetInterfaces()
                .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == validatorType);

            foreach (var @interface in interfaces)
            {
                services.AddScoped(@interface, validator);
            }
        }

        return services;
    }
}

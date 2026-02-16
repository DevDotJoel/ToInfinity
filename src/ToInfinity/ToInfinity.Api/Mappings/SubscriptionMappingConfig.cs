using Mapster;
using ToInfinity.Application.Subscriptions.Models;
using ToInfinity.Contracts.Subscriptions;

namespace ToInfinity.Api.Mappings;

public class SubscriptionMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<SubscriptionModel, SubscriptionResponse>();
    }
}

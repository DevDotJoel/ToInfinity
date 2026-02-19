using Mapster;
using ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Contracts.Venues;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Api.Mappings;

public class VenueMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        // Request + UserId + MainImageUrl → Command
        config.NewConfig<(CreateWeddingVenueRequest Request, UserId UserId, string MainImageUrl), CreateWeddingVenueOnboardingCommand>()
            .Map(dest => dest.UserId, src => src.UserId)
            .Map(dest => dest.Name, src => src.Request.Name)
            .Map(dest => dest.Description, src => src.Request.Description)
            .Map(dest => dest.Street, src => src.Request.Street)
            .Map(dest => dest.PostalCode, src => src.Request.PostalCode)
            .Map(dest => dest.MunicipalityId, src => src.Request.MunicipalityId)
            .Map(dest => dest.Capacity, src => src.Request.Capacity)
            .Map(dest => dest.PricePerPerson, src => src.Request.PricePerPerson)
            .Map(dest => dest.MainImageUrl, src => src.MainImageUrl);

        // Application Model → Response DTO
        config.NewConfig<VenueDto, VenueResult>();
    }
}

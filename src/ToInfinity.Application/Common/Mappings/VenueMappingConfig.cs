using Mapster;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.Entities;

namespace ToInfinity.Application.Common.Mappings;

public class VenueMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        // WeddingVenue Entity → VenueDto
        config.NewConfig<WeddingVenue, VenueDto>()
            .Map(dest => dest.Id, src => src.Id.Value)
            .Map(dest => dest.UserId, src => src.UserId.Value)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Description, src => src.Description)
            .Map(dest => dest.Street, src => src.Street)
            .Map(dest => dest.PostalCode, src => src.PostalCode)
            .Map(dest => dest.MunicipalityId, src => src.MunicipalityId.Value)
            .Map(dest => dest.Capacity, src => src.Capacity)
            .Map(dest => dest.PricePerPerson, src => src.PricePerPerson)
            .Map(dest => dest.MainImageUrl, src => src.MainImageUrl);
    }
}

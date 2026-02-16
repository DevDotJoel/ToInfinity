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
            .Map(dest => dest.Street, src => src.Address.Street)
            .Map(dest => dest.City, src => src.Address.City)
            .Map(dest => dest.Capacity, src => src.Capacity)
            .Map(dest => dest.MinPrice, src => src.PriceRange.Min)
            .Map(dest => dest.MaxPrice, src => src.PriceRange.Max)
            .Map(dest => dest.MainImageUrl, src => src.MainImageUrl);
    }
}

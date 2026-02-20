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
            .Map(dest => dest.VenueType, src => (int)src.VenueType)
            .Map(dest => dest.Street, src => src.Street)
            .Map(dest => dest.PostalCode, src => src.PostalCode)
            .Map(dest => dest.MunicipalityId, src => src.MunicipalityId.Value)
            .Map(dest => dest.MinCapacity, src => src.MinCapacity)
            .Map(dest => dest.MaxCapacity, src => src.MaxCapacity)
            .Map(dest => dest.PricePerPerson, src => src.PricePerPerson)
            .Map(dest => dest.RentalPrice, src => src.RentalPrice)
            .Map(dest => dest.MainImageUrl, src => src.MainImageUrl)
            .Map(dest => dest.Styles, src => (int)src.Styles)
            .Map(dest => dest.Amenities, src => (int)src.Amenities)
            .Map(dest => dest.SpacesDescription, src => src.SpacesDescription)
            .Map(dest => dest.ServicesDescription, src => src.ServicesDescription)
            .Map(dest => dest.GastronomyDescription, src => src.GastronomyDescription)
            .Map(dest => dest.LocationDescription, src => src.LocationDescription)
            .Map(dest => dest.Latitude, src => src.Latitude)
            .Map(dest => dest.Longitude, src => src.Longitude)
            .Map(dest => dest.Phone, src => src.Phone)
            .Map(dest => dest.Email, src => src.Email)
            .Map(dest => dest.Website, src => src.Website)
            .Map(dest => dest.ClosingTime, src => src.ClosingTime)
            .Map(dest => dest.CreatedAt, src => src.CreatedAt)
            .Map(dest => dest.UpdatedAt, src => src.UpdatedAt);
    }
}

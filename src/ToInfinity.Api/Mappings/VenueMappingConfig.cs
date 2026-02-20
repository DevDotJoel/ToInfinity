using Mapster;
using Microsoft.AspNetCore.Http;
using ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Application.Venues.SearchVenues;
using ToInfinity.Application.Venues.UpdateWeddingVenue;
using ToInfinity.Contracts.Venues;
using ToInfinity.Domain.Enums;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Api.Mappings;

public class VenueMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        // Request + UserId → Command
        config.NewConfig<(CreateWeddingVenueRequest Request, UserId UserId), CreateWeddingVenueOnboardingCommand>()
            .Map(dest => dest.UserId, src => src.UserId)
            .Map(dest => dest.Name, src => src.Request.Name)
            .Map(dest => dest.Description, src => src.Request.Description)
            .Map(dest => dest.VenueType, src => (VenueType)src.Request.VenueType)
            .Map(dest => dest.Street, src => src.Request.Street)
            .Map(dest => dest.PostalCode, src => src.Request.PostalCode)
            .Map(dest => dest.MunicipalityId, src => src.Request.MunicipalityId)
            .Map(dest => dest.MinCapacity, src => src.Request.MinCapacity)
            .Map(dest => dest.MaxCapacity, src => src.Request.MaxCapacity)
            .Map(dest => dest.PricePerPerson, src => src.Request.PricePerPerson)
            .Map(dest => dest.ImageData, src => MapImageData(src.Request.MainImage))
            .Map(dest => dest.ImageFileName, src => src.Request.MainImage.FileName)
            .Map(dest => dest.ImageContentType, src => src.Request.MainImage.ContentType)
            .Map(dest => dest.RentalPrice, src => src.Request.RentalPrice)
            .Map(dest => dest.Styles, src => src.Request.Styles.HasValue ? (VenueStyles?)src.Request.Styles.Value : null)
            .Map(dest => dest.Amenities, src => src.Request.Amenities.HasValue ? (VenueAmenities?)src.Request.Amenities.Value : null)
            .Map(dest => dest.SpacesDescription, src => src.Request.SpacesDescription)
            .Map(dest => dest.ServicesDescription, src => src.Request.ServicesDescription)
            .Map(dest => dest.GastronomyDescription, src => src.Request.GastronomyDescription)
            .Map(dest => dest.LocationDescription, src => src.Request.LocationDescription)
            .Map(dest => dest.Latitude, src => src.Request.Latitude)
            .Map(dest => dest.Longitude, src => src.Request.Longitude)
            .Map(dest => dest.Phone, src => src.Request.Phone)
            .Map(dest => dest.Email, src => src.Request.Email)
            .Map(dest => dest.Website, src => src.Request.Website)
            .Map(dest => dest.ClosingTime, src => src.Request.ClosingTime != null ? TimeOnly.Parse(src.Request.ClosingTime) : (TimeOnly?)null);

        // Update: Request + UserId + VenueId → Command
        config.NewConfig<(UpdateWeddingVenueRequest Request, UserId UserId, VenueId VenueId), UpdateWeddingVenueCommand>()
            .Map(dest => dest.VenueId, src => src.VenueId)
            .Map(dest => dest.UserId, src => src.UserId)
            .Map(dest => dest.Name, src => src.Request.Name)
            .Map(dest => dest.Description, src => src.Request.Description)
            .Map(dest => dest.VenueType, src => (VenueType)src.Request.VenueType)
            .Map(dest => dest.Street, src => src.Request.Street)
            .Map(dest => dest.PostalCode, src => src.Request.PostalCode)
            .Map(dest => dest.MunicipalityId, src => src.Request.MunicipalityId)
            .Map(dest => dest.MinCapacity, src => src.Request.MinCapacity)
            .Map(dest => dest.MaxCapacity, src => src.Request.MaxCapacity)
            .Map(dest => dest.PricePerPerson, src => src.Request.PricePerPerson)
            .Map(dest => dest.RentalPrice, src => src.Request.RentalPrice)
            .Map(dest => dest.Styles, src => src.Request.Styles.HasValue ? (VenueStyles?)src.Request.Styles.Value : null)
            .Map(dest => dest.Amenities, src => src.Request.Amenities.HasValue ? (VenueAmenities?)src.Request.Amenities.Value : null)
            .Map(dest => dest.SpacesDescription, src => src.Request.SpacesDescription)
            .Map(dest => dest.ServicesDescription, src => src.Request.ServicesDescription)
            .Map(dest => dest.GastronomyDescription, src => src.Request.GastronomyDescription)
            .Map(dest => dest.LocationDescription, src => src.Request.LocationDescription)
            .Map(dest => dest.Latitude, src => src.Request.Latitude)
            .Map(dest => dest.Longitude, src => src.Request.Longitude)
            .Map(dest => dest.Phone, src => src.Request.Phone)
            .Map(dest => dest.Email, src => src.Request.Email)
            .Map(dest => dest.Website, src => src.Request.Website)
            .Map(dest => dest.ClosingTime, src => src.Request.ClosingTime != null ? TimeOnly.Parse(src.Request.ClosingTime) : (TimeOnly?)null)
            .Map(dest => dest.ImageData, src => src.Request.MainImage != null ? MapImageData(src.Request.MainImage) : null)
            .Map(dest => dest.ImageFileName, src => src.Request.MainImage != null ? src.Request.MainImage.FileName : null)
            .Map(dest => dest.ImageContentType, src => src.Request.MainImage != null ? src.Request.MainImage.ContentType : null);

        // Search request → Query
        config.NewConfig<SearchVenuesRequest, SearchVenuesQuery>()
            .Map(dest => dest.VenueType, src => src.VenueType.HasValue ? (VenueType?)src.VenueType.Value : null)
            .Map(dest => dest.Styles, src => src.Styles.HasValue ? (VenueStyles?)src.Styles.Value : null)
            .Map(dest => dest.Amenities, src => src.Amenities.HasValue ? (VenueAmenities?)src.Amenities.Value : null);

        // Application Model → Response DTO
        config.NewConfig<VenueDto, VenueResult>()
            .Map(dest => dest.ClosingTime, src => src.ClosingTime.HasValue ? src.ClosingTime.Value.ToString("HH:mm") : null);
    }

    private static byte[] MapImageData(IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);
        return memoryStream.ToArray();
    }
}

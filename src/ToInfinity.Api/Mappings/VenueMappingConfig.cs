using Mapster;
using Microsoft.AspNetCore.Http;
using ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Application.Venues.SearchVenues;
using ToInfinity.Application.Venues.UpdateWeddingVenue;
using ToInfinity.Contracts.Venues;
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
            .Map(dest => dest.Street, src => src.Request.Street)
            .Map(dest => dest.PostalCode, src => src.Request.PostalCode)
            .Map(dest => dest.MunicipalityId, src => src.Request.MunicipalityId)
            .Map(dest => dest.Capacity, src => src.Request.Capacity)
            .Map(dest => dest.PricePerPerson, src => src.Request.PricePerPerson)
            .Map(dest => dest.ImageData, src => MapImageData(src.Request.MainImage))
            .Map(dest => dest.ImageFileName, src => src.Request.MainImage.FileName)
            .Map(dest => dest.ImageContentType, src => src.Request.MainImage.ContentType);

        // Update: Request + UserId + VenueId → Command
        config.NewConfig<(UpdateWeddingVenueRequest Request, UserId UserId, VenueId VenueId), UpdateWeddingVenueCommand>()
            .Map(dest => dest.VenueId, src => src.VenueId)
            .Map(dest => dest.UserId, src => src.UserId)
            .Map(dest => dest.Name, src => src.Request.Name)
            .Map(dest => dest.Description, src => src.Request.Description)
            .Map(dest => dest.Street, src => src.Request.Street)
            .Map(dest => dest.PostalCode, src => src.Request.PostalCode)
            .Map(dest => dest.MunicipalityId, src => src.Request.MunicipalityId)
            .Map(dest => dest.Capacity, src => src.Request.Capacity)
            .Map(dest => dest.PricePerPerson, src => src.Request.PricePerPerson)
            .Map(dest => dest.ImageData, src => src.Request.MainImage != null ? MapImageData(src.Request.MainImage) : null)
            .Map(dest => dest.ImageFileName, src => src.Request.MainImage != null ? src.Request.MainImage.FileName : null)
            .Map(dest => dest.ImageContentType, src => src.Request.MainImage != null ? src.Request.MainImage.ContentType : null);

        // Search request → Query
        config.NewConfig<SearchVenuesRequest, SearchVenuesQuery>();

        // Application Model → Response DTO
        config.NewConfig<VenueDto, VenueResult>();
    }

    private static byte[] MapImageData(IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);
        return memoryStream.ToArray();
    }
}

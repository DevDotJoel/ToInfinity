using Microsoft.AspNetCore.Http;

namespace ToInfinity.Contracts.Venues;

public record CreateWeddingVenueRequest(
    string Name,
    string Description,
    int VenueType,
    string Street,
    string PostalCode,
    int MunicipalityId,
    int MinCapacity,
    int MaxCapacity,
    decimal PricePerPerson,
    IFormFile MainImage,
    decimal? RentalPrice,
    int? Styles,
    int? Amenities,
    string? SpacesDescription,
    string? ServicesDescription,
    string? GastronomyDescription,
    string? LocationDescription,
    double? Latitude,
    double? Longitude,
    string? Phone,
    string? Email,
    string? Website,
    string? ClosingTime);

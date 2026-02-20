using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.Enums;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.UpdateWeddingVenue;

public record UpdateWeddingVenueCommand(
    VenueId VenueId,
    UserId UserId,
    string Name,
    string Description,
    VenueType VenueType,
    string Street,
    string PostalCode,
    int MunicipalityId,
    int MinCapacity,
    int MaxCapacity,
    decimal PricePerPerson,
    decimal? RentalPrice,
    VenueStyles? Styles,
    VenueAmenities? Amenities,
    string? SpacesDescription,
    string? ServicesDescription,
    string? GastronomyDescription,
    string? LocationDescription,
    double? Latitude,
    double? Longitude,
    string? Phone,
    string? Email,
    string? Website,
    TimeOnly? ClosingTime,
    byte[]? ImageData,
    string? ImageFileName,
    string? ImageContentType) : IRequest<ErrorOr<VenueDto>>;

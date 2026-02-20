using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.Enums;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;

public record CreateWeddingVenueOnboardingCommand(
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
    byte[] ImageData,
    string ImageFileName,
    string ImageContentType,
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
    TimeOnly? ClosingTime) : IRequest<ErrorOr<VenueDto>>;

using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.Enums;

namespace ToInfinity.Application.Venues.SearchVenues;

public record SearchVenuesQuery(
    string? SearchTerm,
    int? CountryId,
    int? DistrictId,
    int? MunicipalityId,
    VenueType? VenueType,
    VenueStyles? Styles,
    VenueAmenities? Amenities,
    int? MinCapacity,
    int? MaxCapacity,
    string? SortBy,
    int Page,
    int Size) : IRequest<ErrorOr<List<VenueDto>>>;

using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;

namespace ToInfinity.Application.Venues.SearchVenues;

public record SearchVenuesQuery(
    string? SearchTerm,
    int? CountryId,
    int? DistrictId,
    int? MunicipalityId,
    string? SortBy,
    int Page,
    int Size) : IRequest<ErrorOr<List<VenueDto>>>;

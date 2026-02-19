using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;

namespace ToInfinity.Application.Venues.SearchVenues;

public record SearchVenuesQuery(
    int? CountryId,
    int? DistrictId,
    int? MunicipalityId,
    int Page,
    int Size) : IRequest<ErrorOr<List<VenueDto>>>;

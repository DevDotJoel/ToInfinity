using ErrorOr;
using MediatR;
using ToInfinity.Application.Locations.Models;

namespace ToInfinity.Application.Locations.GetLocations;

public record GetLocationsQuery() : IRequest<ErrorOr<LocationsDto>>;

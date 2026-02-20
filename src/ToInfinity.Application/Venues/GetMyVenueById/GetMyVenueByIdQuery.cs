using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.GetMyVenueById;

public record GetMyVenueByIdQuery(VenueId VenueId, UserId UserId) : IRequest<ErrorOr<VenueDto>>;

using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.GetById;

public record GetByIdQuery(VenueId VenueId) : IRequest<ErrorOr<VenueDto>>;

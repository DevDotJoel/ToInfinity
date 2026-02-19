using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.GetByUser;

public record GetByUserQuery(UserId UserId) : IRequest<ErrorOr<List<VenueDto>>>;

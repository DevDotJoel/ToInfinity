using ErrorOr;
using MediatR;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;

public record CreateWeddingVenueOnboardingCommand(
    UserId UserId,
    string Name,
    string Description,
    string Street,
    string PostalCode,
    int MunicipalityId,
    int Capacity,
    decimal PricePerPerson,
    string MainImageUrl) : IRequest<ErrorOr<VenueDto>>;

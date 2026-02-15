using ErrorOr;
using MediatR;
using ToInfinity.Contracts.Venues;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;

public record CreateWeddingVenueOnboardingCommand(
    UserId UserId,
    string Name,
    string Description,
    string Street,
    string City,
    int Capacity,
    decimal MinPrice,
    decimal MaxPrice,
    string MainImageUrl) : IRequest<ErrorOr<VenueResult>>;

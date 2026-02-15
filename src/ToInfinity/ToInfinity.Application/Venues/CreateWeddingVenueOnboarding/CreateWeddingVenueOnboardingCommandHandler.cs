using ErrorOr;
using MediatR;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Contracts.Venues;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;

public class CreateWeddingVenueOnboardingCommandHandler
    : IRequestHandler<CreateWeddingVenueOnboardingCommand, ErrorOr<VenueResult>>
{
    private readonly IWeddingVenueRepository _venueRepository;

    public CreateWeddingVenueOnboardingCommandHandler(IWeddingVenueRepository venueRepository)
    {
        _venueRepository = venueRepository;
    }

    public async Task<ErrorOr<VenueResult>> Handle(
        CreateWeddingVenueOnboardingCommand command,
        CancellationToken cancellationToken)
    {
        var userId = command.UserId;

        var addressResult = Address.Create(command.Street, command.City);
        if (addressResult.IsError)
        {
            return addressResult.Errors;
        }

        var priceRangeResult = PriceRange.Create(command.MinPrice, command.MaxPrice);
        if (priceRangeResult.IsError)
        {
            return priceRangeResult.Errors;
        }

        var venueResult = WeddingVenue.Create(
            userId,
            command.Name,
            command.Description,
            addressResult.Value,
            command.Capacity,
            priceRangeResult.Value,
            command.MainImageUrl);

        if (venueResult.IsError)
        {
            return venueResult.Errors;
        }

        var venue = venueResult.Value;

        await _venueRepository.AddAsync(venue, cancellationToken);

        return new VenueResult(
            venue.Id.Value,
            venue.UserId.Value,
            venue.Name,
            venue.Description,
            venue.Address.Street,
            venue.Address.City,
            venue.Capacity,
            venue.PriceRange.Min,
            venue.PriceRange.Max,
            venue.MainImageUrl);
    }
}

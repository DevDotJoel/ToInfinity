using ErrorOr;
using MapsterMapper;
using MediatR;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;

public class CreateWeddingVenueOnboardingCommandHandler
    : IRequestHandler<CreateWeddingVenueOnboardingCommand, ErrorOr<VenueDto>>
{
    private readonly IWeddingVenueRepository _venueRepository;
    private readonly IMapper _mapper;

    public CreateWeddingVenueOnboardingCommandHandler(
        IWeddingVenueRepository venueRepository,
        IMapper mapper)
    {
        _venueRepository = venueRepository;
        _mapper = mapper;
    }

    public async Task<ErrorOr<VenueDto>> Handle(
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

        return _mapper.Map<VenueDto>(venue);
    }
}

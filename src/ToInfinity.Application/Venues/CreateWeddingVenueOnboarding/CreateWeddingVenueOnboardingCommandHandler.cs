using ErrorOr;
using MapsterMapper;
using MediatR;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Application.Common.Services;
using ToInfinity.Application.Common.Storage;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;

public class CreateWeddingVenueOnboardingCommandHandler
    : IRequestHandler<CreateWeddingVenueOnboardingCommand, ErrorOr<VenueDto>>
{
    private readonly IWeddingVenueRepository _venueRepository;
    private readonly IMunicipalityRepository _municipalityRepository;
    private readonly ISubscriptionService _subscriptionService;
    private readonly IFileStorageService _fileStorageService;
    private readonly IMapper _mapper;

    public CreateWeddingVenueOnboardingCommandHandler(
        IWeddingVenueRepository venueRepository,
        IMunicipalityRepository municipalityRepository,
        ISubscriptionService subscriptionService,
        IFileStorageService fileStorageService,
        IMapper mapper)
    {
        _venueRepository = venueRepository;
        _municipalityRepository = municipalityRepository;
        _subscriptionService = subscriptionService;
        _fileStorageService = fileStorageService;
        _mapper = mapper;
    }

    public async Task<ErrorOr<VenueDto>> Handle(
        CreateWeddingVenueOnboardingCommand command,
        CancellationToken cancellationToken)
    {
        var userId = command.UserId;

        // Check if user has an active subscription
        //var subscriptionResult = await _subscriptionService
        //    .HasActiveSubscriptionAsync(userId, cancellationToken);

        //if (subscriptionResult.IsError)
        //    return subscriptionResult.Errors;

        //if (!subscriptionResult.Value)
        //{
        //    return Error.Forbidden(
        //        code: "Subscription.Required",
        //        description: "An active subscription is required to create a venue.");
        //}

        // Check if municipality exists
        var municipalityId = MunicipalityId.Create(command.MunicipalityId);
        var municipalityExists = await _municipalityRepository.ExistsAsync(municipalityId);

        if (!municipalityExists)
        {
            return Error.NotFound(
                code: "Municipality.NotFound",
                description: "The specified municipality does not exist.");
        }

        // Upload image to storage
        var mainImageUrl = await _fileStorageService.UploadImageAsync(
            command.ImageData,
            command.ImageFileName,
            command.ImageContentType,
            "venues",
            $"{userId.Value}/main-image",
            cancellationToken);

        var venueResult = WeddingVenue.Create(
            userId,
            command.Name,
            command.Description,
            command.Street,
            command.PostalCode,
            MunicipalityId.Create(command.MunicipalityId),
            command.Capacity,
            command.PricePerPerson,
            mainImageUrl);

        if (venueResult.IsError)
        {
            // Clean up uploaded image if domain validation fails
            await _fileStorageService.DeleteImageAsync(mainImageUrl, cancellationToken);
            return venueResult.Errors;
        }

        var venue = venueResult.Value;

        await _venueRepository.AddAsync(venue, cancellationToken);

        return _mapper.Map<VenueDto>(venue);
    }
}

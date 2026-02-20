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
            command.VenueType,
            command.Street,
            command.PostalCode,
            MunicipalityId.Create(command.MunicipalityId),
            command.MinCapacity,
            command.MaxCapacity,
            command.PricePerPerson,
            mainImageUrl);

        if (venueResult.IsError)
        {
            // Clean up uploaded image if domain validation fails
            await _fileStorageService.DeleteImageAsync(mainImageUrl, cancellationToken);
            return venueResult.Errors;
        }

        var venue = venueResult.Value;

        // Apply optional enrichment fields
        var errors = new List<Error>();

        var rentalPriceResult = venue.SetRentalPrice(command.RentalPrice);
        if (rentalPriceResult.IsError) errors.AddRange(rentalPriceResult.Errors);

        if (command.Styles.HasValue)
        {
            var stylesResult = venue.SetStyles(command.Styles.Value);
            if (stylesResult.IsError) errors.AddRange(stylesResult.Errors);
        }

        if (command.Amenities.HasValue)
        {
            var amenitiesResult = venue.SetAmenities(command.Amenities.Value);
            if (amenitiesResult.IsError) errors.AddRange(amenitiesResult.Errors);
        }

        var spacesResult = venue.SetSpacesDescription(command.SpacesDescription);
        if (spacesResult.IsError) errors.AddRange(spacesResult.Errors);

        var servicesResult = venue.SetServicesDescription(command.ServicesDescription);
        if (servicesResult.IsError) errors.AddRange(servicesResult.Errors);

        var gastronomyResult = venue.SetGastronomyDescription(command.GastronomyDescription);
        if (gastronomyResult.IsError) errors.AddRange(gastronomyResult.Errors);

        var locationDescResult = venue.SetLocationDescription(command.LocationDescription);
        if (locationDescResult.IsError) errors.AddRange(locationDescResult.Errors);

        var latResult = venue.SetLatitude(command.Latitude);
        if (latResult.IsError) errors.AddRange(latResult.Errors);

        var lngResult = venue.SetLongitude(command.Longitude);
        if (lngResult.IsError) errors.AddRange(lngResult.Errors);

        var phoneResult = venue.SetPhone(command.Phone);
        if (phoneResult.IsError) errors.AddRange(phoneResult.Errors);

        var emailResult = venue.SetEmail(command.Email);
        if (emailResult.IsError) errors.AddRange(emailResult.Errors);

        var websiteResult = venue.SetWebsite(command.Website);
        if (websiteResult.IsError) errors.AddRange(websiteResult.Errors);

        var closingTimeResult = venue.SetClosingTime(command.ClosingTime);
        if (closingTimeResult.IsError) errors.AddRange(closingTimeResult.Errors);

        if (errors.Count > 0)
        {
            await _fileStorageService.DeleteImageAsync(mainImageUrl, cancellationToken);
            return errors;
        }

        await _venueRepository.AddAsync(venue, cancellationToken);

        return _mapper.Map<VenueDto>(venue);
    }
}

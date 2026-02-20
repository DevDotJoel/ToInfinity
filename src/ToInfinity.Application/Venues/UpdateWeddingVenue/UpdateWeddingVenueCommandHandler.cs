using ErrorOr;
using MapsterMapper;
using MediatR;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Application.Common.Storage;
using ToInfinity.Application.Venues.Models;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Venues.UpdateWeddingVenue;

public class UpdateWeddingVenueCommandHandler
    : IRequestHandler<UpdateWeddingVenueCommand, ErrorOr<VenueDto>>
{
    private readonly IWeddingVenueRepository _venueRepository;
    private readonly IMunicipalityRepository _municipalityRepository;
    private readonly IFileStorageService _fileStorageService;
    private readonly IMapper _mapper;

    public UpdateWeddingVenueCommandHandler(
        IWeddingVenueRepository venueRepository,
        IMunicipalityRepository municipalityRepository,
        IFileStorageService fileStorageService,
        IMapper mapper)
    {
        _venueRepository = venueRepository;
        _municipalityRepository = municipalityRepository;
        _fileStorageService = fileStorageService;
        _mapper = mapper;
    }

    public async Task<ErrorOr<VenueDto>> Handle(
        UpdateWeddingVenueCommand command,
        CancellationToken cancellationToken)
    {
        // 1. Get existing venue
        var venue = await _venueRepository.GetByIdAsync(command.VenueId, cancellationToken);

        if (venue is null)
        {
            return Error.NotFound(
                code: "Venue.NotFound",
                description: "The specified venue does not exist.");
        }

        // 2. Verify ownership
        if (venue.UserId != command.UserId)
        {
            return Error.Forbidden(
                code: "Venue.Forbidden",
                description: "You do not have permission to edit this venue.");
        }

        // 3. Check if municipality exists
        var municipalityId = MunicipalityId.Create(command.MunicipalityId);
        var municipalityExists = await _municipalityRepository.ExistsAsync(municipalityId);

        if (!municipalityExists)
        {
            return Error.NotFound(
                code: "Municipality.NotFound",
                description: "The specified municipality does not exist.");
        }

        // 4. Handle image update if new image provided
        string? oldImageUrl = null;
        if (command.ImageData is { Length: > 0 })
        {
            oldImageUrl = venue.MainImageUrl;

            var newImageUrl = await _fileStorageService.UploadImageAsync(
                command.ImageData,
                command.ImageFileName!,
                command.ImageContentType!,
                "venues",
                $"{command.UserId.Value}/main-image",
                cancellationToken);

            var setImageResult = venue.SetMainImageUrl(newImageUrl);
            if (setImageResult.IsError)
                return setImageResult.Errors;
        }

        // 5. Update domain entity fields
        var errors = new List<Error>();

        var nameResult = venue.SetName(command.Name);
        if (nameResult.IsError) errors.AddRange(nameResult.Errors);

        var descResult = venue.SetDescription(command.Description);
        if (descResult.IsError) errors.AddRange(descResult.Errors);

        var venueTypeResult = venue.SetVenueType(command.VenueType);
        if (venueTypeResult.IsError) errors.AddRange(venueTypeResult.Errors);

        var streetResult = venue.SetStreet(command.Street);
        if (streetResult.IsError) errors.AddRange(streetResult.Errors);

        var postalCodeResult = venue.SetPostalCode(command.PostalCode);
        if (postalCodeResult.IsError) errors.AddRange(postalCodeResult.Errors);

        var municipalityResult = venue.SetMunicipalityId(municipalityId);
        if (municipalityResult.IsError) errors.AddRange(municipalityResult.Errors);

        var maxCapacityResult = venue.SetMaxCapacity(command.MaxCapacity);
        if (maxCapacityResult.IsError) errors.AddRange(maxCapacityResult.Errors);

        var minCapacityResult = venue.SetMinCapacity(command.MinCapacity);
        if (minCapacityResult.IsError) errors.AddRange(minCapacityResult.Errors);

        var priceResult = venue.SetPricePerPerson(command.PricePerPerson);
        if (priceResult.IsError) errors.AddRange(priceResult.Errors);

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
            // If we uploaded a new image but domain validation failed, clean up
            if (oldImageUrl is not null)
            {
                await _fileStorageService.DeleteImageAsync(venue.MainImageUrl, cancellationToken);
                venue.SetMainImageUrl(oldImageUrl);
            }
            return errors;
        }

        // 6. Persist
        await _venueRepository.UpdateAsync(venue, cancellationToken);

        // 7. Clean up old image after successful save
        if (oldImageUrl is not null)
        {
            await _fileStorageService.DeleteImageAsync(oldImageUrl, cancellationToken);
        }

        return _mapper.Map<VenueDto>(venue);
    }
}

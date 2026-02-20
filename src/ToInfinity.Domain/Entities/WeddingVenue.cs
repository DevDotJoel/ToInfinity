using ErrorOr;
using ToInfinity.Domain.Enums;
using ToInfinity.Domain.Events;
using ToInfinity.Domain.Interfaces;
using ToInfinity.Domain.Shared;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Domain.Entities;

public sealed class WeddingVenue : Entity<VenueId>, IBaseUser
{
    private readonly List<WeddingGalleryImage> _gallery = new();

    public UserId UserId { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public VenueType VenueType { get; private set; }
    public string Street { get; private set; }
    public string PostalCode { get; private set; }
    public MunicipalityId MunicipalityId { get; private set; }
    public int MinCapacity { get; private set; }
    public int MaxCapacity { get; private set; }
    public decimal PricePerPerson { get; private set; }
    public decimal? RentalPrice { get; private set; }
    public string MainImageUrl { get; private set; }
    public VenueStyles Styles { get; private set; }
    public VenueAmenities Amenities { get; private set; }
    public string? SpacesDescription { get; private set; }
    public string? ServicesDescription { get; private set; }
    public string? GastronomyDescription { get; private set; }
    public string? LocationDescription { get; private set; }
    public double? Latitude { get; private set; }
    public double? Longitude { get; private set; }
    public string? Phone { get; private set; }
    public string? Email { get; private set; }
    public string? Website { get; private set; }
    public TimeOnly? ClosingTime { get; private set; }
    public IReadOnlyList<WeddingGalleryImage> Gallery => _gallery.AsReadOnly();

    private WeddingVenue(
        VenueId id,
        UserId userId,
        string name,
        string description,
        VenueType venueType,
        string street,
        string postalCode,
        MunicipalityId municipalityId,
        int minCapacity,
        int maxCapacity,
        decimal pricePerPerson,
        string mainImageUrl) : base(id)
    {
        UserId = userId;
        Name = name;
        Description = description;
        VenueType = venueType;
        Street = street;
        PostalCode = postalCode;
        MunicipalityId = municipalityId;
        MinCapacity = minCapacity;
        MaxCapacity = maxCapacity;
        PricePerPerson = pricePerPerson;
        MainImageUrl = mainImageUrl;
    }

    private WeddingVenue()
    {
        // For ORM
    }

    public static ErrorOr<WeddingVenue> Create(
        UserId userId,
        string name,
        string description,
        VenueType venueType,
        string street,
        string postalCode,
        MunicipalityId municipalityId,
        int minCapacity,
        int maxCapacity,
        decimal pricePerPerson,
        string mainImageUrl)
    {
        if (userId is null)
        {
            return Error.Validation(
                code: "WeddingVenue.UserId",
                description: "UserId cannot be null.");
        }

        if (string.IsNullOrWhiteSpace(name))
        {
            return Error.Validation(
                code: "WeddingVenue.Name",
                description: "Name cannot be empty.");
        }

        if (string.IsNullOrWhiteSpace(description))
        {
            return Error.Validation(
                code: "WeddingVenue.Description",
                description: "Description cannot be empty.");
        }

        if (!Enum.IsDefined(venueType))
        {
            return Error.Validation(
                code: "WeddingVenue.VenueType",
                description: "VenueType is not a valid value.");
        }

        if (string.IsNullOrWhiteSpace(street))
        {
            return Error.Validation(
                code: "WeddingVenue.Street",
                description: "Street cannot be empty.");
        }

        if (string.IsNullOrWhiteSpace(postalCode))
        {
            return Error.Validation(
                code: "WeddingVenue.PostalCode",
                description: "PostalCode cannot be empty.");
        }

        if (municipalityId is null)
        {
            return Error.Validation(
                code: "WeddingVenue.MunicipalityId",
                description: "MunicipalityId cannot be null.");
        }

        if (minCapacity <= 0)
        {
            return Error.Validation(
                code: "WeddingVenue.MinCapacity",
                description: "MinCapacity must be greater than 0.");
        }

        if (maxCapacity <= 0)
        {
            return Error.Validation(
                code: "WeddingVenue.MaxCapacity",
                description: "MaxCapacity must be greater than 0.");
        }

        if (minCapacity > maxCapacity)
        {
            return Error.Validation(
                code: "WeddingVenue.Capacity",
                description: "MinCapacity cannot be greater than MaxCapacity.");
        }

        if (pricePerPerson < 0)
        {
            return Error.Validation(
                code: "WeddingVenue.PricePerPerson",
                description: "PricePerPerson must be greater than or equal to 0.");
        }

        if (string.IsNullOrWhiteSpace(mainImageUrl))
        {
            return Error.Validation(
                code: "WeddingVenue.MainImageUrl",
                description: "MainImageUrl cannot be empty.");
        }

        var venue = new WeddingVenue(
            VenueId.CreateUnique(),
            userId,
            name,
            description,
            venueType,
            street,
            postalCode,
            municipalityId,
            minCapacity,
            maxCapacity,
            pricePerPerson,
            mainImageUrl);

        // Raise domain event
        var venueCreatedEvent = new VenueCreated(venue.Id.Value);

        return venue;
    }

    public ErrorOr<Success> SetUserId(UserId userId)
    {
        if (userId is null)
        {
            return Error.Validation(
                code: "WeddingVenue.UserId",
                description: "UserId cannot be null.");
        }

        UserId = userId;
        return Result.Success;
    }

    public ErrorOr<Success> SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Error.Validation(
                code: "WeddingVenue.Name",
                description: "Name cannot be empty.");
        }

        Name = name;
        return Result.Success;
    }

    public ErrorOr<Success> SetDescription(string description)
    {
        if (string.IsNullOrWhiteSpace(description))
        {
            return Error.Validation(
                code: "WeddingVenue.Description",
                description: "Description cannot be empty.");
        }

        Description = description;
        return Result.Success;
    }

    public ErrorOr<Success> SetStreet(string street)
    {
        if (string.IsNullOrWhiteSpace(street))
        {
            return Error.Validation(
                code: "WeddingVenue.Street",
                description: "Street cannot be empty.");
        }

        Street = street;
        return Result.Success;
    }

    public ErrorOr<Success> SetPostalCode(string postalCode)
    {
        if (string.IsNullOrWhiteSpace(postalCode))
        {
            return Error.Validation(
                code: "WeddingVenue.PostalCode",
                description: "PostalCode cannot be empty.");
        }

        PostalCode = postalCode;
        return Result.Success;
    }

    public ErrorOr<Success> SetMunicipalityId(MunicipalityId municipalityId)
    {
        if (municipalityId is null)
        {
            return Error.Validation(
                code: "WeddingVenue.MunicipalityId",
                description: "MunicipalityId cannot be null.");
        }

        MunicipalityId = municipalityId;
        return Result.Success;
    }

    public ErrorOr<Success> SetVenueType(VenueType venueType)
    {
        if (!Enum.IsDefined(venueType))
        {
            return Error.Validation(
                code: "WeddingVenue.VenueType",
                description: "VenueType is not a valid value.");
        }

        VenueType = venueType;
        return Result.Success;
    }

    public ErrorOr<Success> SetMinCapacity(int minCapacity)
    {
        if (minCapacity <= 0)
        {
            return Error.Validation(
                code: "WeddingVenue.MinCapacity",
                description: "MinCapacity must be greater than 0.");
        }

        if (minCapacity > MaxCapacity)
        {
            return Error.Validation(
                code: "WeddingVenue.Capacity",
                description: "MinCapacity cannot be greater than MaxCapacity.");
        }

        MinCapacity = minCapacity;
        return Result.Success;
    }

    public ErrorOr<Success> SetMaxCapacity(int maxCapacity)
    {
        if (maxCapacity <= 0)
        {
            return Error.Validation(
                code: "WeddingVenue.MaxCapacity",
                description: "MaxCapacity must be greater than 0.");
        }

        if (maxCapacity < MinCapacity)
        {
            return Error.Validation(
                code: "WeddingVenue.Capacity",
                description: "MaxCapacity cannot be less than MinCapacity.");
        }

        MaxCapacity = maxCapacity;
        return Result.Success;
    }

    public ErrorOr<Success> SetPricePerPerson(decimal pricePerPerson)
    {
        if (pricePerPerson < 0)
        {
            return Error.Validation(
                code: "WeddingVenue.PricePerPerson",
                description: "PricePerPerson must be greater than or equal to 0.");
        }

        PricePerPerson = pricePerPerson;
        return Result.Success;
    }

    public ErrorOr<Success> SetMainImageUrl(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            return Error.Validation(
                code: "WeddingVenue.MainImageUrl",
                description: "MainImageUrl cannot be empty.");
        }

        MainImageUrl = url;
        return Result.Success;
    }

    public ErrorOr<Success> SetRentalPrice(decimal? rentalPrice)
    {
        if (rentalPrice.HasValue && rentalPrice.Value < 0)
        {
            return Error.Validation(
                code: "WeddingVenue.RentalPrice",
                description: "RentalPrice must be greater than or equal to 0.");
        }

        RentalPrice = rentalPrice;
        return Result.Success;
    }

    public ErrorOr<Success> SetStyles(VenueStyles styles)
    {
        Styles = styles;
        return Result.Success;
    }

    public ErrorOr<Success> SetAmenities(VenueAmenities amenities)
    {
        Amenities = amenities;
        return Result.Success;
    }

    public ErrorOr<Success> SetSpacesDescription(string? spacesDescription)
    {
        if (spacesDescription is not null && spacesDescription.Length > 5000)
        {
            return Error.Validation(
                code: "WeddingVenue.SpacesDescription",
                description: "SpacesDescription must not exceed 5000 characters.");
        }

        SpacesDescription = spacesDescription;
        return Result.Success;
    }

    public ErrorOr<Success> SetServicesDescription(string? servicesDescription)
    {
        if (servicesDescription is not null && servicesDescription.Length > 5000)
        {
            return Error.Validation(
                code: "WeddingVenue.ServicesDescription",
                description: "ServicesDescription must not exceed 5000 characters.");
        }

        ServicesDescription = servicesDescription;
        return Result.Success;
    }

    public ErrorOr<Success> SetGastronomyDescription(string? gastronomyDescription)
    {
        if (gastronomyDescription is not null && gastronomyDescription.Length > 5000)
        {
            return Error.Validation(
                code: "WeddingVenue.GastronomyDescription",
                description: "GastronomyDescription must not exceed 5000 characters.");
        }

        GastronomyDescription = gastronomyDescription;
        return Result.Success;
    }

    public ErrorOr<Success> SetLocationDescription(string? locationDescription)
    {
        if (locationDescription is not null && locationDescription.Length > 5000)
        {
            return Error.Validation(
                code: "WeddingVenue.LocationDescription",
                description: "LocationDescription must not exceed 5000 characters.");
        }

        LocationDescription = locationDescription;
        return Result.Success;
    }

    public ErrorOr<Success> SetLatitude(double? latitude)
    {
        if (latitude.HasValue && (latitude.Value < -90 || latitude.Value > 90))
        {
            return Error.Validation(
                code: "WeddingVenue.Latitude",
                description: "Latitude must be between -90 and 90.");
        }

        Latitude = latitude;
        return Result.Success;
    }

    public ErrorOr<Success> SetLongitude(double? longitude)
    {
        if (longitude.HasValue && (longitude.Value < -180 || longitude.Value > 180))
        {
            return Error.Validation(
                code: "WeddingVenue.Longitude",
                description: "Longitude must be between -180 and 180.");
        }

        Longitude = longitude;
        return Result.Success;
    }

    public ErrorOr<Success> SetPhone(string? phone)
    {
        if (phone is not null && phone.Length > 20)
        {
            return Error.Validation(
                code: "WeddingVenue.Phone",
                description: "Phone must not exceed 20 characters.");
        }

        Phone = phone;
        return Result.Success;
    }

    public ErrorOr<Success> SetEmail(string? email)
    {
        if (email is not null && email.Length > 200)
        {
            return Error.Validation(
                code: "WeddingVenue.Email",
                description: "Email must not exceed 200 characters.");
        }

        Email = email;
        return Result.Success;
    }

    public ErrorOr<Success> SetWebsite(string? website)
    {
        if (website is not null && website.Length > 500)
        {
            return Error.Validation(
                code: "WeddingVenue.Website",
                description: "Website must not exceed 500 characters.");
        }

        Website = website;
        return Result.Success;
    }

    public ErrorOr<Success> SetClosingTime(TimeOnly? closingTime)
    {
        ClosingTime = closingTime;
        return Result.Success;
    }

    public ErrorOr<Success> AddGalleryImage(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            return Error.Validation(
                code: "WeddingVenue.GalleryImage.Url",
                description: "Gallery image url cannot be empty.");
        }

        var order = _gallery.Count;
        var imageResult = WeddingGalleryImage.Create(url, order);

        if (imageResult.IsError)
        {
            return imageResult.Errors;
        }

        _gallery.Add(imageResult.Value);
        return Result.Success;
    }

    public ErrorOr<Success> RemoveGalleryImage(GalleryImageId id)
    {
        if (id is null)
        {
            return Error.Validation(
                code: "WeddingVenue.GalleryImage.Id",
                description: "Gallery image id cannot be null.");
        }

        var image = _gallery.FirstOrDefault(img => img.Id == id);
        if (image is null)
        {
            return Error.NotFound(
                code: "WeddingVenue.GalleryImage.NotFound",
                description: "Gallery image not found.");
        }

        _gallery.Remove(image);

        // Reorder remaining images
        for (int i = 0; i < _gallery.Count; i++)
        {
            _gallery[i].SetOrder(i);
        }

        return Result.Success;
    }

    public ErrorOr<Success> ReorderGalleryImages(IReadOnlyList<GalleryImageId> orderedIds)
    {
        if (orderedIds is null || orderedIds.Count != _gallery.Count)
        {
            return Error.Validation(
                code: "WeddingVenue.GalleryImage.Reorder",
                description: "Ordered ids must match the current gallery count.");
        }

        // Verify all ids exist
        foreach (var id in orderedIds)
        {
            if (!_gallery.Any(img => img.Id == id))
            {
                return Error.NotFound(
                    code: "WeddingVenue.GalleryImage.NotFound",
                    description: $"Gallery image with id {id.Value} not found.");
            }
        }

        // Reorder
        var reorderedGallery = new List<WeddingGalleryImage>();
        for (int i = 0; i < orderedIds.Count; i++)
        {
            var image = _gallery.First(img => img.Id == orderedIds[i]);
            image.SetOrder(i);
            reorderedGallery.Add(image);
        }

        _gallery.Clear();
        _gallery.AddRange(reorderedGallery);

        return Result.Success;
    }
}

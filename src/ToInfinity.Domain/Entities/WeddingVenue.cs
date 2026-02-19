using ErrorOr;
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
    public string Street { get; private set; }
    public string PostalCode { get; private set; }
    public MunicipalityId MunicipalityId { get; private set; }
    public int Capacity { get; private set; }
    public decimal PricePerPerson { get; private set; }
    public string MainImageUrl { get; private set; }
    public IReadOnlyList<WeddingGalleryImage> Gallery => _gallery.AsReadOnly();

    private WeddingVenue(
        VenueId id,
        UserId userId,
        string name,
        string description,
        string street,
        string postalCode,
        MunicipalityId municipalityId,
        int capacity,
        decimal pricePerPerson,
        string mainImageUrl) : base(id)
    {
        UserId = userId;
        Name = name;
        Description = description;
        Street = street;
        PostalCode = postalCode;
        MunicipalityId = municipalityId;
        Capacity = capacity;
        PricePerPerson = pricePerPerson;
        MainImageUrl = mainImageUrl;
    }
    private WeddingVenue()
    {
        UserId = default!;
        Name = default!;
        Description = default!;
        Street = default!;
        PostalCode = default!;
        MunicipalityId = default!;
        MainImageUrl = default!;
    }

    public static ErrorOr<WeddingVenue> Create(
        UserId userId,
        string name,
        string description,
        string street,
        string postalCode,
        MunicipalityId municipalityId,
        int capacity,
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

        if (capacity <= 0)
        {
            return Error.Validation(
                code: "WeddingVenue.Capacity",
                description: "Capacity must be greater than 0.");
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
            street,
            postalCode,
            municipalityId,
            capacity,
            pricePerPerson,
            mainImageUrl);

        // Raise domain event
        // Note: Event raising mechanism would be implemented in base Entity class
        // For now, just creating the event as a placeholder
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

    public ErrorOr<Success> SetCapacity(int capacity)
    {
        if (capacity <= 0)
        {
            return Error.Validation(
                code: "WeddingVenue.Capacity",
                description: "Capacity must be greater than 0.");
        }

        Capacity = capacity;
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

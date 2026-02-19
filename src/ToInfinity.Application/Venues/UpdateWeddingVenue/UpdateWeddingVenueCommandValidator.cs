using FluentValidation;

namespace ToInfinity.Application.Venues.UpdateWeddingVenue;

public class UpdateWeddingVenueCommandValidator
    : AbstractValidator<UpdateWeddingVenueCommand>
{
    private static readonly string[] AllowedContentTypes = ["image/jpeg", "image/png", "image/webp"];
    private const int MaxImageSizeInBytes = 5 * 1024 * 1024; // 5 MB

    public UpdateWeddingVenueCommandValidator()
    {
        RuleFor(x => x.VenueId)
            .NotEmpty()
            .WithMessage("VenueId is required.");

        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("UserId is required.");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(200)
            .WithMessage("Name must not exceed 200 characters.");

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(2000)
            .WithMessage("Description must not exceed 2000 characters.");

        RuleFor(x => x.Street)
            .NotEmpty()
            .WithMessage("Street is required.");

        RuleFor(x => x.PostalCode)
            .NotEmpty()
            .WithMessage("Postal code is required.");

        RuleFor(x => x.MunicipalityId)
            .NotEmpty()
            .WithMessage("Municipality is required.");

        RuleFor(x => x.Capacity)
            .GreaterThan(0)
            .WithMessage("Capacity must be greater than 0.");

        RuleFor(x => x.PricePerPerson)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Price per person must be greater than or equal to 0.");

        // Image validation only when a new image is provided
        When(x => x.ImageData is { Length: > 0 }, () =>
        {
            RuleFor(x => x.ImageData!)
                .Must(data => data.Length <= MaxImageSizeInBytes)
                .WithMessage("Main image must not exceed 5 MB.");

            RuleFor(x => x.ImageFileName)
                .NotEmpty()
                .WithMessage("Image file name is required when uploading an image.");

            RuleFor(x => x.ImageContentType)
                .NotEmpty()
                .WithMessage("Image content type is required when uploading an image.")
                .Must(ct => AllowedContentTypes.Contains(ct!))
                .WithMessage("Only JPEG, PNG, and WebP images are accepted.");
        });
    }
}

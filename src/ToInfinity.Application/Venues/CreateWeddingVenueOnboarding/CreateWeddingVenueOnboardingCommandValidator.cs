using FluentValidation;

namespace ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;

public class CreateWeddingVenueOnboardingCommandValidator
    : AbstractValidator<CreateWeddingVenueOnboardingCommand>
{
    private static readonly string[] AllowedContentTypes = ["image/jpeg", "image/png", "image/webp"];
    private const int MaxImageSizeInBytes = 5 * 1024 * 1024; // 5 MB

    public CreateWeddingVenueOnboardingCommandValidator()
    {
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

        RuleFor(x => x.VenueType)
            .IsInEnum()
            .WithMessage("VenueType must be a valid value.");

        RuleFor(x => x.MinCapacity)
            .GreaterThan(0)
            .WithMessage("MinCapacity must be greater than 0.");

        RuleFor(x => x.MaxCapacity)
            .GreaterThan(0)
            .WithMessage("MaxCapacity must be greater than 0.")
            .GreaterThanOrEqualTo(x => x.MinCapacity)
            .WithMessage("MaxCapacity must be greater than or equal to MinCapacity.");

        RuleFor(x => x.PricePerPerson)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Price per person must be greater than or equal to 0.");

        RuleFor(x => x.ImageData)
            .NotEmpty()
            .WithMessage("Main image is required.")
            .Must(data => data.Length <= MaxImageSizeInBytes)
            .WithMessage("Main image must not exceed 5 MB.");

        RuleFor(x => x.ImageFileName)
            .NotEmpty()
            .WithMessage("Image file name is required.");

        RuleFor(x => x.ImageContentType)
            .NotEmpty()
            .WithMessage("Image content type is required.")
            .Must(ct => AllowedContentTypes.Contains(ct))
            .WithMessage("Image must be JPEG, PNG, or WebP.");

        RuleFor(x => x.RentalPrice)
            .GreaterThanOrEqualTo(0)
            .When(x => x.RentalPrice.HasValue)
            .WithMessage("Rental price must be greater than or equal to 0.");

        RuleFor(x => x.SpacesDescription)
            .MaximumLength(5000)
            .When(x => x.SpacesDescription is not null)
            .WithMessage("Spaces description must not exceed 5000 characters.");

        RuleFor(x => x.ServicesDescription)
            .MaximumLength(5000)
            .When(x => x.ServicesDescription is not null)
            .WithMessage("Services description must not exceed 5000 characters.");

        RuleFor(x => x.GastronomyDescription)
            .MaximumLength(5000)
            .When(x => x.GastronomyDescription is not null)
            .WithMessage("Gastronomy description must not exceed 5000 characters.");

        RuleFor(x => x.LocationDescription)
            .MaximumLength(5000)
            .When(x => x.LocationDescription is not null)
            .WithMessage("Location description must not exceed 5000 characters.");

        RuleFor(x => x.Latitude)
            .InclusiveBetween(-90, 90)
            .When(x => x.Latitude.HasValue)
            .WithMessage("Latitude must be between -90 and 90.");

        RuleFor(x => x.Longitude)
            .InclusiveBetween(-180, 180)
            .When(x => x.Longitude.HasValue)
            .WithMessage("Longitude must be between -180 and 180.");

        RuleFor(x => x.Phone)
            .MaximumLength(20)
            .When(x => x.Phone is not null)
            .WithMessage("Phone must not exceed 20 characters.");

        RuleFor(x => x.Email)
            .MaximumLength(200)
            .When(x => x.Email is not null)
            .WithMessage("Email must not exceed 200 characters.");

        RuleFor(x => x.Website)
            .MaximumLength(500)
            .When(x => x.Website is not null)
            .WithMessage("Website must not exceed 500 characters.");
    }
}

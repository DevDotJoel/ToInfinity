using FluentValidation;

namespace ToInfinity.Application.Venues.CreateWeddingVenueOnboarding;

public class CreateWeddingVenueOnboardingCommandValidator
    : AbstractValidator<CreateWeddingVenueOnboardingCommand>
{
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

        RuleFor(x => x.City)
            .NotEmpty()
            .WithMessage("City is required.");

        RuleFor(x => x.Capacity)
            .GreaterThan(0)
            .WithMessage("Capacity must be greater than 0.");

        RuleFor(x => x.MinPrice)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Minimum price must be greater than or equal to 0.");

        RuleFor(x => x.MaxPrice)
            .GreaterThanOrEqualTo(x => x.MinPrice)
            .WithMessage("Maximum price must be greater than or equal to minimum price.");

        RuleFor(x => x.MainImageUrl)
            .NotEmpty()
            .WithMessage("Main image URL is required.")
            .Must(BeAValidUrl)
            .WithMessage("Main image URL must be a valid URL.");
    }

    private bool BeAValidUrl(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
            && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
    }
}

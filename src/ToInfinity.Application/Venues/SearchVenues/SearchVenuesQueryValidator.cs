using FluentValidation;

namespace ToInfinity.Application.Venues.SearchVenues;

public class SearchVenuesQueryValidator : AbstractValidator<SearchVenuesQuery>
{
    public SearchVenuesQueryValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThan(0)
            .WithMessage("Page must be greater than 0.");

        RuleFor(x => x.Size)
            .GreaterThan(0)
            .WithMessage("Size must be greater than 0.")
            .LessThanOrEqualTo(100)
            .WithMessage("Size must not exceed 100.");
    }
}

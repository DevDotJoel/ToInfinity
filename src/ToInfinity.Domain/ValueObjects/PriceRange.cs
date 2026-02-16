using ErrorOr;
using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.ValueObjects;

public sealed class PriceRange : ValueObject
{
    public decimal Min { get; }
    public decimal Max { get; }

    private PriceRange(decimal min, decimal max)
    {
        Min = min;
        Max = max;
    }

    public static ErrorOr<PriceRange> Create(decimal min, decimal max)
    {
        if (min < 0)
        {
            return Error.Validation(
                code: "PriceRange.Min",
                description: "Minimum price must be greater than or equal to 0.");
        }

        if (max < min)
        {
            return Error.Validation(
                code: "PriceRange.Max",
                description: "Maximum price must be greater than or equal to minimum price.");
        }

        return new PriceRange(min, max);
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Min;
        yield return Max;
    }
}

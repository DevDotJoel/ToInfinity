using ErrorOr;
using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.ValueObjects;

public sealed class Address : ValueObject
{
    public string Street { get; }
    public string City { get; }

    private Address(string street, string city)
    {
        Street = street;
        City = city;
    }

    public static ErrorOr<Address> Create(string street, string city)
    {
        if (string.IsNullOrWhiteSpace(street))
        {
            return Error.Validation(
                code: "Address.Street",
                description: "Street cannot be empty.");
        }

        if (string.IsNullOrWhiteSpace(city))
        {
            return Error.Validation(
                code: "Address.City",
                description: "City cannot be empty.");
        }

        return new Address(street, city);
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Street;
        yield return City;
    }
}

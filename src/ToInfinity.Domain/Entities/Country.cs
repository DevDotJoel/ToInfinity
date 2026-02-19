using ErrorOr;
using ToInfinity.Domain.Shared;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Domain.Entities;

public sealed class Country : Entity<CountryId>
{
    public string Name { get; private set; }
    public string Code { get; private set; }

    private Country(CountryId id, string name, string code) : base(id)
    {
        Name = name;
        Code = code;
    }

    private Country()
    {
        Name = default!;
        Code = default!;
    }

    public static ErrorOr<Country> Create(int id, string name, string code)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Error.Validation(
                code: "Country.Name",
                description: "Country name cannot be empty.");
        }

        if (string.IsNullOrWhiteSpace(code))
        {
            return Error.Validation(
                code: "Country.Code",
                description: "Country code cannot be empty.");
        }

        return new Country(CountryId.Create(id), name, code);
    }
}

using ErrorOr;
using ToInfinity.Domain.Shared;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Domain.Entities;

public sealed class District : Entity<DistrictId>
{
    public string Name { get; private set; }
    public CountryId CountryId { get; private set; }

    private District(DistrictId id, string name, CountryId countryId) : base(id)
    {
        Name = name;
        CountryId = countryId;
    }

    private District()
    {
        Name = default!;
        CountryId = default!;
    }

    public static ErrorOr<District> Create(int id, string name, CountryId countryId)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Error.Validation(
                code: "District.Name",
                description: "District name cannot be empty.");
        }

        if (countryId is null)
        {
            return Error.Validation(
                code: "District.CountryId",
                description: "CountryId cannot be null.");
        }

        return new District(DistrictId.Create(id), name, countryId);
    }
}

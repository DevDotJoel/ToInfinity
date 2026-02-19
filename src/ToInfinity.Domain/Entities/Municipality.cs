using ErrorOr;
using ToInfinity.Domain.Shared;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Domain.Entities;

public sealed class Municipality : Entity<MunicipalityId>
{
    public string Name { get; private set; }
    public DistrictId DistrictId { get; private set; }

    private Municipality(MunicipalityId id, string name, DistrictId districtId) : base(id)
    {
        Name = name;
        DistrictId = districtId;
    }

    private Municipality()
    {
        Name = default!;
        DistrictId = default!;
    }

    public static ErrorOr<Municipality> Create(int id, string name, DistrictId districtId)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Error.Validation(
                code: "Municipality.Name",
                description: "Municipality name cannot be empty.");
        }

        if (districtId is null)
        {
            return Error.Validation(
                code: "Municipality.DistrictId",
                description: "DistrictId cannot be null.");
        }

        return new Municipality(MunicipalityId.Create(id), name, districtId);
    }
}

using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.ValueObjects;

public sealed class DistrictId : EntityId<int>
{
    private DistrictId(int value) : base(value)
    {
    }

    private DistrictId()
    {
    }

    public static DistrictId Create(int value)
    {
        return new DistrictId(value);
    }
}

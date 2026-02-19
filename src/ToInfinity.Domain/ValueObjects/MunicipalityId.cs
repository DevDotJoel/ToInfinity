using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.ValueObjects;

public sealed class MunicipalityId : EntityId<int>
{
    private MunicipalityId(int value) : base(value)
    {
    }

    private MunicipalityId()
    {
    }

    public static MunicipalityId Create(int value)
    {
        return new MunicipalityId(value);
    }
}

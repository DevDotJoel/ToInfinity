using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.ValueObjects;

public sealed class CountryId : EntityId<int>
{
    private CountryId(int value) : base(value)
    {
    }

    private CountryId()
    {
    }

    public static CountryId Create(int value)
    {
        return new CountryId(value);
    }
}

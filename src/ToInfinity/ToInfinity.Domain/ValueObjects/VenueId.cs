using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.ValueObjects;

public sealed record VenueId : EntityId<Guid>
{
    private VenueId(Guid value) : base(value)
    {
    }

    public static VenueId Create(Guid value)
    {
        return new VenueId(value);
    }

    public static VenueId CreateUnique()
    {
        return new VenueId(Guid.NewGuid());
    }
}

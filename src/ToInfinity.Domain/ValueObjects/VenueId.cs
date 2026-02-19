using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.ValueObjects;

public sealed class VenueId : EntityId<Guid>
{
    private VenueId(Guid value) : base(value)
    {
    }

    private VenueId()
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

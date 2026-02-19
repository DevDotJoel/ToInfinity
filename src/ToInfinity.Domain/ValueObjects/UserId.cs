using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.ValueObjects;

public sealed class UserId : EntityId<Guid>
{
    private UserId(Guid value) : base(value)
    {
    }

    private UserId()
    {
    }

    public static UserId Create(Guid value)
    {
        return new UserId(value);
    }

    public static UserId CreateUnique()
    {
        return new UserId(Guid.NewGuid());
    }
}

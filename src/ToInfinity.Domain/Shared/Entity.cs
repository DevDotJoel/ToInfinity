namespace ToInfinity.Domain.Shared;

public abstract class Entity<TId> : AuditableEntity, IEquatable<Entity<TId>>
    where TId : ValueObject
{
    public TId Id { get; private set; }

    protected Entity(TId id) : base()
    {
        Id = id;
    }

    protected Entity() : base()
    {
        Id = default!;
    }

    public bool Equals(Entity<TId>? other)
    {
        return other is not null && EqualityComparer<TId>.Default.Equals(Id, other.Id);
    }

    public override bool Equals(object? obj)
    {
        return obj is Entity<TId> other && EqualityComparer<TId>.Default.Equals(Id, other.Id);
    }

    public override int GetHashCode()
    {
        return EqualityComparer<TId>.Default.GetHashCode(Id);
    }

    public static bool operator ==(Entity<TId>? left, Entity<TId>? right)
    {
        return Equals(left, right);
    }

    public static bool operator !=(Entity<TId>? left, Entity<TId>? right)
    {
        return !Equals(left, right);
    }
}

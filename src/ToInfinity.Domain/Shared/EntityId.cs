namespace ToInfinity.Domain.Shared;

public abstract class EntityId<T> : ValueObject
    where T : notnull
{
    public T Value { get; }

    protected EntityId(T value)
    {
        Value = value;
    }

    protected EntityId()
    {
        Value = default!;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public override string? ToString() => Value?.ToString();
}

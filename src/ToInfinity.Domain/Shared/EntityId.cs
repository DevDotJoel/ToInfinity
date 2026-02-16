namespace ToInfinity.Domain.Shared;

public abstract record EntityId<T>
    where T : notnull
{
    public T Value { get; }

    protected EntityId(T value)
    {
        Value = value;
    }
}

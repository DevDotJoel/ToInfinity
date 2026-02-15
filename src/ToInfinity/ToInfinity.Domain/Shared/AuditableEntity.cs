namespace ToInfinity.Domain.Shared;

public abstract class AuditableEntity
{
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }

    protected AuditableEntity()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }
}

using ToInfinity.Domain.Shared;

namespace ToInfinity.Domain.ValueObjects;

public sealed record GalleryImageId : EntityId<Guid>
{
    private GalleryImageId(Guid value) : base(value)
    {
    }

    public static GalleryImageId Create(Guid value)
    {
        return new GalleryImageId(value);
    }

    public static GalleryImageId CreateUnique()
    {
        return new GalleryImageId(Guid.NewGuid());
    }
}

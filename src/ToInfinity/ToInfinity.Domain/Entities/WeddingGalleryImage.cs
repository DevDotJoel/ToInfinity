using ErrorOr;
using ToInfinity.Domain.Shared;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Domain.Entities;

public sealed class WeddingGalleryImage : Entity<GalleryImageId>
{
    public string Url { get; private set; }
    public int Order { get; private set; }

    private WeddingGalleryImage(GalleryImageId id, string url, int order) : base(id)
    {
        Url = url;
        Order = order;
    }

    public static ErrorOr<WeddingGalleryImage> Create(string url, int order)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            return Error.Validation(
                code: "WeddingGalleryImage.Url",
                description: "Url cannot be empty.");
        }

        return new WeddingGalleryImage(GalleryImageId.CreateUnique(), url, order);
    }

    internal ErrorOr<Success> SetOrder(int order)
    {
        Order = order;
        return Result.Success;
    }
}

namespace ToInfinity.Domain.Enums;

[Flags]
public enum VenueStyles
{
    None = 0,
    Rustic = 1 << 0,
    Garden = 1 << 1,
    Vineyard = 1 << 2,
    Modern = 1 << 3,
    Historic = 1 << 4,
    Industrial = 1 << 5,
    Bohemian = 1 << 6,
    Countryside = 1 << 7,
    Seaside = 1 << 8,
    Mountain = 1 << 9,
    Urban = 1 << 10,
    Romantic = 1 << 11,
    Poolside = 1 << 12
}

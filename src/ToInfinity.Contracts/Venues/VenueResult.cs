namespace ToInfinity.Contracts.Venues;

public record VenueResult(
    Guid Id,
    Guid UserId,
    string Name,
    string Description,
    string Street,
    string City,
    int Capacity,
    decimal MinPrice,
    decimal MaxPrice,
    string MainImageUrl);

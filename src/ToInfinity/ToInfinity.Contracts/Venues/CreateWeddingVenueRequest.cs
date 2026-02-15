namespace ToInfinity.Contracts.Venues;

public record CreateWeddingVenueRequest(
    string Name,
    string Description,
    string Street,
    string City,
    int Capacity,
    decimal MinPrice,
    decimal MaxPrice,
    string MainImageUrl);

namespace ToInfinity.Application.Venues.Models;

public record VenueDto(
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

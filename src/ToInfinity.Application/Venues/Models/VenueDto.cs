namespace ToInfinity.Application.Venues.Models;

public record VenueDto(
    Guid Id,
    Guid UserId,
    string Name,
    string Description,
    string Street,
    string PostalCode,
    int MunicipalityId,
    int Capacity,
    decimal PricePerPerson,
    string MainImageUrl);

namespace ToInfinity.Contracts.Venues;

public record VenueResult(
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

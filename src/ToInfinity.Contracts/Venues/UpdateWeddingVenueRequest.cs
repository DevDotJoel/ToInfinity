using Microsoft.AspNetCore.Http;

namespace ToInfinity.Contracts.Venues;

public record UpdateWeddingVenueRequest(
    string Name,
    string Description,
    string Street,
    string PostalCode,
    int MunicipalityId,
    int Capacity,
    decimal PricePerPerson,
    IFormFile? MainImage);

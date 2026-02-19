namespace ToInfinity.Contracts.Venues;

public record SearchVenuesRequest(
    int? CountryId = null,
    int? DistrictId = null,
    int? MunicipalityId = null,
    int Page = 1,
    int Size = 20);

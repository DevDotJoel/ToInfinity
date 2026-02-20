namespace ToInfinity.Contracts.Venues;

public record SearchVenuesRequest(
    string? SearchTerm = null,
    int? CountryId = null,
    int? DistrictId = null,
    int? MunicipalityId = null,
    int? VenueType = null,
    int? Styles = null,
    int? Amenities = null,
    int? MinCapacity = null,
    int? MaxCapacity = null,
    string? SortBy = null,
    int Page = 1,
    int Size = 20);

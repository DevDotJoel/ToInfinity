namespace ToInfinity.Contracts.Locations;

public record LocationsResponse(List<CountryResult> Countries);

public record CountryResult(int Id, string Name, string Code, List<DistrictResult> Districts);

public record DistrictResult(int Id, string Name, List<MunicipalityResult> Municipalities);

public record MunicipalityResult(int Id, string Name);

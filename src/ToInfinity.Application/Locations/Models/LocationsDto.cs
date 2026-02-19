namespace ToInfinity.Application.Locations.Models;

public record LocationsDto(List<CountryDto> Countries);

public record CountryDto(int Id, string Name, string Code, List<DistrictDto> Districts);

public record DistrictDto(int Id, string Name, List<MunicipalityDto> Municipalities);

public record MunicipalityDto(int Id, string Name);

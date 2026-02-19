using ErrorOr;
using MediatR;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Application.Locations.Models;

namespace ToInfinity.Application.Locations.GetLocations;

public class GetLocationsQueryHandler
    : IRequestHandler<GetLocationsQuery, ErrorOr<LocationsDto>>
{
    private readonly ICountryRepository _countryRepository;
    private readonly IDistrictRepository _districtRepository;
    private readonly IMunicipalityRepository _municipalityRepository;

    public GetLocationsQueryHandler(
        ICountryRepository countryRepository,
        IDistrictRepository districtRepository,
        IMunicipalityRepository municipalityRepository)
    {
        _countryRepository = countryRepository;
        _districtRepository = districtRepository;
        _municipalityRepository = municipalityRepository;
    }

    public async Task<ErrorOr<LocationsDto>> Handle(
        GetLocationsQuery query,
        CancellationToken cancellationToken)
    {
        var countries = await _countryRepository.GetAllAsync(cancellationToken);
        var districts = await _districtRepository.GetAllAsync(cancellationToken);
        var municipalities = await _municipalityRepository.GetAllAsync(cancellationToken);

        var districtsByCountry = districts
            .GroupBy(d => d.CountryId)
            .ToDictionary(g => g.Key, g => g.ToList());

        var municipalitiesByDistrict = municipalities
            .GroupBy(m => m.DistrictId)
            .ToDictionary(g => g.Key, g => g.ToList());

        var countryDtos = countries.Select(c => new CountryDto(
            c.Id.Value,
            c.Name,
            c.Code,
            districtsByCountry.GetValueOrDefault(c.Id, [])
                .Select(d => new DistrictDto(
                    d.Id.Value,
                    d.Name,
                    municipalitiesByDistrict.GetValueOrDefault(d.Id, [])
                        .Select(m => new MunicipalityDto(m.Id.Value, m.Name))
                        .OrderBy(m => m.Name)
                        .ToList()))
                .OrderBy(d => d.Name)
                .ToList()))
            .OrderBy(c => c.Name)
            .ToList();

        return new LocationsDto(countryDtos);
    }
}

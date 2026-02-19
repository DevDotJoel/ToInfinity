using Mapster;
using ToInfinity.Application.Locations.Models;
using ToInfinity.Contracts.Locations;

namespace ToInfinity.Api.Mappings;

public class LocationMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<LocationsDto, LocationsResponse>();
        config.NewConfig<CountryDto, CountryResult>();
        config.NewConfig<DistrictDto, DistrictResult>();
        config.NewConfig<MunicipalityDto, MunicipalityResult>();
    }
}

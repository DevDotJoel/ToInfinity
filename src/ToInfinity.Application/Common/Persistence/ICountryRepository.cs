using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Common.Persistence;

public interface ICountryRepository : IBaseRepository<CountryId, Country>
{
}

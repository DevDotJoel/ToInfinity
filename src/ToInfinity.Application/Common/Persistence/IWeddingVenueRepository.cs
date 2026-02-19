using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Common.Persistence;

public interface IWeddingVenueRepository : IBaseRepository<VenueId, WeddingVenue>
{
    Task<IReadOnlyList<WeddingVenue>> GetByUserIdAsync(UserId userId, CancellationToken cancellationToken = default);

    Task<List<WeddingVenue>> SearchAsync(
        string? searchTerm,
        CountryId? countryId,
        DistrictId? districtId,
        MunicipalityId? municipalityId,
        string? sortBy,
        int page,
        int size,
        CancellationToken cancellationToken = default);
}

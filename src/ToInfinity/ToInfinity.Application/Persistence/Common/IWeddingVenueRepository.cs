using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Persistence.Common;

public interface IWeddingVenueRepository : IBaseRepository<WeddingVenue, VenueId>
{
    Task<bool> ExistsAsync(VenueId id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<WeddingVenue>> GetByUserIdAsync(UserId userId, CancellationToken cancellationToken = default);
}

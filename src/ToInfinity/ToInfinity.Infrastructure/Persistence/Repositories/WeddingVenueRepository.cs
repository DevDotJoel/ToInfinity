using Microsoft.EntityFrameworkCore;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.Repositories;

public class WeddingVenueRepository : BaseRepository<WeddingVenue, VenueId>, IWeddingVenueRepository
{
    public WeddingVenueRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<bool> ExistsAsync(VenueId id, CancellationToken cancellationToken = default)
    {
        return await DbSet.AnyAsync(v => v.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<WeddingVenue>> GetByUserIdAsync(UserId userId, CancellationToken cancellationToken = default)
    {
        return await DbSet
            .Where(v => v.UserId == userId)
            .ToListAsync(cancellationToken);
    }
}

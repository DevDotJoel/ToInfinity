using Microsoft.EntityFrameworkCore;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.Enums;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.Repositories;

public class WeddingVenueRepository : IWeddingVenueRepository
{
    private readonly ApplicationDbContext _context;

    public WeddingVenueRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<WeddingVenue>> GetAllWithPaginationAsync(int page, int size, CancellationToken cancellationToken)
    {
        return await _context.WeddingVenues
            .AsNoTracking()
            .Skip((page - 1) * size)
            .Take(size)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<WeddingVenue>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _context.WeddingVenues
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<WeddingVenue?> GetByIdAsync(VenueId id, CancellationToken cancellationToken)
    {
        return await _context.WeddingVenues
            .Where(v => v.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<List<WeddingVenue>> GetByIdsAsync(List<VenueId> ids, CancellationToken cancellationToken)
    {
        return await _context.WeddingVenues
            .Where(v => ids.Contains(v.Id))
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(WeddingVenue entity, CancellationToken cancellationToken)
    {
        await _context.WeddingVenues.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task AddRangeAsync(List<WeddingVenue> entities, CancellationToken cancellationToken)
    {
        await _context.WeddingVenues.AddRangeAsync(entities, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(WeddingVenue entity, CancellationToken cancellationToken)
    {
        _context.WeddingVenues.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveAsync(WeddingVenue entity, CancellationToken cancellationToken)
    {
        _context.WeddingVenues.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveRangeAsync(List<WeddingVenue> entities, CancellationToken cancellationToken)
    {
        _context.WeddingVenues.RemoveRange(entities);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> ExistsAsync(VenueId id)
    {
        return await _context.WeddingVenues.AnyAsync(v => v.Id == id);
    }

    public async Task<IReadOnlyList<WeddingVenue>> GetByUserIdAsync(UserId userId, CancellationToken cancellationToken = default)
    {
        return await _context.WeddingVenues
            .Where(v => v.UserId == userId)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<List<WeddingVenue>> SearchAsync(
        string? searchTerm,
        CountryId? countryId,
        DistrictId? districtId,
        MunicipalityId? municipalityId,
        VenueType? venueType,
        VenueStyles? styles,
        VenueAmenities? amenities,
        int? minCapacity,
        int? maxCapacity,
        string? sortBy,
        int page,
        int size,
        CancellationToken cancellationToken = default)
    {
        var query = _context.WeddingVenues.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            var term = searchTerm.Trim().ToLower();
            query = query.Where(v => v.Name.ToLower().Contains(term));
        }

        if (venueType.HasValue)
        {
            query = query.Where(v => v.VenueType == venueType.Value);
        }

        if (styles.HasValue && styles.Value != VenueStyles.None)
        {
            query = query.Where(v => (v.Styles & styles.Value) != 0);
        }

        if (amenities.HasValue && amenities.Value != VenueAmenities.None)
        {
            query = query.Where(v => (v.Amenities & amenities.Value) == amenities.Value);
        }

        if (minCapacity.HasValue)
        {
            query = query.Where(v => v.MaxCapacity >= minCapacity.Value);
        }

        if (maxCapacity.HasValue)
        {
            query = query.Where(v => v.MinCapacity <= maxCapacity.Value);
        }

        if (municipalityId is not null)
        {
            query = query.Where(v => v.MunicipalityId == municipalityId);
        }
        else if (districtId is not null)
        {
            var municipalityIds = await _context.Municipalities
                .Where(m => m.DistrictId == districtId)
                .Select(m => m.Id)
                .ToListAsync(cancellationToken);

            query = query.Where(v => municipalityIds.Contains(v.MunicipalityId));
        }
        else if (countryId is not null)
        {
            var districtIds = await _context.Districts
                .Where(d => d.CountryId == countryId)
                .Select(d => d.Id)
                .ToListAsync(cancellationToken);

            var municipalityIds = await _context.Municipalities
                .Where(m => districtIds.Contains(m.DistrictId))
                .Select(m => m.Id)
                .ToListAsync(cancellationToken);

            query = query.Where(v => municipalityIds.Contains(v.MunicipalityId));
        }

        query = sortBy switch
        {
            "price-low" => query.OrderBy(v => v.PricePerPerson),
            "price-high" => query.OrderByDescending(v => v.PricePerPerson),
            "capacity" => query.OrderByDescending(v => v.MaxCapacity),
            _ => query.OrderBy(v => v.PricePerPerson),
        };

        return await query
            .Skip((page - 1) * size)
            .Take(size)
            .ToListAsync(cancellationToken);
    }
}

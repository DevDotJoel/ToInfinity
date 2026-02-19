using Microsoft.EntityFrameworkCore;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.Repositories;

public class DistrictRepository : IDistrictRepository
{
    private readonly ApplicationDbContext _context;

    public DistrictRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<District>> GetAllWithPaginationAsync(int page, int size, CancellationToken cancellationToken)
    {
        return await _context.Districts
            .AsNoTracking()
            .Skip((page - 1) * size)
            .Take(size)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<District>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _context.Districts
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<District?> GetByIdAsync(DistrictId id, CancellationToken cancellationToken)
    {
        return await _context.Districts
            .Where(d => d.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<List<District>> GetByIdsAsync(List<DistrictId> ids, CancellationToken cancellationToken)
    {
        return await _context.Districts
            .Where(d => ids.Contains(d.Id))
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(District entity, CancellationToken cancellationToken)
    {
        await _context.Districts.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task AddRangeAsync(List<District> entities, CancellationToken cancellationToken)
    {
        await _context.Districts.AddRangeAsync(entities, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(District entity, CancellationToken cancellationToken)
    {
        _context.Districts.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveAsync(District entity, CancellationToken cancellationToken)
    {
        _context.Districts.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveRangeAsync(List<District> entities, CancellationToken cancellationToken)
    {
        _context.Districts.RemoveRange(entities);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> ExistsAsync(DistrictId id)
    {
        return await _context.Districts.AnyAsync(d => d.Id == id);
    }
}

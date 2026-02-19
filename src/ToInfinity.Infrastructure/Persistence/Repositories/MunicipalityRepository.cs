using Microsoft.EntityFrameworkCore;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.Repositories;

public class MunicipalityRepository : IMunicipalityRepository
{
    private readonly ApplicationDbContext _context;

    public MunicipalityRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Municipality>> GetAllWithPaginationAsync(int page, int size, CancellationToken cancellationToken)
    {
        return await _context.Municipalities
            .AsNoTracking()
            .Skip((page - 1) * size)
            .Take(size)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<Municipality>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _context.Municipalities
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<Municipality?> GetByIdAsync(MunicipalityId id, CancellationToken cancellationToken)
    {
        return await _context.Municipalities
            .Where(m => m.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<List<Municipality>> GetByIdsAsync(List<MunicipalityId> ids, CancellationToken cancellationToken)
    {
        return await _context.Municipalities
            .Where(m => ids.Contains(m.Id))
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Municipality entity, CancellationToken cancellationToken)
    {
        await _context.Municipalities.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task AddRangeAsync(List<Municipality> entities, CancellationToken cancellationToken)
    {
        await _context.Municipalities.AddRangeAsync(entities, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Municipality entity, CancellationToken cancellationToken)
    {
        _context.Municipalities.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveAsync(Municipality entity, CancellationToken cancellationToken)
    {
        _context.Municipalities.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveRangeAsync(List<Municipality> entities, CancellationToken cancellationToken)
    {
        _context.Municipalities.RemoveRange(entities);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> ExistsAsync(MunicipalityId id)
    {
        return await _context.Municipalities.AnyAsync(m => m.Id == id);
    }
}

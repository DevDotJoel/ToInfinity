using Microsoft.EntityFrameworkCore;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Domain.Entities;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.Repositories;

public class CountryRepository : ICountryRepository
{
    private readonly ApplicationDbContext _context;

    public CountryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Country>> GetAllWithPaginationAsync(int page, int size, CancellationToken cancellationToken)
    {
        return await _context.Countries
            .AsNoTracking()
            .Skip((page - 1) * size)
            .Take(size)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<Country>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _context.Countries
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<Country?> GetByIdAsync(CountryId id, CancellationToken cancellationToken)
    {
        return await _context.Countries
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<List<Country>> GetByIdsAsync(List<CountryId> ids, CancellationToken cancellationToken)
    {
        return await _context.Countries
            .Where(c => ids.Contains(c.Id))
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Country entity, CancellationToken cancellationToken)
    {
        await _context.Countries.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task AddRangeAsync(List<Country> entities, CancellationToken cancellationToken)
    {
        await _context.Countries.AddRangeAsync(entities, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Country entity, CancellationToken cancellationToken)
    {
        _context.Countries.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveAsync(Country entity, CancellationToken cancellationToken)
    {
        _context.Countries.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task RemoveRangeAsync(List<Country> entities, CancellationToken cancellationToken)
    {
        _context.Countries.RemoveRange(entities);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> ExistsAsync(CountryId id)
    {
        return await _context.Countries.AnyAsync(c => c.Id == id);
    }
}

using Microsoft.EntityFrameworkCore;
using ToInfinity.Application.Common.Persistence;
using ToInfinity.Domain.Shared;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Infrastructure.Persistence.Repositories;

public abstract class BaseRepository<TEntity, TId> : IBaseRepository<TEntity, TId>
    where TEntity : Entity<TId>
    where TId : EntityId<Guid>
{
    protected readonly ApplicationDbContext Context;
    protected readonly DbSet<TEntity> DbSet;

    protected BaseRepository(ApplicationDbContext context)
    {
        Context = context;
        DbSet = context.Set<TEntity>();
    }

    public async Task AddAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        await DbSet.AddAsync(entity, cancellationToken);
    }

    public Task UpdateAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        DbSet.Update(entity);
        return Task.CompletedTask;
    }

    public Task RemoveAsync(TEntity entity, CancellationToken cancellationToken = default)
    {
        DbSet.Remove(entity);
        return Task.CompletedTask;
    }

    public async Task<TEntity?> GetByIdAsync(TId id, CancellationToken cancellationToken = default)
    {
        return await DbSet.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
    }
}

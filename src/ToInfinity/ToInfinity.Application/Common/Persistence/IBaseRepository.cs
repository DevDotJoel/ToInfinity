using ToInfinity.Domain.Shared;
using ToInfinity.Domain.ValueObjects;

namespace ToInfinity.Application.Common.Persistence;

public interface IBaseRepository<TEntity, TId>
    where TEntity : Entity<TId>
    where TId : EntityId<Guid>
{
    Task AddAsync(TEntity entity, CancellationToken cancellationToken = default);
    Task UpdateAsync(TEntity entity, CancellationToken cancellationToken = default);
    Task RemoveAsync(TEntity entity, CancellationToken cancellationToken = default);
    Task<TEntity?> GetByIdAsync(TId id, CancellationToken cancellationToken = default);
}

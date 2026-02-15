namespace ToInfinity.Application.Common.Persistence;

public interface IBaseRepository<TId, T> where T : class
{
    Task<List<T>> GetAllWithPaginationAsync(int page, int size, CancellationToken cancellationToken);
    Task<List<T>> GetAllAsync(CancellationToken cancellationToken);
    Task<T?> GetByIdAsync(TId id, CancellationToken cancellationToken);
    Task<List<T>> GetByIdsAsync(List<TId> ids, CancellationToken cancellationToken);
    Task AddAsync(T entity, CancellationToken cancellationToken);
    Task AddRangeAsync(List<T> entities, CancellationToken cancellationToken);
    Task UpdateAsync(T entity, CancellationToken cancellationToken);
    Task RemoveAsync(T entity, CancellationToken cancellationToken);
    Task RemoveRangeAsync(List<T> entities, CancellationToken cancellationToken);
    Task<bool> ExistsAsync(TId id);
}

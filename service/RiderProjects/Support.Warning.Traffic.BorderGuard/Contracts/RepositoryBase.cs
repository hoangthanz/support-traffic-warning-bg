using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Support.Warning.Traffic.BorderGuard.Contracts;

public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
{
    protected SupportWarningContext Context { get; set; }

    public RepositoryBase(SupportWarningContext context)
    {
        Context = context;
    }

    public IQueryable<TEntity> FindAll() => Context.Set<TEntity>().AsNoTracking();

    public IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> expression) =>
        Context.Set<TEntity>().Where(expression).AsNoTracking();

    public void Create(TEntity entity) => Context.Set<TEntity>().Add(entity);
    public void Update(TEntity entity) => Context.Set<TEntity>().Update(entity);
    public void Delete(TEntity entity) => Context.Set<TEntity>().Remove(entity);

    public void Dispose()
    {
        Context?.Dispose();
    }
}
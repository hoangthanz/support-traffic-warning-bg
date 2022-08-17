using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IAreaRepository : IRepositoryBase<Area>
{
    Task CreateAsync(Area obj);

    Task UpdateAsync(Area obj);

    Task DeleteAsync(int id);
}
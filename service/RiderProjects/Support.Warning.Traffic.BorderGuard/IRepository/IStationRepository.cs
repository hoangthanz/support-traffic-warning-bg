using Support.Warning.Traffic.BorderGuard.Common;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IStationRepository : IRepositoryBase<Station>
{
    Task<RespondApi<List<Station>>> GetAll();
    Task<RespondApi<Station>> GetById(int id);
    Task<RespondApi<Station>> CreateAsync(Station model);
    Task<RespondApi<Station>> UpdateAsync(int id, Station obj);
    Task<RespondApi<Station>> RemoveAsync(int id);
}
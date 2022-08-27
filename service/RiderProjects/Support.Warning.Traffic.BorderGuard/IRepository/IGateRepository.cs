using Common.Service.Models.Respond;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Gate;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IGateRepository : IRepositoryBase<Gate>
{
    Task<RespondApi<List<Gate>>> GetAll();
    Task<RespondApi<Gate>> GetById(int id);
    Task<RespondApi<Gate>> CreateAsync(GateCreate model);
    Task<RespondApi<Gate>> UpdateAsync(int id, GateCreate obj);
    Task<RespondApi<Gate>> DeleteAsync(int id);
    Task<RespondApi<Gate>> RemoveAsync(int id);
}
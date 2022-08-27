using Common.Service.Models.Respond;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Area;


namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IAreaRepository : IRepositoryBase<Area>
{
    Task<RespondApi<List<Area>>> GetAll();
    Task<RespondApi<Area>> GetById(int id);
    Task<RespondApi<Area>> CreateAsync(CreateArea model);
    Task<RespondApi<Area>> UpdateAsync(int id, CreateArea obj);
    Task<RespondApi<Area>> RemoveAsync(int id);
}
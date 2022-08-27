using Common.Service.Models.Respond;
using Support.Warning.Traffic.BorderGuard.Models.Region;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IProvinceRepository
{
    Task<RespondApi<List<provinces>>> GetAll();
    Task<RespondApi<List<provinces>>> GetByCondition(ProvinceSearch model);
}
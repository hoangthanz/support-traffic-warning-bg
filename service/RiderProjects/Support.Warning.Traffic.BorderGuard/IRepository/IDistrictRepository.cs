using Common.Service.Models.Respond;
using Support.Warning.Traffic.BorderGuard.Models.Region;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IDistrictRepository
{
    Task<RespondApiPaging<List<districts>>> GetByCondition(DistrictSearch model);
}
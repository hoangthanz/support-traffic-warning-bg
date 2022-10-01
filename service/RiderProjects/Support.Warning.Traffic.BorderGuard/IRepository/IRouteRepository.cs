using Support.Warning.Traffic.BorderGuard.ViewModels.Map;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Map;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IRouteRepository
{ 
    Task<RespondRoute> GetRoute(RequestRoute model);
}
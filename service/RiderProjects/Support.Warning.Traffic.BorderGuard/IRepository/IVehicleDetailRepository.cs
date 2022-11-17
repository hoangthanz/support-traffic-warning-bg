using Support.Warning.Traffic.BorderGuard.Common;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.VehicleDetail;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IVehicleDetailRepository
{
    Task<RespondApiPaging<List<VehicleDetail>>> GetVehicleDetails(VehicleDetailSearch model);
}
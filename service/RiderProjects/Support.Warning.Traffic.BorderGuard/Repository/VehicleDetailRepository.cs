using Common.Service.Models.Respond;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.VehicleDetail;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class VehicleDetailRepository : IVehicleDetailRepository
{
    public Task<RespondApiPaging<List<VehicleDetail>>> GetVehicleDetails(VehicleDetailSearch model)
    {
        throw new NotImplementedException();
    }
}
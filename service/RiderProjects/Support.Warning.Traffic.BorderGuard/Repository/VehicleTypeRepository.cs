using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class VehicleTypeRepository: RepositoryBase<VehicleType>, IVehicleTypeRepository
{
    public VehicleTypeRepository(SupportWarningContext context) : base(context)
    {
    }
}
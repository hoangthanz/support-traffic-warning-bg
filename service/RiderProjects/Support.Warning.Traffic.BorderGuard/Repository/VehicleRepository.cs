using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class VehicleRepository: RepositoryBase<Vehicle>, IVehicleRepository
{
    public VehicleRepository(SupportWarningContext context) : base(context)
    {
    }
}
using Common.Service.Models.Request;
using JetBrains.Annotations;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Vehicles;

public class RequestGetVehicles : PagingParameterModel
{
    [CanBeNull] public string LicencePlate { get; set; }
    [CanBeNull] public string DriverName { get; set; }
    [CanBeNull] public string DriverPhone { get; set; }
    public bool? InGate { get; set; }
    [CanBeNull] public VehicleType Type { get; set; }
}
using JetBrains.Annotations;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Vehicles;

public class RequestRegisterManyVehicle
{
    public List<int> VehicleIds{ get; set; }
    public int GateId { get; set; }
    public bool InGate { get; set; }
}
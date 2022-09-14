using JetBrains.Annotations;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Vehicles;

public class RequestRegisterManyVehicle
{
    public List<RequestCreateVehicle> vehicles{ get; set; }
    public int GateId { get; set; }
    public bool InGate { get; set; }
}
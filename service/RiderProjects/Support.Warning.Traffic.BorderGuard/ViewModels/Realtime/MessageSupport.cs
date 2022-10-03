using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Realtime;

public class MessageSupport
{
    public Gate GateId { get; set; }
    public string Message { get; set; }
    public int VehicleId { get; set; }
    public string VehicleRegistrationPaperDetailId { get; set; }
}
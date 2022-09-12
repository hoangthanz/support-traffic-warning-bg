using System.ComponentModel;
using JetBrains.Annotations;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Vehicles;

public class RequestCreateVehicle
{
    public int VehicleTypeId { get; set; }
    
    public string LicencePlate { get; set; }
    
    [CanBeNull] public string NomalizanameLicencePlate { get; set; }
    
    public decimal Weight { get; set; } = 0;
    
    public decimal LoadDueToOwnWeight { get; set; } = 0;
    public string DriverName { get; set; }
    public string DriverPhone { get; set; }
}
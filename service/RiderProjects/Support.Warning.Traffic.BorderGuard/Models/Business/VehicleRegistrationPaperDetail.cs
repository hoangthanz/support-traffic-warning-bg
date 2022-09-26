using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ServiceStack.DataAnnotations;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class VehicleRegistrationPaperDetail
{
    public string Id { get; set; }

    public int VehicleRegistrationPaperId { get; set; }

    public int? VehicleId { get; set; }
    public Vehicle Vehicle { get; set; }
    [Description("Ngày đến dự kiến")] public DateTime ArrivalDate { get; set; }
    [Description("Thời gian đến dự kiến")] public TimeSpan ArrivalTime { get; set; }
    
    public int GateId { get; set; }
}
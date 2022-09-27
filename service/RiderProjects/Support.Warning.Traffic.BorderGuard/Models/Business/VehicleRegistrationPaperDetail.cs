using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ServiceStack.DataAnnotations;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class VehicleRegistrationPaperDetail
{
    [BsonElement(elementName: "_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public int VehicleRegistrationPaperId { get; set; }

    public int? VehicleId { get; set; }
    public Vehicle Vehicle { get; set; }
    [Description("Ngày đến dự kiến")] public DateTime ArrivalDate { get; set; }
    
    public int GateId { get; set; }
}
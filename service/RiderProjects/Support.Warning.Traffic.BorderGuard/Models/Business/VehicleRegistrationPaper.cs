using System.ComponentModel;
using Common.Service.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

[BsonIgnoreExtraElements]
public class VehicleRegistrationPaper : IDateTracking, IUserTracking, ICheckTracking
{
    [BsonElement(elementName: "_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public int GateId { get; set; }

    [Description("Ngày đến dự kiến")] public DateTime ArrivalDate { get; set; }

    [Description("Trạng thái gửi tờ khai")]
    public bool IsPushed { get; set; }


    [Description("Khóa ngoại - Id loại hình xuất nhập khẩu")]
    public int ExportImportTypeId { get; set; }

    public ExportImportType ExportImportType { get; set; }


    [Description("Id công ty có quyền với tờ khai")]
    public int? CompanyId { get; set; }

    public Company Company { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
    
    public List<VehicleRegistrationPaperDetail> PaperDetails { get; set; }
}
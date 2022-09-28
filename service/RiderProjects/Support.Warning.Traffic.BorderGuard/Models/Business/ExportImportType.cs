using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Service.Interfaces;
using MongoDB.Bson.Serialization.Attributes;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

[BsonIgnoreExtraElements]
public class ExportImportType : IDateTracking, IUserTracking, ICheckTracking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Description("Id")]
    public int Id { get; set; }
    
    [Required, MaxLength(255)]
    [Description("mã")]
    public string? Code { get; set; }

    [Required, MaxLength(255)]
    [Description("Tên")]
    public string? Name { get; set; }

    [Description("Tên chuẩn hóa")]
    public string? NormalizationName { get; set; }

    [Description("Mô tả")]
    public string? Description { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}
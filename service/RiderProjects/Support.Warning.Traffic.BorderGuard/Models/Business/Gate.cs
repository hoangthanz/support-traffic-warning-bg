using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Service.Interfaces;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class Gate : IDateTracking, IUserTracking, ICheckTracking
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

    [Description("Tên chuẩn hóa")] public string? NormalizationName { get; set; }

    [Description("Mô tả")] public string? Description { get; set; }


    [Description("Đánh dấu trạng thái xóa")]

    public bool IsDeleted { get; set; }

    [Description("Trạng thái hoạt động")] public bool Status { get; set; }

    [Description("Kinh độ")] public double Latitude { set; get; }

    [Description("Vĩ độ")] public double Longitude { set; get; }

    [ForeignKey("ProvinceId")]
    [Description("Id khu vực")]
    public int ProvinceId { get; set; }
    [ForeignKey("DistrictId")]
    [Description("Id huyện")]
    public int DistrictId { get; set; }
    [ForeignKey("ProvinceId")]
    [Description("Id xã, phường")]
    public int WardId { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
}
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Service.Interfaces;
using Support.Warning.Traffic.BorderGuard.Enums;

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
    public string ProvinceId { get; set; }
    [ForeignKey("DistrictId")]
    [Description("Id huyện")]
    public string DistrictId { get; set; }
    [ForeignKey("ProvinceId")]
    [Description("Id xã, phường")]
    public string WardId { get; set; }

    [Description("Cấp độ quốc gia")]
    public NationalLevel NationalLevel { get; set; } = NationalLevel.Nation;
    
    [Description("Loại hình vận chuyển")]
    public TypeOfShipping TypeOfShipping { get; set; } = TypeOfShipping.Road;
    
    [Description("Có khu kinh tế hay không")]
    public bool EconomicSector { get; set; } = false;
    
        
    [Description("Tới cửa khẩu nào")]
    public string CountryCode { get; set; } = "cn";
    
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
}
#nullable enable
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Service.Interfaces;
using JetBrains.Annotations;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class Vehicle : IDateTracking, IUserTracking, ICheckTracking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Description("Id")]
    public int Id { get; set; }
    
    [ForeignKey("VehicleTypeId")]
    [Description("Khóa ngoại - Id loại hình phường tiện liên kết bảng CtgVehicleTypes")]
    public int VehicleTypeId { get; set; }
    public VehicleType? VehicleType { get; set; }

    [Required]
    [Description("Biển số xe")]
    public string? LicencePlate { get; set; }

    [Description("Chuẩn hóa biển số xe")]
    public string? NomalizanameLicencePlate { get; set; }
    [Description("Id cửa khẩu")] [CanBeNull]
    public int GateId { get; set; }
    
    [Required]
    [Description("Tổng trọng hàng hóa - Đơn vị hiểu là Kg")]
    
    public decimal Weight { get; set; } = 0;
    
    public string DriverName { get; set; }
    public string DriverPhone { get; set; }
    [Description("Kinh độ")] public double Latitude { set; get; }

    [Description("Vĩ độ")] public double Longitude { set; get; }
    public bool InGate { get; set; } = false;

    [Required] 
    [Description("Tự trọng - trọng lượng của bản thân xe - Đơn vị hiểu là Kg")]
    public decimal LoadDueToOwnWeight { get; set; } = 0;
    
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}
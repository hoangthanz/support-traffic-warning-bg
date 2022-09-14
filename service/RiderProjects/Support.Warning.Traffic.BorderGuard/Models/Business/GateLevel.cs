using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

[Description("Bảng xác định cấu hình mức độ cho cửa khẩu")]
public class GateLevel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Description("Id")]
    public int Id { get; set; }
    
    public Gate Gate { get; set; }
    public int GateId { get; set; }
    
    public Level Level { get; set; }
    public int LevelId { get; set; }
    
    public decimal MinValue { get; set; }
    public decimal MaxValue { get; set; }

}
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class VehicleDetail
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Description("Id")]
    public int Id { get; set; }
    public Gate Gate { get; set; }
    public int GateId { get; set; }
    public Vehicle Vehicle { get; set; }
    public int VehicleId { get; set; }
    public DateTime InGateTime { get; set; }
    public DateTime? OutGateTime { get; set; }
    public bool IsDeleted { get; set; }
}
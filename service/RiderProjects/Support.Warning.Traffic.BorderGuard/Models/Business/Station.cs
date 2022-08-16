using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Service.Interfaces;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class Station : IDateTracking, IUserTracking, ICheckTracking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Description("Id")]
    public int Id { get; set; }

    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Website { get; set; }
    public string? Latitude { get; set; }
    public string? Longitude { get; set; }
    public string? Description { get; set; }

    [ForeignKey("VehicleTypeId")]
    [Description("Khóa ngoại - Id cửa khẩu")]
    public int GateId { get; set; }

    public Gate? Gate { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}
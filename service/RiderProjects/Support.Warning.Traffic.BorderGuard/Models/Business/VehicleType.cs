using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Support.Warning.Traffic.BorderGuard.Common.Models.Interfaces;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class VehicleType: IDateTracking, IUserTracking, ICheckTracking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    public string? Code { get; set; }
    [Required, MaxLength(255)]
    public string? Name { get; set; }
    public string? NormalizationName { get; set; }
    public string? Description { get; set; }

    public double MinValue { get; set; }
    public double MaxValue { get; set; }
    
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}
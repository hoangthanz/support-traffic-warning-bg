using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Service.Interfaces;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class Location: IDateTracking, IUserTracking, ICheckTracking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Description("Id")]
    public int Id { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}
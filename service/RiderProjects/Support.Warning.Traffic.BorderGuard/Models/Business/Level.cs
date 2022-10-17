using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Service.Interfaces;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class Level: ICheckTracking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Description("Id")]
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string Description { get; set; }
    public string Color { get; set; }
    
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}
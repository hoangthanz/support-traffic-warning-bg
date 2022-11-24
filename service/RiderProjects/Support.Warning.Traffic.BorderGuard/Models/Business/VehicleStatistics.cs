using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Support.Warning.Traffic.BorderGuard.Models.Business;

public class VehicleStatistics
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    public int? GateId { get; set; }
    public Gate Gate { get; set; }
    
    public string EIT1 { get; set; }
    public string EIT2 { get; set; }
    public string EIT3 { get; set; }
    public string EIT4 { get; set; }
    public string EIT5 { get; set; }
    
    public int EIT1Count { get; set; }
    public int EIT2Count { get; set; }
    public int EIT3Count { get; set; }
    public int EIT4Count { get; set; }
    public int EIT5Count { get; set; }
}
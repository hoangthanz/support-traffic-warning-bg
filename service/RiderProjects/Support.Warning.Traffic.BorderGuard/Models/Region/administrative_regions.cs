using System.ComponentModel.DataAnnotations;

namespace Support.Warning.Traffic.BorderGuard.Models.Region;

public class administrative_regions
{
    [Key] public int id { get; set; }
    public string? name { get; set; }
    public string? name_en { get; set; }
    public string? code_name { get; set; }
    public string? code_name_en { get; set; }
}
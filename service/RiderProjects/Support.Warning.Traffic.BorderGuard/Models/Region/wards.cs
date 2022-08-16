﻿using System.ComponentModel.DataAnnotations;

namespace Support.Warning.Traffic.BorderGuard.Models.Region;

public class wards
{
    [Key] public string code { get; set; }
    public string? name { get; set; }
    public string? name_en { get; set; }
    public string? full_name { get; set; }
    public string? full_name_en { get; set; }
    public string? code_name { get; set; }

    public string? district_code { get; set; }

    public int? administrative_unit_id { get; set; }
}
﻿namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Gate;

public class GateCreate
{
    public string? Code { get; set; }

    public string? Name { get; set; }

    public string? NormalizationName { get; set; }

    public string? Description { get; set; }

    public double Latitude { set; get; }

    public double Longitude { set; get; }
    
    public int ProvinceId { get; set; }
    
    public int DistrictId { get; set; }
    
    public int WardId { get; set; }
}
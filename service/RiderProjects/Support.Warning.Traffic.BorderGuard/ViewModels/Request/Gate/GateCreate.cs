using Support.Warning.Traffic.BorderGuard.Enums;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Gate;

public class GateCreate
{
    public string? Code { get; set; }

    public string? Name { get; set; }

    public string? NormalizationName { get; set; }

    public string? Description { get; set; }

    public bool Status { get; set; }
    public bool IsDeleted { get; set; }
    public double Latitude { set; get; }

    public double Longitude { set; get; }

    public string ProvinceId { get; set; }

    public string DistrictId { get; set; }
    public double RadiusGate { set; get; }

    public string WardId { get; set; }
    public NationalLevel NationalLevel { get; set; } = NationalLevel.Nation;
    public TypeOfShipping TypeOfShipping { get; set; } = TypeOfShipping.Road;
    public bool EconomicSector { get; set; } = false;
    public string CountryCode { get; set; } = "cn";
    public int CountVehicle { get; set; } = 0;
}
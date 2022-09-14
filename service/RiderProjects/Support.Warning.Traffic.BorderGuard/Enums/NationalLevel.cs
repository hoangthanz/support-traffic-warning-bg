using System.ComponentModel;

namespace Support.Warning.Traffic.BorderGuard.Enums;

public enum NationalLevel
{
    [Description("Quốc gia")]
    Nation = 0,
    [Description("Quốc tế")]
    International = 1,
    [Description("Tỉnh")]
    City = 1
}
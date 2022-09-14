using System.ComponentModel;

namespace Support.Warning.Traffic.BorderGuard.Enums;

public enum TypeOfShipping
{
    [Description("Đường hàng không")] AirRoute = 0,
    [Description("Đường bộ")] Road = 1,
    [Description("Đường thủy")] Waterway = 2,
    [Description("Đường sắt")] Railway = 3
}
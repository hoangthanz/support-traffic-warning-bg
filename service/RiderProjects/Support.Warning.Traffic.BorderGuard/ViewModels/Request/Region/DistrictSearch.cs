using Support.Warning.Traffic.BorderGuard.Common;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

public class DistrictSearch : PagingParameterModel
{
    public string Code { get; set; }
    public string? NameSearch { get; set; }
}
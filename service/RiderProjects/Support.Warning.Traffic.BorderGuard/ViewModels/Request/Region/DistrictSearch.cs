using Common.Service.Models.Request;
using Common.Service.Models.Respond;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

public class DistrictSearch : PagingParameterModel
{
    public string? NameSearch { get; set; }
}
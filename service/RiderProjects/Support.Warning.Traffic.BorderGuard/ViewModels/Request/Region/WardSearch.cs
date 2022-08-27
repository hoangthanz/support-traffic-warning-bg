using Common.Service.Models.Request;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

public class WardSearch : PagingParameterModel
{
    public string? NameSearch { get; set; }
}
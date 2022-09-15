using Common.Service.Models.Request;
using JetBrains.Annotations;
using Support.Warning.Traffic.BorderGuard.Enums;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Gate;

public class GateSearch : PagingParameterModel
{
    [CanBeNull] public string Name { get; set; }
    public NationalLevel?  NationalLevel { get; set; }
    public TypeOfShipping? TypeOfShipping { get; set; }
    public bool? EconomicSector { get; set; }
}
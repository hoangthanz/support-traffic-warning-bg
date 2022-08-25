using AutoMapper;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Gate;

namespace Support.Warning.Traffic.BorderGuard.MappingConfigure;

public class GateProfile : Profile
{
    public GateProfile()
    {
        CreateMap<GateCreate, Gate>().ReverseMap();
    }
}
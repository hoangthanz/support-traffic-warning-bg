using AutoMapper;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Station;

namespace Support.Warning.Traffic.BorderGuard.MappingConfigure;

public class StationProfile : Profile
{
    public StationProfile()
    {
        CreateMap<Station, CreateStation>().ReverseMap();
    }
}
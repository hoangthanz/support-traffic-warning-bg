using AutoMapper;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.ViewModels.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Gate;
using Support.Warning.Traffic.BorderGuard.ViewModels.Responds;

namespace Support.Warning.Traffic.BorderGuard.MappingConfigure;

public class RoleProfile : Profile
{
    public RoleProfile()
    {
        CreateMap<ApplicationRole, RespondRoleInfo>().ReverseMap();
        CreateMap<ApplicationUser, UserViewModel>().ReverseMap();
    }
}


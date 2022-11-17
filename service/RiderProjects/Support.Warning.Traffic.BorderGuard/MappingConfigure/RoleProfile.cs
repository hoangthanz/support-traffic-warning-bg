using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.ViewModels.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Responds;

namespace Support.Warning.Traffic.BorderGuard.MappingConfigure;

public class RoleProfile : Profile
{
    public RoleProfile()
    {
        CreateMap<ApplicationRole, RespondRoleInfo>().ReverseMap();
        CreateMap<ApplicationUser, UserViewModel>().ReverseMap();
        CreateMap<IdentityUserRole<int>, UserByRole>().ReverseMap();
    }
}


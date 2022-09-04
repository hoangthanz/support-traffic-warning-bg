using System.Security.Claims;
using Abp.Authorization;
using AutoMapper;
using Common.Service.Models.Respond;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.Permissions;
using Support.Warning.Traffic.BorderGuard.Settings;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Responds;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class AccountService : IAccountService
{
    UserManager<ApplicationUser> userManager;
    RoleManager<ApplicationRole> roleManager;
    private readonly long UserId;


    public AccountService(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager )
    {
        this.userManager = userManager;
        this.roleManager = roleManager;
    }

    public async Task<IEnumerable<Claim>> GetClaimsByUser(TokenValidatedContext context)
    {
        List<Claim> authClaims = new List<Claim>();
        string UserName = context.Principal.Identities.First().Name;

        ApplicationUser applicationUser = await userManager.FindByNameAsync(UserName);
        if (null == applicationUser)
            return authClaims;
        var roleDatas = await userManager.GetRolesAsync(applicationUser);
        foreach (var role in roleDatas)
        {
            var roleData = await roleManager.FindByNameAsync(role);
            if (roleData != null)
            {
                var roleClaims = await roleManager.GetClaimsAsync(roleData);
                foreach (Claim claim in roleClaims)
                {
                    authClaims.Add(claim);
                }
            }
        }

        return authClaims;
    }
}
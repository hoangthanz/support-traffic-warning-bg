using System.Security.Claims;
using Common.Service.Models.Respond;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Responds;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IAccountService
{
    Task<IEnumerable<Claim>> GetClaimsByUser(TokenValidatedContext context);
}
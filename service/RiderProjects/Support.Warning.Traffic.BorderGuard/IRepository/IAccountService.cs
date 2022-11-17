using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IAccountService
{
    Task<IEnumerable<Claim>> GetClaimsByUser(TokenValidatedContext context);
}
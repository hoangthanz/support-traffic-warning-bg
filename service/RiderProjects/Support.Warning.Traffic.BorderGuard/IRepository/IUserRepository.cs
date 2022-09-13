using Common.Service.Models.Respond;
using Microsoft.AspNetCore.Identity;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.ViewModels.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Permissions;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IUserRepository: IRepositoryBase<ApplicationUser>
{ 
    Task<RespondLoginModel> Login(RequestLoginModel model, string ip);
    Task<RespondLoginModel> RefreshToken(string refreshToken, string ip);
    Task<RespondApi<ApplicationUser>> Register(RegisterModel model);
    
    Task<RespondApi<List<UserViewModel>>> GetUserOfGate(int gateId);
    Task<RespondApi<List<IdentityUserClaim<int>>>> GetUserClaims(int userId);
    Task<RespondApi<List<IdentityUserClaim<int>>>> SetUserClaims(SetClaimUser claimUser);
    
}
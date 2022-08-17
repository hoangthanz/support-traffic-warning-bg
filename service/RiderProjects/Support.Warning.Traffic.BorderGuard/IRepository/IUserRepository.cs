using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.ViewModels.Account;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IUserRepository: IRepositoryBase<ApplicationUser>
{ 
    Task<RespondLoginModel> Login(RequestLoginModel model, string ipAddress);
    
}
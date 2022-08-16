using Support.Warning.Traffic.BorderGuard.ViewModels.Account;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IUserRepository
{ 
    Task<RespondLoginModel> Login(RequestLoginModel model, string ipAddress);
    
}
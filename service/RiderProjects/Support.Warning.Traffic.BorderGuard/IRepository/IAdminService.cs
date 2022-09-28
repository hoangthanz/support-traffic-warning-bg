using Common.Service.Models.Respond;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Responds;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IAdminService
{
    Task<RespondApi<IEnumerable<RespondUserInfo>>> GetAllUser();
    Task<RespondApi<string>> DeleteUserAdmin(string UserId);

    Task<RespondApi<string>> CreateRoleAdmin(RequestCreateRole model);

    Task<RespondApi<string>> DeleteRoleAdmin(string Id);
    Task<RespondApi<IEnumerable<RespondRoleInfo>>> GetAllRoleAdmin();

    Task<RespondApi<string>> UpdateRoleAdminWithPermission(string Id, RequestUpdateRole model);
    Task<RespondApi<string>> UpdateRoleAdminWithOutPermission(string Id, RequestUpdateRole model);
    Task<RespondApi<List<ClaimInfo>>> GetAllPermissionAdmin();
    Task<RespondApi<List<string>>> GetPermissionByRole(string Id);
    Task<RespondApi<string>> UpdateRolesUserInGate(RequestUpdateRolesUserInGate model);
    Task<RespondApi<List<int>>> GetRolesByUserId(int id);
    Task<RespondApi<List<ApplicationRole>>> GetRoles();
    Task<RespondApi<object>> SetUserByRole(List<UserByRole> model);
}
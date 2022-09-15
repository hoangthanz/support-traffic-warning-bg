using System.Security.Claims;
using Abp.Authorization;
using AutoMapper;
using Common.Service.Models.Respond;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Identity;
using Support.Warning.Traffic.BorderGuard.Permissions;
using Support.Warning.Traffic.BorderGuard.Settings;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Responds;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class AdminService : IAdminService
{
    UserManager<ApplicationUser> userManager;
    RoleManager<ApplicationRole> roleManager;
    private readonly IConfiguration configuration;
    private readonly long UserId;
    private readonly IMapper mapper;
    private readonly SupportWarningContext context;
    public AdminService(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager,
        IConfiguration configuration, IMapper mapper,
        SupportWarningContext context)
    {
        this.userManager = userManager;
        this.roleManager = roleManager;
        this.configuration = configuration;
        this.mapper = mapper;
        this.context = context;
    }
    
    public async Task<RespondApi<IEnumerable<RespondUserInfo>>> GetAllUser()
    {
        var UserAdmin = await userManager.FindByIdAsync(UserId.ToString());
        if (UserAdmin == null)
        {
            return new RespondApi<IEnumerable<RespondUserInfo>>()
            {
                Result = ResultRespond.Failed, Code = "01", Message = "Không có quyền truy cập thông tin",
                Data = new List<RespondUserInfo>()
            };
        }

        /*else if (UserAdmin.UserName != DefaultPermission.RoleAdministrator)
        {
            return new RespondAPI<IEnumerable<RespondUserInfo>>()
            {
                Result = ResultRespond.Failed, Code = "02", Message = "Không có quyền truy cập thông tin", Data = new List<RespondUserInfo>()
            };
        }*/
        IEnumerable<ApplicationUser> users = userManager.Users.Where(user => !user.IsDeleted);
        if (users == null || !users.Any())
        {
            return new RespondApi<IEnumerable<RespondUserInfo>>()
            {
                Result = ResultRespond.NotFound, Code = "01", Message = "Không tìm thấy dữ liệu",
                Data = new List<RespondUserInfo>()
            };
        }

        IEnumerable<RespondUserInfo> respondUsers = users.Select(e =>
        {
            RespondUserInfo respondUserInfo = mapper.Map<RespondUserInfo>(e);
            respondUserInfo.Roles = new List<RespondRoleInfo>();
            /*var resultRoles = userManager.GetRolesAsync(e);
            resultRoles.Wait();
            foreach (string role in resultRoles.Result)
            {
                var roleInfo = roleManager.FindByNameAsync(role);
                roleInfo.Wait();
                respondUserInfo.Roles.Add(mapper.Map<RespondRoleInfo>(roleInfo.Result));
            }*/
            return respondUserInfo;
        }).ToList();
        return new RespondApi<IEnumerable<RespondUserInfo>>()
        {
            Result = ResultRespond.Succeeded, Message = "Thành công", Data = respondUsers
        };
    }

    public async Task<RespondApi<string>> DeleteUserAdmin(string UserId)
    {
        var user = await userManager.FindByIdAsync(UserId.ToString());

        if (user == null)
            return new RespondApi<string>()
            {
                Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin"
            };

        var hasAdminRole = await userManager.GetRolesAsync(user);
        if (hasAdminRole.Contains(DefaultApplication.RoleAdministrator))
            return new RespondApi<string>()
            {
                Result = ResultRespond.Failed, Message = "Không thể xóa người dùng này"
            };

        await userManager.DeleteAsync(user);
        return new RespondApi<string>()
        {
            Result = ResultRespond.Succeeded, Message = "Thành công"
        };
    }

    public async Task<RespondApi<IEnumerable<RespondRoleInfo>>> GetAllRoleAdmin()
    {
        IEnumerable<ApplicationRole> applicationRoles =
            await context.Roles.Where(e => e.Name != DefaultApplication.RoleAdministrator).ToListAsync();
        IEnumerable<RespondRoleInfo> respondRoleInfos = mapper.Map<IEnumerable<RespondRoleInfo>>(applicationRoles);
        return new RespondApi<IEnumerable<RespondRoleInfo>>()
            { Result = ResultRespond.Succeeded, Message = "Thành công", Data = respondRoleInfos };
    }

    public async Task<RespondApi<string>> CreateRoleAdmin(RequestCreateRole model)
    {
        ApplicationRole hasRole = await roleManager.FindByNameAsync(model.Name);
        if (hasRole != null)
        {
            return new RespondApi<string>()
                { Result = ResultRespond.Duplication, Code = "01", Message = "Tên nhóm quyền đã tồn tại" };
        }

        ApplicationRole CheckDisplayName =
            await context.Roles.FirstOrDefaultAsync(e => e.DisplayName == model.DisplayName);
        if (CheckDisplayName != null)
        {
            return new RespondApi<string>()
                { Result = ResultRespond.Duplication, Code = "02", Message = "Tên hiển thị nhóm quyền đã tồn tại" };
        }

        ApplicationRole applicationRole = new ApplicationRole()
        {
            Name = model.Name,
            DisplayName = model.DisplayName,
            CanDelete = true,
            RoleInGate = model.RoleInGate
        };

        IdentityResult roleResult = await roleManager.CreateAsync(applicationRole);
        List<string> listPermissionInApp = PermissionConfig.DefineListPermission.ListClaim
            .SelectMany(e => e.Permissions).Select(e => e.Name).ToList();
        if (roleResult.Succeeded)
        {
            if (PermissionConfig.DefineListPermission.ListClaim == null)
                return new RespondApi<string>()
                    { Result = ResultRespond.Failed, Code = "01", Message = "Danh sách Permission không tồn tại" };
            if (listPermissionInApp.Count == 0)
            {
                return new RespondApi<string>()
                    { Result = ResultRespond.Failed, Code = "01", Message = "Danh sách Permission không tồn tại" };
            }

            foreach (string permission in model.ListPermission)
            {
                if (listPermissionInApp.Contains(permission))
                {
                    await roleManager.AddClaimAsync(applicationRole, new Claim(ClaimTypes.Role, permission));
                }
                else
                {
                    return new RespondApi<string>()
                        { Result = ResultRespond.Failed, Code = "02", Message = "Danh sách Permission không hợp lệ" };
                }
            }

            return new RespondApi<string>() { Result = ResultRespond.Succeeded, Message = "Tạo nhóm quyền thành công" };
        }

        return new RespondApi<string>()
            { Result = ResultRespond.Failed, Code = "03", Message = "Không thể khởi tạo nhóm quyền" };
    }

    public async Task<RespondApi<string>> DeleteRoleAdmin(string Id)
    {
        ApplicationRole role = await roleManager.FindByIdAsync(Id);
        if (role == null || !role.CanDelete)
            return new RespondApi<string>() { Result = ResultRespond.NotFound, Message = "Không tìm thấy quyền" };

        var checkUserRole = await userManager.GetUsersInRoleAsync(role.Name);
        if (checkUserRole != null && checkUserRole.Count() > 0)
        {
            return new RespondApi<string>()
                { Result = ResultRespond.Failed, Message = "Không thể xóa quyền đang sử dụng" };
        }

        await roleManager.DeleteAsync(role);

        return new RespondApi<string>() { Result = ResultRespond.Succeeded, Message = "Xóa quyền thành công" };
    }

    public async Task<RespondApi<string>> UpdateRoleAdminWithPermission(string Id, RequestUpdateRole model)
    {
        ApplicationRole hasRole = await roleManager.FindByIdAsync(Id.ToString());
        if (hasRole == null)
        {
            return new RespondApi<string>()
                { Result = ResultRespond.NotFound, Code = "01", Message = "Không tìm thấy thông tin nhóm quyền" };
        }

        if (hasRole.DisplayName != model.DisplayName)
        {
            ApplicationRole hasRoleExist =
                await context.Roles.FirstOrDefaultAsync(e => e.DisplayName == model.DisplayName);
            if (hasRoleExist != null)
            {
                return new RespondApi<string>()
                    { Result = ResultRespond.Duplication, Message = "Tên hiển thị nhóm quyền đã tồn tại" };
            }

            hasRole.DisplayName = model.DisplayName;
        }

        hasRole.RoleInGate = model.RoleInGate;
        hasRole.HaveOTP = model.HaveOTP;

        IdentityResult roleResult = await roleManager.UpdateAsync(hasRole);
        List<string> listPermissionInApp = PermissionConfig.DefineListPermission.ListClaim
            .SelectMany(e => e.Permissions).Select(e => e.Name).ToList();
        if (roleResult.Succeeded)
        {
            var roleClaims = await roleManager.GetClaimsAsync(hasRole);

            foreach (Claim claim in roleClaims)
            {
                await roleManager.RemoveClaimAsync(hasRole, claim);
            }

            if (PermissionConfig.DefineListPermission.ListClaim == null)
                return new RespondApi<string>()
                    { Result = ResultRespond.Failed, Code = "01", Message = "Danh sách Permission không tồn tại" };
            if (listPermissionInApp.Count == 0)
            {
                return new RespondApi<string>()
                    { Result = ResultRespond.Failed, Code = "01", Message = "Danh sách Permission không tồn tại" };
            }

            foreach (var permission in model.ListPermission)
            {
                if (listPermissionInApp.Contains(permission))
                {
                    await roleManager.AddClaimAsync(hasRole, new Claim(ClaimTypes.Role, permission));
                }
                else
                {
                    return new RespondApi<string>()
                        { Result = ResultRespond.Failed, Code = "02", Message = "Danh sách Permission không hợp lệ" };
                }
            }

            return new RespondApi<string>()
                { Result = ResultRespond.Succeeded, Message = "Cập nhật nhóm quyền thành công" };
        }

        return new RespondApi<string>()
            { Result = ResultRespond.Failed, Code = "03", Message = "Không thể cập nhật nhóm quyền" };
    }

    public async Task<RespondApi<string>> UpdateRoleAdminWithOutPermission(string Id, RequestUpdateRole model)
    {
        ApplicationRole hasRole = await roleManager.FindByIdAsync(Id.ToString());
        if (hasRole == null)
        {
            return new RespondApi<string>()
                { Result = ResultRespond.Failed, Message = "Không tìm thấy thông tin nhóm quyền" };
        }

        if (hasRole.DisplayName != model.DisplayName)
        {
            ApplicationRole hasRoleExist =
                await context.Roles.FirstOrDefaultAsync(e => e.DisplayName == model.DisplayName);
            if (hasRoleExist != null)
            {
                return new RespondApi<string>()
                    { Result = ResultRespond.Duplication, Message = "Tên hiển thị nhóm quyền đã tồn tại" };
            }

            hasRole.DisplayName = model.DisplayName;
        }

        hasRole.RoleInGate = model.RoleInGate;
        hasRole.HaveOTP = model.HaveOTP;

        IdentityResult roleResult = await roleManager.UpdateAsync(hasRole);

        return new RespondApi<string>() { Result = ResultRespond.Succeeded, Message = "Thành công" };
    }
    public Task<RespondApi<List<ClaimInfo>>> GetAllPermissionAdmin()
    {
        return Task.FromResult(new RespondApi<List<ClaimInfo>>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = PermissionConfig.DefineListPermission.ListClaim });
    }

    public async Task<RespondApi<List<string>>> GetPermissionByRole(string Id)
    {
        var role = await roleManager.FindByIdAsync(Id.ToString());

        if (role == null)
            return new RespondApi<List<string>>() { Result = ResultRespond.NotFound, Code = "01", Message = "Không tìm thấy thông tin quyền" };

        var claims = await roleManager.GetClaimsAsync(role);
        if (claims == null)
            return new RespondApi<List<string>>() { Result = ResultRespond.NotFound, Code = "02", Message = "Không tìm thấy thông tin permission" };
        return new RespondApi<List<string>>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = claims.Select(e => e.Value).ToList() };
    }

    public async Task<RespondApi<string>> UpdateRolesUserInGate(RequestUpdateRolesUserInGate model)
    {
        var user = await userManager.FindByIdAsync(model.UserId.ToString());
        if (user == null)
            return new RespondApi<string>() { Result = ResultRespond.NotFound, Code = "01", Message = "không tìm thấy thông tin người dùng" };

        var roles = await userManager.GetRolesAsync(user);
        if (roles != null && roles.Count > 0)
        {
            var resultDeleteRole = await userManager.RemoveFromRolesAsync(user, roles);
        }

        IEnumerable<ApplicationRole> roleList = await context.Roles.Where(e => e.Name != DefaultApplication.RoleAdministrator
                                                                               && e.RoleInGate).ToListAsync();

        foreach (string roleId in model.RoleIds)
        {
            var roleAdd = roleList.FirstOrDefault(e => e.Id.ToString() == roleId);
            if (roleAdd != null)
                await userManager.AddToRoleAsync(user, roleAdd.Name);
        }

        return new RespondApi<string>() { Result = ResultRespond.Succeeded, Message = "Thành công" };
    }
}
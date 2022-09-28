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
    private readonly UserManager<ApplicationUser> _userManager;
    readonly RoleManager<ApplicationRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly long _userId;
    private readonly IMapper _mapper;
    private readonly SupportWarningContext _context;
    public AdminService(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager,
        IConfiguration configuration, IMapper mapper,
        SupportWarningContext context)
    {
        this._userManager = userManager;
        this._roleManager = roleManager;
        this._configuration = configuration;
        this._mapper = mapper;
        this._context = context;
    }
    
    public async Task<RespondApi<IEnumerable<RespondUserInfo>>> GetAllUser()
    {
        var UserAdmin = await _userManager.FindByIdAsync(_userId.ToString());
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
        IEnumerable<ApplicationUser> users = _userManager.Users.Where(user => !user.IsDeleted);
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
            RespondUserInfo respondUserInfo = _mapper.Map<RespondUserInfo>(e);
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
        var user = await _userManager.FindByIdAsync(UserId.ToString());

        if (user == null)
            return new RespondApi<string>()
            {
                Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin"
            };

        var hasAdminRole = await _userManager.GetRolesAsync(user);
        if (hasAdminRole.Contains(DefaultApplication.RoleAdministrator))
            return new RespondApi<string>()
            {
                Result = ResultRespond.Failed, Message = "Không thể xóa người dùng này"
            };

        await _userManager.DeleteAsync(user);
        return new RespondApi<string>()
        {
            Result = ResultRespond.Succeeded, Message = "Thành công"
        };
    }

    public async Task<RespondApi<IEnumerable<RespondRoleInfo>>> GetAllRoleAdmin()
    {
        IEnumerable<ApplicationRole> applicationRoles =
            await _context.Roles.Where(e => e.Name != DefaultApplication.RoleAdministrator).ToListAsync();
        IEnumerable<RespondRoleInfo> respondRoleInfos = _mapper.Map<IEnumerable<RespondRoleInfo>>(applicationRoles);
        return new RespondApi<IEnumerable<RespondRoleInfo>>()
            { Result = ResultRespond.Succeeded, Message = "Thành công", Data = respondRoleInfos };
    }

    public async Task<RespondApi<string>> CreateRoleAdmin(RequestCreateRole model)
    {
        ApplicationRole hasRole = await _roleManager.FindByNameAsync(model.Name);
        if (hasRole != null)
        {
            return new RespondApi<string>()
                { Result = ResultRespond.Duplication, Code = "01", Message = "Tên nhóm quyền đã tồn tại" };
        }

        ApplicationRole CheckDisplayName =
            await _context.Roles.FirstOrDefaultAsync(e => e.DisplayName == model.DisplayName);
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

        IdentityResult roleResult = await _roleManager.CreateAsync(applicationRole);
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
                    await _roleManager.AddClaimAsync(applicationRole, new Claim(ClaimTypes.Role, permission));
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
        ApplicationRole role = await _roleManager.FindByIdAsync(Id);
        if (role == null || !role.CanDelete)
            return new RespondApi<string>() { Result = ResultRespond.NotFound, Message = "Không tìm thấy quyền" };

        var checkUserRole = await _userManager.GetUsersInRoleAsync(role.Name);
        if (checkUserRole != null && checkUserRole.Count() > 0)
        {
            return new RespondApi<string>()
                { Result = ResultRespond.Failed, Message = "Không thể xóa quyền đang sử dụng" };
        }

        await _roleManager.DeleteAsync(role);

        return new RespondApi<string>() { Result = ResultRespond.Succeeded, Message = "Xóa quyền thành công" };
    }

    public async Task<RespondApi<string>> UpdateRoleAdminWithPermission(string Id, RequestUpdateRole model)
    {
        ApplicationRole hasRole = await _roleManager.FindByIdAsync(Id.ToString());
        if (hasRole == null)
        {
            return new RespondApi<string>()
                { Result = ResultRespond.NotFound, Code = "01", Message = "Không tìm thấy thông tin nhóm quyền" };
        }

        if (hasRole.DisplayName != model.DisplayName)
        {
            ApplicationRole hasRoleExist =
                await _context.Roles.FirstOrDefaultAsync(e => e.DisplayName == model.DisplayName);
            if (hasRoleExist != null)
            {
                return new RespondApi<string>()
                    { Result = ResultRespond.Duplication, Message = "Tên hiển thị nhóm quyền đã tồn tại" };
            }

            hasRole.DisplayName = model.DisplayName;
        }

        hasRole.RoleInGate = model.RoleInGate;
        hasRole.HaveOTP = model.HaveOTP;

        IdentityResult roleResult = await _roleManager.UpdateAsync(hasRole);
        List<string> listPermissionInApp = PermissionConfig.DefineListPermission.ListClaim
            .SelectMany(e => e.Permissions).Select(e => e.Name).ToList();
        if (roleResult.Succeeded)
        {
            var roleClaims = await _roleManager.GetClaimsAsync(hasRole);

            foreach (Claim claim in roleClaims)
            {
                await _roleManager.RemoveClaimAsync(hasRole, claim);
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
                    await _roleManager.AddClaimAsync(hasRole, new Claim(ClaimTypes.Role, permission));
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
        ApplicationRole hasRole = await _roleManager.FindByIdAsync(Id.ToString());
        if (hasRole == null)
        {
            return new RespondApi<string>()
                { Result = ResultRespond.Failed, Message = "Không tìm thấy thông tin nhóm quyền" };
        }

        if (hasRole.DisplayName != model.DisplayName)
        {
            ApplicationRole hasRoleExist =
                await _context.Roles.FirstOrDefaultAsync(e => e.DisplayName == model.DisplayName);
            if (hasRoleExist != null)
            {
                return new RespondApi<string>()
                    { Result = ResultRespond.Duplication, Message = "Tên hiển thị nhóm quyền đã tồn tại" };
            }

            hasRole.DisplayName = model.DisplayName;
        }

        hasRole.RoleInGate = model.RoleInGate;
        hasRole.HaveOTP = model.HaveOTP;

        IdentityResult roleResult = await _roleManager.UpdateAsync(hasRole);

        return new RespondApi<string>() { Result = ResultRespond.Succeeded, Message = "Thành công" };
    }
    public Task<RespondApi<List<ClaimInfo>>> GetAllPermissionAdmin()
    {
        return Task.FromResult(new RespondApi<List<ClaimInfo>>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = PermissionConfig.DefineListPermission.ListClaim });
    }

    public async Task<RespondApi<List<string>>> GetPermissionByRole(string Id)
    {
        var role = await _roleManager.FindByIdAsync(Id.ToString());

        if (role == null)
            return new RespondApi<List<string>>() { Result = ResultRespond.NotFound, Code = "01", Message = "Không tìm thấy thông tin quyền" };

        var claims = await _roleManager.GetClaimsAsync(role);
        if (claims == null)
            return new RespondApi<List<string>>() { Result = ResultRespond.NotFound, Code = "02", Message = "Không tìm thấy thông tin permission" };
        return new RespondApi<List<string>>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = claims.Select(e => e.Value).ToList() };
    }

    public async Task<RespondApi<string>> UpdateRolesUserInGate(RequestUpdateRolesUserInGate model)
    {
        var user = await _userManager.FindByIdAsync(model.UserId.ToString());
        if (user == null)
            return new RespondApi<string>() { Result = ResultRespond.NotFound, Code = "01", Message = "không tìm thấy thông tin người dùng" };

        var roles = await _userManager.GetRolesAsync(user);
        if (roles != null && roles.Count > 0)
        {
            var resultDeleteRole = await _userManager.RemoveFromRolesAsync(user, roles);
        }

        IEnumerable<ApplicationRole> roleList = await _context.Roles.Where(e => e.Name != DefaultApplication.RoleAdministrator
                                                                               && e.RoleInGate).ToListAsync();

        foreach (string roleId in model.RoleIds)
        {
            var roleAdd = roleList.FirstOrDefault(e => e.Id.ToString() == roleId);
            if (roleAdd != null)
                await _userManager.AddToRoleAsync(user, roleAdd.Name);
        }

        return new RespondApi<string>() { Result = ResultRespond.Succeeded, Message = "Thành công" };
    }

    public async Task<RespondApi<List<int>>> GetRolesByUserId(int id)
    {
        try
        {
            var userRoles = await _context.UserRoles.Where(x => x.UserId == id).ToListAsync();
            var roleIds = userRoles.Select(x => x.RoleId).ToList();
            return new RespondApi<List<int>>(){ Result = ResultRespond.Succeeded, Message = "Thành công", Data = roleIds};
        }
        catch (Exception e)
        {
            return new RespondApi<List<int>>() { Result = ResultRespond.Error, Message = "Lỗi ngoại lệ" , Data = new List<int>()};
        }
    }

    public async Task<RespondApi<List<ApplicationRole>>> GetRoles()
    {
        try
        {
            var roles = await _context.Roles.ToListAsync();
            return new RespondApi<List<ApplicationRole>>(){ Result = ResultRespond.Succeeded, Message = "Thành công", Data = roles};

        }
        catch (Exception e)
        {
            return new RespondApi<List<ApplicationRole>> { Result = ResultRespond.Error, Message = "Lỗi ngoại lệ" , Data = new List<ApplicationRole>()};
        }
    }

    public async Task<RespondApi<object>> SetUserByRole(List<UserByRole> model)
    {
        try
        { 
            // set user by role and save to db
            var userRoles = _mapper.Map<List<IdentityUserRole<int>>>(model);
            if (userRoles.Count != 0)
            {
                var removedUserRoles = await _context.UserRoles.Where(x => x.UserId == model[0].UserId).ToListAsync();
                _context.UserRoles.RemoveRange(removedUserRoles);
                await _context.UserRoles.AddRangeAsync(userRoles);
                await _context.SaveChangesAsync();
            }
           
            return new RespondApi<object>(){ Result = ResultRespond.Succeeded, Message = "Thành công"};
        }
        catch (Exception e)
        {
            return new RespondApi<object>(){ Result = ResultRespond.Error, Message = "Lỗi ngoại lệ"};
        }
    }
}
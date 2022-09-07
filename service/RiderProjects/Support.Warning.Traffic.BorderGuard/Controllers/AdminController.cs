using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Settings;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Account;

namespace Support.Warning.Traffic.BorderGuard.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminRepository;

    private readonly ILogger<AdminController> _logger;

    public AdminController(IAdminService adminRepository, ILogger<AdminController> logger)
    {
        _adminRepository = adminRepository;
        _logger = logger;
    }

    [Authorize(Roles = DefaultApplication.RoleAdministrator)]
    [HttpGet("role")]
    public async Task<IActionResult> GetAllRoleAdmin()
    {
        return Ok(await _adminRepository.GetAllRoleAdmin());
    }
    
    [Authorize(Roles = DefaultApplication.RoleAdministrator)]
    [HttpPost("role/create")]
    public async Task<IActionResult> CreateRoleAdmin([FromBody] RequestCreateRole model)
    {
        return Ok(await _adminRepository.CreateRoleAdmin(model));
    }


    [Authorize(Roles = DefaultApplication.RoleAdministrator)]
    [HttpPut("role/update/{Id}")]
    public async Task<IActionResult> UpdateRoleAdminWithPermission(string Id, [FromBody] RequestUpdateRole model)
    {
        return Ok(await _adminRepository.UpdateRoleAdminWithPermission(Id, model));
    }


    [Authorize(Roles = DefaultApplication.RoleAdministrator)]
    [HttpPut("role/update-without-permission/{Id}")]
    public async Task<IActionResult> UpdateRoleAdminWithOutPermission(string Id, [FromBody] RequestUpdateRole model)
    {
        return Ok(await _adminRepository.UpdateRoleAdminWithOutPermission(Id, model));
    }

    [Authorize(Roles = DefaultApplication.RoleAdministrator)]
    [HttpDelete("role/delete/{Id}")]
    public async Task<IActionResult> DeleteRoleAdmin(string Id)
    {
        return Ok(await _adminRepository.DeleteRoleAdmin(Id));
    }


    [Authorize(Roles = DefaultApplication.RoleAdministrator)]
    [HttpDelete("delete-user-admin/{Id}")]
    public async Task<IActionResult> DeleteUserAdmin(string Id)
    {
        return Ok(await _adminRepository.DeleteUserAdmin(Id));
    }
    [Authorize(Roles = DefaultApplication.RoleAdministrator)]
    [HttpGet("get-all-permission")]
    public async Task<IActionResult> GetAllPermission()
    {
        return Ok(await _adminRepository.GetAllPermissionAdmin());
    }
    
    [HttpPut("user/update-role-in-gate")]
    public async Task<IActionResult> UpdateRolesUserInGate([FromBody] RequestUpdateRolesUserInGate model)
    {
        return Ok(await _adminRepository.UpdateRolesUserInGate(model));
    }
}
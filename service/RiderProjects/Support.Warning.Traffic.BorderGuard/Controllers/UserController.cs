using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Account;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Permissions;

namespace Support.Warning.Traffic.BorderGuard.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly  IUserRepository _userRepository;
    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    [AllowAnonymous]
    [HttpPost("authenticate")]
    public async Task<IActionResult> Login([FromBody] RequestLoginModel requestLoginModel)
    {
        var ip = IpAddress();
        var login = await _userRepository.Login(requestLoginModel, ip);
        return Ok(login);
    }
    
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult>  Register([FromBody]RegisterModel model)
    {
        // map model to entity
        var register = await _userRepository.Register(model);
    
        return Ok(register);
    }
    
    [HttpGet("get-user-by-gate/{gateId}")]
    public async Task<IActionResult>  GetUserGate(int gateId)
    {
    
        var register = await _userRepository.GetUserOfGate(gateId);
    
        return Ok(register);
    }
    
    [HttpPost("set-user-claim")]
    public async Task<IActionResult>  SetUserGate(SetClaimUser claimUser)
    {
 
        var register = await _userRepository.SetUserClaims(claimUser);
    
        return Ok(register);
    }
    
    private string IpAddress()
    {
        if (Request.Headers.ContainsKey("X-Forwarded-For"))
            return Request.Headers["X-Forwarded-For"];
        return HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString();
    }
}
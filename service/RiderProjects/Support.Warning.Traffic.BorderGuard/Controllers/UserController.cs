using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Account;

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
        var login = await _userRepository.Login(requestLoginModel);
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
}
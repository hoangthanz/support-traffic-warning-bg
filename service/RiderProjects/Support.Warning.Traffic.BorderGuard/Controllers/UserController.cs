using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;

namespace Support.Warning.Traffic.BorderGuard.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    public UserController(IUserRepository userRepository, ILogger<UserController> logger)
    {
      
    }
}
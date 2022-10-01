using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Map;

namespace Support.Warning.Traffic.BorderGuard.Controllers;

[ApiController]
[Route("api/Routes")]
public class RouteController : ControllerBase
{
    private readonly IRouteRepository _routeRepository;

    public RouteController(IRouteRepository routeRepository)
    {
        _routeRepository = routeRepository;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetRoute([FromQuery] RequestRoute model)
    {
        return Ok(await _routeRepository.GetRoute(model));
    }
}
using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

namespace Support.Warning.Traffic.BorderGuard.Controllers;
[ApiController]
[Route("api/Wards")]
public class WardController : ControllerBase
{
    private readonly IWardRepository _wardRepository;

    public WardController(IWardRepository wardRepository)
    {
        _wardRepository = wardRepository;
    }


    [HttpGet]
    public async Task<IActionResult> GetWards([FromQuery] WardSearch model)
    {
        return Ok(await _wardRepository.GetByCondition(model));
    }
}
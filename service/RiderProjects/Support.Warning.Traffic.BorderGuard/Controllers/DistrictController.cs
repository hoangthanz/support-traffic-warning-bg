using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

namespace Support.Warning.Traffic.BorderGuard.Controllers;
[ApiController]
[Route("api/Districts")]
public class DistrictController : ControllerBase
{
    private readonly IDistrictRepository _districtRepository;

    public DistrictController(IDistrictRepository districtRepository)
    {
        _districtRepository = districtRepository;
    }


    [HttpGet]
    public async Task<IActionResult> GetDistricts([FromQuery] DistrictSearch model)
    {
        return Ok(await _districtRepository.GetByCondition(model));
    }
}
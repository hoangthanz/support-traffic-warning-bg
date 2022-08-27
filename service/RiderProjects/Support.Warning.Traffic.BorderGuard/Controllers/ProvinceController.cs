using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

namespace Support.Warning.Traffic.BorderGuard.Controllers;
[ApiController]
[Route("api/Provinces")]
public class ProvinceController : ControllerBase
{
    private readonly IProvinceRepository _provinceRepository;

    public ProvinceController(IProvinceRepository provinceRepository)
    {
        _provinceRepository = provinceRepository;
    }
    [HttpGet]
    public async Task<IActionResult> GetProvince([FromQuery] ProvinceSearch model)
    {
        return Ok(await _provinceRepository.GetByCondition(model));
    }
}
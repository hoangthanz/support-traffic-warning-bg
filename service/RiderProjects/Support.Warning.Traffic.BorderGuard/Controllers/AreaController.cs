using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Area;

namespace Support.Warning.Traffic.BorderGuard.Controllers;
[ApiController]
[Route("api/Areas")]
public class AreaController : ControllerBase
{
    private readonly IAreaRepository _gateRepository;

    public AreaController(IAreaRepository gateRepository)
    {
        _gateRepository = gateRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAreas()
    {
        return Ok(await _gateRepository.GetAll());
    }
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetAreaById(int id)
    {
        return Ok( await _gateRepository.GetById(id));
    }

    [HttpPost]
    public async Task<IActionResult> CreateGates([FromBody] CreateArea model)
    {
        return Ok(await _gateRepository.CreateAsync(model));
    }
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateGates([FromBody] CreateArea model, int id)
    {
        return Ok(await _gateRepository.UpdateAsync(id,model));
    }
    [HttpDelete("remove/{id:int}")]
    public async Task<IActionResult> RemoveGates(int id)
    {
        return Ok(await _gateRepository.RemoveAsync(id));
    }
}
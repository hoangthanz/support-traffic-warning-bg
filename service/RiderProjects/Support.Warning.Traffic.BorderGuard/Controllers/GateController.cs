using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Gate;

namespace Support.Warning.Traffic.BorderGuard.Controllers;
[ApiController]
[Route("api/user")]
public class GateController : ControllerBase
{
    private readonly IGateRepository _gateRepository;

    public GateController(IGateRepository gateRepository)
    {
        _gateRepository = gateRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetGates()
    {
        return Ok(_gateRepository.FindAll());
    }
    [HttpPost]
    public async Task<IActionResult> CreateGates([FromBody] GateCreate model)
    {
        return Ok(_gateRepository.CreateAsync(model));
    }
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateGates([FromBody] GateCreate model, int id)
    {
        return Ok(_gateRepository.UpdateAsync(id,model));
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteGates(int id)
    {
        return Ok(_gateRepository.DeleteAsync(id));
    }
    [HttpDelete("remove/{id:int}")]
    public async Task<IActionResult> RemoveGates(int id)
    {
        return Ok(_gateRepository.RemoveAsync(id));
    }
}
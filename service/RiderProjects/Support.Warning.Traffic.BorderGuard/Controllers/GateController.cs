using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Permissions;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Gate;

namespace Support.Warning.Traffic.BorderGuard.Controllers;
[ApiController]
[Route("api/Gates")]
public class GateController : ControllerBase
{
    private readonly IGateRepository _gateRepository;

    public GateController(IGateRepository gateRepository)
    {
        _gateRepository = gateRepository;
    }
    [Authorize(Roles = GatePermission.Get)]
    [HttpGet]
    public async Task<IActionResult> GetGates()
    {
        return Ok(await _gateRepository.GetAll());
    }
    [Authorize(Roles = GatePermission.Get)]
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetGateById(int id)
    {
        return Ok(await _gateRepository.GetById(id));
    }
    [Authorize(Roles = GatePermission.Create)]
    [HttpPost]
    public async Task<IActionResult> CreateGates([FromBody] GateCreate model)
    {
        return Ok(await _gateRepository.CreateAsync(model));
    }
    [Authorize(Roles = GatePermission.Update)]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateGates([FromBody] GateCreate model, int id)
    {
        return Ok( await _gateRepository.UpdateAsync(id,model));
    }
    [Authorize(Roles = GatePermission.Delete)]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteGates(int id)
    {
        return Ok(await _gateRepository.DeleteAsync(id));
    }
    [Authorize(Roles = GatePermission.Delete)]
    [HttpDelete("remove/{id:int}")]
    public async Task<IActionResult> RemoveGates(int id)
    {
        return Ok(await _gateRepository.RemoveAsync(id));
    }
}
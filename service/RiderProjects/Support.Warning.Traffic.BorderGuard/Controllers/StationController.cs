using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.Controllers;

[ApiController]
[Route("api/Stations")]
public class StationController : ControllerBase
{
    private readonly IStationRepository _stationRepository;

    public StationController(IStationRepository stationRepository)
    {
        _stationRepository = stationRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetStations()
    {
        return Ok(await _stationRepository.GetAll());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetStationById(int id)
    {
        return Ok(await _stationRepository.GetById(id));
    }

    [HttpPost]
    public async Task<IActionResult> CreateStation([FromBody] Station model)
    {
        return Ok(await _stationRepository.CreateAsync(model));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateStations([FromBody] Station model, int id)
    {
        return Ok(await _stationRepository.UpdateAsync(id, model));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> RemoveAsyncStation(int id)
    {
        return Ok(await _stationRepository.RemoveAsync(id));
    }
}
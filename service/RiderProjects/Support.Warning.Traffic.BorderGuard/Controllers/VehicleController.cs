using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Vehicles;

namespace Support.Warning.Traffic.BorderGuard.Controllers;

[ApiController]
[Route("api/Vehicle")]
public class VehicleController : ControllerBase
{
    private readonly IVehicleRepository _vehicleRepository;

    public VehicleController(IVehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetVehicles([FromQuery] RequestGetVehicles model)
    {
        return Ok(await _vehicleRepository.GetVehicles(model));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetVehicleById(int id)
    {
        return Ok(await _vehicleRepository.GetById(id));
    }

    [HttpPost("create-vehicle")]
    public async Task<IActionResult> CreateVehicle([FromBody] RequestCreateVehicle model)
    {
        return Ok(await _vehicleRepository.CreateVehicle(model));
    }

    [HttpPost("register-vehicle")]
    public async Task<IActionResult> RegisterVehicle([FromBody] RequestRegisterVehicle model)
    {
        return Ok(await _vehicleRepository.RegisterVehicle(model));
    }

    [HttpPost("register-many-vehicle")]
    public async Task<IActionResult> RegisterManyVehicle([FromBody] RequestRegisterManyVehicle model)
    {
        return Ok(await _vehicleRepository.RegisterManyVehicle(model));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateGates([FromBody] RequestCreateVehicle model, int id)
    {
        return Ok(await _vehicleRepository.UpdateVehicle(model, id));
    }

    [HttpDelete("delete/{id:int}")]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
        return Ok(await _vehicleRepository.DeleteVehicle(id));
    }
    
    [HttpPut("update-vehicle-position")]
    public async Task<IActionResult> PublishCurrentPositionOfVehicle([FromBody] CurrentPosition model)
    {
        return Ok(await _vehicleRepository.PublishCurrentPositionOfVehicle(model));
    }
}
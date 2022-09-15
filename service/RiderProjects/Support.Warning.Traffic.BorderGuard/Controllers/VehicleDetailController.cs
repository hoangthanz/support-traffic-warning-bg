using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.VehicleDetail;

namespace Support.Warning.Traffic.BorderGuard.Controllers;
[ApiController]
[Route("api/Vehicle")]
public class VehicleDetailController : ControllerBase
{
    private readonly IVehicleDetailRepository _vehicleRepository;

    public VehicleDetailController(IVehicleDetailRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }
    [HttpGet]
    public async Task<IActionResult> GetVehicleDetails([FromQuery] VehicleDetailSearch model)
    {
        return Ok(await _vehicleRepository.GetVehicleDetails(model));
    }
}
using Common.Service.Models.Respond;
using Microsoft.AspNetCore.Mvc;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.Mongodb.Services;

namespace Support.Warning.Traffic.BorderGuard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleRegistrationPaperController : ControllerBase
    {
        private readonly VehicleRegistrationPaperService _vehicleRegistrationPaperService;

        public VehicleRegistrationPaperController(VehicleRegistrationPaperService vehicleRegistrationPaperService) =>
            _vehicleRegistrationPaperService = vehicleRegistrationPaperService;

        [HttpGet]
        public async Task<List<VehicleRegistrationPaper>> Get() => await _vehicleRegistrationPaperService.GetAsync();

        [HttpPost]
        public async Task<IActionResult> Post(VehicleRegistrationPaper registrationPaper)
        {
            try
            {
                await _vehicleRegistrationPaperService.CreateAsync(registrationPaper);
                var result = new RespondApi<VehicleRegistrationPaper>()
                    { Result = ResultRespond.Succeeded, Message = "Thành công", Data = registrationPaper };
                return Ok(result);
            }
            catch (Exception e)
            {
                var result = new RespondApi<VehicleRegistrationPaper>()
                    { Result = ResultRespond.Error, Message = e.Message, Data = null };
                return Ok(result);
            }
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(string id, VehicleRegistrationPaper registrationPaper)
        {
            try
            {
                await _vehicleRegistrationPaperService.UpdateAsync(id, registrationPaper);
                var result = new RespondApi<VehicleRegistrationPaper>()
                    { Result = ResultRespond.Succeeded, Message = "Thành công", Data = registrationPaper };
                return Ok(result);
            }
            catch (Exception e)
            {
                var result = new RespondApi<VehicleRegistrationPaper>()
                    { Result = ResultRespond.Error, Message = e.Message, Data = null };
                return Ok(result);
            }
        }

        [HttpDelete("delete/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _vehicleRegistrationPaperService.RemoveAsync(id);
                var result = new RespondApi<VehicleRegistrationPaper>()
                    { Result = ResultRespond.Succeeded, Message = "Thành công", Data = null };
                return Ok(result);
            }
            catch (Exception e)
            {
                var result = new RespondApi<VehicleRegistrationPaper>()
                    { Result = ResultRespond.Error, Message = e.Message, Data = null };
                return Ok(result);
            }
        }
    }
}
using Common.Service.Models.Respond;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Vehicles;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IVehicleRepository: IRepositoryBase<Vehicle>
{
    Task<RespondApiPaging<List<Vehicle>>> GetVehicles(RequestGetVehicles model);
    Task<RespondApi<Vehicle>> GetById(int id);
    Task<RespondApi<Vehicle>> CreateVehicle(RequestCreateVehicle model);
    Task<RespondApi<Vehicle>> UpdateVehicle(RequestCreateVehicle model, int id);
    Task<RespondApi<Vehicle>> DeleteVehicle(int id);
    Task<RespondApi<string>> RegisterVehicle(RequestRegisterVehicle model);
}
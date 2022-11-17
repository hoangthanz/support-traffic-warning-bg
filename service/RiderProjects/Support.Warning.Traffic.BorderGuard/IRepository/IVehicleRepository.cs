using Support.Warning.Traffic.BorderGuard.Common;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Vehicles;
using Support.Warning.Traffic.BorderGuard.ViewModels.Responds;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IVehicleRepository: IRepositoryBase<Vehicle>
{
    Task<RespondApiPaging<List<Vehicle>>> GetVehicles(RequestGetVehicles model);
    Task<RespondApi<Vehicle>> GetById(int id);
    Task<RespondApi<Vehicle>> CreateVehicle(RequestCreateVehicle model);
    Task<RespondApi<Vehicle>> UpdateVehicle(RequestCreateVehicle model, int id);
    Task<RespondApi<Vehicle>> DeleteVehicle(int id);
    Task<RespondApi<string>> RegisterVehicle(RequestRegisterVehicle model);
    Task<RespondApi<string>> ConfirmVehicleOutGate(RequestRegisterVehicle model);
    Task<RespondApi<string>> RegisterManyVehicle(RequestRegisterManyVehicle model);
    Task<RespondApi<Vehicle>> PublishCurrentPositionOfVehicle(CurrentPosition model);
    Task<RespondApi<List<RespondVehicleQuantityByVehicleType>>> GetVehicleQuantityByVehicleType();
    Task<RespondApi<List<RespondVehicleQuantityByVehicleTypeAndDate>>> GetVehicleQuantityByVehicleTypeByDate(DateTime from, DateTime to);
    Task<RespondApi<List<RespondVehicleQuantityByGateAndDate>>> GetVehicleQuantityByGateByDate(DateTime from, DateTime to, long gateId);
}
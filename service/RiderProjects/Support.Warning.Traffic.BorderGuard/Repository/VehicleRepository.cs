using System.Security.Claims;
using Common.Service.Models.Respond;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.HubConfig;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Realtime;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Vehicles;
using Support.Warning.Traffic.BorderGuard.ViewModels.Responds;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class VehicleRepository : RepositoryBase<Vehicle>, IVehicleRepository
{
    private readonly SupportWarningContext _context;
    private readonly string _userId;
    private RealtimeHub _signalrHub;

    public VehicleRepository(SupportWarningContext context, IHttpContextAccessor httpContext) : base(context)
    {
        _context = context;
        _userId = httpContext?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier) != null
            ? httpContext?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
            : null;
    }

    public async Task<RespondApiPaging<List<Vehicle>>> GetVehicles(RequestGetVehicles model)
    {
        List<Vehicle> vehicles = null;

        PagingResponse paging = new()
        {
            CurrentPage = model.PageNumber,
            PageSize = model.PageSize
        };
        var query = _context.Vehicles.Where(x => !x.IsDeleted);
        if (!string.IsNullOrEmpty(model.LicencePlate))
        {
            query = query.Where(x => x.LicencePlate.Contains(model.LicencePlate));
        }

        if (!string.IsNullOrEmpty(model.DriverName))
        {
            query = query.Where(x => x.DriverName.Contains(model.DriverName));
        }

        if (!string.IsNullOrEmpty(model.DriverPhone))
        {
            query = query.Where(x => x.DriverPhone.Contains(model.DriverPhone));
        }

        if (model.InGate != null)
        {
            query = query.Where(x => x.InGate == model.InGate);
        }

        if (model.Type != null)
        {
            query = query.Where(x => x.VehicleType == model.Type);
        }

        if (model.IsPaging)
        {
            paging.TotalRecords = await query.CountAsync();
            paging.TotalPages = (int)Math.Ceiling(decimal.Divide(paging.TotalRecords, paging.PageSize));
            vehicles = await query.Skip((model.PageNumber - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
            return new RespondApiPaging<List<Vehicle>>()
                { Result = ResultRespond.Succeeded, Message = "Thành công", Data = vehicles, PagingResponse = paging };
        }

        vehicles = await query.ToListAsync();
        return new RespondApiPaging<List<Vehicle>>()
            { Result = ResultRespond.Succeeded, Message = "Thành công", Data = vehicles };
    }

    public async Task<RespondApi<Vehicle>> GetById(int id)
    {
        var vehicle = await _context.Vehicles.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == id);
        if (vehicle == null)
        {
            return new RespondApi<Vehicle>()
                { Result = ResultRespond.NotFound, Message = "Không thể tìm thấy xe cần chỉnh sửa" };
        }

        return new RespondApi<Vehicle>()
        {
            Result = ResultRespond.Succeeded, Message = "Thành công", Data = vehicle
        };
    }

    public async Task<RespondApi<Vehicle>> CreateVehicle(RequestCreateVehicle model)
    {
        if (model.LicencePlate != null)
        {
            var oldVehicle =
                await _context.Vehicles.FirstOrDefaultAsync(x => !x.IsDeleted && x.LicencePlate == model.LicencePlate);
            if (oldVehicle != null)
                return new RespondApi<Vehicle>()
                    { Result = ResultRespond.Error, Message = "Dữ liệu biển số xe đã tồn tại" };
        }

        var vehicle = new Vehicle()
        {
            LicencePlate = model.LicencePlate,
            Weight = model.Weight,
            LoadDueToOwnWeight = model.LoadDueToOwnWeight,
            VehicleTypeId = model.VehicleTypeId,
            IsDeleted = false,
            Status = true,
            UpdatedDate = DateTime.Now,
            CreatedDate = DateTime.Now,
            CreatedUserId = Guid.Parse(_userId),
            DriverName = model.DriverName,
            DriverPhone = model.DriverPhone,
            InGate = false
        };

        await _context.Vehicles.AddAsync(vehicle);

        await _context.SaveChangesAsync();

        return new RespondApi<Vehicle>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = vehicle };
    }

    public async Task<RespondApi<Vehicle>> UpdateVehicle(RequestCreateVehicle model, int id)
    {
        var vehicle = await _context.Vehicles.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == id);
        if (vehicle == null)
        {
            return new RespondApi<Vehicle>()
                { Result = ResultRespond.NotFound, Message = "Không thể tìm thấy xe cần chỉnh sửa" };
        }

        var dupVehicle =
            await _context.Vehicles.FirstOrDefaultAsync(x => x.Id != id && x.LicencePlate == model.LicencePlate);
        if (dupVehicle != null)
            return new RespondApi<Vehicle>()
            {
                Result = ResultRespond.Duplication, Message = "Biển số xe này là của xe khác"
            };
        vehicle.LicencePlate = model.LicencePlate;
        vehicle.Weight = model.Weight;
        vehicle.LoadDueToOwnWeight = model.Weight;
        vehicle.UpdatedDate = DateTime.Now;
        vehicle.UpdatedUserId = Guid.Parse(_userId);
        vehicle.DriverName = model.DriverName;
        vehicle.DriverPhone = model.DriverPhone;
        await _context.SaveChangesAsync();
        return new RespondApi<Vehicle>()
        {
            Result = ResultRespond.Succeeded, Message = "Cập nhật thành công", Data = vehicle
        };
    }

    public async Task<RespondApi<Vehicle>> DeleteVehicle(int id)
    {
        var vehicle = await _context.Vehicles.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == id);
        if (vehicle == null)
        {
            return new RespondApi<Vehicle>()
                { Result = ResultRespond.NotFound, Message = "Không thể tìm thấy xe cần chỉnh sửa" };
        }

        vehicle.IsDeleted = true;
        vehicle.UpdatedDate = DateTime.Now;
        vehicle.UpdatedUserId = Guid.Parse(_userId);
        await _context.SaveChangesAsync();
        return new RespondApi<Vehicle>()
        {
            Result = ResultRespond.Succeeded, Message = "Cập nhật thành công", Data = vehicle
        };
    }

    public async Task<RespondApi<string>> RegisterVehicle(RequestRegisterVehicle model)
    {
        var vehicle = await _context.Vehicles.FirstOrDefaultAsync(x => x.Id == model.Id && !x.IsDeleted);
        if (vehicle == null)
            return new RespondApi<string>() { Result = ResultRespond.NotFound, Message = "Không tìm thấy xe" };
        if (model.GateId == null)
            return new RespondApi<string>()
                { Result = ResultRespond.NotFound, Message = "Chưa cung cấp thông tin cửa khẩu" };
        var gate = await _context.Gates.FirstOrDefaultAsync(x => x.Id == model.GateId && !x.IsDeleted);
        if (gate == null)
            return new RespondApi<string>()
                { Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin cửa khẩu" };
        vehicle.InGate = model.InGate;
        var vehicleDetail = new VehicleDetail()
        {
            GateId = model.GateId,
            Gate = gate,
            VehicleId = vehicle.Id,
            Vehicle = vehicle,
            InGateTime = DateTime.Now,
            IsDeleted = false,
            OutGateTime = null,
        };
        await _context.VehicleDetails.AddAsync(vehicleDetail);
        await _context.SaveChangesAsync();
        return new RespondApi<string>()
        {
            Result = ResultRespond.Succeeded, Message = "Cập nhật thành công"
        };
    }

    public async Task<RespondApi<string>> ConfirmVehicleOutGate(RequestRegisterVehicle model)
    {
        try
        {
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(x => x.Id == model.Id && !x.IsDeleted);
            if (vehicle == null)
                return new RespondApi<string>() { Result = ResultRespond.NotFound, Message = "Không tìm thấy xe" };
            if (model.GateId == null)
                return new RespondApi<string>()
                    { Result = ResultRespond.NotFound, Message = "Chưa cung cấp thông tin cửa khẩu" };
            var gate = await _context.Gates.FirstOrDefaultAsync(x => x.Id == model.GateId && !x.IsDeleted);
            if (gate == null)
                return new RespondApi<string>()
                    { Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin cửa khẩu" };
            if (!vehicle.InGate)
            {
                return new RespondApi<string>() { Result = ResultRespond.NotFound, Message = "Xe chưa vào cửa khẩu" };
            }

            vehicle.InGate = false;
            gate.CountVehicle -= 1;
            var vehicleDetail = await _context.VehicleDetails.FirstOrDefaultAsync(x => !x.IsDeleted
                && x.GateId == model.GateId && x.VehicleId == model.Id && x.OutGateTime == null);
            vehicleDetail.OutGateTime = DateTime.Now;
            await _context.VehicleDetails.AddAsync(vehicleDetail);
            await _context.SaveChangesAsync();
            return new RespondApi<string>()
            {
                Result = ResultRespond.Succeeded, Message = "Cập nhật thành công"
            };
        }
        catch (Exception e)
        {
            return new RespondApi<string>()
            {
                Result = ResultRespond.Failed, Message = "Xác nhận xe rời cửa khẩu thaats bại"
            };
        }
    }

    public async Task<RespondApi<string>> RegisterManyVehicle(RequestRegisterManyVehicle model)
    {
        try
        {
            if (model.Vehicles == null || model.Vehicles.Count <= 0)
            {
                return new RespondApi<string>()
                    { Result = ResultRespond.Failed, Message = "Danh sách xe không được rỗng" };
            }

            if (model.GateId == null)
                return new RespondApi<string>()
                    { Result = ResultRespond.NotFound, Message = "Chưa cung cấp thông tin cửa khẩu" };
            var gate = await _context.Gates.FirstOrDefaultAsync(x => x.Id == model.GateId && !x.IsDeleted);
            if (gate == null)
                return new RespondApi<string>()
                    { Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin cửa khẩu" };

            List<VehicleDetail> vehicles = new List<VehicleDetail>();

            foreach (var vehicleRequest in model.Vehicles)
            {
                var vehicle = await _context.Vehicles.FirstOrDefaultAsync(x => x.LicencePlate == vehicleRequest.LicencePlate && !x.IsDeleted);
                if (vehicle == null)
                {
                    await CreateVehicle(vehicleRequest);
                }

                var oldVehicle = await _context.Vehicles.FirstOrDefaultAsync(x =>
                    x.LicencePlate == vehicleRequest.LicencePlate && x.InGate && !x.IsDeleted);
                if (oldVehicle != null)
                    return new RespondApi<string>()
                    {
                        Result = ResultRespond.NotFound,
                        Message = $"Tồn tại xe biển số {oldVehicle.LicencePlate} đã trong cửa khẩu "
                    };

                var vehicleDetail = new VehicleDetail()
                {
                    GateId = model.GateId,
                    Gate = gate,
                    VehicleId = vehicle.Id,
                    Vehicle = vehicle,
                    InGateTime = DateTime.Now,
                    IsDeleted = false,
                    OutGateTime = null
                };
                vehicle.InGate = true;
                vehicles.Add(vehicleDetail);
            }

            await _context.VehicleDetails.AddRangeAsync(vehicles);
            await _context.SaveChangesAsync();

            return new RespondApi<string>()
            {
                Result = ResultRespond.Succeeded, Message = "Cập nhật thành công", Data = ""
            };
        }
        catch (Exception e)
        {
            return new RespondApi<string>()
            {
                Result = ResultRespond.Failed, Message = "Đăng kí thất bại"
            };
        }
    }

    public async Task<RespondApi<Vehicle>> PublishCurrentPositionOfVehicle(CurrentPosition model)
    {
        try
        {
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(x => x.Id == model.VehicleId && x.IsDeleted);
            if (vehicle == null)
            {
                return new RespondApi<Vehicle>()
                {
                    Result = ResultRespond.Failed, Message = "Không tim thấy thông tin xe"
                };
            }

            vehicle.Latitude = model.Latitude;
            vehicle.Longitude = model.Longtitude;
            var details = await _context.VehicleRegistrationPaperDetails
                .Where(x => !x.IsFinish && x.VehicleId == vehicle.Id).ToListAsync();
            details.ForEach(async detail =>
            {
                // kiểm tra v trí xe so với cửa khẩu
                var gate = await _context.Gates.FirstOrDefaultAsync(y => y.Id == detail.GateId);
                if (gate != null)
                {
                    var distance = CalculatorDistance(vehicle.Longitude, vehicle.Latitude,
                        gate.Longitude, gate.Latitude);
                    if (distance <= gate.RadiusGate)
                    {
                        gate.CountVehicle++;
                        await _signalrHub.Send(new MessageSupport()
                        {
                            GateId = gate,
                            Message = $"Vào Cửa khẩu {gate.Name} thành công",
                            VehicleId = vehicle.Id,
                            VehicleRegistrationPaperDetailId = detail.Id
                        });
                    }
                }
            });

            await _context.SaveChangesAsync();

            return new RespondApi<Vehicle>()
            {
                Result = ResultRespond.Succeeded, Message = "Cập nhật vị trí phương tiện thành công", Data = vehicle
            };
        }

        catch (Exception e)
        {
            return new RespondApi<Vehicle>()
            {
                Result = ResultRespond.Failed, Message = "Lấy thông tin thất bại"
            };
        }
    }

    public async Task<RespondApi<List<RespondVehicleQuantityByVehicleType>>> GetVehicleQuantityByVehicleType()
    {
        try
        {
            List<RespondVehicleQuantityByVehicleType> results = new List<RespondVehicleQuantityByVehicleType>();
            var vehicleTypes = await _context.VehicleTypes.Where(x => !x.IsDeleted).ToListAsync();
            foreach (var vehicleType in vehicleTypes)
            {
                var vehicles = await _context.VehicleRegistrationPaperDetails.Where(x => x.Vehicle.VehicleTypeId == vehicleType.Id )
                    .ToListAsync();
                var quantity = vehicles.Count;
                results.Add(new RespondVehicleQuantityByVehicleType()
                {
                    VehicleType = vehicleType,
                    Quantity = quantity
                });
            }

            return new RespondApi<List<RespondVehicleQuantityByVehicleType>>()
            {
                Result = ResultRespond.Succeeded,
                Message = "Thành công",
                Data = results
            };
        }
        catch (Exception e)
        {
            return new RespondApi<List<RespondVehicleQuantityByVehicleType>>()
            {
                Result = ResultRespond.Failed, Message = "Lấy thông tin thất bại"
            };
        }
    }

    public async Task<RespondApi<List<RespondVehicleQuantityByVehicleTypeAndDate>>> GetVehicleQuantityByVehicleTypeByDate(DateTime from, DateTime to)
    {
        try
        {
            List<RespondVehicleQuantityByVehicleTypeAndDate> results = new List<RespondVehicleQuantityByVehicleTypeAndDate>();
            var vehicleTypes = await _context.VehicleTypes.Where(x => !x.IsDeleted).ToListAsync();
            foreach (var vehicleType in vehicleTypes)
            {
                var vehicles = await _context.VehicleRegistrationPaperDetails.Where(x => x.Vehicle.VehicleTypeId == vehicleType.Id 
                                                                                         && DateTime.Compare(x.ArrivalDate, to) <= 0 
                                                                                         && DateTime.Compare(x.ArrivalDate, from) >= 0)
                    .ToListAsync();
                var quantity = vehicles.Count;

                results.Add(new RespondVehicleQuantityByVehicleTypeAndDate()
                {
                    VehicleType = vehicleType,
                    Quantity = quantity
                });
            }
            return new RespondApi<List<RespondVehicleQuantityByVehicleTypeAndDate>>()
            {
                Result = ResultRespond.Succeeded,
                Message = "Thành công",
                Data = results
            };
        }
        catch (Exception e)
        {
            return new RespondApi<List<RespondVehicleQuantityByVehicleTypeAndDate>>()
            {
                Result = ResultRespond.Failed, Message = "Lấy thông tin thất bại"
            };
        }
    }

    public async Task<RespondApi<List<RespondVehicleQuantityByGateAndDate>>> GetVehicleQuantityByGateByDate(DateTime from, DateTime to, long gateId)
    {
        try
        {
            List<RespondVehicleQuantityByGateAndDate> results = new List<RespondVehicleQuantityByGateAndDate>();
            var queryGate =  _context.Gates.Where(x => !x.IsDeleted);
            if (gateId != null)
            {
                queryGate = queryGate.Where(x => x.Id == gateId);
            }
            var gates = await queryGate.ToListAsync();
            foreach (var gate in gates)
            {
                var vehicles = await _context.VehicleRegistrationPaperDetails.Where(x => x.GateId == gate.Id 
                                                                                         && DateTime.Compare(x.ArrivalDate, to) <= 0 
                                                                                         && DateTime.Compare(x.ArrivalDate, from) >= 0)
                    .ToListAsync();
                var quantity = vehicles.Count;

                results.Add(new RespondVehicleQuantityByGateAndDate()
                {
                    GateId = gate.Id,
                    GateName = gate.Name,
                    VehicleQuantity = quantity
                });
            }
            return new RespondApi<List<RespondVehicleQuantityByGateAndDate>>()
            {
                Result = ResultRespond.Succeeded,
                Message = "Thành công",
                Data = results
            };
        }
        catch (Exception e)
        {
            return new RespondApi<List<RespondVehicleQuantityByGateAndDate>>()
            {
                Result = ResultRespond.Failed, Message = "Lấy thông tin thất bại"
            };
        }
    }

    public double CalculatorDistance(double longtitude, double latitude, double longtitudeR, double latitudeR)
    {
        return Math.Sqrt((longtitude - longtitudeR) * (longtitude - longtitudeR) +
                         (latitude - latitudeR) * (latitude - latitudeR));
    }
}
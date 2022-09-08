using System.Security.Claims;
using Common.Service.Models.Respond;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Vehicles;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class VehicleRepository : RepositoryBase<Vehicle>, IVehicleRepository
{
    private readonly SupportWarningContext _context;
    private readonly string UserId;

    public VehicleRepository(SupportWarningContext context, IHttpContextAccessor httpContext) : base(context)
    {
        _context = context;
        UserId = httpContext?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier) != null
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
            { Result = ResultRespond.Succeeded, Message = "Thành công", Data = vehicles};
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
            CreatedUserId = Guid.Parse(UserId),
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
        vehicle.UpdatedUserId = Guid.Parse(UserId);
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
        vehicle.UpdatedUserId = Guid.Parse(UserId);
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
        vehicle.InGate = model.InGate;
        await _context.SaveChangesAsync();
        return new RespondApi<string>()
        {
            Result = ResultRespond.Succeeded, Message = "Cập nhật thành công"
        };
    }
}
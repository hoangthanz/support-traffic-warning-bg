using System.Linq.Dynamic.Core;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.Common;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.VehicleDetail;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class VehicleDetailRepository : RepositoryBase<Vehicle>,IVehicleDetailRepository
{
    private readonly SupportWarningContext _context;
    private readonly string UserId;

    public VehicleDetailRepository(SupportWarningContext context, IHttpContextAccessor httpContext) : base(context)
    {
        _context = context;
        UserId = httpContext?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier) != null
            ? httpContext?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
            : null;
    }
    public async Task<RespondApiPaging<List<VehicleDetail>>> GetVehicleDetails(VehicleDetailSearch model)
    {
        List<VehicleDetail> vehicles = null;

        PagingResponse paging = new()
        {
            CurrentPage = model.PageNumber,
            PageSize = model.PageSize
        };
        var query = _context.VehicleDetails.Where(x => !x.IsDeleted &&
                                                       x.GateId == model.GateId);
        if (model.TimeInGate != null)
        {
            query = query.Where(x => DateTime.Compare(x.InGateTime, (DateTime)model.TimeInGate) <= 0
            && DateTime.Compare((DateTime)model.TimeInGate, (DateTime)x.OutGateTime) <= 0);
        }
        if (model.IsPaging)
        {
            paging.TotalRecords = await query.CountAsync();
            paging.TotalPages = (int)Math.Ceiling(decimal.Divide(paging.TotalRecords, paging.PageSize));
            vehicles = await query.Skip((model.PageNumber - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
            return new RespondApiPaging<List<VehicleDetail>> { Result = ResultRespond.Succeeded, Message = "Thành công", Data = vehicles, PagingResponse = paging };
        }
        
        vehicles = await query.ToListAsync();
        return new RespondApiPaging<List<VehicleDetail>> { Result = ResultRespond.Succeeded, Message = "Thành công", Data = vehicles};
    }
}
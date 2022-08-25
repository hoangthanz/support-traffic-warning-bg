using AutoMapper;
using Common.Service.Models.Respond;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Gate;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class GateRepository : RepositoryBase<Gate>, IGateRepository
{
    private readonly SupportWarningContext _context;
    private readonly IMapper _mapper;

    public GateRepository(SupportWarningContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<RespondApi<Gate>> CreateAsync(GateCreate model)
    {
        try
        {
            var obj = new Gate();
            obj = _mapper.Map<Gate>(model);
            obj.CreatedDate = DateTime.Now;
            obj.UpdatedDate = DateTime.Now;
            obj.Status = true;
            obj.IsDeleted = false;
            await _context.Gates.AddAsync(obj);
            await _context.SaveChangesAsync();
            return new RespondApi<Gate>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = obj };
        }
        catch (Exception e)
        {
            return new RespondApi<Gate>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new Gate() };
        }
    }

    public async Task<RespondApi<Gate>> UpdateAsync(int id, GateCreate model)
    {
        try
        {
            var obj = await _context.Gates.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if(obj == null)
                return new RespondApi<Gate>()
                    { Result = ResultRespond.Duplication, Message = "Không tồn tại id cửa khẩu này" };
            var duplicateGate = await _context.Gates.FirstOrDefaultAsync(x => !x.IsDeleted && (x.Name == model.Name || 
                    x.Code == model.Code));
            if (duplicateGate != null)
                return new RespondApi<Gate>()
                    { Result = ResultRespond.Duplication, Message = "tên hoặc mã cửa khẩu đã tồn tại" };
            obj.AreaId = model.AreaId;
            obj.Code = model.Code;
            obj.Name = model.Name;
            obj.Description = model.Description;
            obj.Latitude = model.Latitude;
            obj.Longitude = model.Longitude;
            obj.NormalizationName = model.NormalizationName;
            obj.UpdatedDate = DateTime.Now;
            
            await _context.SaveChangesAsync();
            return new RespondApi<Gate>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = obj };
        }
        catch (Exception e)
        {
            return new RespondApi<Gate>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new Gate() };
        }
    }

    public async Task<RespondApi<Gate>> DeleteAsync(int id)
    {
        try
        {
            var obj = await _context.Gates.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if(obj == null)
                return new RespondApi<Gate>()
                    { Result = ResultRespond.Duplication, Message = "Không tồn tại id cửa khẩu này" };
            obj.IsDeleted = true;
            return new RespondApi<Gate>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = obj };
        }
        catch (Exception e)
        {
            return new RespondApi<Gate>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new Gate() };
        }
    }
    public async Task<RespondApi<Gate>> RemoveAsync(int id)
    {
        try
        {
            var obj = await _context.Gates.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
            if(obj == null)
                return new RespondApi<Gate>()
                    { Result = ResultRespond.Duplication, Message = "Không tồn tại id cửa khẩu này" };
            _context.Remove(obj);
            await _context.SaveChangesAsync();
            return new RespondApi<Gate>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = obj };
        }
        catch (Exception e)
        {
            return new RespondApi<Gate>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new Gate() };
        }
    }
}
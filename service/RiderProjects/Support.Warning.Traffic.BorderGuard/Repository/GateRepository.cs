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

    public async Task<RespondApi<List<Gate>>> GetAll()
    {
        try
        {
            var result = await _context.Gates.Where(x => !x.IsDeleted).ToListAsync();
            return new RespondApi<List<Gate>>()
                { Result = ResultRespond.Succeeded, Message = "Thành công", Data = result };
        }
        catch (Exception e)
        {
            return new RespondApi<List<Gate>>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new List<Gate>() };
        }
    }

    public async Task<RespondApi<Gate>> GetById(int id)
    {
        try
        {
            var result = await _context.Gates.FirstOrDefaultAsync(x => x.Id == id);
            return new RespondApi<Gate>()
                { Result = ResultRespond.Succeeded, Message = "Thành công", Data = result };
        }
        catch (Exception e)
        {
            return new RespondApi<Gate>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new Gate() };
        }
    }

    public async Task<RespondApi<Gate>> CreateAsync(GateCreate model)
    {
        try
        {
            var gate = _mapper.Map<Gate>(model);
            gate.CreatedDate = DateTime.Now;
            gate.UpdatedDate = DateTime.Now;
            gate.Status = true;
            gate.IsDeleted = false;
            await _context.Gates.AddAsync(gate);
            await _context.SaveChangesAsync();
            return new RespondApi<Gate>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = gate };
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
                    x.Code == model.Code) && x.Id != id);
            if (duplicateGate != null)
                return new RespondApi<Gate>()
                    { Result = ResultRespond.Duplication, Message = "tên hoặc mã cửa khẩu đã tồn tại" };
            obj.Code = model.Code;
            obj.Name = model.Name;
            obj.Description = model.Description;
            obj.Latitude = model.Latitude;
            obj.Longitude = model.Longitude;
            obj.NormalizationName = model.NormalizationName;
            obj.UpdatedDate = DateTime.Now;
            obj.ProvinceId = model.ProvinceId;
            obj.DistrictId = model.DistrictId;
            obj.WardId = model.WardId;

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
            await _context.SaveChangesAsync();
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
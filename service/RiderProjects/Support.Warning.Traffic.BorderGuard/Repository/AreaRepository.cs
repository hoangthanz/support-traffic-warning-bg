using AutoMapper;
using Common.Service.Models.Respond;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Area;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class AreaRepository: RepositoryBase<Area>, IAreaRepository
{
    private readonly SupportWarningContext _context;
    private readonly IMapper _mapper;
    public AreaRepository(SupportWarningContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }


    public async Task<RespondApi<List<Area>>> GetAll()
    {
        try
        {
            var result = await _context.Areas.ToListAsync();
            return new RespondApi<List<Area>>()
                { Result = ResultRespond.Succeeded, Message = "Thành công", Data = result };
        }
        catch (Exception e)
        {
            return new RespondApi<List<Area>>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new List<Area>() };
        }
    }

    public async Task<RespondApi<Area>> GetById(int id)
    {
        try
        {
            var result = await _context.Areas.FirstOrDefaultAsync(x => x.Id == id);
            return new RespondApi<Area>()
                { Result = ResultRespond.Succeeded, Message = "Thành công", Data = result };
        }
        catch (Exception e)
        {
            return new RespondApi<Area>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new Area() };
        }
    }

    public async Task<RespondApi<Area>> CreateAsync(CreateArea model)
    {
        try
        {
            var obj = new Area();
            obj.Name = model.Name;
            await _context.Areas.AddAsync(obj);
            await _context.SaveChangesAsync();
            return new RespondApi<Area>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = obj };
        }
        catch (Exception e)
        {
            return new RespondApi<Area>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new Area() };
        }
    }

    public async Task<RespondApi<Area>> UpdateAsync(int id, CreateArea model)
    {
        try
        {
            var obj = await _context.Areas.FirstOrDefaultAsync(x => x.Id == id);
            if(obj == null)
                return new RespondApi<Area>()
                    { Result = ResultRespond.Duplication, Message = "Không tồn tại id cửa khẩu này" };
            var duplicateGate = await _context.Gates.FirstOrDefaultAsync(x => !x.IsDeleted && (x.Name == model.Name ));
            if (duplicateGate != null)
                return new RespondApi<Area>()
                    { Result = ResultRespond.Duplication, Message = "tên khu vực đã tồn tại" };
            obj.Name = model.Name;
            
            await _context.SaveChangesAsync();
            return new RespondApi<Area>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = obj };
        }
        catch (Exception e)
        {
            return new RespondApi<Area>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new Area() };
        }
    }
    

    public async Task<RespondApi<Area>> RemoveAsync(int id)
    {
        try
        {
            var obj = await _context.Areas.FirstOrDefaultAsync(x => x.Id == id);
            if(obj == null)
                return new RespondApi<Area>()
                    { Result = ResultRespond.Duplication, Message = "Không tồn tại id cửa khẩu này" };
            _context.Remove(obj);
            return new RespondApi<Area>() { Result = ResultRespond.Succeeded, Message = "Thành công", Data = obj };
        }
        catch (Exception e)
        {
            return new RespondApi<Area>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new Area() };
        }
    }
}
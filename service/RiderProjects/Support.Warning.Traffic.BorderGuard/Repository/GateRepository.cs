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

    public async Task<RespondApiPaging<List<Gate>>> GetByCondition(GateSearch model)
    {
        try
        {
            List<Gate> gates = null;

            PagingResponse paging = new()
            {
                CurrentPage = model.PageNumber,
                PageSize = model.PageSize
            };
            var query = _context.Gates.Where(x => !x.IsDeleted);
            if (model.Name != null)
            {
                query = query.Where(x => x.Name.Contains(model.Name));
            }
            if (model.EconomicSector != null)
            {
                query = query.Where(x => x.EconomicSector == model.EconomicSector);
            }
            if (model.NationalLevel != null)
            {
                query = query.Where(x => x.NationalLevel == model.NationalLevel);
            }
            if (model.TypeOfShipping != null)
            {
                query = query.Where(x => x.TypeOfShipping == model.TypeOfShipping);
            }

            if (model.IsPaging)
            {
                paging.TotalRecords = await query.CountAsync();
                paging.TotalPages = (int)Math.Ceiling(decimal.Divide(paging.TotalRecords, paging.PageSize));
                gates = await query.Skip((model.PageNumber - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
                return new RespondApiPaging<List<Gate>>()
                    { Result = ResultRespond.Succeeded, Message = "Thành công", Data = gates, PagingResponse = paging };
            }

            gates = await query.ToListAsync();
            return new RespondApiPaging<List<Gate>>()
                { Result = ResultRespond.Succeeded, Message = "Success", Data = gates };
        }
        catch (Exception e)
        {
            return new RespondApiPaging<List<Gate>>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new List<Gate>() };
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

    public async Task<RespondApi<Level>> CheckDangerValue(int gateId, bool IsMaxOrMin)
    {
        try
        {
            var gate = await _context.Gates.FirstOrDefaultAsync(x => x.Id == gateId && !x.IsDeleted);
            if (gate == null)
                return new RespondApi<Level>()
                    { Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin cửa khẩu" };
            List<GateLevel> gateLevels = new List<GateLevel>();
            if (IsMaxOrMin)
            {
                gateLevels = await _context.GateLevels.Where(x => x.GateId == gateId)
                    .OrderByDescending(x => x.MaxValue)
                    .ToListAsync();
                if(gateLevels.Count <= 0)
                    return new RespondApi<Level>()
                        { Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin mức cảnh báo" };
                foreach (var gateLevel in gateLevels)
                {
                    if (gateLevel.MaxValue <= gate.CountVehicle)
                    {
                        var level = await _context.Levels.FirstOrDefaultAsync(x => x.Id == gateLevel.LevelId);
                        if (level == null)
                        {
                            return new RespondApi<Level>()
                                { Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin mức cảnh báo" };
                        }

                        return new RespondApi<Level>()
                        {
                            Result = ResultRespond.Succeeded, Message = "Thành công", Data = level
                        };
                    }
                }
            }
            else
            {
                gateLevels = await _context.GateLevels.Where(x => x.GateId == gateId)
                    .OrderBy(x => x.MinValue)
                    .ToListAsync();
                if(gateLevels.Count <= 0)
                    return new RespondApi<Level>()
                        { Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin mức cảnh báo" };
                foreach (var gateLevel in gateLevels)
                {
                    if (gateLevel.MinValue >= gate.CountVehicle)
                    {
                        var level = await _context.Levels.FirstOrDefaultAsync(x => x.Id == gateLevel.LevelId);
                        if (level == null)
                        {
                            return new RespondApi<Level>()
                                { Result = ResultRespond.NotFound, Message = "Không tìm thấy thông tin mức cảnh báo" };
                        }

                        return new RespondApi<Level>()
                        {
                            Result = ResultRespond.Succeeded, Message = "Thành công", Data = level
                        };
                    }
                }
            }
            return new RespondApi<Level>()
                { Result = ResultRespond.Succeeded, Message = "Cửa khẩu chưa đạt mức cảnh báo"};
        }
        catch (Exception ex)
        {
            return new RespondApi<Level>() { Result = ResultRespond.Error, Message = "Thất bại" };
        }
    }
}
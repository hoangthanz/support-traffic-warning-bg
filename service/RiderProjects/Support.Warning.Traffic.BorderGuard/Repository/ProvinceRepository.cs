using Common.Service.Models.Respond;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;
using Support.Warning.Traffic.BorderGuard.Models.Region;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class ProvinceRepository : IProvinceRepository
{
    private readonly SupportWarningContext _context;

    public ProvinceRepository(SupportWarningContext context)
    {
        _context = context;
    }

    public async Task<RespondApi<List<provinces>>> GetAll()
    {
        try
        {
            var result = await _context.provinces.ToListAsync();
            return new RespondApi<List<provinces>>()
                { Result = ResultRespond.Succeeded, Message = "Thành công", Data = result };
        }
        catch (Exception e)
        {
            return new RespondApi<List<provinces>>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new List<provinces>() };
        }
    }

    public async Task<RespondApi<List<provinces>>> GetByCondition(ProvinceSearch model)
    {
        try
        {
            List<provinces> provinces = null;
            if (model.NameSearch != null)
                provinces = await _context.provinces.Where(x => x.name.Contains(model.NameSearch)
                                                                || x.name_en.Contains(model.NameSearch)
                                                                || x.code.Contains(model.NameSearch)
                                                                || x.code_name.Contains(model.NameSearch)
                                                                || x.full_name.Contains(model.NameSearch)
                                                                || x.full_name_en.Contains(model.NameSearch))
                    .ToListAsync();
            else
                provinces = await _context.provinces.ToListAsync();
            return new RespondApi<List<provinces>>()
                { Result = ResultRespond.Succeeded, Message = "Thành công", Data = provinces };
        }
        catch (Exception e)
        {
            return new RespondApi<List<provinces>>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new List<provinces>() };
        }
    }
}
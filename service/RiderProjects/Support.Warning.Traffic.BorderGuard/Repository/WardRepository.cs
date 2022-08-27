using Common.Service.Models.Respond;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Region;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class WardRepository : IWardRepository
{
    private readonly SupportWarningContext _context;

    public WardRepository(SupportWarningContext context)
    {
        _context = context;
    }
    public async Task<RespondApiPaging<List<wards>>> GetByCondition(WardSearch model)
    {
        try
        {
            List<wards> wards = null;
            if (model.IsPaging)
            {
                PagingResponse paging = new()
                {
                    CurrentPage = model.PageNumber,
                    PageSize = model.PageSize
                };
                if (!string.IsNullOrEmpty(model.NameSearch))
                {
                    wards = await _context.wards.Where(x => x.name.Contains(model.NameSearch)
                                                            || x.name_en.Contains(model.NameSearch)
                                                            || x.code.Contains(model.NameSearch)
                                                            || x.code_name.Contains(model.NameSearch)
                                                            || x.full_name.Contains(model.NameSearch)
                                                            || x.full_name_en.Contains(model.NameSearch))
                        .OrderBy(x => x.code).Skip((model.PageNumber - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
                    paging.TotalRecords = await _context.wards.Where(x => x.name.Contains(model.NameSearch)
                                                                          || x.name_en.Contains(model.NameSearch)
                                                                          || x.code.Contains(model.NameSearch)
                                                                          || x.code_name.Contains(model.NameSearch)
                                                                          || x.full_name.Contains(model.NameSearch)
                                                                          || x.full_name_en.Contains(model.NameSearch))
                        .CountAsync();
                }
                else
                {
                    wards = await _context.wards
                        .OrderBy(x => x.code).Skip((model.PageNumber - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
                    paging.TotalRecords = await _context.wards
                        .CountAsync();
                }
                paging.TotalPages = (int)Math.Ceiling(decimal.Divide(paging.TotalRecords,paging.PageSize));
                return new RespondApiPaging<List<wards>>()
                    { Result = ResultRespond.Succeeded, Message = "Thành công", Data = wards , PagingResponse = paging};
            }
            else
            {
                if (!string.IsNullOrEmpty(model.NameSearch))
                    wards = await _context.wards.Where(x => x.name.Contains(model.NameSearch)
                                                            || x.name_en.Contains(model.NameSearch)
                                                            || x.code.Contains(model.NameSearch)
                                                            || x.code_name.Contains(model.NameSearch)
                                                            || x.full_name.Contains(model.NameSearch)
                                                            || x.full_name_en.Contains(model.NameSearch))
                        .OrderBy(x => x.code).ToListAsync();
                else
                {
                    wards = await _context.wards
                        .OrderBy(x => x.code).ToListAsync();
                }
                return new RespondApiPaging<List<wards>>()
                    { Result = ResultRespond.Succeeded, Message = "Thành công", Data = wards };
            }
            
        }
        catch (Exception e)
        {
            return new RespondApiPaging<List<wards>>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new List<wards>() };
        }
    }
}
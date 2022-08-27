using Common.Service.Models.Respond;
using Microsoft.EntityFrameworkCore;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Region;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Region;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class DistrictRepository : IDistrictRepository
{
    private readonly SupportWarningContext _context;

    public DistrictRepository(SupportWarningContext context)
    {
        _context = context;
    }
    public async Task<RespondApiPaging<List<districts>>> GetByCondition(DistrictSearch model)
    {
        try
        {
            List<districts> districts = null;
            if (model.IsPaging)
            {
                PagingResponse paging = new()
                {
                    CurrentPage = model.PageNumber,
                    PageSize = model.PageSize
                };
                if (!string.IsNullOrEmpty(model.NameSearch))
                {
                    districts = await _context.districts.Where(x => x.name.Contains(model.NameSearch)
                                                                    || x.name_en.Contains(model.NameSearch)
                                                                    || x.code.Contains(model.NameSearch)
                                                                    || x.code_name.Contains(model.NameSearch)
                                                                    || x.full_name.Contains(model.NameSearch)
                                                                    || x.full_name_en.Contains(model.NameSearch))
                        .OrderBy(x => x.code).Skip((model.PageNumber - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
                    paging.TotalRecords = await _context.districts.Where(x => x.name.Contains(model.NameSearch)
                                                                              || x.name_en.Contains(model.NameSearch)
                                                                              || x.code.Contains(model.NameSearch)
                                                                              || x.code_name.Contains(model.NameSearch)
                                                                              || x.full_name.Contains(model.NameSearch)
                                                                              || x.full_name_en.Contains(
                                                                                  model.NameSearch)).CountAsync();
                }
                else
                {
                    districts = await _context.districts
                        .OrderBy(x => x.code).Skip((model.PageNumber - 1) * model.PageSize).Take(model.PageSize).ToListAsync();
                    paging.TotalRecords = await _context.districts.CountAsync();
                }

                paging.TotalPages = (int)Math.Ceiling(decimal.Divide(paging.TotalRecords,paging.PageSize));
                return new RespondApiPaging<List<districts>>()
                    { Result = ResultRespond.Succeeded, Message = "Thành công", Data = districts , PagingResponse = paging};
            }
            else
            {
                if (!string.IsNullOrEmpty(model.NameSearch))
                    districts = await _context.districts.Where(x => x.name.Contains(model.NameSearch)
                                                                    || x.name_en.Contains(model.NameSearch)
                                                                    || x.code.Contains(model.NameSearch)
                                                                    || x.code_name.Contains(model.NameSearch)
                                                                    || x.full_name.Contains(model.NameSearch)
                                                                    || x.full_name_en.Contains(model.NameSearch))
                        .OrderBy(x => x.code).ToListAsync();
                else
                {
                    districts = await _context.districts
                        .OrderBy(x => x.code).ToListAsync();
                }
                return new RespondApiPaging<List<districts>>()
                    { Result = ResultRespond.Succeeded, Message = "Thành công", Data = districts };
            }
            
        }
        catch (Exception e)
        {
            return new RespondApiPaging<List<districts>>() { Result = ResultRespond.Error, Message = "Thất bại", Data = new List<districts>() };
        }
    }
}
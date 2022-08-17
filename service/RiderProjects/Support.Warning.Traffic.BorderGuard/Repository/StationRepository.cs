using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class StationRepository : RepositoryBase<Station>, IStationRepository
{
    private readonly SupportWarningContext _context;

    public StationRepository(SupportWarningContext context) : base(context)
    {
        _context = context;
    }

    public async Task CreateAsync(Station obj)
    {
        try
        {
            Create(obj);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task UpdateAsync(Station obj)
    {
        try
        {
            Update(obj);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task DeleteAsync(int id)
    {
        try
        {
            var exportImportType = FindByCondition(x => x.Id == id).FirstOrDefault();
            if (null != exportImportType)
                Delete(exportImportType);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}
using Support.Warning.Traffic.BorderGuard.Contracts;
using Support.Warning.Traffic.BorderGuard.Models.Business;

namespace Support.Warning.Traffic.BorderGuard.IRepository;

public interface IExportImportTypeRepository : IRepositoryBase<ExportImportType>
{
    Task CreateAsync(ExportImportType obj);

    Task UpdateAsync(ExportImportType obj);

    Task DeleteAsync(int id);

}
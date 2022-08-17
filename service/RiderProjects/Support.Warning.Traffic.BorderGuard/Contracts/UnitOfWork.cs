namespace Support.Warning.Traffic.BorderGuard.Contracts;

public class UnitOfWork: IUnitOfWork
{
    private readonly SupportWarningContext _context;

    public UnitOfWork(SupportWarningContext context)
    {
        _context = context;
    }
    
    public async Task CompleteAsync()
    {
        await _context.SaveChangesAsync();
    }

    
}
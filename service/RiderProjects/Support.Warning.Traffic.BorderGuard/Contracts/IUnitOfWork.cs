namespace Support.Warning.Traffic.BorderGuard.Contracts;

public interface IUnitOfWork
{
    Task CompleteAsync();
}
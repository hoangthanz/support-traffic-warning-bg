namespace Common.Service.Interfaces;

public interface IUserTracking
{
    public Guid CreatedUserId { get; set; }
    public Guid UpdatedUserId{ get; set; }
}
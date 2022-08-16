namespace Common.Service.Interfaces;

public interface ICheckTracking
{
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}
namespace Common.Service.Interfaces;

public interface IDateTracking
{
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
}
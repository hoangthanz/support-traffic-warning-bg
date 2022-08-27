namespace Common.Service.Models.Request;

public class PagingParameterModel
{
    const int MaxPageSize = 100;

    public bool IsPaging { get; set; } = true;

    public int PageNumber { get; set; } = 1;

    private int _pageSize { get; set; } = 20;

    public int PageSize
    {
        get { return _pageSize; }
        set
        {
            _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}
using Common.Service.Models.Request;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.VehicleDetail;

public class VehicleDetailSearch : PagingParameterModel
{
    public int GateId { get; set; }
    //khoảng thời gian này cosos những xe nào trong cửa khẩu
    public DateTime? TimeInGate { get; set; }
}
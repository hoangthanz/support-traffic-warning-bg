using Microsoft.AspNetCore.Identity;
using Support.Warning.Traffic.BorderGuard.Common.Models.Interfaces;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Account;

public class UserViewModel: IdentityUser<int>, IDateTracking, ICheckTracking
{
    public bool IsActive { get; set; }
    public string? ActiveCode { get; set; }
    public string? DisplayName { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
    public int GateId { get; set; } = 0;
    public string RoleName { get; set; }
}
using Common.Service.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Support.Warning.Traffic.BorderGuard.Models.Identity;

public class ApplicationUser : IdentityUser<int>, IDateTracking, ICheckTracking
{
    public bool IsActive { get; set; }
    public string? ActiveCode { get; set; }
    public string? DisplayName { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
    public bool Status { get; set; }
}
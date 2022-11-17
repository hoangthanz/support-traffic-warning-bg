using Microsoft.AspNetCore.Identity;

namespace Support.Warning.Traffic.BorderGuard.Models.Identity;

public class ApplicationRole: IdentityRole<int>
{
    public string DisplayName { get; set; }
    public bool CanDelete { get; set; }
    public bool RoleInGate { get; set; }
    public bool HaveOTP { get; set; }
}
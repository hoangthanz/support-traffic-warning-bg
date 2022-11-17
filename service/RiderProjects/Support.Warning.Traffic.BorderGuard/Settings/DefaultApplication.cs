using Support.Warning.Traffic.BorderGuard.Models.Identity;

namespace Support.Warning.Traffic.BorderGuard.Settings;

public class DefaultApplication
{
    public const string RoleAdministrator = "Administrator";
    public static string AdminPass = "123123aA@";
    public static ApplicationRole Administrator = new ApplicationRole
    {
        Name = RoleAdministrator,
        DisplayName = "Quản trị hệ thống",
        CanDelete = false,
        RoleInGate = false,
        HaveOTP = false
    };
}
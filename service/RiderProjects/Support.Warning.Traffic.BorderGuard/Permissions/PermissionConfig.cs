using Support.Warning.Traffic.BorderGuard.Models.Identity;

namespace Support.Warning.Traffic.BorderGuard.Permissions;

public class PermissionConfig
{
    public static class DefineListPermission
    {
        public static List<ClaimInfo> ListClaim = new List<ClaimInfo>()
        {
            GatePermission.Claim_Gate
        };

        public static List<ClaimInfo> ListReportClaim = new List<ClaimInfo>()
        {

        };

        public static List<ClaimInfo> ListDashboardClaim = new List<ClaimInfo>()
        {

        };
    }
}
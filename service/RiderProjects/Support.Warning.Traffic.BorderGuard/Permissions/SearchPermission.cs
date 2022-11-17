using Support.Warning.Traffic.BorderGuard.Models.Identity;

namespace Support.Warning.Traffic.BorderGuard.Permissions;

public class SearchPermission
{
    public const string VehicleLookUpOnMap = "VehicleLookUpOnMap";
    public const string CreateAccount = "CreateAccount";
    public const string UpdateAccount = "UpdateAccount";
    public const string DeleteAccount = "DeleteAccount";

    public static ClaimInfo ClaimVehicleLookUpOnMap = new("Tra cứu phương tiện trên bản đồ", "ClaimVehicleLookUpOnMap",
        new List<Permission>
        {
            new("Đồng ý", VehicleLookUpOnMap, 4)
        });

}
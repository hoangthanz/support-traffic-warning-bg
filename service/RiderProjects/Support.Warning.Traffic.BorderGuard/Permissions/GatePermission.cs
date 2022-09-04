using Support.Warning.Traffic.BorderGuard.Models.Identity;

namespace Support.Warning.Traffic.BorderGuard.Permissions;

public class GatePermission
{
    public const string Get = "Gate_Get";
    public const string Create = "Gate_Create";
    public const string Update = "Gate_Update";
    public const string Delete = "Gate_Delete";

    public static ClaimInfo Claim_Gate = new ClaimInfo("Thông tin cửa khẩu", "Claim_Gate",
        new List<Permission>()
        {
            new Permission("Đọc", Get, 0), new Permission("Thêm mới", Create, 1),
            new Permission("Cập nhật", Update, 2), new Permission("Xóa", Delete, 3),
        });
}
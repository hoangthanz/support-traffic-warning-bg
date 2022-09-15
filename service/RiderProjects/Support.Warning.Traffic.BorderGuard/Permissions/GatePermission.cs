using Support.Warning.Traffic.BorderGuard.Models.Identity;

namespace Support.Warning.Traffic.BorderGuard.Permissions;

public class GatePermission
{
    public const string Get = "Gate_Get";
    public const string Create = "Gate_Create";
    public const string Update = "Gate_Update";
    public const string Delete = "Gate_Delete";

    public const string GetStation = "GetStation";
    public const string CreateStation = "CreateStation";
    public const string UpdateStation = "UpdateStation";
    public const string DeleteStation = "DeleteStation";

    public const string GetLevel = "GetLevel";
    public const string CreateLevel = "CreateLevel";
    public const string UpdateLevel = "UpdateLevel";
    public const string DeleteLevel = "DeleteLevel";
    
    
    public const string GetAccount = "GetAccount";
    public const string CreateAccount = "CreateAccount";
    public const string UpdateAccount = "UpdateAccount";
    public const string DeleteAccount = "DeleteAccount";
    
    public static ClaimInfo ClaimGate = new("Thông tin cửa khẩu", "ClaimGate",
        new List<Permission>()
        {
            new("Đọc", Get, 0), new("Thêm mới", Create, 1),
            new("Cập nhật", Update, 2), new("Xóa", Delete, 3),
        });
    
    public static ClaimInfo ClaimStation = new("Thông tin trạm", "ClaimStation",
        new List<Permission>()
        {
            new("Đọc", GetStation, 0), new("Thêm mới", CreateStation, 1),
            new("Cập nhật", UpdateStation, 2), new("Xóa", DeleteStation, 3),
        });
    
    public static ClaimInfo ClaimLevel = new("Mức độ cảnh báo", "ClaimLevel",
        new List<Permission>()
        {
            new("Đọc", GetLevel, 0), new("Thêm mới", CreateLevel, 1),
            new("Cập nhật", UpdateLevel, 2), new("Xóa", DeleteLevel, 3),
        });
    
    public static ClaimInfo ClaimAccount = new("Quản trị tài khoản", "ClaimAccount",
        new List<Permission>()
        {
            new("Đọc", GetAccount, 0), new("Thêm mới", CreateAccount, 1),
            new("Cập nhật", UpdateAccount, 2), new("Xóa", DeleteAccount, 3),
        });
}
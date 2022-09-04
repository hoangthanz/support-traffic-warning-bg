

using System.ComponentModel.DataAnnotations;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Account;

public class RequestUpdateRolesUserInGate
{
    [Required]
    public int UserId { get; set; }
    public List<string> RoleIds { get; set; }
}
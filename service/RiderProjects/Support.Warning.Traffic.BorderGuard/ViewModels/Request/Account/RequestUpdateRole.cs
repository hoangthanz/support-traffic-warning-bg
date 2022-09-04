using System.ComponentModel.DataAnnotations;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Account
{
    public class RequestUpdateRole
    {
        [Required, MaxLength(255)]
        public string DisplayName { get; set; }
        public bool RoleInGate { get; set; }
        public bool HaveOTP { get; set; }
        public List<string> ListPermission { get; set; }
    }
}

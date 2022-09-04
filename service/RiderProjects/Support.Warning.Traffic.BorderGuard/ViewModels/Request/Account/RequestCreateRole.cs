using System.ComponentModel.DataAnnotations;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Account
{
    public class RequestCreateRole
    {
        [Required, MaxLength(255)]
        public string Name { get; set; }
        [Required, MaxLength(255)]
        public string DisplayName { get; set; }
        public bool RoleInGate { get; set; }
        public List<string> ListPermission { get; set; }
    }
}

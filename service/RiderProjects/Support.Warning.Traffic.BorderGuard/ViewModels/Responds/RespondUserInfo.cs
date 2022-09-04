namespace Support.Warning.Traffic.BorderGuard.ViewModels.Responds
{
    public class RespondUserInfo
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public bool EmailConfirmed { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string DisplayName { get; set; }
        public string PhoneNumber { get; set; }
        public string CMT { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public List<RespondRoleInfo> Roles { get; set; }
        public int ProfileStep { get; set; }
    }
}

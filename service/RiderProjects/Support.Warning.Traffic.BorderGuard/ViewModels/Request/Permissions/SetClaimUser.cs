namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Permissions;

public class SetClaimUser
{
    public int UserId { get; set; }
    public List<string> Claims { get; set; }
}
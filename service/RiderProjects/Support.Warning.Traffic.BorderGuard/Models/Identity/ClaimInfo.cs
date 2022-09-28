namespace Support.Warning.Traffic.BorderGuard.Models.Identity;

public class ClaimInfo
{
    public ClaimInfo(string displayName, string name, List<Permission> permissions)
    {
        DisplayName = displayName;
        Name = name;
        Permissions = permissions;
    }
    public string DisplayName { get; set; }
    public string Name { get; set; }
    public List<Permission> Permissions { get; set; }
}
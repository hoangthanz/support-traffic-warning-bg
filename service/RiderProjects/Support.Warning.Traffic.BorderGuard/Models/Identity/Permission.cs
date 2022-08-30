namespace Support.Warning.Traffic.BorderGuard.Models.Identity;

public class Permission
{
    public Permission(string displayName, string name, int type)
    {
        this.DisplayName = displayName;
        this.Name = name;
        this.Type = type;
    }
    public string Name { get; set; }
    public int Type { get; set; }
    public string DisplayName { get; set; }
}
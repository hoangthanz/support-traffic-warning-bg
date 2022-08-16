namespace Support.Warning.Traffic.BorderGuard.ViewModels.Account;

public class RespondLoginModel
{
    public string? Token { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime Expiration { get; set; }
    public List<string>? ListClaims { get; set; }
}
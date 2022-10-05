namespace Support.Warning.Traffic.BorderGuard.Services.Models;

public class RespondLogin
{
    public int IsLogin { get; set; }
    public string Token { get; set; }
    public string RefreshToken { get; set; }
    public bool RequiredOTP { get; set; }
    public DateTime Expiration { get; set; }
    public string Message { get; set; }
    public List<string> ListClaims { get; set; }
}
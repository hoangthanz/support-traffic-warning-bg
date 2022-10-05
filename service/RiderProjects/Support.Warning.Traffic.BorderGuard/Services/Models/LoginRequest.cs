namespace Support.Warning.Traffic.BorderGuard.Services.Models;

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }

    public LoginRequest(string user, string pass)
    {
        Username = user;
        Password = pass;
    }
}
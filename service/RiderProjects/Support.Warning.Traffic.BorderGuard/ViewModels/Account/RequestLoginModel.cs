using Microsoft.Build.Framework;

namespace Support.Warning.Traffic.BorderGuard.ViewModels.Account;

public class RequestLoginModel
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}
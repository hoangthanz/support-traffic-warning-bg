using System.ComponentModel.DataAnnotations;
using Support.Warning.Traffic.BorderGuard.Common.Models.Interfaces;

namespace Support.Warning.Traffic.BorderGuard.Models.Identity;

public class RefreshToken: IDateTracking
{
    [Key]
    public int Id { get; set; }

    public string Token { get; set; }
    public DateTime Expires { get; set; }
    public bool IsExpired => DateTime.UtcNow >= Expires;
    public string CreatedByIp { get; set; }
    public DateTime? Revoked { get; set; }
    public string RevokedByIp { get; set; }
    public string ReplacedByToken { get; set; }
    public bool IsActive => Revoked == null && !IsExpired;

    public int UserId { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
}
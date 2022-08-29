namespace Support.Warning.Traffic.BorderGuard.ViewModels.Request.Station;

public class CreateStation
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Website { get; set; }
    public string? Latitude { get; set; }
    public string? Longitude { get; set; }
    public string? Description { get; set; }

    public int GateId { get; set; }
}
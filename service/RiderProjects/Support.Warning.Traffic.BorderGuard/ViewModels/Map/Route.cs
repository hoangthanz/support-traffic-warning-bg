namespace Support.Warning.Traffic.BorderGuard.ViewModels.Map;

public class Route
{
    public double distance { get; set; }
    public double duration { get; set; }
    public double weight { get; set; }
    public string weight_name { get; set; }
    public List<Leg> legs { get; set; }
}
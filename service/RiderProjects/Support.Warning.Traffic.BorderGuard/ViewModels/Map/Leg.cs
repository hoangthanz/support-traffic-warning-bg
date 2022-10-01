namespace Support.Warning.Traffic.BorderGuard.ViewModels.Map;

public class Leg
{
    public double distance { get; set; }
    public double duration { get; set; }
    public string summary { get; set; }
    public double weight { get; set; }
    public List<Step> steps { get; set; }
}
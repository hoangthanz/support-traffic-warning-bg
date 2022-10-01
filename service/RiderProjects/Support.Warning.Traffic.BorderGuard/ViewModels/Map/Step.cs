namespace Support.Warning.Traffic.BorderGuard.ViewModels.Map;

public class Step
{
    public double distance { get; set; }
    public string driving_side { get; set; }
    public double duration { get; set; }
    public string geometry { get; set; }
    public string mode { get; set; }
    public string name { get; set; }
    public double weight { get; set; }
    public List<Intersection> intersections { get; set; }
    public Maneuver maneuver { get; set; }
}

public class Intersection
{
    public List<int> bearings { get; set; }
    public List<bool> entry { get; set; }
    public List<double> location { get; set; }
    public int Out { get; set; }
}

public class Maneuver
{
    public int bearing_after { get; set; }
    public int bearing_before { get; set; }
    public List<double> location { get; set; }
    public string modifier { get; set; }
    public string type { get; set; }
} 
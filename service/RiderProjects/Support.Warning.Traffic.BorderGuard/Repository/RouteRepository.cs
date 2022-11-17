using Newtonsoft.Json;
using Support.Warning.Traffic.BorderGuard.IRepository;
using Support.Warning.Traffic.BorderGuard.ViewModels.Map;
using Support.Warning.Traffic.BorderGuard.ViewModels.Request.Map;

namespace Support.Warning.Traffic.BorderGuard.Repository;

public class RouteRepository : IRouteRepository
{
    public async Task<RespondRoute> GetRoute(RequestRoute model)
    {
        var url = $"https://routing.openstreetmap.de/routed-bike/route/v1/driving/{model.LongtitudeFrom},{model.LatitudeFrom}" +
                  $";{model.LongtitudeTo},{model.LatitudeTo}?overview=false&alternatives=true&steps=true";
        HttpClientHandler clientHandler = new HttpClientHandler();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) =>
        {
            return true;
        };
        using (var client = new HttpClient(clientHandler))
        {
            using (var respond = await client.GetAsync(url))
            {
                if ((int)respond.StatusCode == 200)
                {
                    var responseContent = await respond.Content.ReadAsStringAsync();
                    var respondRoute =
                        JsonConvert.DeserializeObject<RespondRoute>(responseContent);
                    return respondRoute;
                }
            }
        }

        return null;
    }
}
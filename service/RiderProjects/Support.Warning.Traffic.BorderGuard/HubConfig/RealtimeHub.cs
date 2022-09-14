using Microsoft.AspNetCore.SignalR;
using Support.Warning.Traffic.BorderGuard.ViewModels.Realtime;

namespace Support.Warning.Traffic.BorderGuard.HubConfig;

public class RealtimeHub: Hub
{
    public async Task Send(MessageSupport message)
    {
        await Clients.All.SendAsync("Receive", message);
    }
}
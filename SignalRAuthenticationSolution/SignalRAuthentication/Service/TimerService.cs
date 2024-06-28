
using Microsoft.AspNetCore.SignalR;
using SignalRAuthentication.Hubs;

namespace SignalRAuthentication.Service
{
    public class TimerService : IHostedService, IDisposable
    {
        private readonly IHubContext<TimeHub> _hubContext;
        private Timer timer;

        public TimerService(IHubContext<TimeHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public void Dispose()
        {
            timer?.Dispose();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            timer = new Timer(tick, null, 0, 50);
            return Task.CompletedTask;
        }

        private async void tick(object? state)
        {
            var currentTime = DateTime.UtcNow.ToString("F");
            await _hubContext.Clients.All.SendAsync("timeUpdate", currentTime);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }
    }
}

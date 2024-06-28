using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace SignalRAuthentication.Hubs
{
    
    public class SignalRHub : Hub, ISignalHub
    {
        [Authorize]
        public async Task SayHello()
        {
            await Clients.User("abc@gmail.com").SendAsync("greet", "Hello");
        }
    }
}

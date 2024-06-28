using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRAuthentication.Hubs;

namespace SignalRAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignalRController : ControllerBase
    {
        private readonly ISignalHub _hub;

        public SignalRController(ISignalHub hub)
        {
            _hub = hub;
        }

        [HttpGet]
        public async Task<IActionResult> Greet()
        {
            await _hub.SayHello();
            return Ok();
        }

        
        [HttpPost("test")]
        [Authorize]
        public async Task<IActionResult> Check()
        {;
            return Ok();
        }
    }
}

using SignalRAuthentication.Model.Entity;

namespace SignalRAuthentication.Interfaces
{
    public interface ITokenService
    {
        public Task<string> GetToken(UserEntity user);
    }
}

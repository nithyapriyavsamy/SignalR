using SignalRAuthentication.Model.Entity;

namespace SignalRAuthentication.Interfaces
{
    public interface IUserRepo
    {
        public Task Add(UserEntity user);
        public Task<UserEntity> Get(UserEntity user);
    }
}

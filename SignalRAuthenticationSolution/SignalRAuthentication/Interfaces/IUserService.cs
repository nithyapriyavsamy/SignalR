using SignalRAuthentication.Model.Entity;
using SignalRAuthentication.Model.ViewModel;

namespace SignalRAuthentication.Interfaces
{
    public interface IUserService
    {
        public Task RegisterUser(UserViewModel user);
        public Task<LoginViewModel> LoginUser(LoginViewModel user);
    }
}

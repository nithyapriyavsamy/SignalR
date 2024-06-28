using SignalRAuthentication.Interfaces;
using SignalRAuthentication.Model.Entity;
using SignalRAuthentication.Model.ViewModel;
using System.Security.Cryptography;
using System.Text;

namespace SignalRAuthentication.Service
{
    public class UserService : IUserService
    {
        public readonly IUserRepo _userRepo;
        private readonly ITokenService _tokenService;

        public UserService(IUserRepo userRepo,ITokenService tokenService)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;   
        }

        public async Task<LoginViewModel> LoginUser(LoginViewModel user)
        {
            UserEntity userEntity = new UserEntity();
            userEntity.UserName = user.UserName;
            UserEntity result = await _userRepo.Get(userEntity);
            var hmac = new HMACSHA256(result.HashKey);
            var password = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password));
            if (password.SequenceEqual(result.PasswordHash))
            {
                user.Token = await _tokenService.GetToken(result);
                return user;
            }
            return null;
        }

        public async Task RegisterUser(UserViewModel user)
        {
            UserEntity userEntity = new UserEntity();
            userEntity.UserName = user.UserName;
            var hmac = new HMACSHA256();
            userEntity.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password ?? ""));
            userEntity.HashKey = hmac.Key;
            await _userRepo.Add(userEntity);
        }
    }
}

namespace SignalRAuthentication.Model.Entity
{
    public class UserEntity
    {
        public Guid UserId { get; set; }
        public string? UserName { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? HashKey { get; set; }
    }
}

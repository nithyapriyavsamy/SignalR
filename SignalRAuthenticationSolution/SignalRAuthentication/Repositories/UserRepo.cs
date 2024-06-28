using SignalRAuthentication.Interfaces;
using SignalRAuthentication.Model.Entity;
using System.Data;
using System.Data.SqlClient;

namespace SignalRAuthentication.Repositories
{
    public class UserRepo : IUserRepo
    {
        public string Connection;
        public UserRepo()
        {
            Connection = "Server=KANINI-LTP-700\\SQLEXPRESS9;Database=SignalRAuthentication;User Id=sa;Password=Admin@123;";

        }
        public async Task<UserEntity> Get(UserEntity user)
        {
            UserEntity userEntity = new UserEntity();
            using (SqlConnection connection = new SqlConnection(Connection))
                try
                {
                    SqlDataAdapter adapter = new SqlDataAdapter("GetUser", connection);
                    adapter.SelectCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    adapter.SelectCommand.Parameters.Add("@UserName", SqlDbType.VarChar).Value = user.UserName;
                    DataSet set = new DataSet();
                    adapter.Fill(set);
                    DataRow row = set.Tables[0].Rows[0];
                    if(row != null)
                    {
                        userEntity.HashKey = (byte[])row[3];
                        userEntity.PasswordHash = (byte[])row[2];
                        userEntity.UserName = (string)row[1];
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: " + ex.Message);
                }
            return userEntity;
        }

        public async Task Add(UserEntity user)
        {
            using (SqlConnection connection = new SqlConnection(Connection))
            {
                try
                {
                    await connection.OpenAsync();
                    SqlCommand command = new SqlCommand("AddUser", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@UserName", user.UserName);
                    command.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);
                    command.Parameters.AddWithValue("@HashKey", user.HashKey);
                    int rowsAffected = await command.ExecuteNonQueryAsync();
                    await connection.CloseAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: " + ex.Message);
                }
            }
        }
    }
}

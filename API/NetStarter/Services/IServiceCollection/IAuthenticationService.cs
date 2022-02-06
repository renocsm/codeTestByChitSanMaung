using NetStarter.Data.Models;
using System.Threading.Tasks;

namespace NetStarter.Services.IServiceCollection
{
    public interface IAuthenticationService
    {
        Task<ServiceResponse<int>> Register(User user, string password); 

        Task<ServiceResponse<string>> Login(string username, string password);

        Task<bool> UserExists(string username);

    }
}

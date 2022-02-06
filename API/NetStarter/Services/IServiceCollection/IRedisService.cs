using NetStarter.Dtos.RedisPromocode;
using System.Threading.Tasks;

namespace NetStarter.Services.IServiceCollection
{
    public interface IRedisService
    {
        Task<RedisPromocodes> GetBasket(string userName);
        Task<RedisPromocodes> UpdateBasket(RedisPromocodes input);
        Task DeleteBasket(string userName);
    }
}

using Microsoft.Extensions.Caching.Distributed;
using NetStarter.Dtos.RedisPromocode;
using NetStarter.Services.IServiceCollection;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace NetStarter.Services.ServiceCollection
{
    public class RedisService : IRedisService
    {
        private readonly IDistributedCache _redisCache;
        public RedisService(IDistributedCache cache)
        {
            _redisCache = cache ?? throw new ArgumentNullException(nameof(cache));
        }
        public async Task DeleteBasket(string userName)
        {
            await _redisCache.RemoveAsync(userName);
        }

        public async Task<RedisPromocodes> GetBasket(string userName)
        {
            var data = await _redisCache.GetStringAsync(userName);

            if (String.IsNullOrEmpty(data))
                return null;

            return JsonConvert.DeserializeObject<RedisPromocodes>(data);
        }

        public async Task<RedisPromocodes> UpdateBasket(RedisPromocodes promocode)
        {
            await _redisCache.SetStringAsync(promocode.UserName, JsonConvert.SerializeObject(promocode));

            return await GetBasket(promocode.UserName);
        }
    }
}

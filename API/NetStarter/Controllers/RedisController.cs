using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using NetStarter.Dtos.RedisPromocode;
using NetStarter.Services.IServiceCollection;
using System;
using System.Threading.Tasks;

namespace NetStarter.Controllers
{

    
    [Produces("application/json")]
    [Route("api/redisPromocodes")]
    public class RedisController : ControllerBase
    {
        private readonly IRedisService _service;
        private readonly IDistributedCache _redisCache;
        public RedisController(IRedisService service, IDistributedCache cache)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
            _redisCache = cache ?? throw new ArgumentNullException(nameof(cache));
        }

        [HttpGet]
        [Route("GetRedisPromocodes")]
        public async Task<ActionResult<RedisPromocodes>> GetBasket(string userName)
        {
            var data = await _service.GetBasket(userName);
            return Ok(data ?? new RedisPromocodes(userName));
        }

        [HttpGet]
        [Route("GetRedisPromocodesByVoucherCode")]
        public async Task<ActionResult> Getpromcode(string userName)
        {
            var data = await _redisCache.GetStringAsync(userName);
            return Ok(data);
        }



        [HttpPost]
        
        public async Task<ActionResult<RedisPromocodes>> UpdateBasket([FromBody] RedisPromocodes inputModel)
        {

            return Ok(await _service.UpdateBasket(inputModel));
        }


        [HttpDelete]
        [Route("DeleteRedisPromocode")]
        public async Task<IActionResult> DeleteBasket(string userName)
        {
            await _service.DeleteBasket(userName);
            return Ok();
        }

    }
}

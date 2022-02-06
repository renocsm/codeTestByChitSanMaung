using System.Collections.Generic;

namespace NetStarter.Dtos.RedisPromocode
{
    public class RedisPromocodes
    {
        public string UserName { get; set; }
        public List<Promocodes> Items { get; set; } = new List<Promocodes>();

        public RedisPromocodes()
        {

        }
        public RedisPromocodes(string username)
        {
            UserName = username;
        }

    }
}

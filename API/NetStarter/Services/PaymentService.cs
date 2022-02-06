using Microsoft.Extensions.Configuration;
using Stripe;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetStarter.Services
{
    public class PaymentService
    {

        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(int ItemAmount)
        {
            StripeConfiguration.ApiKey = _config["StripeSetting:SecretKey"];

            var service = new PaymentIntentService();

            var intent = new PaymentIntent();

            if (ItemAmount > 0)
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = ItemAmount * 800,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(options);
            }

            return intent;
        }
    }
}

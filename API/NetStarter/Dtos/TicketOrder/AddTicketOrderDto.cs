using Microsoft.AspNetCore.Http;
 
using System;

namespace NetStarter.Dtos.TicketOrders
{
    public class AddTicketOrderDto
    {
        public DateTime OrderDate { get; set; }
        public int Quantity { get; set; }
        public string AccessPhoneNumber { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string PaymentMethod { get; set; }

        public string VoucherType { get; set; }
        public IFormFile Picture { get; set; }

        public string paymentIntendId { get; set; } 
        
        public string clientSecret { get; set; }    
    }
}

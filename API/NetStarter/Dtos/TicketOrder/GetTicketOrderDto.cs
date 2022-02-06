using NetStarter.Data.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace NetStarter.Dtos.TicketOrders
{
    public class GetTicketOrderDto
    {

        public int Id { get; set; }
        public DateTime OrderDate { get; set; }

        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Amount { get; set; }
        public int Quantity { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }

        public string ClientSecrete { get; set; }
    }
}

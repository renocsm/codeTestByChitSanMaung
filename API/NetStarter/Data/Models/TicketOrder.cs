using NetStarter.Data.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NetStarter.Data.Models
{
    public class TicketOrder : CommonEntity
    {

        public DateTime OrderDate { get; set; }

        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Amount { get; set; }
        public int Quantity { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }
        public string PaymentMethod { get; set; }   
        
        public string ClientSecrete { get; set; }
        public string PictureURL { get; set; }
        
        //relationship
        public User User { get; set; }  
        public List<OrderEvocher> Evochers {  get; set;}
    }
}

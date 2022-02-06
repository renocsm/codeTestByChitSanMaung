using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace NetStarter.Data.Models
{
    public class OrderEvocher : CommonEntity
    {

        public string Title { get; set; }

        public string Description { get; set; } 

        public DateTime ExpireDate { get; set; }

        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Amount { get; set; }

        public string promocode { get; set; }
        public string AccessPhoneNumber { get; set; }
        public bool Used { get; set; }
        public TicketOrder TicketOrder { get; set; }
        public string PictureUrl { get; set; }

        public string VoucherType { get; set; } 
    }
}

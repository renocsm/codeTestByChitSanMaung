using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetStarter.Data.Models
{
    public class User : CommonEntity
    {
      
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [Required]
        public string Role { get; set; }
        // relationships
      
        public List<TicketOrder> TicketOrders { get; set; }
    }
}

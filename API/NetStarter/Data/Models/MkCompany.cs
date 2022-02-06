using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NetStarter.Data.Models
{
    public class MkCompany :CommonEntity
    {
       
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [Required]
        public string Role { get; set; }
        public string Tele_Number { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Company_Email { get; set; }
        public bool Status { get; set; }
        public string Company_Address { get; set; }
        public DateTime? Expired_Date { get; set; }

        //relationship

        public List<MkEmployee> MkEmployees { get; set; }
    }
}

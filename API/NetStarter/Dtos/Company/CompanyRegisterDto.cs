using NetStarter.Data;
using System;

namespace NetStarter.Dtos.Company
{
    public class CompanyRegisterDto  
    {

        public string CompanyName { get; set; }
        public string Password { get; set; }
     
        public string Tele_Number { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Company_Email { get; set; }
        public bool Status { get; set; }
        public string Company_Address { get; set; }
        public DateTime? Expired_Date { get; set; }
    }
}

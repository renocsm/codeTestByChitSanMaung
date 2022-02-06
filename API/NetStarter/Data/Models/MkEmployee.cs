using System;

namespace NetStarter.Data.Models
{
    public class MkEmployee : CommonEntity
    {
        public string name { get; set; }

        public string nrc { get; set; }

        public string phoneNumber { get; set; }

        public int leaveId { get; set; }

        public string gender { get; set; }

        public string role { get; set; }

        public string email { get; set; }

        public int age { get; set; }

        public DateTime birthdate { get; set; }

        public string PictureURl { get; set; }

        public bool permanent { get; set; }

        //relationship

        public MkCompany MkCompany { get; set; }
    }
}

using Microsoft.AspNetCore.Http;
using System;

namespace NetStarter.Dtos.MkEmployee
{
    public class AddMkEmployeeDto
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

        public IFormFile Picture { get; set; }

        public bool permanent { get; set; }
    }
}

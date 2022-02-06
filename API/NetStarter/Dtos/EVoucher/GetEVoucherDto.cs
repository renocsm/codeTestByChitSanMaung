using NetStarter.Data.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace NetStarter.Dtos.EVoucher
{
    public class GetEVoucherDto
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
         
        public string PictureUrl { get; set; }
    }
}

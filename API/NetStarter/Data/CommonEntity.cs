using System;
using System.ComponentModel.DataAnnotations;

namespace NetStarter.Data
{
    public class CommonEntity
    {

        [Key]
        public int Id { get; set; }
        public int CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public int UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public bool? ActiveFlag { get; set; }

    }
}

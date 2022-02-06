using Microsoft.EntityFrameworkCore;
using NetStarter.Data.Models;

namespace NetStarter.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
         
        }

      
        public DbSet<User> Users { get; set; }

        public DbSet<TicketOrder> TicketOrders {  get; set; }

        public DbSet<OrderEvocher> OrderEvochers {  get; set; }
    }
}

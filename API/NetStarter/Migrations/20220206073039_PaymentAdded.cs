using Microsoft.EntityFrameworkCore.Migrations;

namespace NetStarter.Migrations
{
    public partial class PaymentAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientSecrete",
                table: "TicketOrders",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientSecrete",
                table: "TicketOrders");
        }
    }
}

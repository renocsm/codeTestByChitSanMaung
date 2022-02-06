using Microsoft.EntityFrameworkCore.Migrations;

namespace NetStarter.Migrations
{
    public partial class VoucherType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VoucherType",
                table: "OrderEvochers",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VoucherType",
                table: "OrderEvochers");
        }
    }
}

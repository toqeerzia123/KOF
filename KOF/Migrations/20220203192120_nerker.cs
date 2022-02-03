using Microsoft.EntityFrameworkCore.Migrations;

namespace KOF.Migrations
{
    public partial class nerker : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HouseNo",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HouseNo",
                table: "Orders");
        }
    }
}

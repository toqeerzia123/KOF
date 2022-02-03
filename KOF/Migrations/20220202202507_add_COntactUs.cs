using Microsoft.EntityFrameworkCore.Migrations;

namespace KOF.Migrations
{
    public partial class add_COntactUs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Order_Notes",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Order_city",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Order_emailaddress",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Order_phoneno",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "order_streataddress",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ContactUs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Subject = table.Column<string>(nullable: true),
                    Message = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactUs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactUs");

            migrationBuilder.DropColumn(
                name: "Order_Notes",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Order_city",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Order_emailaddress",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Order_phoneno",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "order_streataddress",
                table: "Orders");
        }
    }
}

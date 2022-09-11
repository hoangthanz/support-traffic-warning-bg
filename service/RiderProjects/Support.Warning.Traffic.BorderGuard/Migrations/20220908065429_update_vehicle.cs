using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Support.Warning.Traffic.BorderGuard.Migrations
{
    /// <inheritdoc />
    public partial class update_vehicle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DriverName",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DriverPhone",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "InGate",
                table: "Vehicles",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DriverName",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "DriverPhone",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "InGate",
                table: "Vehicles");
        }
    }
}

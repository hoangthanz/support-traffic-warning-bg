using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Support.Warning.Traffic.BorderGuard.Migrations
{
    /// <inheritdoc />
    public partial class version_11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GateId",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GateId",
                table: "Users");
        }
    }
}

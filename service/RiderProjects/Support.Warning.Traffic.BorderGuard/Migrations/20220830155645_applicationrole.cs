using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Support.Warning.Traffic.BorderGuard.Migrations
{
    /// <inheritdoc />
    public partial class applicationrole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CanDelete",
                table: "Roles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "Roles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HaveOTP",
                table: "Roles",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RoleInGate",
                table: "Roles",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CanDelete",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "HaveOTP",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "RoleInGate",
                table: "Roles");
        }
    }
}

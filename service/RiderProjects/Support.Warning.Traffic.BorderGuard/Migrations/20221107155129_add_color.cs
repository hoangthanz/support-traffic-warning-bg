using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Support.Warning.Traffic.BorderGuard.Migrations
{
    /// <inheritdoc />
    public partial class add_color : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Levels",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Levels");
        }
    }
}

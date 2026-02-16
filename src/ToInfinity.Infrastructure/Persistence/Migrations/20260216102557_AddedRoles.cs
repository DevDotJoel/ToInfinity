using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ToInfinity.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d"), "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d", "User", "USER" },
                    { new Guid("b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e"), "b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e", "Administrator", "ADMINISTRATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d"));

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: new Guid("b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e"));
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToInfinity.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EnhancedWeddingVenueProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "WeddingVenues");

            migrationBuilder.AddColumn<int>(
                name: "VenueType",
                table: "WeddingVenues",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Amenities",
                table: "WeddingVenues",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<TimeOnly>(
                name: "ClosingTime",
                table: "WeddingVenues",
                type: "time",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "WeddingVenues",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GastronomyDescription",
                table: "WeddingVenues",
                type: "nvarchar(max)",
                maxLength: 5000,
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "WeddingVenues",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocationDescription",
                table: "WeddingVenues",
                type: "nvarchar(max)",
                maxLength: 5000,
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "WeddingVenues",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxCapacity",
                table: "WeddingVenues",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinCapacity",
                table: "WeddingVenues",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "WeddingVenues",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RentalPrice",
                table: "WeddingVenues",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ServicesDescription",
                table: "WeddingVenues",
                type: "nvarchar(max)",
                maxLength: 5000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpacesDescription",
                table: "WeddingVenues",
                type: "nvarchar(max)",
                maxLength: 5000,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Styles",
                table: "WeddingVenues",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "WeddingVenues",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amenities",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "ClosingTime",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "GastronomyDescription",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "LocationDescription",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "MaxCapacity",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "MinCapacity",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "RentalPrice",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "ServicesDescription",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "SpacesDescription",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "Styles",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "WeddingVenues");

            migrationBuilder.DropColumn(
                name: "VenueType",
                table: "WeddingVenues");

            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "WeddingVenues",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FarmaciaAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddImagemToMedicamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Imagem",
                table: "Medicamentos");
        }
    }
}

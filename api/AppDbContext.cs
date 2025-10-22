using Microsoft.EntityFrameworkCore;
using FarmaciaAPI;

namespace FarmaciaAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Medicamento> Medicamentos => Set<Medicamento>();
    }
}
using FarmaciaAPI;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=medicamentos.db"));

var app = builder.Build();

//app.MapGet("/", () => "Hello World!");

app.MapGet("/", async (AppDbContext db) =>
    await db.Medicamentos.ToListAsync() );

app.MapGet("/Medicamentos/{id}", async (int id, AppDbContext db) => {
    var Medicamentos = await db.Medicamentos.FindAsync(id);
    return Medicamentos is not null ? Results.Ok(Medicamentos) : Results.NotFound("Medicamento não encontrado");}
    );

app.MapPost("/Medicamentos", async (AppDbContext db, Medicamentos novoMedicamento) =>
    {db.Medicamentos.Add(novoMedicamento);
    await db.SaveChangesAsync();
    return Results.Created($"/Medicamentos/{novoMedicamento.id}", novoMedicamento);
    });
app.Run();
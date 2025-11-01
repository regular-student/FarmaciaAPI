using FarmaciaAPI;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=medicamentos.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//cors config
builder.Services.AddCors(); //permite que o frontend faça fetch

var app = builder.Build();

//cors config 2
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod());

//app.MapGet("/", () => "Hello World!");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapGet("/", async (AppDbContext db) =>
    await db.Medicamentos.ToListAsync() );

app.MapGet("/Medicamentos/{id}", async (int id, AppDbContext db) => {
    var Medicamentos = await db.Medicamentos.FindAsync(id);
    return Medicamentos is not null ? Results.Ok(Medicamentos) : Results.NotFound("Medicamento não encontrado");}
    );

app.MapPost("/Medicamentos", async (AppDbContext db, Medicamento novoMedicamento) =>
    {db.Medicamentos.Add(novoMedicamento);
    await db.SaveChangesAsync();
    return Results.Created($"/Medicamentos/{novoMedicamento.Id}", novoMedicamento);
    });

app.MapPut("/Medicamentos/{id}", async (int id, AppDbContext db, Medicamento medicamentoAtualizado) =>
{
    var medicamento = await db.Medicamentos.FindAsync(id);
    if (medicamento is null) return Results.NotFound("Medicamento não encontrado");

    medicamento.Nome = medicamentoAtualizado.Nome;
    medicamento.PrincipioAtivo = medicamentoAtualizado.PrincipioAtivo;
    medicamento.Fabricante = medicamentoAtualizado.Fabricante;
    medicamento.Categoria = medicamentoAtualizado.Categoria;
    medicamento.Descricao = medicamentoAtualizado.Descricao;
    medicamento.Indicacoes = medicamentoAtualizado.Indicacoes;
    medicamento.ContraIndicacoes = medicamentoAtualizado.ContraIndicacoes;
    medicamento.Imagem = medicamentoAtualizado.Imagem;

    await db.SaveChangesAsync();
    return Results.Ok(medicamento);
});

app.MapDelete("/Medicamentos/{id}", async (int id, AppDbContext db) =>
{
    var medicamento = await db.Medicamentos.FindAsync(id);
    if (medicamento is null) return Results.NotFound("Medicamento não encontrado");

    db.Medicamentos.Remove(medicamento);
    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.Run();
namespace FarmaciaAPI
{
    public class Medicamento
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? PrincipioAtivo { get; set; }
        public string? Fabricante { get; set; }
        public string? Categoria { get; set; } // analgésico, antibiótico, etc
        public string? Descricao { get; set; }
    }
}
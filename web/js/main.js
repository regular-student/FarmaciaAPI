const API_URL = "http://localhost:5254";

const saida = document.getElementById("saida");

function mostrar(dados) {
    saida.textContent = JSON.stringify(dados, null, 2);
}

document.getElementById("listar").onclick = async () => {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      mostrar(data);
    };

document.getElementById("adicionar").onclick = async () => {
      const nome = document.getElementById("nome").value;
      const fabricante = document.getElementById("fabricante").value;
      const categoria = document.getElementById("categoria").value;

      const novoMedicamento = {
        nome,
        fabricante,
        categoria,
        descricao: "Exemplo simples",
        principioAtivo: "Substância exemplo",
        indicacoes: "Indicações exemplo",
        contraIndicacoes: "Contraindicações exemplo",
        imagem: "https://exemplo.com/imagem.png"
      };

      const res = await fetch(`${API_URL}/Medicamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoMedicamento)
      });

      const data = await res.json();
      mostrar(data);
    };
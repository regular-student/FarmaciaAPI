const API_URL = "http://localhost:5254";

const saida = document.getElementById("saida");
const searchInput = document.querySelector("#search")

function mostrar(dados) {
    saida.textContent = JSON.stringify(dados, null, 2);
}

function exibirResultados(remedios) {
  saida.innerHTML = "";

  // Se a lista estiver vazia, mostra uma mensagem
  if (remedios.length === 0) {
    saida.innerHTML = "<p>Nenhum remédio encontrado com esse termo.</p>";
    return;
  }

  // Para cada remédio na lista, cria um card
  remedios.forEach(remedio => {
    const card = document.createElement("div");
    card.classList.add("card"); 

    card.innerHTML = `
        <div class="header">
            <h3>${remedio.nome}</h3> 
        </div>
        <div class="body">
            <p>${remedio.descricao || "Descrição não disponível."}</p>
            <span>ID: ${remedio.id}</span>
        </div>
    `;

    saida.appendChild(card);
  });
}

// document.getElementById("listar").onclick = async () => {
//       const res = await fetch(`${API_URL}/`);
//       const data = await res.json();
//       mostrar(data);
//     };


//Busca por ID ou nome
searchInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const termo = e.target.value;

    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/Medicamentos/search?termo=${termo}`);

      if (!response.ok) {
              // Se a API retornar 404 ou 500
              saida.innerHTML = `<p>Remédio com ID ou Nome '${termo}' não foi encontrado.</p>`;
              return;
      }

      const remedio = await response.json();

      exibirResultados(remedio);
    } catch (error) {
          console.error("Erro ao buscar remédio:", error);
          saida.innerHTML = "<p>Não foi possível conectar à API. Tente novamente.</p>";
    }
  }
})    

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
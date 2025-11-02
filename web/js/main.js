const API_URL = "http://localhost:5254";

const saida = document.getElementById("saida");
const searchInput = document.querySelector("#search")

function mostrar(dados) {
    saida.textContent = JSON.stringify(dados, null, 2);
}

function exibirResultados(remedios) {
  saida.innerHTML = "";

  if (remedios.length === 0) {
    saida.innerHTML = `<div class="card-feedback"><p>Nenhum remédio encontrado com esse termo.</p></div>`;
    return;
  }

  remedios.forEach(remedio => {
    const card = document.createElement("div");
    card.classList.add("card"); 

    const imagemUrl = remedio.imagem || 'https://via.placeholder.com/200x200.png?text=Sem+Imagem';

    card.innerHTML = `
        <div class="card-esquerda">
            <div class="header">
                <h3>${remedio.nome}</h3> 
            </div>
            <div class="body">
                <p><strong>Princípio Ativo:</strong> ${remedio.principioAtivo || 'Não informado'}</p>
                <p><strong>Fabricante:</strong> ${remedio.fabricante || 'Não informado'}</p>
                <p><strong>Categoria:</strong> ${remedio.categoria || 'Não informado'}</p>
                
                <p class="detalhe-remedio"><strong>Descrição:</strong> ${remedio.descricao || 'Não informado'}</p>
                <p class="detalhe-remedio"><strong>Indicações:</strong> ${remedio.indicacoes || 'Não informado'}</p>
                
                <p class="detalhe-remedio"><strong>Contraindicações:</strong> ${remedio.contraIndicacoes || 'Não informado'}</p>
            </div>
            <div class="footer">
                <span>ID: ${remedio.id}</span>
            </div>
        </div>
        
        <div class="card-direita">
             <img src="${imagemUrl}" alt="Imagem de ${remedio.nome}">
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
              saida.innerHTML = `<div class="card-feedback"><p>Remédio com ID ou Nome '${termo}' não foi encontrado.</p></div>`;
              return;
      }

      const remedio = await response.json();

      exibirResultados(remedio);
    } catch (error) {
          console.error("Erro ao buscar remédio:", error);
          saida.innerHTML = `<div class="card-feedback"><p>Não foi possível conectar à API. Tente novamente.</p></div>`;
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
// main.js agora cuida da lógica de pesquisa e do botão adicionar 
// todo - botão remover
// api url e exibir resultados vem de utils.js
const searchInput = document.querySelector("#search");
const saida = document.getElementById("saida");

//Busca por ID ou nome
if (searchInput) {
  searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const termo = e.target.value;
      e.preventDefault();

      try {
        const response = await fetch(`${API_URL}/Medicamentos/search?termo=${termo}`);

        if (!response.ok) {
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
  });
}

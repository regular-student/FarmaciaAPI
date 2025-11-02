// Busca todos os medicamentos da API e exibe

document.addEventListener("DOMContentLoaded", async () => {
    const saida = document.getElementById("saida");
    saida.innerHTML = `<div class="card-feedback"><p>Carregando medicamentos...</p></div>`;

    try {
        const response = await fetch(`${API_URL}/`);
        
        if (!response.ok) {
            throw new Error("Falha ao carregar dados da API.");
        }

        const data = await response.json();

        exibirResultados(data);

    } catch (error) {
        console.error("Erro ao carregar medicamentos:", error);
        saida.innerHTML = `<div class="card-feedback"><p>Não foi possível conectar à API. Tente novamente.</p></div>`;
    }
});
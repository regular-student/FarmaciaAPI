const API_URL = "http://localhost:5254";

function exibirResultados(remedios) {
  const saida = document.getElementById("saida");
  saida.innerHTML = "";

  if (remedios.length === 0) {
    saida.innerHTML = `<div class="card-feedback"><p>Nenhum remédio encontrado.</p></div>`;
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
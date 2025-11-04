//protótipo post, put, delete

// Aguarda o DOM carregar e o script utils.js definir o API_URL
document.addEventListener("DOMContentLoaded", () => {
  
    const feedbackDiv = document.getElementById("saida-feedback");

    // Helper para mostrar feedback
    function mostrarFeedback(mensagem, sucesso = true) {
        feedbackDiv.textContent = mensagem;
        feedbackDiv.style.color = sucesso ? "green" : "red";
        
        // Limpa a mensagem após 3 segundos
        setTimeout(() => {
            feedbackDiv.textContent = "";
        }, 3000);
    }

    // --- Lógica para POST (Adicionar) ---
    const formAdicionar = document.getElementById("form-adicionar");
    if (formAdicionar) {
        formAdicionar.addEventListener("submit", async (e) => {
            e.preventDefault(); // Impede o envio tradicional do formulário

            const novoMedicamento = {
                nome: document.getElementById("add-nome").value,
                principioAtivo: document.getElementById("add-principioAtivo").value,
                fabricante: document.getElementById("add-fabricante").value,
                categoria: document.getElementById("add-categoria").value,
                descricao: document.getElementById("add-descricao").value,
                indicacoes: document.getElementById("add-indicacoes").value,
                contraIndicacoes: document.getElementById("add-contraIndicacoes").value,
                imagem: document.getElementById("add-imagem").value
            };

            try {
                const response = await fetch(`${API_URL}/Medicamentos`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(novoMedicamento)
                });

                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao adicionar.`);
                }

                const data = await response.json();
                mostrarFeedback(`Medicamento "${data.nome}" (ID: ${data.id}) adicionado com sucesso!`, true);
                formAdicionar.reset(); // Limpa o formulário

            } catch (error) {
                console.error("Erro no POST:", error);
                mostrarFeedback(`Falha ao adicionar medicamento. ${error.message}`, false);
            }
        });
    }

    // --- Lógica para PUT (Modificar) ---
    const formModificar = document.getElementById("form-modificar");
    if (formModificar) {
        formModificar.addEventListener("submit", async (e) => {
            e.preventDefault();

            const id = document.getElementById("mod-id").value;
            if (!id) {
                mostrarFeedback("Por favor, informe o ID do medicamento para modificar.", false);
                return;
            }

            const medicamentoAtualizado = {
                // O Id é enviado no body E na URL (embora o do body seja o principal para o bind do modelo)
                id: parseInt(id), 
                nome: document.getElementById("mod-nome").value,
                principioAtivo: document.getElementById("mod-principioAtivo").value,
                fabricante: document.getElementById("mod-fabricante").value,
                categoria: document.getElementById("mod-categoria").value,
                descricao: document.getElementById("mod-descricao").value,
                indicacoes: document.getElementById("mod-indicacoes").value,
                contraIndicacoes: document.getElementById("mod-contraIndicacoes").value,
                imagem: document.getElementById("mod-imagem").value
            };

            try {
                const response = await fetch(`${API_URL}/Medicamentos/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(medicamentoAtualizado)
                });

                if (response.status === 404) {
                     mostrarFeedback(`Medicamento com ID ${id} não encontrado.`, false);
                     return;
                }
                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao modificar.`);
                }

                const data = await response.json();
                mostrarFeedback(`Medicamento ID ${data.id} atualizado com sucesso!`, true);
                formModificar.reset();

            } catch (error) {
                console.error("Erro no PUT:", error);
                mostrarFeedback(`Falha ao modificar medicamento. ${error.message}`, false);
            }
        });
    }

    // --- Lógica para DELETE (Deletar) ---
    const formDeletar = document.getElementById("form-deletar");
    if (formDeletar) {
        formDeletar.addEventListener("submit", async (e) => {
            e.preventDefault();

            const id = document.getElementById("del-id").value;
            if (!id) {
                mostrarFeedback("Por favor, informe o ID para deletar.", false);
                return;
            }
            
            // Confirmação simples
            if (!confirm(`Tem certeza que deseja deletar o medicamento com ID ${id}?`)) {
                return;
            }

            try {
                const response = await fetch(`${API_URL}/Medicamentos/${id}`, {
                    method: "DELETE"
                });

                if (response.status === 404) {
                     mostrarFeedback(`Medicamento com ID ${id} não encontrado.`, false);
                     return;
                }
                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao deletar.`);
                }

                // DELETE retorna 204 No Content (sem corpo)
                mostrarFeedback(`Medicamento com ID ${id} deletado com sucesso!`, true);
                formDeletar.reset();

            } catch (error) {
                console.error("Erro no DELETE:", error);
                mostrarFeedback(`Falha ao deletar medicamento. ${error.message}`, false);
            }
        });
    }
});
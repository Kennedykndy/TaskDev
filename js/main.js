// Importando funções do módulo DOM
import {
  obterTextoTarefa,
  limparInput,
  renderizarTarefas,
  exibirMensagem,
  exibirDica,
} from "./dom.js";

// Importando funções do módulo Tarefas
import { validarTarefa, adicionarTarefa, obterTarefas } from "./tarefas.js";

// Importando função para buscar dica
import { buscarDica } from "./api.js";

// Selecionar o formulário para adicionar um evento de submit
const form = document.querySelector("#form-tarefa");

// Variável do timeout
let timeoutMensagem;

// Função para iniciar a aplicação, buscando uma dica e exibindo-a
async function iniciarAplicacao() {
  const dica = await buscarDica();
  exibirDica(dica);
}

// Evento de submit para adicionar uma nova Tarefa
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = obterTextoTarefa();
  const resultado = validarTarefa(texto);

  if (!resultado.valida) {
    exibirMensagem(resultado.mensagem, "erro");
    return;
  }

  adicionarTarefa(texto);
  renderizarTarefas(obterTarefas());
  exibirMensagem("Tarefa adicionada com sucesso!", "sucesso");

  // Remove timeout antigo
  clearTimeout(timeoutMensagem);

  // Remove a mensagem depois de 5 segundos
  timeoutMensagem = setTimeout(() => {
    const mensagem = document.querySelector("#mensagem");

    if (mensagem) {
      mensagem.style.display = "none";
    }
  }, 5000);
  limparInput();
});

// Iniciar a aplicação ao carregar a página
iniciarAplicacao();

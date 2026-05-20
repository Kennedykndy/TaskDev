// dom.js
export function obterTextoTarefa() {
  const input = document.querySelector("#input-tarefa");
  return input.value;
}

// Função para limpar o campo do input após adicionar uma tarefa
export function limparInput() {
  const input = document.querySelector("#input-tarefa");
  input.value = "";
  input.focus();
}

// Função para renderizar a lista de tarefas no DOM
export function renderizarTarefas(tarefas) {
  const lista = document.querySelector("#lista-tarefas");

  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = tarefa.texto;

    // Se concluída
    if (tarefa.concluida) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    // Botão concluir
    const botaoConcluir = document.createElement("button");
    botaoConcluir.textContent = "✅";

    botaoConcluir.addEventListener("click", () => {
      tarefa.concluida = !tarefa.concluida;
      renderizarTarefas(tarefas);
    });

    // Botão excluir
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "❌";

    botaoExcluir.addEventListener("click", () => {
      tarefas.splice(index, 1);
      renderizarTarefas(tarefas);
    });

    li.appendChild(span);
    li.appendChild(botaoConcluir);
    li.appendChild(botaoExcluir);

    lista.appendChild(li);
  });
}

// Função para exibir mensagens de validação ou sucesso para o usuário
export function exibirMensagem(mensagem, tipo) {
  let areaMensagem = document.querySelector("#mensagem");

  if (!areaMensagem) {
    areaMensagem = document.createElement("p");
    areaMensagem.id = "mensagem";
    document.body.insertBefore(
      areaMensagem,
      document.querySelector("#lista-tarefas"),
    );
  }

  areaMensagem.textContent = mensagem;
  areaMensagem.style.display = "block";

  if (tipo === "erro") {
    areaMensagem.style.color = "red";
  } else {
    areaMensagem.style.color = "green";
  }
}

// Função exibir dados da API

export function exibirDica(dica) {
  let areaDica = document.querySelector("#dica");

  if (!areaDica) {
    areaDica = document.createElement("p");
    areaDica.id = "dica";
    document.body.appendChild(areaDica);
  }

  if (dica) {
    areaDica.textContent = `💡 Dica do dia: ${dica}`;
  } else {
    areaDica.textContent = ` ⚠️ Não foi possível carregar a dica.`;
  }
}

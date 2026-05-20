const loginContainer = document.querySelector("#login-container");
const app = document.querySelector("#app");
const formLogin = document.querySelector("#form-login");
const mensagem = document.querySelector("#login-mensagem");
const btnSair = document.querySelector("#btn-sair");
const toggleTexto = document.querySelector("#toggle-texto");
const toggleBotao = document.querySelector("#toggle-botao");
const titulo = document.querySelector("#login-titulo");
const subtitulo = document.querySelector("#login-subtitulo");
const botaoSubmit = formLogin.querySelector("button");
let modoCadastro = false;

// Verifica login salvo
const usuarioLogado = localStorage.getItem("taskdev_usuario");
if (usuarioLogado) {
  mostrarApp();
}

// Alternar entre login e cadastro
toggleBotao.addEventListener("click", () => {
  modoCadastro = !modoCadastro;
  const campoEmail = document.querySelector("#email");

  if (modoCadastro) {
    titulo.textContent = "Criar Conta";
    subtitulo.textContent = "Cadastre-se para usar o TaskDev";
    toggleTexto.textContent = "Já possui conta?";
    toggleBotao.textContent = "Entrar";
    botaoSubmit.textContent = "Criar conta";
    campoEmail.style.display = "block";
  } else {
    titulo.textContent = "TaskDev";
    subtitulo.textContent = "Entre para acessar suas tarefas";
    toggleTexto.textContent = "Não possui conta?";
    toggleBotao.textContent = "Criar conta";
    botaoSubmit.textContent = "Entrar";
    campoEmail.style.display = "none";
  }

  mensagem.textContent = "";
});

// Esconde email inicialmente
document.querySelector("#email").style.display = "none";

// SUBMIT
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const usuario = document.querySelector("#usuario").value.trim();
  const email = document.querySelector("#email").value.trim();
  const senha = document.querySelector("#senha").value.trim();
  const usuarios = JSON.parse(localStorage.getItem("taskdev_usuarios")) || [];

  // =========================
  // CADASTRO
  // =========================
  if (modoCadastro) {
    // VALIDAR USUÁRIO
    if (usuario.length < 3) {
      mensagem.textContent = "Usuário deve ter no mínimo 3 caracteres.";
      return;
    }

    // VALIDAR EMAIL
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      mensagem.textContent = "Digite um email válido.";
      return;
    }

    // VALIDAR SENHA
    if (senha.length < 6) {
      mensagem.textContent = "A senha deve ter no mínimo 6 caracteres.";
      return;
    }

    // USUÁRIO EXISTE
    const usuarioExiste = usuarios.find(
      (user) => user.usuario === usuario || user.email === email,
    );

    if (usuarioExiste) {
      mensagem.textContent = "Usuário ou email já cadastrados.";
      return;
    }

    // SALVAR USUÁRIO
    usuarios.push({
      usuario,
      email,
      senha,
    });

    localStorage.setItem("taskdev_usuarios", JSON.stringify(usuarios));

    mensagem.style.color = "green";
    mensagem.textContent = "Conta criada com sucesso!";
    setTimeout(() => {
      modoCadastro = false;
      titulo.textContent = "TaskDev";
      subtitulo.textContent = "Entre para acessar suas tarefas";
      toggleTexto.textContent = "Não possui conta?";
      toggleBotao.textContent = "Criar conta";
      botaoSubmit.textContent = "Entrar";
      document.querySelector("#email").style.display = "none";
      mensagem.style.color = "red";
      mensagem.textContent = "";
    }, 2000);

    return;
  }

  /* =================
       LOGIN
  =================== */
  const usuarioValido = usuarios.find(
    (user) => user.usuario === usuario && user.senha === senha,
  );

  if (!usuarioValido) {
    mensagem.textContent = "Usuário ou senha inválidos.";
    return;
  }

  localStorage.setItem("taskdev_usuario", usuario);

  mostrarApp();
});

// SAIR
btnSair.addEventListener("click", function () {
  localStorage.removeItem("taskdev_usuario");
  app.style.display = "none";
  loginContainer.style.display = "flex";
});

// MOSTRAR APP
function mostrarApp() {
  loginContainer.style.display = "none";
  app.style.display = "block";
}

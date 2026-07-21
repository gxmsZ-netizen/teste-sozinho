// script.js — Mural de Turmas — Family Academy

// 1) Contador automático de turmas
function atualizarContador() {
  const turmas = document.querySelectorAll("ul li");
  const contador = document.getElementById("contador");
  contador.textContent = `Total: ${turmas.length} turmas`;
}

// 2) Botão de modo escuro
function alternarModoEscuro() {
  document.body.classList.toggle("modo-escuro");
}

// Roda quando a página termina de carregar
document.addEventListener("DOMContentLoaded", () => {
  atualizarContador();

  const botao = document.getElementById("botao-modo-escuro");
  botao.addEventListener("click", alternarModoEscuro);
});
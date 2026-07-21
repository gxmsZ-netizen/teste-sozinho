// script.js

function atualizarContador() {
  const turmas = document.querySelectorAll("#lista-turmas li");
  const contador = document.getElementById("contador");
  contador.textContent = `Total: ${turmas.length} turmas`;
}

function alternarModoEscuro() {
  document.body.classList.toggle("modo-escuro");
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarContador();
  document
    .getElementById("botao-modo-escuro")
    .addEventListener("click", alternarModoEscuro);
});
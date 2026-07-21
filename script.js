// script.js

function atualizarContador() {
  const turmas = document.querySelectorAll("#lista-turmas li");
  const contador = document.getElementById("contador");
  contador.textContent = `Total: ${turmas.length} turmas`;
}

function alternarModoEscuro() {
  document.body.classList.toggle("modo-escuro");
}

function alternarPainel(mostrar) {
  const painel = document.getElementById("form-turma");
  painel.classList.toggle("escondido", !mostrar);
}

function adicionarTurma(curso, professor, dia) {
  const lista = document.getElementById("lista-turmas");

  const item = document.createElement("li");

  const spanCurso = document.createElement("span");
  spanCurso.className = "curso";
  spanCurso.textContent = curso;

  const spanInfo = document.createElement("span");
  spanInfo.className = "info";
  spanInfo.textContent = `Prof(a). ${professor} · ${dia}`;

  item.appendChild(spanCurso);
  item.appendChild(spanInfo);
  lista.appendChild(item);

  atualizarContador();
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarContador();

  document
    .getElementById("botao-modo-escuro")
    .addEventListener("click", alternarModoEscuro);

  document
    .getElementById("botao-nova-turma")
    .addEventListener("click", () => alternarPainel(true));

  document
    .getElementById("botao-cancelar")
    .addEventListener("click", () => {
      alternarPainel(false);
      document.getElementById("form-turma").reset();
    });

  document
    .getElementById("form-turma")
    .addEventListener("submit", (evento) => {
      evento.preventDefault();

      const curso = document.getElementById("input-curso").value.trim();
      const professor = document.getElementById("input-professor").value.trim();
      const dia = document.getElementById("input-dia").value;

      adicionarTurma(curso, professor, dia);

      evento.target.reset();
      alternarPainel(false);
    });
});
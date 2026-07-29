// script.js

function atualizarContador() {
  const turmas = document.querySelectorAll("#lista-turmas li");
  document.getElementById("contador").textContent = `Total: ${turmas.length} turmas`;
}

function atualizarContadorProfessores() {
  const professores = document.querySelectorAll("#lista-professores li");
  document.getElementById("contador-professores").textContent = `Total: ${professores.length} professores`;
}

function alternarModoEscuro() {
  document.body.classList.toggle("modo-escuro");
}

function alternarPainel(idPainel, mostrar) {
  document.getElementById(idPainel).classList.toggle("escondido", !mostrar);
}

// Navegação entre seções (Turmas / Professores)
function configurarNavegacao() {
  const itens = document.querySelectorAll(".item-menu");
  itens.forEach((item) => {
    item.addEventListener("click", () => {
      itens.forEach((i) => i.classList.remove("ativo"));
      item.classList.add("ativo");

      document.querySelectorAll(".secao").forEach((secao) => secao.classList.remove("ativa"));
      document.getElementById(item.dataset.secao).classList.add("ativa");
    });
  });
}

// Máscara de valor monetário: usuário digita só números,
// o campo formata sozinho como "R$ 215,00".
function aplicarMascaraValor(input) {
  let digitos = input.value.replace(/\D/g, "");
  if (digitos === "") {
    input.value = "";
    return;
  }
  digitos = digitos.padStart(3, "0");
  const centavos = digitos.slice(-2);
  const reais = digitos.slice(0, -2).replace(/^0+(?=\d)/, "");
  const reaisFormatado = reais.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  input.value = `R$ ${reaisFormatado},${centavos}`;
}

function atualizarCobranca() {
  const gratuita = document.querySelector('input[name="cobranca"]:checked').value === "gratuita";
  const blocoValor = document.getElementById("bloco-valor");
  const inputValor = document.getElementById("input-valor");

  blocoValor.classList.toggle("desativado", gratuita);
  inputValor.disabled = gratuita;
  if (gratuita) {
    inputValor.value = "";
  }
}

function configurarDiasHorarios() {
  document.querySelectorAll(".linha-dia").forEach((linha) => {
    const checkbox = linha.querySelector(".check-dia");
    const horario = linha.querySelector(".horario-dia");

    checkbox.addEventListener("change", () => {
      horario.disabled = !checkbox.checked;
      if (!checkbox.checked) {
        horario.value = "";
      }
    });
  });
}

function coletarDiasHorarios() {
  const partes = [];
  document.querySelectorAll(".linha-dia").forEach((linha) => {
    const checkbox = linha.querySelector(".check-dia");
    const horario = linha.querySelector(".horario-dia");
    if (checkbox.checked && horario.value) {
      partes.push(`${checkbox.dataset.dia} ${horario.value}`);
    }
  });
  return partes.join(", ");
}

function criarCard(lista, titulo, info) {
  const item = document.createElement("li");

  const spanTitulo = document.createElement("span");
  spanTitulo.className = "curso";
  spanTitulo.textContent = titulo;

  const spanInfo = document.createElement("span");
  spanInfo.className = "info";
  spanInfo.textContent = info;

  item.appendChild(spanTitulo);
  item.appendChild(spanInfo);
  lista.appendChild(item);
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarContador();
  atualizarContadorProfessores();
  configurarDiasHorarios();
  configurarNavegacao();

  document
    .getElementById("botao-modo-escuro")
    .addEventListener("click", alternarModoEscuro);

  // --- Turmas ---
  document
    .getElementById("botao-nova-turma")
    .addEventListener("click", () => alternarPainel("form-turma", true));

  document
    .getElementById("botao-cancelar")
    .addEventListener("click", () => {
      alternarPainel("form-turma", false);
      document.getElementById("form-turma").reset();
      atualizarCobranca();
    });

  document
    .getElementById("input-valor")
    .addEventListener("input", (evento) => aplicarMascaraValor(evento.target));

  document
    .querySelectorAll('input[name="cobranca"]')
    .forEach((radio) => radio.addEventListener("change", atualizarCobranca));

  document
    .getElementById("form-turma")
    .addEventListener("submit", (evento) => {
      evento.preventDefault();

      const curso = document.getElementById("input-curso").value.trim();
      const professor = document.getElementById("input-professor").value.trim();
      const campus = document.getElementById("input-campus").value;
      const diasHorarios = coletarDiasHorarios() || "Dias a definir";

      const gratuita = document.querySelector('input[name="cobranca"]:checked').value === "gratuita";
      const valorTexto = gratuita
        ? "Gratuita"
        : (document.getElementById("input-valor").value || "Valor a definir");

      criarCard(
        document.getElementById("lista-turmas"),
        curso,
        `Prof(a). ${professor} · ${campus} · ${diasHorarios} · ${valorTexto}`
      );
      atualizarContador();

      evento.target.reset();
      atualizarCobranca();
      alternarPainel("form-turma", false);
    });

  // --- Professores ---
  document
    .getElementById("botao-novo-professor")
    .addEventListener("click", () => alternarPainel("form-professor", true));

  document
    .getElementById("botao-cancelar-professor")
    .addEventListener("click", () => {
      alternarPainel("form-professor", false);
      document.getElementById("form-professor").reset();
    });

  document
    .getElementById("form-professor")
    .addEventListener("submit", (evento) => {
      evento.preventDefault();

      const nome = document.getElementById("input-nome-professor").value.trim();
      const contato = document.getElementById("input-contato-professor").value.trim();
      const area = document.getElementById("input-area-professor").value.trim();

      criarCard(
        document.getElementById("lista-professores"),
        nome,
        `${area} · ${contato}`
      );
      atualizarContadorProfessores();

      evento.target.reset();
      alternarPainel("form-professor", false);
    });
});
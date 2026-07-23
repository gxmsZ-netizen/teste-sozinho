/* =========================================================
   FAMILY ACADEMY — script.js
   Estrutura:
   1. Dados (as turmas iniciais)
   2. Referências aos elementos do HTML
   3. Renderização (transformar dados em HTML)
   4. Cadastro de turma (formulário)
   5. Remoção de turma
   6. Modo escuro
   ========================================================= */


/* ---------- 1. DADOS ---------- */
/* A "fonte da verdade" da aplicação: um array de objetos.
   A tela é sempre um reflexo deste array — nunca editamos o HTML na mão. */

let turmas = [
  {
    id: 1,
    nome: "Cordas e Sopros — Iniciante",
    professor: "Mateus Andrade",
    modalidade: "musica",
    horario: "Ter e Qui, 18h30",
    vagas: 16
  },
  {
    id: 2,
    nome: "Guarda Aberta — Adulto",
    professor: "Rafael Bittencourt",
    modalidade: "jiujitsu",
    horario: "Seg, Qua e Sex, 20h",
    vagas: 24
  },
  {
    id: 3,
    nome: "Ritmos Brasileiros",
    professor: "Camila Nogueira",
    modalidade: "danca",
    horario: "Sáb, 10h",
    vagas: 30
  }
];

/* Tabela de apoio: converte o código interno da modalidade
   no rótulo que aparece na tela e na variável CSS da cor. */
const MODALIDADES = {
  musica:   { rotulo: "Música",    cor: "var(--cor-musica)"   },
  jiujitsu: { rotulo: "Jiu-Jitsu", cor: "var(--cor-jiujitsu)" },
  danca:    { rotulo: "Dança",     cor: "var(--cor-danca)"    }
};


/* ---------- 2. ELEMENTOS DO HTML ---------- */
/* Buscamos cada elemento uma única vez e guardamos em constantes. */

const listaTurmas = document.getElementById("lista-turmas");
const contador    = document.getElementById("contador-turmas");
const form        = document.getElementById("form-turma");
const aviso       = document.getElementById("aviso-form");
const btnTema     = document.getElementById("btn-tema");


/* ---------- 3. RENDERIZAÇÃO ---------- */

function renderizarTurmas() {
  // Limpa o painel antes de redesenhar
  listaTurmas.innerHTML = "";

  contador.textContent = turmas.length === 1
    ? "1 turma"
    : `${turmas.length} turmas`;

  if (turmas.length === 0) {
    listaTurmas.innerHTML =
      `<p class="vazio">Nenhuma turma cadastrada. Use o formulário abaixo para criar a primeira.</p>`;
    return;
  }

  // Para cada turma do array, monta um card e coloca na tela
  turmas.forEach(function (turma) {
    const info = MODALIDADES[turma.modalidade];

    const card = document.createElement("article");
    card.className = "card";
    card.style.setProperty("--cor-card", info.cor);

    card.innerHTML = `
      <button class="card__remover" data-id="${turma.id}"
              aria-label="Remover turma ${turma.nome}">&times;</button>
      <p class="card__modalidade">${info.rotulo}</p>
      <h3 class="card__nome">${turma.nome}</h3>
      <div class="card__linha">
        <span class="card__rotulo">Professor(a)</span>
        <span class="card__valor">${turma.professor}</span>
      </div>
      <div class="card__linha">
        <span class="card__rotulo">Horário</span>
        <span class="card__valor">${turma.horario}</span>
      </div>
      <div class="card__linha">
        <span class="card__rotulo">Vagas</span>
        <span class="card__valor">${turma.vagas}</span>
      </div>
    `;

    listaTurmas.appendChild(card);
  });
}


/* ---------- 4. CADASTRO ---------- */

form.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede o recarregamento padrão da página

  const campos = ["nome", "professor", "modalidade", "horario", "vagas"];
  let temErro = false;

  campos.forEach(function (idCampo) {
    const elemento = document.getElementById(idCampo);
    const vazio = elemento.value.trim() === "";
    elemento.classList.toggle("invalido", vazio);
    if (vazio) temErro = true;
  });

  if (temErro) {
    mostrarAviso("Preencha todos os campos para cadastrar a turma.", "erro");
    return;
  }

  const novaTurma = {
    id: Date.now(), // número único baseado no relógio
    nome:       document.getElementById("nome").value.trim(),
    professor:  document.getElementById("professor").value.trim(),
    modalidade: document.getElementById("modalidade").value,
    horario:    document.getElementById("horario").value.trim(),
    vagas:      Number(document.getElementById("vagas").value)
  };

  turmas.push(novaTurma);   // 1. altera os dados
  renderizarTurmas();       // 2. redesenha a tela
  form.reset();             // 3. limpa o formulário

  mostrarAviso(`Turma "${novaTurma.nome}" cadastrada.`, "sucesso");
});


function mostrarAviso(texto, tipo) {
  aviso.textContent = texto;
  aviso.className = "aviso aviso--" + tipo;
}


/* ---------- 5. REMOÇÃO ---------- */
/* Os botões de remover são criados depois do carregamento da página,
   então escutamos o clique no container (delegação de eventos). */

listaTurmas.addEventListener("click", function (evento) {
  const botao = evento.target.closest(".card__remover");
  if (!botao) return;

  const id = Number(botao.dataset.id);
  turmas = turmas.filter(function (turma) {
    return turma.id !== id;
  });

  renderizarTurmas();
  mostrarAviso("Turma removida.", "sucesso");
});


/* ---------- 6. MODO ESCURO ---------- */
/* Toda a troca de cores está no CSS. Aqui só alternamos o atributo. */

btnTema.addEventListener("click", function () {
  const atual = document.documentElement.getAttribute("data-tema");
  const novo = atual === "escuro" ? "claro" : "escuro";

  document.documentElement.setAttribute("data-tema", novo);
  btnTema.setAttribute("aria-pressed", novo === "escuro");
  btnTema.querySelector(".btn-tema__texto").textContent =
    novo === "escuro" ? "Modo claro" : "Modo escuro";
});


/* ---------- INICIALIZAÇÃO ---------- */
renderizarTurmas();
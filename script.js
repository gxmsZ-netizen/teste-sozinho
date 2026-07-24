/* =========================================================
   FAMILY ACADEMY — script.js
   Estrutura:
   1. Dados (as turmas)
   2. Referências aos elementos do HTML
   3. Função auxiliar de normalização de texto
   4. Renderização (transformar dados em HTML)
   5. Busca / filtro
   6. Cadastro de turma (formulário)
   7. Remoção de turma
   8. Modo escuro
   ========================================================= */


/* ---------- 1. DADOS ---------- */
/* A "fonte da verdade" da aplicação: um ARRAY DE OBJETOS.
   - array  = lista ordenada, entre colchetes [ ]
   - objeto = conjunto de pares nome/valor, entre chaves { }
   A tela é sempre um reflexo deste array. Para mudar o que
   aparece na página, mexa AQUI e em nenhum outro lugar. */

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
  },
  // >>> NOVO: 4ª turma
  {
    id: 4,
    nome: "Canto Coral",
    professor: "Beatriz Lemos",
    modalidade: "musica",
    horario: "Qui, 19h",
    vagas: 20
  }

  // >>> SUA VEZ: cole aqui o objeto da 5ª turma.
  //     Atenção: coloque uma vírgula no fim da linha acima ( } , )
  //     antes de colar, senão o JavaScript quebra.
];

/* Tabela de apoio: converte o código interno da modalidade
   no rótulo que aparece na tela e na variável CSS da cor. */
const MODALIDADES = {
  musica:   { rotulo: "Música",    cor: "var(--cor-musica)"   },
  jiujitsu: { rotulo: "Jiu-Jitsu", cor: "var(--cor-jiujitsu)" },
  danca:    { rotulo: "Dança",     cor: "var(--cor-danca)"    }
};


/* ---------- 2. ELEMENTOS DO HTML ---------- */

const listaTurmas = document.getElementById("lista-turmas");
const contador    = document.getElementById("contador-turmas");
const form        = document.getElementById("form-turma");
const aviso       = document.getElementById("aviso-form");
const btnTema     = document.getElementById("btn-tema");
const campoBusca  = document.getElementById("campo-busca"); // >>> NOVO


/* ---------- 3. NORMALIZAÇÃO DE TEXTO ---------- */
/* >>> NOVO
   Deixa o texto "comparável": tudo minúsculo e sem acento.
   Assim "Dança", "danca" e "DANÇA" viram todos "danca",
   e a busca encontra a turma mesmo sem o usuário digitar o ç. */

function normalizar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")                  // separa a letra do acento
    .replace(/[\u0300-\u036f]/g, "")   // apaga os acentos soltos
    .trim();                           // remove espaços das pontas
}


/* ---------- 4. RENDERIZAÇÃO ---------- */
/* >>> ALTERADO: a função agora recebe a lista que deve desenhar.
   O "= turmas" é um PARÂMETRO PADRÃO: se você chamar
   renderizarTurmas() sem argumento, ela usa o array completo. */

function renderizarTurmas(lista = turmas) {
  listaTurmas.innerHTML = "";

  contador.textContent = lista.length === 1
    ? "1 turma"
    : `${lista.length} turmas`;

  if (lista.length === 0) {
    // >>> NOVO: duas mensagens diferentes para duas situações diferentes.
    const buscando = campoBusca.value.trim() !== "";

    listaTurmas.innerHTML = buscando
      ? `<p class="vazio">Nenhuma turma encontrada para essa busca.
           Tente outro curso, professor ou dia.</p>`
      : `<p class="vazio">Nenhuma turma cadastrada.
           Use o formulário abaixo para criar a primeira.</p>`;
    return;
  }

  lista.forEach(function (turma) {
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


/* ---------- 5. BUSCA ---------- */
/* >>> NOVO
   aplicarFiltro() lê o campo de busca, monta a lista filtrada
   e manda desenhar. Usamos ela no lugar de renderizarTurmas()
   em todo o resto do código, para que a busca ativa continue
   valendo depois de cadastrar ou remover uma turma. */

function aplicarFiltro() {
  const termo = normalizar(campoBusca.value);

  const filtradas = turmas.filter(function (turma) {
    const modalidade = MODALIDADES[turma.modalidade].rotulo;

    // Junta todos os campos pesquisáveis num texto só
    const textoDaTurma = normalizar(
      turma.nome + " " +
      turma.professor + " " +
      turma.horario + " " +
      modalidade
    );

    // includes() devolve true se o texto contém o termo.
    // Campo vazio => termo é "" => todas as turmas passam.
    return textoDaTurma.includes(termo);
  });

  renderizarTurmas(filtradas);
}

/* O evento "input" dispara a cada mudança do campo:
   digitar, colar com o mouse, clicar no "x" de limpar. */
campoBusca.addEventListener("input", aplicarFiltro);


/* ---------- 6. CADASTRO ---------- */

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
  aplicarFiltro();          // 2. redesenha respeitando a busca ativa
  form.reset();             // 3. limpa o formulário

  mostrarAviso(`Turma "${novaTurma.nome}" cadastrada.`, "sucesso");
});


function mostrarAviso(texto, tipo) {
  aviso.textContent = texto;
  aviso.className = "aviso aviso--" + tipo;
}


/* ---------- 7. REMOÇÃO ---------- */
/* Os botões de remover são criados depois do carregamento da página,
   então escutamos o clique no container (delegação de eventos). */

listaTurmas.addEventListener("click", function (evento) {
  const botao = evento.target.closest(".card__remover");
  if (!botao) return;

  const id = Number(botao.dataset.id);
  turmas = turmas.filter(function (turma) {
    return turma.id !== id;
  });

  aplicarFiltro(); // >>> ALTERADO: era renderizarTurmas()
  mostrarAviso("Turma removida.", "sucesso");
});


/* ---------- 8. MODO ESCURO ---------- */
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
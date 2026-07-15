# EX01 — Mural de Turmas da Family (seu primeiro projeto!)

Você vai construir, do zero, uma paginazinha web que mostra as turmas da Family Academy —
**com dados inventados** — praticando o ciclo de trabalho de verdade: branch → mudança →
commit → PR → revisão → merge. No final, você vai ter programado de verdade e o repositório
`teste-sozinho` vai contar essa história commit por commit.

**Repo:** `https://github.com/gxmsZ-netizen/teste-sozinho`

## As regras do jogo

1. **Uma etapa por vez, na ordem.** Cada etapa termina num Pull Request.
2. **Toda mudança nasce numa branch.** Aqui e na Family, ninguém trabalha direto na `main`.
3. **IA é sua professora**: pode e DEVE pedir explicação de tudo. Mas **digite o código
   você mesmo** (nada de copiar-colar bloco inteiro) e lembre da regra de ouro:
   *só entregue o que você consegue explicar*.
4. **Dados sempre inventados.** Nomes de professor, telefone, turma: tudo de mentira.
5. **A descrição de cada PR é sua**: 2-3 frases com suas palavras — o que fez e por quê.
6. Travou por 30 minutos? Chama o Lucas O. (regra dos 30 min!)

## Kit de socorro (leia antes de começar)

- `git status` é seu melhor amigo. Em dúvida sobre "onde estou? o que mudou?" → rode ele.
- Mensagem grande e assustadora no terminal ≠ desastre. Leia com calma, cole na IA e
  pergunte "o que isso quer dizer?".
- Este repositório é seu playground: **nada aqui é irrecuperável**. Pode errar sem medo.
- Nomes de branch e mensagens de commit: sem acento e sem espaço no nome da branch
  (ex.: `etapa-1-readme`). É o costume da casa.

---

## Etapa 0 — Preparar a oficina (só na primeira vez)

1. Diga ao git quem você é (aparece nos seus commits):
   ```
   git config --global user.name "SEU NOME"
   git config --global user.email "seu-email-do-github@exemplo.com"
   ```
   (use o MESMO e-mail da sua conta GitHub)
2. Clone o repositório (traz uma cópia pro seu computador):
   ```
   git clone https://github.com/gxmsZ-netizen/teste-sozinho.git
   cd teste-sozinho
   ```
3. Abra a pasta no VS Code e rode `git status`. Deve dizer que está tudo limpo
   ("nothing to commit, working tree clean").

✅ Pronto quando: o projeto abre no VS Code e o `git status` está limpo.

---

## Etapa 1 — Cartão de visitas (treina o ciclo completo)

A mudança é simples de propósito: o objetivo desta etapa é o **caminho**, não o conteúdo.

1. Crie uma branch e entre nela:
   ```
   git checkout -b etapa-1-readme
   ```
2. Edite o `readme.md` para ficar assim (com suas palavras!):
   - Um título: `# Mural de Turmas — projeto de treino`
   - Quem é você (2-3 linhas)
   - O que é este projeto (que você está aprendendo git e programação)
   - Um checklist das etapas deste exercício (pode copiar os títulos daqui)
3. Salve e rode `git status` — veja o arquivo aparecer em vermelho (modificado).
4. Prepare e fotografe a mudança:
   ```
   git add readme.md
   git commit -m "Apresenta o projeto no readme"
   ```
5. Envie a branch pro GitHub:
   ```
   git push -u origin etapa-1-readme
   ```
6. Abra o link que o terminal mostrar (ou vá no GitHub) e crie o **Pull Request**.
   Escreva a descrição com suas palavras. Peça revisão ao Lucas O.
7. Depois do OK dele, clique em **Merge**. Sua mudança entrou na `main`! 🎉
8. De volta no terminal, atualize sua cópia local:
   ```
   git checkout main
   git pull
   ```

✅ Pronto quando: PR mergeado e `main` local atualizada.
🤖 Com a IA: peça "me explica o que cada um desses comandos git fez, um por um".

---

## Etapa 2 — A página existe!

1. Nova branch: `git checkout -b etapa-2-pagina` (percebeu o padrão?)
2. Crie um arquivo `index.html` com uma página simples contendo:
   - Um título grande: "Mural de Turmas — Family Academy"
   - Uma lista com **3 turmas inventadas**, cada uma com: nome do curso, professor(a)
     e dia da semana. Ex.: "Violão Iniciante — Prof. Zé das Cordas — Terça"
3. **Veja funcionando**: dê dois cliques no `index.html` — ele abre no navegador.
   Isso que você está vendo É um site (rodando só na sua máquina).
4. Ciclo de sempre: `git status` → `add` → `commit` → `push` → PR → revisão → merge → 
   `checkout main` → `pull`.

✅ Pronto quando: a página abre no navegador mostrando as 3 turmas, e o PR foi mergeado.
🤖 Com a IA: "me explica o que é HTML e o que cada tag desse meu arquivo faz."
⚠️ Sem IA fazer o arquivo inteiro por você — peça a estrutura mínima, digite e vá
ajustando. O objetivo é sua mão passar por cada linha.

---

## Etapa 3 — Deixar bonito

1. Branch `etapa-3-estilo`.
2. Crie um `estilo.css` e conecte no HTML (a IA te mostra como). Estilize:
   - Uma cor de fundo e uma fonte melhor
   - As turmas como "cartões" (caixinhas com borda/sombra)
   - Capriche a gosto — é seu!
3. Recarregue o navegador a cada mudança e veja o efeito na hora.
4. Ciclo de sempre até o merge.

✅ Pronto quando: a página tem cara de página, e você sabe apontar qual regra do CSS
faz o quê.

---

## Etapa 4 — Programar de verdade 🚀

Agora entra a lógica. Duas mini-funcionalidades:

1. Branch `etapa-4-javascript`.
2. Crie um `script.js` conectado ao HTML. Nele:
   - **Contador automático**: o script conta quantas turmas existem na lista e escreve
     na página "Total: X turmas". (Se amanhã você adicionar uma turma no HTML, o número
     muda sozinho — isso é programação!)
   - **Botão de modo escuro**: um botão que, ao ser clicado, escurece a página
     (e volta ao normal no segundo clique).
3. Teste no navegador: adicione uma 4ª turma de mentira no HTML e veja o contador mudar
   sozinho. Depois desfaça (deixe 3 — a 4ª chega na Etapa 5...).
4. Ciclo de sempre até o merge.

✅ Pronto quando: contador funciona, botão funciona, e você consegue explicar o script
linha por linha pro Lucas O. (ele VAI pedir — regra de ouro!).
🤖 Com a IA: "me explica o que é uma função", "o que é um evento de clique",
"por que essa linha começa com document.?"

---

## Etapa 5 — Simulação de trabalho real 🎬

Agora o fluxo completo da Family, igualzinho ao trabalho de verdade:

1. O Lucas O. vai abrir uma **Issue** no seu repositório com um pedido de mudança
   (como se fosse uma demanda de usuário).
2. Seu trabalho, sozinho:
   - Ler a issue e entender o "pronto" (DoD) descrito nela
   - Se algo estiver ambíguo, **perguntar na própria issue** (comentário) antes de fazer
   - Branch → mudança → testes no navegador → PR
   - Na descrição do PR, escreva `Closes #1` (o número da issue) — ao mergear, a issue
     fecha sozinha ✨
   - Revisão do Lucas O. → ajustes se ele pedir → merge
3. Comemore. Você acabou de executar o ciclo profissional inteiro.

✅ Pronto quando: issue fechada pelo merge do seu PR.

---

## E depois?

Ideias pra continuar brincando no seu repo (sem pressa, quando a fila estiver vazia):
um campo de busca que filtra as turmas, uma foto pra cada curso, uma página nova
"Sobre mim". Cada uma sempre com branch + PR — agora é hábito.

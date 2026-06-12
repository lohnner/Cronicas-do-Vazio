const botoes = document.querySelectorAll(".aba-botao");
const paineis = document.querySelectorAll(".painel-aba");

const modalNome = document.getElementById("modalNome");
const formNome = document.getElementById("formNome");
const inputNome = document.getElementById("inputNome");
const nomeJogador = document.getElementById("nomeJogador");
const idConta = document.getElementById("idConta");
const dataIngresso = document.getElementById("dataIngresso");

const abrirSeletorPerfil = document.getElementById("abrirSeletorPerfil");
const modalAvatar = document.getElementById("modalAvatar");
const fecharModalAvatar = document.getElementById("fecharModalAvatar");
const imagemPerfil = document.getElementById("imagemPerfil");
const opcoesAvatar = document.querySelectorAll(".opcao-avatar");

const modalViagem = document.getElementById("modalViagem");
const cancelarViagem = document.getElementById("cancelarViagem");
const confirmarViagem = document.getElementById("confirmarViagem");
const tituloModalViagem = document.getElementById("tituloModalViagem");
const descricaoModalViagem = document.getElementById("descricaoModalViagem");
const resumoTempoViagem = document.getElementById("resumoTempoViagem");
const resumoCombustivelViagem = document.getElementById("resumoCombustivelViagem");
const resumoUsoViagem = document.getElementById("resumoUsoViagem");

const imagemPlanetaAtual = document.getElementById("imagemPlanetaAtual");
const imagemPlanetaDetalhes = document.getElementById("imagemPlanetaDetalhes");
const tituloPlanetaDetalhes = document.getElementById("tituloPlanetaDetalhes");
const planetaTemperatura = document.getElementById("planetaTemperatura");
const planetaClima = document.getElementById("planetaClima");
const planetaAtmosfera = document.getElementById("planetaAtmosfera");
const planetaGravidade = document.getElementById("planetaGravidade");
const planetaCondicao = document.getElementById("planetaCondicao");
const creditosJogador = document.getElementById("creditosJogador");
const creditosTopoPerfil = document.getElementById("creditosTopoPerfil");
const nomePlanetaLocalizacao = document.getElementById("nomePlanetaLocalizacao");
const textoViagem = document.getElementById("textoViagem");
const tempoViagem = document.getElementById("tempoViagem");
const barraViagemPreenchida = document.getElementById("barraViagemPreenchida");
const cardsPlaneta = document.querySelectorAll(".card-planeta");

const CHAVE_CONTA = "cronicas_do_vazio_conta";
const CHAVE_CONTADOR = "cronicas_do_vazio_contador_contas";
const CHAVE_AVATAR = "cronicas_do_vazio_avatar";
const CHAVE_PLANETA = "cronicas_do_vazio_planeta_atual";
const CHAVE_CREDITOS = "cronicas_do_vazio_creditos";

const IMAGEM_TERRA = "imagens/local/sistemasolar/sistemasolarlocalplanetaterra.png";
const IMAGEM_MARTE = "imagens/local/sistemasolar/sistemasolarlocalplanetamarte.png";
const IMAGEM_VIAJANDO = "imagens/utilitarios/localizacaoviajando.png";

let destinoSelecionado = null;
let viagemEmAndamento = false;
let timerViagem = null;

const PLANETAS = {
  Terra: {
    imagem: IMAGEM_TERRA,
    imagemInterna: "imagens/local/sistemasolar/sistemasolarlocalplanetaterradentro.png",
    tempo: 8,
    temperatura: "15 °C",
    clima: "Variado",
    atmosfera: "Nitrogênio e oxigênio",
    gravidade: "1,00 g",
    condicao: "Habitável"
  },
  Marte: {
    imagem: IMAGEM_MARTE,
    imagemInterna: "imagens/local/sistemasolar/sistemasolarlocalplanetamartedentro.png",
    tempo: 8,
    temperatura: "-63 °C",
    clima: "Frio e seco",
    atmosfera: "Dióxido de carbono",
    gravidade: "0,38 g",
    condicao: "Hostil"
  }
};

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoes.forEach((item) => item.classList.remove("ativo"));
    paineis.forEach((painel) => painel.classList.remove("ativo"));

    botao.classList.add("ativo");
    document.getElementById(botao.dataset.aba).classList.add("ativo");
  });
});

function formatarNumeroConta(numero) {
  return String(numero).padStart(4, "0");
}

function formatarData(dataISO) {
  return new Date(dataISO).toLocaleDateString("pt-BR");
}

function obterConta() {
  const contaSalva = localStorage.getItem(CHAVE_CONTA);
  return contaSalva ? JSON.parse(contaSalva) : null;
}

function salvarConta(conta) {
  localStorage.setItem(CHAVE_CONTA, JSON.stringify(conta));
}

function aplicarConta(conta) {
  nomeJogador.textContent = conta.nome;
  idConta.textContent = `#${conta.id}`;
  dataIngresso.textContent = formatarData(conta.criadoEm);

  const linhaPlaneta = [...document.querySelectorAll(".dado-linha")]
    .find((linha) => linha.querySelector(".dado-label")?.textContent.trim() === "Planeta");

  if (linhaPlaneta) {
    linhaPlaneta.querySelector("strong").textContent = conta.planeta || "Terra";
  }
}

function carregarConta() {
  const conta = obterConta();

  if (!conta) {
    modalNome.classList.add("ativo");
    setTimeout(() => inputNome.focus(), 100);
    return;
  }

  if (!conta.planeta) {
    conta.planeta = localStorage.getItem(CHAVE_PLANETA) || "Terra";
    salvarConta(conta);
  }

  aplicarConta(conta);
  modalNome.classList.remove("ativo");
}

formNome.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = inputNome.value.trim();
  if (!nome) return;

  const contador = Number(localStorage.getItem(CHAVE_CONTADOR) || "0") + 1;

  const conta = {
    nome,
    id: formatarNumeroConta(contador),
    criadoEm: new Date().toISOString(),
    planeta: "Terra"
  };

  localStorage.setItem(CHAVE_CONTADOR, String(contador));
  localStorage.setItem(CHAVE_PLANETA, "Terra");
  localStorage.setItem(CHAVE_CREDITOS, "100");
  salvarConta(conta);

  aplicarConta(conta);
  modalNome.classList.remove("ativo");
  inputNome.value = "";
});

function abrirModalAvatar() {
  modalAvatar.classList.add("ativo");
  modalAvatar.setAttribute("aria-hidden", "false");
}

function fecharModalDeAvatar() {
  modalAvatar.classList.remove("ativo");
  modalAvatar.setAttribute("aria-hidden", "true");
}

function marcarAvatarSelecionado(src) {
  opcoesAvatar.forEach((opcao) => {
    opcao.classList.toggle("ativo", opcao.dataset.avatar === src);
  });
}

abrirSeletorPerfil.addEventListener("click", abrirModalAvatar);
fecharModalAvatar.addEventListener("click", fecharModalDeAvatar);

modalAvatar.addEventListener("click", (evento) => {
  if (evento.target === modalAvatar) {
    fecharModalDeAvatar();
  }
});

opcoesAvatar.forEach((opcao) => {
  opcao.addEventListener("click", () => {
    const src = opcao.dataset.avatar;
    localStorage.setItem(CHAVE_AVATAR, src);
    imagemPerfil.src = src;
    marcarAvatarSelecionado(src);
    fecharModalDeAvatar();
  });
});

function atualizarCardsPlaneta(planetaAtual) {
  cardsPlaneta.forEach((card) => {
    card.classList.toggle("ativo", card.dataset.planeta === planetaAtual);
  });
}

function aplicarCreditosIniciais() {
  let creditos = Number(localStorage.getItem(CHAVE_CREDITOS));

  if (!Number.isFinite(creditos) || creditos < 0) {
    creditos = 100;
    localStorage.setItem(CHAVE_CREDITOS, String(creditos));
  }

  if (creditosJogador) {
    creditosJogador.textContent = String(creditos);
  }

  if (creditosTopoPerfil) {
    creditosTopoPerfil.textContent = String(creditos);
  }
}

function atualizarAbaPlaneta(planeta) {
  const dados = PLANETAS[planeta] || PLANETAS.Terra;

  if (imagemPlanetaDetalhes) {
    imagemPlanetaDetalhes.src = dados.imagemInterna;
    imagemPlanetaDetalhes.alt = `Superfície do Planeta ${planeta}`;
  }

  if (tituloPlanetaDetalhes) {
    tituloPlanetaDetalhes.textContent = `Planeta ${planeta}`;
  }

  if (planetaTemperatura) planetaTemperatura.textContent = dados.temperatura;
  if (planetaClima) planetaClima.textContent = dados.clima;
  if (planetaAtmosfera) planetaAtmosfera.textContent = dados.atmosfera;
  if (planetaGravidade) planetaGravidade.textContent = dados.gravidade;
  if (planetaCondicao) planetaCondicao.textContent = dados.condicao;
}

function mostrarPlaneta(planeta) {
  const dados = PLANETAS[planeta] || PLANETAS.Terra;

  imagemPlanetaAtual.src = dados.imagem;
  nomePlanetaLocalizacao.textContent = `Planeta ${planeta}`;
  textoViagem.textContent = "Localização atual";
  tempoViagem.textContent = planeta;
  barraViagemPreenchida.style.width = "0%";

  atualizarAbaPlaneta(planeta);
  atualizarCardsPlaneta(planeta);
}

function atualizarPlanetaDaConta(planeta) {
  const conta = obterConta();

  if (conta) {
    conta.planeta = planeta;
    salvarConta(conta);
    aplicarConta(conta);
  }

  localStorage.setItem(CHAVE_PLANETA, planeta);
}

function abrirConfirmacaoViagem(destino) {
  if (viagemEmAndamento) return;

  const planetaAtual = localStorage.getItem(CHAVE_PLANETA) || "Terra";

  if (destino === planetaAtual) {
    return;
  }

  const tempoSegundos = PLANETAS[destino]?.tempo || 8;
  const consumoCombustivel = tempoSegundos * 1;
  const consumoUso = tempoSegundos * 0.5;

  destinoSelecionado = destino;

  tituloModalViagem.textContent = `Viajar para ${destino}?`;
  descricaoModalViagem.textContent =
    `A viagem de ${planetaAtual} até ${destino} demora ${tempoSegundos} segundos.`;

  resumoTempoViagem.textContent =
    `${tempoSegundos} ${tempoSegundos === 1 ? "segundo" : "segundos"}`;

  resumoCombustivelViagem.textContent =
    `${consumoCombustivel} ${consumoCombustivel === 1 ? "unidade" : "unidades"}`;

  resumoUsoViagem.textContent =
    `${Number.isInteger(consumoUso) ? consumoUso : consumoUso.toFixed(1)} pontos`;

  modalViagem.classList.add("ativo");
  modalViagem.setAttribute("aria-hidden", "false");
}

function fecharConfirmacaoViagem() {
  modalViagem.classList.remove("ativo");
  modalViagem.setAttribute("aria-hidden", "true");
  destinoSelecionado = null;
}

function definirBloqueioCards(bloqueado) {
  cardsPlaneta.forEach((card) => {
    card.disabled = bloqueado;
  });
}

function iniciarViagem(destino) {
  if (!destino || viagemEmAndamento) return;

  viagemEmAndamento = true;
  definirBloqueioCards(true);
  fecharConfirmacaoViagem();

  const duracao = 8000;
  const inicio = performance.now();

  nomePlanetaLocalizacao.textContent = `Viajando para ${destino}`;
  imagemPlanetaAtual.src = IMAGEM_VIAJANDO;
  textoViagem.textContent = "Tempo restante";
  tempoViagem.textContent = "8s";
  barraViagemPreenchida.style.width = "0%";

  function atualizar(now) {
    const decorrido = now - inicio;
    const progresso = Math.min(decorrido / duracao, 1);
    const restante = Math.max(0, Math.ceil((duracao - decorrido) / 1000));

    barraViagemPreenchida.style.width = `${progresso * 100}%`;
    tempoViagem.textContent = `${restante}s`;

    if (progresso < 1) {
      timerViagem = requestAnimationFrame(atualizar);
      return;
    }

    viagemEmAndamento = false;
    definirBloqueioCards(false);
    atualizarPlanetaDaConta(destino);
    mostrarPlaneta(destino);
  }

  timerViagem = requestAnimationFrame(atualizar);
}

cardsPlaneta.forEach((card) => {
  card.addEventListener("click", () => {
    abrirConfirmacaoViagem(card.dataset.planeta);
  });
});

cancelarViagem.addEventListener("click", fecharConfirmacaoViagem);

confirmarViagem.addEventListener("click", () => {
  iniciarViagem(destinoSelecionado);
});

modalViagem.addEventListener("click", (evento) => {
  if (evento.target === modalViagem && !viagemEmAndamento) {
    fecharConfirmacaoViagem();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    if (modalAvatar.classList.contains("ativo")) {
      fecharModalDeAvatar();
    }

    if (modalViagem.classList.contains("ativo") && !viagemEmAndamento) {
      fecharConfirmacaoViagem();
    }
  }
});

const avatarSalvo = localStorage.getItem(CHAVE_AVATAR);
if (avatarSalvo) {
  imagemPerfil.src = avatarSalvo;
}
marcarAvatarSelecionado(avatarSalvo || imagemPerfil.getAttribute("src"));

carregarConta();
mostrarPlaneta(localStorage.getItem(CHAVE_PLANETA) || "Terra");


// ===== SELEÇÃO E EXIBIÇÃO DE NAVES =====
const itensNave = document.querySelectorAll(".item-nave");
const nomeNaveSelecionada = document.getElementById("nomeNaveSelecionada");
const imagemNaveSelecionada = document.getElementById("imagemNaveSelecionada");
const nomeNaveEquipadaPerfil = document.getElementById("nomeNaveEquipadaPerfil");
const imagemNaveEquipadaPerfil = document.getElementById("imagemNaveEquipadaPerfil");

const CHAVE_NAVE_EQUIPADA = "cronicas_do_vazio_nave_equipada";

const NAVES = {
  Pioneira: {
    nome: "Pioneira",
    imagem: "imagens/naves/pioneira.png"
  }
};

function aplicarNaveSelecionada(nomeNave) {
  const nave = NAVES[nomeNave] || NAVES.Pioneira;

  nomeNaveSelecionada.textContent = nave.nome;
  imagemNaveSelecionada.src = nave.imagem;

  nomeNaveEquipadaPerfil.textContent = nave.nome;
  imagemNaveEquipadaPerfil.src = nave.imagem;

  itensNave.forEach((item) => {
    item.classList.toggle("ativo", item.dataset.nave === nave.nome);
  });
}

itensNave.forEach((item) => {
  item.addEventListener("click", () => {
    const nomeNave = item.dataset.nave;
    localStorage.setItem(CHAVE_NAVE_EQUIPADA, nomeNave);
    aplicarNaveSelecionada(nomeNave);
  });
});

const naveEquipadaSalva =
  localStorage.getItem(CHAVE_NAVE_EQUIPADA) || "Pioneira";

aplicarNaveSelecionada(naveEquipadaSalva);


// ===== EFEITO VISUAL DURANTE A VIAGEM =====
const caixaPlanetaAtual = document.getElementById("caixaPlanetaAtual");

const iniciarViagemOriginal = iniciarViagem;
iniciarViagem = function(destino) {
  if (caixaPlanetaAtual) {
    caixaPlanetaAtual.classList.add("viajando");
  }

  iniciarViagemOriginal(destino);
};

// Observa o retorno da imagem de viagem para um planeta e encerra o efeito.
const observadorImagemViagem = new MutationObserver(() => {
  if (
    caixaPlanetaAtual &&
    imagemPlanetaAtual &&
    !imagemPlanetaAtual.src.includes("localizacaoviajando.png")
  ) {
    caixaPlanetaAtual.classList.remove("viajando");
  }
});

if (imagemPlanetaAtual) {
  observadorImagemViagem.observe(imagemPlanetaAtual, {
    attributes: true,
    attributeFilter: ["src"]
  });
}

// ===== DADOS INICIAIS DA NAVE PIONEIRA =====
const CHAVE_ESTADO_PIONEIRA = "cronicas_do_vazio_estado_pioneira";

function carregarEstadoPioneira() {
  const capacidadeCombustivel = 80;
  const capacidadeUso = 100;
  const salvo = localStorage.getItem(CHAVE_ESTADO_PIONEIRA);

  let estado = {
    combustivel: capacidadeCombustivel,
    capacidadeCombustivel,
    uso: capacidadeUso,
    capacidadeUso
  };

  if (salvo) {
    try {
      const antigo = JSON.parse(salvo);

      estado.combustivel = Math.max(
        0,
        Math.min(capacidadeCombustivel, Number(antigo.combustivel ?? capacidadeCombustivel))
      );

      estado.uso = Math.max(
        0,
        Math.min(capacidadeUso, Number(antigo.uso ?? capacidadeUso))
      );
    } catch {
      localStorage.removeItem(CHAVE_ESTADO_PIONEIRA);
    }
  }

  localStorage.setItem(CHAVE_ESTADO_PIONEIRA, JSON.stringify(estado));
  return estado;
}

function aplicarEstadoPioneira(estadoRecebido = null) {
  const estado = estadoRecebido || carregarEstadoPioneira();

  const combustivelTexto = document.getElementById("combustivelNaveTexto");
  const combustivelBarra = document.getElementById("combustivelNaveBarra");
  const usoTexto = document.getElementById("usoNaveTexto");
  const usoBarra = document.getElementById("usoNaveBarra");

  const capacidadeCombustivel = 80;
  const capacidadeUso = 100;

  const combustivel = Math.max(0, Math.min(capacidadeCombustivel, estado.combustivel));
  const uso = Math.max(0, Math.min(capacidadeUso, estado.uso));

  const percentualCombustivel = (combustivel / capacidadeCombustivel) * 100;
  const percentualUso = (uso / capacidadeUso) * 100;

  if (combustivelTexto) {
    combustivelTexto.textContent = `${Number.isInteger(combustivel) ? combustivel : combustivel.toFixed(1)} / ${capacidadeCombustivel}`;
  }

  if (combustivelBarra) {
    combustivelBarra.style.width = `${percentualCombustivel}%`;
  }

  if (usoTexto) {
    usoTexto.textContent = `${Number.isInteger(uso) ? uso : uso.toFixed(1)} / ${capacidadeUso}`;
  }

  if (usoBarra) {
    usoBarra.style.width = `${percentualUso}%`;
  }
}

aplicarEstadoPioneira();


// ===== CONSUMO DE COMBUSTÍVEL E INTEGRIDADE DURANTE A VIAGEM =====
function salvarEstadoPioneira(estado) {
  const normalizado = {
    combustivel: Math.max(0, Math.min(80, estado.combustivel)),
    capacidadeCombustivel: 80,
    uso: Math.max(0, Math.min(100, estado.uso)),
    capacidadeUso: 100
  };

  localStorage.setItem(CHAVE_ESTADO_PIONEIRA, JSON.stringify(normalizado));
  aplicarEstadoPioneira(normalizado);
  return normalizado;
}

function podeIniciarViagem(duracaoSegundos) {
  const estado = carregarEstadoPioneira();
  const combustivelNecessario = duracaoSegundos * 1;
  const usoNecessario = duracaoSegundos * 0.5;

  return (
    estado.combustivel >= combustivelNecessario &&
    estado.uso >= usoNecessario
  );
}

// Substitui o fluxo da viagem para consumir 1 Xenônio-9 e 0,5 de integridade por segundo.
iniciarViagem = function(destino) {
  if (!destino || viagemEmAndamento) return;

  const duracaoSegundos = 8;

  if (!podeIniciarViagem(duracaoSegundos)) {
    alert("A Pioneira não possui Xenônio-9 ou integridade suficiente para esta viagem.");
    fecharConfirmacaoViagem();
    return;
  }

  viagemEmAndamento = true;
  definirBloqueioCards(true);
  fecharConfirmacaoViagem();

  if (caixaPlanetaAtual) {
    caixaPlanetaAtual.classList.add("viajando");
  }

  const duracao = duracaoSegundos * 1000;
  const inicio = performance.now();
  const estadoInicial = carregarEstadoPioneira();
  let ultimoSegundoCobrado = 0;

  nomePlanetaLocalizacao.textContent = `Viajando para ${destino}`;
  imagemPlanetaAtual.src = IMAGEM_VIAJANDO;
  textoViagem.textContent = "Tempo restante";
  tempoViagem.textContent = `${duracaoSegundos}s`;
  barraViagemPreenchida.style.width = "0%";

  function atualizar(now) {
    const decorrido = now - inicio;
    const progresso = Math.min(decorrido / duracao, 1);
    const segundosDecorridos = Math.min(
      duracaoSegundos,
      Math.floor(decorrido / 1000)
    );
    const restante = Math.max(
      0,
      Math.ceil((duracao - decorrido) / 1000)
    );

    if (segundosDecorridos > ultimoSegundoCobrado) {
      ultimoSegundoCobrado = segundosDecorridos;

      salvarEstadoPioneira({
        combustivel: estadoInicial.combustivel - segundosDecorridos,
        uso: estadoInicial.uso - (segundosDecorridos * 0.5)
      });
    }

    barraViagemPreenchida.style.width = `${progresso * 100}%`;
    tempoViagem.textContent = `${restante}s`;

    if (progresso < 1) {
      timerViagem = requestAnimationFrame(atualizar);
      return;
    }

    // Garante o consumo completo dos 8 segundos.
    salvarEstadoPioneira({
      combustivel: estadoInicial.combustivel - duracaoSegundos,
      uso: estadoInicial.uso - (duracaoSegundos * 0.5)
    });

    viagemEmAndamento = false;
    definirBloqueioCards(false);
    atualizarPlanetaDaConta(destino);
    mostrarPlaneta(destino);

    if (caixaPlanetaAtual) {
      caixaPlanetaAtual.classList.remove("viajando");
    }
  }

  timerViagem = requestAnimationFrame(atualizar);
};


aplicarCreditosIniciais();
atualizarAbaPlaneta(localStorage.getItem(CHAVE_PLANETA) || "Terra");


// ===== MINERAÇÃO DE OURO E INVENTÁRIO DA PIONEIRA =====
const botaoMinerar = document.getElementById("botaoMinerar");
const botaoColetarOuro = document.getElementById("botaoColetarOuro");
const barraMineracaoPreenchida = document.getElementById("barraMineracaoPreenchida");
const textoMineracao = document.getElementById("textoMineracao");
const tempoMineracao = document.getElementById("tempoMineracao");
const slotsInventario = document.querySelectorAll(".slot-inventario");

const CHAVE_INVENTARIO_PIONEIRA = "cronicas_do_vazio_inventario_pioneira";
const CHAVE_MINERACAO_OURO = "cronicas_do_vazio_mineracao_ouro";

let mineracaoEmAndamento = false;
let ouroProntoParaColeta = false;
let animacaoMineracao = null;

function carregarInventarioPioneira() {
  const salvo = localStorage.getItem(CHAVE_INVENTARIO_PIONEIRA);

  if (!salvo) {
    const vazio = Array(5).fill(null);
    localStorage.setItem(CHAVE_INVENTARIO_PIONEIRA, JSON.stringify(vazio));
    return vazio;
  }

  try {
    const inventario = JSON.parse(salvo);
    return Array.from({ length: 5 }, (_, i) => inventario[i] || null);
  } catch {
    const vazio = Array(5).fill(null);
    localStorage.setItem(CHAVE_INVENTARIO_PIONEIRA, JSON.stringify(vazio));
    return vazio;
  }
}

function salvarInventarioPioneira(inventario) {
  localStorage.setItem(CHAVE_INVENTARIO_PIONEIRA, JSON.stringify(inventario));
  renderizarInventarioPioneira();
}

function renderizarInventarioPioneira() {
  const inventario = carregarInventarioPioneira();

  slotsInventario.forEach((slot, indice) => {
    slot.innerHTML = "";
    slot.classList.remove("preenchido");

    const item = inventario[indice];
    const labelVazio = `Espaço de inventário ${indice + 1}`;
    slot.removeAttribute("title");
    slot.setAttribute("aria-label", labelVazio);

    if (!item) return;

    slot.classList.add("preenchido");
    slot.title = `${item.nome}: ${item.quantidade}`;
    slot.setAttribute("aria-label", `${item.nome}, quantidade ${item.quantidade}`);

    const elemento = document.createElement("div");
    elemento.className = "item-inventario";
    elemento.dataset.tooltip = `${item.nome}: ${item.quantidade}`;

    const imagem = document.createElement("img");
    imagem.src = item.imagem;
    imagem.alt = item.nome;

    const quantidade = document.createElement("strong");
    quantidade.textContent = item.quantidade;

    const nome = document.createElement("span");
    nome.textContent = item.nome;

    elemento.append(imagem, quantidade, nome);

    slot.appendChild(elemento);
  });
}

function adicionarOuroAoInventario(quantidade) {
  const inventario = carregarInventarioPioneira();
  const slotOuro = inventario.findIndex((item) => item?.id === "ouro");

  if (slotOuro >= 0) {
    inventario[slotOuro].quantidade += quantidade;
    salvarInventarioPioneira(inventario);
    return true;
  }

  const slotLivre = inventario.findIndex((item) => item === null);

  if (slotLivre < 0) {
    alert("O inventário da Pioneira está cheio.");
    return false;
  }

  inventario[slotLivre] = {
    id: "ouro",
    nome: "Ouro",
    quantidade,
    imagem: "imagens/mineracao/ouro.png"
  };

  salvarInventarioPioneira(inventario);
  return true;
}

function atualizarEstadoVisualMineracao() {
  botaoMinerar.hidden = mineracaoEmAndamento || ouroProntoParaColeta;
  botaoColetarOuro.hidden = !ouroProntoParaColeta;
}

function iniciarMineracaoOuro() {
  if (mineracaoEmAndamento || ouroProntoParaColeta) return;

  mineracaoEmAndamento = true;
  atualizarEstadoVisualMineracao();

  const duracao = 10000;
  const inicio = performance.now();

  textoMineracao.textContent = "Minerando ouro";
  tempoMineracao.textContent = "10s";
  barraMineracaoPreenchida.style.width = "0%";

  function atualizar(agora) {
    const decorrido = agora - inicio;
    const progresso = Math.min(decorrido / duracao, 1);
    const restante = Math.max(0, Math.ceil((duracao - decorrido) / 1000));

    barraMineracaoPreenchida.style.width = `${progresso * 100}%`;
    tempoMineracao.textContent = `${restante}s`;

    if (progresso < 1) {
      animacaoMineracao = requestAnimationFrame(atualizar);
      return;
    }

    mineracaoEmAndamento = false;
    ouroProntoParaColeta = true;

    textoMineracao.textContent = "Mineração concluída";
    tempoMineracao.textContent = "Pronto";
    barraMineracaoPreenchida.style.width = "100%";

    localStorage.setItem(CHAVE_MINERACAO_OURO, "pronto");
    atualizarEstadoVisualMineracao();
  }

  animacaoMineracao = requestAnimationFrame(atualizar);
}

function coletarOuroMinerado() {
  if (!ouroProntoParaColeta) return;

  const adicionado = adicionarOuroAoInventario(10);
  if (!adicionado) return;

  ouroProntoParaColeta = false;
  localStorage.removeItem(CHAVE_MINERACAO_OURO);

  textoMineracao.textContent = "Pronto para minerar";
  tempoMineracao.textContent = "10s";
  barraMineracaoPreenchida.style.width = "0%";

  atualizarEstadoVisualMineracao();
}

if (botaoMinerar) {
  botaoMinerar.addEventListener("click", iniciarMineracaoOuro);
}

if (botaoColetarOuro) {
  botaoColetarOuro.addEventListener("click", coletarOuroMinerado);
}

if (localStorage.getItem(CHAVE_MINERACAO_OURO) === "pronto") {
  ouroProntoParaColeta = true;
  textoMineracao.textContent = "Mineração concluída";
  tempoMineracao.textContent = "Pronto";
  barraMineracaoPreenchida.style.width = "100%";
}

renderizarInventarioPioneira();
atualizarEstadoVisualMineracao();


// ===== CONFIGURAÇÃO FINAL: TERRA, NAVE MÃE E MARTE =====
const conteudoPlanetaNormal = document.getElementById("conteudoPlanetaNormal");
const painelNaveMae = document.getElementById("painelNaveMae");
const eventoMineracaoOuro = document.getElementById("eventoMineracaoOuro");
const inventarioNaveMae = document.getElementById("inventarioNaveMae");
const botaoReabastecer = document.getElementById("botaoReabastecer");
const botaoReparar = document.getElementById("botaoReparar");

const modalVenda = document.getElementById("modalVenda");
const textoConfirmacaoVenda = document.getElementById("textoConfirmacaoVenda");
const cancelarVenda = document.getElementById("cancelarVenda");
const confirmarVenda = document.getElementById("confirmarVenda");

const LOCALIZACOES = {
  Terra: {
    imagem: "imagens/local/sistemasolar/sistemasolarlocalplanetaterra.png",
    imagemInterna: "imagens/local/sistemasolar/sistemasolarlocalplanetaterradentro.png",
    titulo: "Planeta Terra",
    temperatura: "15 °C",
    clima: "Variado",
    atmosfera: "Nitrogênio e oxigênio",
    gravidade: "1,00 g",
    condicao: "Habitável"
  },
  "Nave Mãe": {
    imagem: "imagens/local/sistemasolar/sistemasolarlocalnavemae.png",
    imagemInterna: "imagens/local/sistemasolar/sistemasolarlocalnavemaedentro.png",
    titulo: "Nave Mãe",
    temperatura: "22 °C",
    clima: "Controlado",
    atmosfera: "Artificial",
    gravidade: "1,00 g",
    condicao: "Estação segura"
  },
  Marte: {
    imagem: "imagens/local/sistemasolar/sistemasolarlocalplanetamarte.png",
    imagemInterna: "imagens/local/sistemasolar/sistemasolarlocalplanetamartedentro.png",
    titulo: "Planeta Marte",
    temperatura: "-63 °C",
    clima: "Frio e seco",
    atmosfera: "Dióxido de carbono",
    gravidade: "0,38 g",
    condicao: "Hostil"
  }
};

function calcularTempoViagem(origem, destino) {
  if (origem === destino) return 0;

  if (origem === "Nave Mãe" || destino === "Nave Mãe") {
    return 4;
  }

  return 8;
}

function atualizarInterfaceLocalizacao(local) {
  const dados = LOCALIZACOES[local] || LOCALIZACOES.Terra;

  imagemPlanetaAtual.src = dados.imagem;
  nomePlanetaLocalizacao.textContent = dados.titulo;
  textoViagem.textContent = "Localização atual";
  tempoViagem.textContent = local;
  barraViagemPreenchida.style.width = "0%";

  imagemPlanetaDetalhes.src = dados.imagemInterna;
  tituloPlanetaDetalhes.textContent = dados.titulo;
  planetaTemperatura.textContent = dados.temperatura;
  planetaClima.textContent = dados.clima;
  planetaAtmosfera.textContent = dados.atmosfera;
  planetaGravidade.textContent = dados.gravidade;
  planetaCondicao.textContent = dados.condicao;

  cardsPlaneta.forEach((card) => {
    card.classList.toggle("ativo", card.dataset.planeta === local);
  });

  const estaNaTerra = local === "Terra";
  const estaNaNaveMae = local === "Nave Mãe";

  if (conteudoPlanetaNormal) {
    conteudoPlanetaNormal.hidden = !estaNaTerra;
  }

  if (painelNaveMae) {
    painelNaveMae.hidden = !estaNaNaveMae;
  }

  if (eventoMineracaoOuro) {
    eventoMineracaoOuro.hidden = !estaNaTerra;
  }

  if (estaNaNaveMae) {
    renderizarInventarioNaveMae();
  }
}

mostrarPlaneta = atualizarInterfaceLocalizacao;
atualizarAbaPlaneta = atualizarInterfaceLocalizacao;

abrirConfirmacaoViagem = function(destino) {
  if (viagemEmAndamento) return;

  const origem = localStorage.getItem(CHAVE_PLANETA) || "Terra";
  if (destino === origem) return;

  const tempoSegundos = calcularTempoViagem(origem, destino);
  const consumoCombustivel = tempoSegundos;
  const consumoUso = tempoSegundos * 0.5;

  destinoSelecionado = destino;

  tituloModalViagem.textContent = `Viajar para ${destino}?`;
  descricaoModalViagem.textContent =
    `A viagem de ${origem} até ${destino} demora ${tempoSegundos} segundos.`;

  resumoTempoViagem.textContent = `${tempoSegundos} segundos`;
  resumoCombustivelViagem.textContent = `${consumoCombustivel} unidades`;
  resumoUsoViagem.textContent =
    `${Number.isInteger(consumoUso) ? consumoUso : consumoUso.toFixed(1)} pontos`;

  modalViagem.classList.add("ativo");
  modalViagem.setAttribute("aria-hidden", "false");
};

iniciarViagem = function(destino) {
  if (!destino || viagemEmAndamento) return;

  const origem = localStorage.getItem(CHAVE_PLANETA) || "Terra";
  const duracaoSegundos = calcularTempoViagem(origem, destino);

  if (!podeIniciarViagem(duracaoSegundos)) {
    alert("A Pioneira não possui Xenônio-9 ou integridade suficiente.");
    fecharConfirmacaoViagem();
    return;
  }

  viagemEmAndamento = true;
  definirBloqueioCards(true);
  fecharConfirmacaoViagem();

  if (caixaPlanetaAtual) caixaPlanetaAtual.classList.add("viajando");

  const duracao = duracaoSegundos * 1000;
  const inicio = performance.now();
  const estadoInicial = carregarEstadoPioneira();
  let ultimoSegundoCobrado = 0;

  nomePlanetaLocalizacao.textContent = `Viajando para ${destino}`;
  imagemPlanetaAtual.src = IMAGEM_VIAJANDO;
  textoViagem.textContent = "Tempo restante";
  tempoViagem.textContent = `${duracaoSegundos}s`;
  barraViagemPreenchida.style.width = "0%";

  function atualizar(agora) {
    const decorrido = agora - inicio;
    const progresso = Math.min(decorrido / duracao, 1);
    const segundos = Math.min(duracaoSegundos, Math.floor(decorrido / 1000));
    const restante = Math.max(0, Math.ceil((duracao - decorrido) / 1000));

    if (segundos > ultimoSegundoCobrado) {
      ultimoSegundoCobrado = segundos;
      salvarEstadoPioneira({
        combustivel: estadoInicial.combustivel - segundos,
        uso: estadoInicial.uso - segundos * 0.5
      });
    }

    barraViagemPreenchida.style.width = `${progresso * 100}%`;
    tempoViagem.textContent = `${restante}s`;

    if (progresso < 1) {
      timerViagem = requestAnimationFrame(atualizar);
      return;
    }

    salvarEstadoPioneira({
      combustivel: estadoInicial.combustivel - duracaoSegundos,
      uso: estadoInicial.uso - duracaoSegundos * 0.5
    });

    viagemEmAndamento = false;
    definirBloqueioCards(false);
    atualizarPlanetaDaConta(destino);
    atualizarInterfaceLocalizacao(destino);

    if (caixaPlanetaAtual) caixaPlanetaAtual.classList.remove("viajando");
  }

  timerViagem = requestAnimationFrame(atualizar);
};

// ===== VENDA DE OURO NA NAVE MÃE =====
let quantidadeOuroParaVenda = 0;

function renderizarInventarioNaveMae() {
  if (!inventarioNaveMae) return;

  const inventario = carregarInventarioPioneira();
  inventarioNaveMae.innerHTML = "";

  inventario.forEach((item) => {
    if (!item) return;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "item-venda-nave-mae";
    botao.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <strong>${item.quantidade}</strong>
      <span>${item.nome}</span>
    `;
    botao.title = `${item.nome}: ${item.quantidade}`;
    botao.setAttribute("aria-label", `${item.nome}, quantidade ${item.quantidade}`);

    if (item.id === "ouro") {
      botao.addEventListener("click", () => abrirVendaOuro(item.quantidade));
    } else {
      botao.disabled = true;
    }

    inventarioNaveMae.appendChild(botao);
  });

  if (!inventario.some(Boolean)) {
    inventarioNaveMae.innerHTML =
      '<p class="nave-mae-ajuda">O inventário está vazio.</p>';
  }
}

function abrirVendaOuro(quantidade) {
  quantidadeOuroParaVenda = Math.min(1, quantidade);
  textoConfirmacaoVenda.textContent =
    `Tem certeza de que deseja vender 1 de ouro por 1 crédito? Você possui ${quantidade}.`;
  modalVenda.classList.add("ativo");
  modalVenda.setAttribute("aria-hidden", "false");
}

function fecharVendaOuro() {
  modalVenda.classList.remove("ativo");
  modalVenda.setAttribute("aria-hidden", "true");
  quantidadeOuroParaVenda = 0;
}

function venderTodoOuro() {
  if (quantidadeOuroParaVenda <= 0) return;

  const inventario = carregarInventarioPioneira();
  const indice = inventario.findIndex((item) => item?.id === "ouro");

  if (indice < 0) {
    fecharVendaOuro();
    return;
  }

  const quantidadeVendida = Math.min(
    quantidadeOuroParaVenda,
    inventario[indice].quantidade
  );
  const creditosAtuais = Number(localStorage.getItem(CHAVE_CREDITOS) || "100");
  localStorage.setItem(
    CHAVE_CREDITOS,
    String(creditosAtuais + quantidadeVendida)
  );

  inventario[indice].quantidade -= quantidadeVendida;

  if (inventario[indice].quantidade <= 0) {
    inventario[indice] = null;
  }

  salvarInventarioPioneira(inventario);

  aplicarCreditosIniciais();
  renderizarInventarioNaveMae();
  fecharVendaOuro();
}

cancelarVenda?.addEventListener("click", fecharVendaOuro);
confirmarVenda?.addEventListener("click", venderTodoOuro);

modalVenda?.addEventListener("click", (evento) => {
  if (evento.target === modalVenda) fecharVendaOuro();
});

// ===== SERVIÇOS DA NAVE MÃE =====
function gastarCreditos(valor) {
  const atuais = Number(localStorage.getItem(CHAVE_CREDITOS) || "100");

  if (atuais < valor) {
    alert("Créditos insuficientes.");
    return false;
  }

  localStorage.setItem(CHAVE_CREDITOS, String(atuais - valor));
  aplicarCreditosIniciais();
  return true;
}

// Atualização inicial final.
atualizarInterfaceLocalizacao(
  localStorage.getItem(CHAVE_PLANETA) || "Terra"
);


// ===== ABA LOCAL DINÂMICA =====

function atualizarCreditosEmTodaInterface() {
  const creditos = Number(localStorage.getItem(CHAVE_CREDITOS) || "100");

  if (creditosJogador) {
    creditosJogador.textContent = String(creditos);
  }

  if (typeof creditosTopoPerfil !== "undefined" && creditosTopoPerfil) {
    creditosTopoPerfil.textContent = String(creditos);
  }
}

function atualizarAbaLocal(localAtual) {
  const local = localAtual || localStorage.getItem(CHAVE_PLANETA) || "Terra";
  atualizarInterfaceLocalizacao(local);
}

// Atualiza o perfil imediatamente depois de vender ouro.
const venderTodoOuroOriginal = venderTodoOuro;
venderTodoOuro = function() {
  venderTodoOuroOriginal();
  atualizarCreditosEmTodaInterface();
};

// Atualiza o perfil imediatamente depois de gastar créditos.
const gastarCreditosOriginal = gastarCreditos;
gastarCreditos = function(valor) {
  const resultado = gastarCreditosOriginal(valor);

  if (resultado) {
    atualizarCreditosEmTodaInterface();
  }

  return resultado;
};

// Reforça os serviços da Nave Mãe: sempre completa 100%.
if (botaoReabastecer) {
  botaoReabastecer.onclick = () => {
    const estado = carregarEstadoPioneira();

    if (estado.combustivel >= 80) {
      alert("O tanque já está em 100%.");
      return;
    }

    if (!gastarCreditos(10)) return;

    salvarEstadoPioneira({
      combustivel: 80,
      uso: estado.uso
    });

    alert("Tanque cheio.");
  };
}

if (botaoReparar) {
  botaoReparar.onclick = () => {
    const estado = carregarEstadoPioneira();

    if (estado.uso >= 100) {
      alert("A integridade já está em 100%.");
      return;
    }

    if (!gastarCreditos(10)) return;

    salvarEstadoPioneira({
      combustivel: estado.combustivel,
      uso: 100
    });

    alert("Pioneira consertada.");
  };
}

// Sempre sincroniza a aba Local com a localização atual.
const atualizarPlanetaDaContaOriginal = atualizarPlanetaDaConta;
atualizarPlanetaDaConta = function(local) {
  atualizarPlanetaDaContaOriginal(local);
  atualizarAbaLocal(local);
};

atualizarCreditosEmTodaInterface();
atualizarAbaLocal(localStorage.getItem(CHAVE_PLANETA) || "Terra");

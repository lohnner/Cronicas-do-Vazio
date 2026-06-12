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
    imagem: "imagens/naves/pioneira.png",
    capacidadeTripulacao: 2,
    poder: 10
  }
};

function aplicarNaveSelecionada(nomeNave) {
  const nave = NAVES[nomeNave] || NAVES.Pioneira;

  nomeNaveSelecionada.textContent = nave.nome;
  imagemNaveSelecionada.src = nave.imagem;

  nomeNaveEquipadaPerfil.textContent = nave.nome;
  imagemNaveEquipadaPerfil.src = nave.imagem;

  const tripulacaoNave = document.getElementById("tripulacaoNave");
  const poderNave = document.getElementById("poderNave");

  if (tripulacaoNave) {
    tripulacaoNave.textContent = String(nave.capacidadeTripulacao);
  }

  if (poderNave) {
    poderNave.textContent = String(nave.poder);
  }

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
  const combustivelLocalizacaoTexto = document.getElementById("combustivelLocalizacaoTexto");
  const combustivelLocalizacaoBarra = document.getElementById("combustivelLocalizacaoBarra");
  const usoTexto = document.getElementById("usoNaveTexto");
  const usoBarra = document.getElementById("usoNaveBarra");
  const usoLocalizacaoTexto = document.getElementById("usoLocalizacaoTexto");
  const usoLocalizacaoBarra = document.getElementById("usoLocalizacaoBarra");

  const capacidadeCombustivel = 80;
  const capacidadeUso = 100;

  const combustivel = Math.max(0, Math.min(capacidadeCombustivel, estado.combustivel));
  const uso = Math.max(0, Math.min(capacidadeUso, estado.uso));

  const percentualCombustivel = (combustivel / capacidadeCombustivel) * 100;
  const percentualUso = (uso / capacidadeUso) * 100;

  const textoCombustivel = `${Number.isInteger(combustivel) ? combustivel : combustivel.toFixed(1)} / ${capacidadeCombustivel}`;
  const textoUso = `${Number.isInteger(uso) ? uso : uso.toFixed(1)} / ${capacidadeUso}`;

  [combustivelTexto, combustivelLocalizacaoTexto].forEach((elemento) => {
    if (elemento) elemento.textContent = textoCombustivel;
  });

  [combustivelBarra, combustivelLocalizacaoBarra].forEach((elemento) => {
    if (elemento) elemento.style.width = `${percentualCombustivel}%`;
  });

  [usoTexto, usoLocalizacaoTexto].forEach((elemento) => {
    if (elemento) elemento.textContent = textoUso;
  });

  [usoBarra, usoLocalizacaoBarra].forEach((elemento) => {
    if (elemento) elemento.style.width = `${percentualUso}%`;
  });
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
    return Array.from({ length: 5 }, (_, i) => {
      const item = inventario[i] || null;

      if (item?.id === "ouro") {
        return {
          ...item,
          id: "minerio_ouro",
          nome: "Minério de Ouro",
          imagem: "imagens/mineracao/mineriodeouro.png"
        };
      }

      return item;
    });
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
    slot.setAttribute("aria-label", `${item.nome}, quantidade ${item.quantidade}`);

    const elemento = document.createElement("div");
    elemento.className = "item-inventario";
    elemento.dataset.tooltip = `${item.nome}: ${item.quantidade}`;

    const imagem = document.createElement("img");
    imagem.src = item.imagem;
    imagem.alt = item.nome;
    imagem.addEventListener("error", () => {
      imagem.src = "imagens/mineracao/mineriodeouro.png";
    }, { once: true });

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
  const slotOuro = inventario.findIndex((item) =>
    item?.id === "minerio_ouro" || item?.id === "ouro"
  );

  if (slotOuro >= 0) {
    inventario[slotOuro].id = "minerio_ouro";
    inventario[slotOuro].nome = "Minério de Ouro";
    inventario[slotOuro].imagem = "imagens/mineracao/mineriodeouro.png";
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
    id: "minerio_ouro",
    nome: "Minério de Ouro",
    quantidade,
    imagem: "imagens/mineracao/mineriodeouro.png"
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

  if (calcularPoderTotal() < 10) {
    alert("A Pioneira precisa de 10 de poder para iniciar esta mineração.");
    return;
  }

  mineracaoEmAndamento = true;
  atualizarEstadoVisualMineracao();

  const duracao = 10000;
  const inicio = performance.now();

  textoMineracao.textContent = "Minerando minério";
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

  adicionarXP(1);

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
const tituloModalVenda = document.getElementById("tituloModalVenda");
const textoConfirmacaoVenda = document.getElementById("textoConfirmacaoVenda");
const inputQuantidadeVenda = document.getElementById("inputQuantidadeVenda");
const cancelarVenda = document.getElementById("cancelarVenda");
const confirmarVenda = document.getElementById("confirmarVenda");
const textoAjudaNaveMae = document.querySelector(".nave-mae-ajuda");
const rotuloCombustivelLocalizacao = document.querySelector(
  ".estado-localizacao .estado-nave:first-child .estado-nave-topo span"
);

if (textoAjudaNaveMae) {
  textoAjudaNaveMae.textContent = "Venda";
}

if (rotuloCombustivelLocalizacao) {
  rotuloCombustivelLocalizacao.textContent = "Xen\u00f4nio-9";
}

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
let quantidadeMaximaOuroParaVenda = 0;
let itemVendaAtual = null;

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
    botao.setAttribute("aria-label", `${item.nome}, quantidade ${item.quantidade}`);

    if (item.id === "barra_ouro") {
      botao.addEventListener("click", () => abrirVendaOuro(item.quantidade, item));
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
  const idItemVenda = itemVendaAtual?.id || "barra_ouro";
  const precoItemVenda = itemVendaAtual?.preco || 20;
  const indice = inventario.findIndex((item) => item?.id === idItemVenda);

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
    String(creditosAtuais + (quantidadeVendida * precoItemVenda))
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

function normalizarQuantidadeVenda(valor) {
  const maximo = Math.max(0, Math.floor(Number(quantidadeMaximaOuroParaVenda) || 0));
  const numero = Math.floor(Number(valor));

  if (maximo <= 0) return 0;
  if (!Number.isFinite(numero) || numero < 1) return 1;

  return Math.min(numero, maximo);
}

function atualizarResumoVenda(ajustarCampo = false) {
  const quantidade = normalizarQuantidadeVenda(
    inputQuantidadeVenda ? inputQuantidadeVenda.value : quantidadeOuroParaVenda
  );

  quantidadeOuroParaVenda = quantidade;

  if (inputQuantidadeVenda && ajustarCampo) {
    inputQuantidadeVenda.value = String(quantidade);
  }

  if (textoConfirmacaoVenda) {
    const nomeItem = itemVendaAtual?.nome || "Barra de Ouro";
    const precoItem = itemVendaAtual?.preco || 20;

    textoConfirmacaoVenda.textContent =
      `Voc\u00ea possui ${quantidadeMaximaOuroParaVenda} ${nomeItem}. Cada unidade vale ${precoItem} cr\u00e9ditos.`;
  }

  if (confirmarVenda) {
    confirmarVenda.textContent = `Vender ${quantidade}`;
  }
}

abrirVendaOuro = function(quantidade, item = null) {
  quantidadeMaximaOuroParaVenda = Math.max(0, Math.floor(Number(quantidade) || 0));
  quantidadeOuroParaVenda = Math.min(1, quantidadeMaximaOuroParaVenda);
  itemVendaAtual = {
    id: item?.id || "barra_ouro",
    nome: item?.nome || "Barra de Ouro",
    preco: item?.preco || 20
  };

  if (tituloModalVenda) {
    tituloModalVenda.textContent = `Vender ${itemVendaAtual.nome}?`;
  }

  if (inputQuantidadeVenda) {
    inputQuantidadeVenda.max = String(quantidadeMaximaOuroParaVenda);
    inputQuantidadeVenda.value = String(quantidadeOuroParaVenda);
    inputQuantidadeVenda.disabled = quantidadeMaximaOuroParaVenda <= 0;
  }

  atualizarResumoVenda(true);
  modalVenda.classList.add("ativo");
  modalVenda.setAttribute("aria-hidden", "false");

  if (inputQuantidadeVenda) {
    inputQuantidadeVenda.focus();
    inputQuantidadeVenda.select();
  }
};

fecharVendaOuro = function() {
  modalVenda.classList.remove("ativo");
  modalVenda.setAttribute("aria-hidden", "true");
  quantidadeOuroParaVenda = 0;
  quantidadeMaximaOuroParaVenda = 0;
  itemVendaAtual = null;

  if (inputQuantidadeVenda) {
    inputQuantidadeVenda.value = "1";
    inputQuantidadeVenda.removeAttribute("max");
    inputQuantidadeVenda.disabled = false;
  }

  if (confirmarVenda) {
    confirmarVenda.textContent = "Vender 1";
  }
};

venderTodoOuro = function() {
  quantidadeOuroParaVenda = normalizarQuantidadeVenda(
    inputQuantidadeVenda ? inputQuantidadeVenda.value : quantidadeOuroParaVenda
  );

  if (quantidadeOuroParaVenda <= 0) return;

  const inventario = carregarInventarioPioneira();
  const idItemVenda = itemVendaAtual?.id || "barra_ouro";
  const precoItemVenda = itemVendaAtual?.preco || 20;
  const indice = inventario.findIndex((item) => item?.id === idItemVenda);

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
    String(creditosAtuais + (quantidadeVendida * precoItemVenda))
  );

  inventario[indice].quantidade -= quantidadeVendida;

  if (inventario[indice].quantidade <= 0) {
    inventario[indice] = null;
  }

  salvarInventarioPioneira(inventario);
  aplicarCreditosIniciais();
  renderizarInventarioNaveMae();
  fecharVendaOuro();
};

inputQuantidadeVenda?.addEventListener("input", () => atualizarResumoVenda(false));
inputQuantidadeVenda?.addEventListener("change", () => atualizarResumoVenda(true));
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


// ===== TRIPULACAO, PODER, XP E FABRICA =====
const CHAVE_XP_JOGADOR = "cronicas_do_vazio_xp_jogador";
const CHAVE_ENERGIA_FABRICA = "cronicas_do_vazio_energia_fabrica";
const CHAVE_FABRICACAO_BARRA_OURO = "cronicas_do_vazio_fabricacao_barra_ouro";

const ITEM_MINERIO_OURO = {
  id: "minerio_ouro",
  nome: "Minério de Ouro",
  imagem: "imagens/mineracao/mineriodeouro.png"
};

const ITEM_BARRA_OURO = {
  id: "barra_ouro",
  nome: "Barra de Ouro",
  imagem: "imagens/mineracao/barradeouro.png",
  preco: 20
};

const TRIPULANTES = {
  lian: {
    id: "lian",
    nome: "Lian",
    cargo: "Capitao Estelar",
    poder: 5,
    imagem: "imagens/personagens/lian.png"
  }
};

const ARMAS_EQUIPADAS = {
  capitao: null
};

const poderTotalPerfil = document.getElementById("poderTotalPerfil");
const capacidadeTripulacaoTexto = document.getElementById("capacidadeTripulacaoTexto");
const poderTripulacaoTexto = document.getElementById("poderTripulacaoTexto");
const imagemCapitaoTripulacao = document.getElementById("imagemCapitaoTripulacao");
const nomeCapitaoTripulacao = document.getElementById("nomeCapitaoTripulacao");
const poderCapitaoTripulacao = document.getElementById("poderCapitaoTripulacao");
const quantidadeMinerioFabrica = document.getElementById("quantidadeMinerioFabrica");
const energiaFabricaTexto = document.getElementById("energiaFabricaTexto");
const barraEnergiaFabrica = document.getElementById("barraEnergiaFabrica");
const textoFabricacao = document.getElementById("textoFabricacao");
const tempoFabricacao = document.getElementById("tempoFabricacao");
const barraFabricacaoPreenchida = document.getElementById("barraFabricacaoPreenchida");
const botaoFabricarBarra = document.getElementById("botaoFabricarBarra");
const botaoColetarFabricacao = document.getElementById("botaoColetarFabricacao");
const imagemResultadoFabrica = document.getElementById("imagemResultadoFabrica");

let energiaFabrica = carregarEnergiaFabrica();
let ultimoTickEnergiaFabrica = performance.now();
let fabricacaoEmAndamento = false;
let fabricacaoPronta = localStorage.getItem(CHAVE_FABRICACAO_BARRA_OURO) === "pronto";
let animacaoFabricacao = null;

if (imagemResultadoFabrica) {
  imagemResultadoFabrica.addEventListener("error", () => {
    imagemResultadoFabrica.src = ITEM_MINERIO_OURO.imagem;
  }, { once: true });
}

function naveEquipadaAtual() {
  const nome = localStorage.getItem(CHAVE_NAVE_EQUIPADA) || "Pioneira";
  return NAVES[nome] || NAVES.Pioneira;
}

function calcularPoderTripulacao() {
  const poderPersonagens = TRIPULANTES.lian.poder;
  const poderArmas = Object.values(ARMAS_EQUIPADAS)
    .reduce((total, arma) => total + (arma?.poder || 0), 0);

  return poderPersonagens + poderArmas;
}

function calcularPoderTotal() {
  return naveEquipadaAtual().poder + calcularPoderTripulacao();
}

function atualizarSistemaTripulacao() {
  const nave = naveEquipadaAtual();
  const poderTripulacao = calcularPoderTripulacao();
  const poderTotal = calcularPoderTotal();
  const imagemCapitao = imagemPerfil?.src || TRIPULANTES.lian.imagem;

  if (capacidadeTripulacaoTexto) {
    capacidadeTripulacaoTexto.textContent = `1 / ${nave.capacidadeTripulacao}`;
  }

  if (poderTripulacaoTexto) {
    poderTripulacaoTexto.textContent = String(poderTotal);
  }

  if (poderTotalPerfil) {
    poderTotalPerfil.textContent = String(poderTotal);
  }

  if (imagemCapitaoTripulacao) {
    imagemCapitaoTripulacao.src = imagemCapitao;
  }

  if (nomeCapitaoTripulacao) {
    nomeCapitaoTripulacao.textContent = TRIPULANTES.lian.nome;
  }

  if (poderCapitaoTripulacao) {
    poderCapitaoTripulacao.textContent = `Poder ${TRIPULANTES.lian.poder}`;
  }

  const poderNave = document.getElementById("poderNave");
  const tripulacaoNave = document.getElementById("tripulacaoNave");

  if (poderNave) poderNave.textContent = String(nave.poder);
  if (tripulacaoNave) tripulacaoNave.textContent = String(nave.capacidadeTripulacao);

  atualizarEstadoVisualMineracao();
}

function carregarXPJogador() {
  const xp = Number(localStorage.getItem(CHAVE_XP_JOGADOR) || "0");
  return Number.isFinite(xp) && xp >= 0 ? xp : 0;
}

function salvarXPJogador(xp) {
  localStorage.setItem(CHAVE_XP_JOGADOR, String(Math.max(0, Math.floor(xp))));
  atualizarXPJogador();
}

function adicionarXP(quantidade) {
  salvarXPJogador(carregarXPJogador() + quantidade);
}

function atualizarXPJogador() {
  const xpTotal = carregarXPJogador();
  const nivel = Math.floor(xpTotal / 100) + 1;
  const xpNivel = xpTotal % 100;
  const nivelTexto = document.querySelector(".nivel-texto");
  const xpTexto = document.querySelector(".xp-texto");
  const xpPreenchido = document.querySelector(".xp-preenchido");

  if (nivelTexto) nivelTexto.textContent = `Nível ${nivel}`;
  if (xpTexto) xpTexto.textContent = `${xpNivel} / 100`;
  if (xpPreenchido) xpPreenchido.style.width = `${xpNivel}%`;
}

function contarItemInventario(idItem) {
  return carregarInventarioPioneira()
    .filter((item) => item?.id === idItem)
    .reduce((total, item) => total + item.quantidade, 0);
}

function adicionarItemAoInventario(itemBase, quantidade) {
  const inventario = carregarInventarioPioneira();
  const indiceExistente = inventario.findIndex((item) => item?.id === itemBase.id);

  if (indiceExistente >= 0) {
    inventario[indiceExistente].quantidade += quantidade;
    salvarInventarioPioneira(inventario);
    return true;
  }

  const slotLivre = inventario.findIndex((item) => item === null);

  if (slotLivre < 0) {
    alert("O inventário da Pioneira está cheio.");
    return false;
  }

  inventario[slotLivre] = {
    id: itemBase.id,
    nome: itemBase.nome,
    quantidade,
    imagem: itemBase.imagem,
    preco: itemBase.preco
  };

  salvarInventarioPioneira(inventario);
  return true;
}

function removerItemDoInventario(idItem, quantidade) {
  const inventario = carregarInventarioPioneira();
  let restante = quantidade;

  for (const item of inventario) {
    if (!item || item.id !== idItem || restante <= 0) continue;

    const remover = Math.min(item.quantidade, restante);
    item.quantidade -= remover;
    restante -= remover;
  }

  if (restante > 0) return false;

  salvarInventarioPioneira(
    inventario.map((item) => item && item.quantidade > 0 ? item : null)
  );

  return true;
}

function carregarEnergiaFabrica() {
  const energia = Number(localStorage.getItem(CHAVE_ENERGIA_FABRICA));

  if (!Number.isFinite(energia)) {
    localStorage.setItem(CHAVE_ENERGIA_FABRICA, "100");
    return 100;
  }

  return Math.max(0, Math.min(100, energia));
}

function salvarEnergiaFabrica(valor) {
  energiaFabrica = Math.max(0, Math.min(100, valor));
  localStorage.setItem(CHAVE_ENERGIA_FABRICA, String(Math.floor(energiaFabrica)));
  atualizarInterfaceFabrica();
}

function atualizarInterfaceFabrica() {
  const minerio = contarItemInventario(ITEM_MINERIO_OURO.id);
  const energiaInteira = Math.floor(energiaFabrica);
  const podeFabricar = minerio >= 10 && energiaFabrica >= 25 &&
    !fabricacaoEmAndamento && !fabricacaoPronta;

  if (quantidadeMinerioFabrica) {
    quantidadeMinerioFabrica.textContent = String(minerio);
  }

  if (energiaFabricaTexto) {
    energiaFabricaTexto.textContent = `${energiaInteira} / 100`;
  }

  if (barraEnergiaFabrica) {
    barraEnergiaFabrica.style.width = `${energiaFabrica}%`;
  }

  if (botaoFabricarBarra) {
    botaoFabricarBarra.disabled = !podeFabricar;
    botaoFabricarBarra.textContent = fabricacaoEmAndamento ? "Fabricando" : "Fabricar";
  }

  if (botaoColetarFabricacao) {
    botaoColetarFabricacao.hidden = !fabricacaoPronta;
  }

  if (!fabricacaoEmAndamento && !fabricacaoPronta) {
    if (textoFabricacao) textoFabricacao.textContent = "Pronto para fabricar";
    if (tempoFabricacao) tempoFabricacao.textContent = "10s";
    if (barraFabricacaoPreenchida) barraFabricacaoPreenchida.style.width = "0%";
  }
}

function iniciarFabricacaoBarraOuro() {
  if (fabricacaoEmAndamento || fabricacaoPronta) return;

  if (contarItemInventario(ITEM_MINERIO_OURO.id) < 10) {
    alert("Você precisa de 10 minérios de ouro.");
    return;
  }

  if (energiaFabrica < 25) {
    alert("A fábrica precisa de 25 de energia.");
    return;
  }

  if (!removerItemDoInventario(ITEM_MINERIO_OURO.id, 10)) return;

  salvarEnergiaFabrica(energiaFabrica - 25);
  fabricacaoEmAndamento = true;
  atualizarInterfaceFabrica();

  const duracao = 10000;
  const inicio = performance.now();

  if (textoFabricacao) textoFabricacao.textContent = "Fabricando barra";
  if (tempoFabricacao) tempoFabricacao.textContent = "10s";
  if (barraFabricacaoPreenchida) barraFabricacaoPreenchida.style.width = "0%";

  function atualizar(agora) {
    const decorrido = agora - inicio;
    const progresso = Math.min(decorrido / duracao, 1);
    const restante = Math.max(0, Math.ceil((duracao - decorrido) / 1000));

    if (barraFabricacaoPreenchida) {
      barraFabricacaoPreenchida.style.width = `${progresso * 100}%`;
    }

    if (tempoFabricacao) {
      tempoFabricacao.textContent = `${restante}s`;
    }

    if (progresso < 1) {
      animacaoFabricacao = requestAnimationFrame(atualizar);
      return;
    }

    fabricacaoEmAndamento = false;
    fabricacaoPronta = true;
    localStorage.setItem(CHAVE_FABRICACAO_BARRA_OURO, "pronto");

    if (textoFabricacao) textoFabricacao.textContent = "Fabricação concluída";
    if (tempoFabricacao) tempoFabricacao.textContent = "Pronto";
    if (barraFabricacaoPreenchida) barraFabricacaoPreenchida.style.width = "100%";

    atualizarInterfaceFabrica();
  }

  animacaoFabricacao = requestAnimationFrame(atualizar);
}

function coletarFabricacaoBarraOuro() {
  if (!fabricacaoPronta) return;

  if (!adicionarItemAoInventario(ITEM_BARRA_OURO, 1)) return;

  fabricacaoPronta = false;
  localStorage.removeItem(CHAVE_FABRICACAO_BARRA_OURO);
  atualizarInterfaceFabrica();
}

function atualizarEnergiaFabrica(agora) {
  const delta = Math.max(0, (agora - ultimoTickEnergiaFabrica) / 1000);
  ultimoTickEnergiaFabrica = agora;

  if (!fabricacaoEmAndamento && energiaFabrica < 100) {
    salvarEnergiaFabrica(energiaFabrica + (delta * 5));
  }

  requestAnimationFrame(atualizarEnergiaFabrica);
}

function renderizarTripulacaoERecursos() {
  atualizarSistemaTripulacao();
  atualizarXPJogador();
  atualizarInterfaceFabrica();
}

const salvarInventarioPioneiraOriginal = salvarInventarioPioneira;
salvarInventarioPioneira = function(inventario) {
  salvarInventarioPioneiraOriginal(inventario);
  atualizarInterfaceFabrica();

  if (painelNaveMae && !painelNaveMae.hidden) {
    renderizarInventarioNaveMae();
  }
};

const atualizarEstadoVisualMineracaoOriginal = atualizarEstadoVisualMineracao;
atualizarEstadoVisualMineracao = function() {
  atualizarEstadoVisualMineracaoOriginal();

  if (!botaoMinerar) return;

  const poderSuficiente = calcularPoderTotal() >= 10;
  botaoMinerar.disabled = !poderSuficiente || mineracaoEmAndamento || ouroProntoParaColeta;

  if (!poderSuficiente && textoMineracao) {
    textoMineracao.textContent = "Poder insuficiente";
  } else if (!mineracaoEmAndamento && !ouroProntoParaColeta && textoMineracao) {
    textoMineracao.textContent = "Pronto para minerar";
  }
};

const abrirConfirmacaoViagemSemMineracao = abrirConfirmacaoViagem;
abrirConfirmacaoViagem = function(destino) {
  if (mineracaoEmAndamento) {
    alert("Aguarde o fim da mineração antes de mudar de localização.");
    return;
  }

  abrirConfirmacaoViagemSemMineracao(destino);
};

const iniciarViagemSemMineracao = iniciarViagem;
iniciarViagem = function(destino) {
  if (mineracaoEmAndamento) {
    alert("Aguarde o fim da mineração antes de viajar.");
    return;
  }

  iniciarViagemSemMineracao(destino);
};

const aplicarNaveSelecionadaComPoder = aplicarNaveSelecionada;
aplicarNaveSelecionada = function(nomeNave) {
  aplicarNaveSelecionadaComPoder(nomeNave);
  atualizarSistemaTripulacao();
};

if (imagemPerfil) {
  new MutationObserver(atualizarSistemaTripulacao)
    .observe(imagemPerfil, { attributes: true, attributeFilter: ["src"] });
}

botaoFabricarBarra?.addEventListener("click", iniciarFabricacaoBarraOuro);
botaoColetarFabricacao?.addEventListener("click", coletarFabricacaoBarraOuro);

if (fabricacaoPronta) {
  if (textoFabricacao) textoFabricacao.textContent = "Fabricação concluída";
  if (tempoFabricacao) tempoFabricacao.textContent = "Pronto";
  if (barraFabricacaoPreenchida) barraFabricacaoPreenchida.style.width = "100%";
}

renderizarTripulacaoERecursos();
requestAnimationFrame(atualizarEnergiaFabrica);

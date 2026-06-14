const botoes = document.querySelectorAll(".aba-botao");
const paineis = document.querySelectorAll(".painel-aba");

const modalNome = document.getElementById("modalNome");
const formNome = document.getElementById("formNome");
const inputNome = document.getElementById("inputNome");
const nomeJogador = document.getElementById("nomeJogador");
const idConta = document.getElementById("idConta");
const dataIngresso = document.getElementById("dataIngresso");
const botaoResetConta = document.getElementById("botaoResetConta");
const missoesConcluidasPerfil = document.getElementById("missoesConcluidasPerfil");
const missoesConcluidasAba = document.getElementById("missoesConcluidasAba");
const imagemIaMissoes = document.getElementById("imagemIaMissoes");
const etiquetaMissaoAtual = document.getElementById("etiquetaMissaoAtual");
const tituloMissaoAtual = document.getElementById("tituloMissaoAtual");
const textoMissaoAtual = document.getElementById("textoMissaoAtual");
const objetivoMissaoAtual = document.getElementById("objetivoMissaoAtual");

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
const painelLocalViajando = document.getElementById("painelLocalViajando");
const tituloLocalViajando = document.getElementById("tituloLocalViajando");
const textoLocalViajando = document.getElementById("textoLocalViajando");
const tempoLocalViajando = document.getElementById("tempoLocalViajando");
const cardsPlaneta = document.querySelectorAll(".card-planeta");

const CHAVE_CONTA = "cronicas_do_vazio_conta";
const CHAVE_CONTADOR = "cronicas_do_vazio_contador_contas";
const CHAVE_AVATAR = "cronicas_do_vazio_avatar";
const CHAVE_PLANETA = "cronicas_do_vazio_planeta_atual";
const CHAVE_CREDITOS = "cronicas_do_vazio_creditos";

const PLANETA_INICIAL = "Nave Mãe";
const SEGUNDOS_POR_MINUTO = 60;
const TEMPO_MINERACAO_SEGUNDOS = 10 * SEGUNDOS_POR_MINUTO;
const TEMPO_FABRICACAO_SEGUNDOS = 10 * SEGUNDOS_POR_MINUTO;
const IMAGEM_MINERIO_OURO = "imagens/mineracao/minerios/mineriodeouro.png";
const IMAGEM_MINERIO_COBRE = "imagens/mineracao/minerios/mineriodecobre.png";
const IMAGEM_BARRA_OURO = "imagens/mineracao/barras/barradeouro.png";
const IMAGEM_BARRA_COBRE = "imagens/mineracao/barras/barradecobre.png";
const IMAGEM_EVENTO_OURO = "imagens/mineracao/eventos/mineracaoouro.png";
const IMAGEM_EVENTO_COBRE = "imagens/mineracao/eventos/mineracaocobre.png";

const IMAGEM_TERRA = "imagens/local/sistemasolar/sistemasolarlocalplanetaterra.png";
const IMAGEM_MARTE = "imagens/local/sistemasolar/sistemasolarlocalplanetamarte.png";
const IMAGEM_VIAJANDO = "imagens/utilitarios/localizacaoviajando.png";

let destinoSelecionado = null;
let viagemEmAndamento = false;
let timerViagem = null;

function formatarDuracao(segundos) {
  const total = Math.max(0, Math.ceil(Number(segundos) || 0));

  if (total >= SEGUNDOS_POR_MINUTO) {
    const minutos = Math.floor(total / SEGUNDOS_POR_MINUTO);
    const resto = total % SEGUNDOS_POR_MINUTO;
    const textoMinutos = `${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;

    if (resto <= 0) return textoMinutos;
    return `${textoMinutos} e ${resto}s`;
  }

  return `${total} ${total === 1 ? "segundo" : "segundos"}`;
}

function formatarTempoCurto(segundos) {
  const total = Math.max(0, Math.ceil(Number(segundos) || 0));

  if (total >= SEGUNDOS_POR_MINUTO) {
    const minutos = Math.floor(total / SEGUNDOS_POR_MINUTO);
    const resto = total % SEGUNDOS_POR_MINUTO;
    return resto > 0 ? `${minutos}min ${resto}s` : `${minutos}min`;
  }

  return `${total}s`;
}

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
    .find((linha) => linha.querySelector(".dado-label")?.textContent.trim() === "Local");

  if (linhaPlaneta) {
    linhaPlaneta.querySelector("strong").textContent = conta.planeta || PLANETA_INICIAL;
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
    conta.planeta = localStorage.getItem(CHAVE_PLANETA) || PLANETA_INICIAL;
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
    planeta: PLANETA_INICIAL
  };

  localStorage.setItem(CHAVE_CONTADOR, String(contador));
  localStorage.setItem(CHAVE_PLANETA, PLANETA_INICIAL);
  localStorage.setItem(CHAVE_CREDITOS, "100");
  salvarConta(conta);

  aplicarConta(conta);
  modalNome.classList.remove("ativo");
  inputNome.value = "";
});

function resetarContaProvisoria() {
  if (!confirm("Resetar conta e progresso deste jogo?")) return;

  localStorage.clear();
  window.location.reload();
}

botaoResetConta?.addEventListener("click", resetarContaProvisoria);

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

  const planetaAtual = localStorage.getItem(CHAVE_PLANETA) || PLANETA_INICIAL;

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
  tempoViagem.textContent = formatarTempoCurto(duracao / 1000);
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

if (imagemPerfil) {
  imagemPerfil.src = "imagens/personagens/lian.png";
}
marcarAvatarSelecionado(imagemPerfil?.getAttribute("src") || "imagens/personagens/lian.png");

carregarConta();
mostrarPlaneta(localStorage.getItem(CHAVE_PLANETA) || PLANETA_INICIAL);


// ===== SELEÇÃO E EXIBIÇÃO DE NAVES =====
const itensNave = document.querySelectorAll(".item-nave");
const nomeNaveSelecionada = document.getElementById("nomeNaveSelecionada");
const imagemNaveSelecionada = document.getElementById("imagemNaveSelecionada");
const nomeNaveEquipadaPerfil = document.getElementById("nomeNaveEquipadaPerfil");
const imagemNaveEquipadaPerfil = document.getElementById("imagemNaveEquipadaPerfil");
const velocidadeNave = document.getElementById("velocidadeNave");
const velocidadeRealNave = document.getElementById("velocidadeRealNave");
const inventarioNave = document.getElementById("inventarioNave");
const tipoCombustivelNave = document.getElementById("tipoCombustivelNave");
const capacidadeCombustivelNave = document.getElementById("capacidadeCombustivelNave");
const capacidadeUsoNave = document.getElementById("capacidadeUsoNave");
const hpNave = document.getElementById("hpNave");
const ataqueNave = document.getElementById("ataqueNave");
const custoNave = document.getElementById("custoNave");
const botaoAcaoNave = document.getElementById("botaoAcaoNave");
const botaoAbrirModulosNave = document.getElementById("botaoAbrirModulosNave");
const modalModulosNave = document.getElementById("modalModulosNave");
const fecharModalModulosNave = document.getElementById("fecharModalModulosNave");
const nomeNaveModulos = document.getElementById("nomeNaveModulos");
const modulosEquipadosGrade = document.getElementById("modulosEquipadosGrade");
const modulosInventarioLista = document.getElementById("modulosInventarioLista");
const botaoEquiparModuloNave = document.getElementById("botaoEquiparModuloNave");
const botaoDesequiparModuloNave = document.getElementById("botaoDesequiparModuloNave");

const CHAVE_NAVE_EQUIPADA = "cronicas_do_vazio_nave_equipada";
const CHAVE_NAVES_COMPRADAS = "cronicas_do_vazio_naves_compradas";
const CHAVE_MODULOS_EQUIPADOS_NAVE = "cronicas_do_vazio_modulos_equipados_nave";
const CHAVE_INVENTARIO_MODULOS_NAVE = "cronicas_do_vazio_inventario_modulos_nave";
const DISTANCIA_TERRA_MARTE_KM = 225000000;
const TEMPO_PIONEIRA_TERRA_MARTE_SEGUNDOS = 22 * SEGUNDOS_POR_MINUTO;

const NAVES = {
  Pioneira: {
    nome: "Pioneira",
    imagem: "imagens/naves/pioneira.png",
    velocidade: 120,
    capacidadeTripulacao: 2,
    poder: 10,
    inventario: 5,
    combustivel: "Xenônio-9",
    capacidadeCombustivel: 80,
    capacidadeUso: 100,
    hp: 26,
    ataque: 8,
    custo: 0
  },
  Aurora: {
    nome: "Aurora",
    imagem: "imagens/naves/aurora.png",
    velocidade: 150,
    capacidadeTripulacao: 3,
    poder: 25,
    inventario: 8,
    combustivel: "Xenônio-9",
    capacidadeCombustivel: 120,
    capacidadeUso: 140,
    hp: 53,
    ataque: 16,
    custo: 100000
  }
};

const TIPOS_MODULOS_NAVE = [
  { id: "combustivel", nome: "Módulo de Combustível" },
  { id: "propulsao", nome: "Módulo de Propulsão" },
  { id: "armamento", nome: "Módulo de Armamento" },
  { id: "blindagem", nome: "Módulo de Blindagem" },
  { id: "escudo", nome: "Módulo de Escudo" },
  { id: "carga", nome: "Módulo de Carga" },
  { id: "reparacao", nome: "Módulo de Reparação" },
  { id: "mineracao", nome: "Módulo de Mineração" },
  { id: "scanner", nome: "Módulo de Scanner" }
];

const ROTULOS_BONUS_MODULO_NAVE = {
  velocidade: "Velocidade",
  capacidadeCombustivel: "Combustível",
  capacidadeUso: "Integridade",
  capacidadeTripulacao: "Tripulação",
  poder: "Poder",
  hp: "HP",
  ataque: "Ataque",
  inventario: "Inventário",
  escudo: "Escudo",
  reparacao: "Reparação",
  mineracao: "Mineração",
  scanner: "Scanner"
};

const ATRIBUTOS_NUMERICOS_NAVE = [
  "velocidade",
  "capacidadeTripulacao",
  "poder",
  "inventario",
  "capacidadeCombustivel",
  "capacidadeUso",
  "hp",
  "ataque",
  "escudo",
  "reparacao",
  "mineracao",
  "scanner"
];

let naveSelecionadaAtual = "Pioneira";
let selecaoModuloNave = null;

function formatarCreditos(valor) {
  return Math.floor(Number(valor) || 0).toLocaleString("pt-BR");
}

function carregarNavesCompradas() {
  const salvo = localStorage.getItem(CHAVE_NAVES_COMPRADAS);
  let compradas = ["Pioneira"];

  if (salvo) {
    try {
      const lista = JSON.parse(salvo);
      if (Array.isArray(lista)) {
        compradas = [...new Set(["Pioneira", ...lista.filter((nome) => NAVES[nome])])];
      }
    } catch {
      localStorage.removeItem(CHAVE_NAVES_COMPRADAS);
    }
  }

  localStorage.setItem(CHAVE_NAVES_COMPRADAS, JSON.stringify(compradas));
  return compradas;
}

function salvarNavesCompradas(naves) {
  const compradas = [...new Set(["Pioneira", ...naves.filter((nome) => NAVES[nome])])];
  localStorage.setItem(CHAVE_NAVES_COMPRADAS, JSON.stringify(compradas));
  return compradas;
}

function naveEstaComprada(nomeNave) {
  return carregarNavesCompradas().includes(nomeNave);
}

function obterNomeNaveEquipada() {
  const nome = localStorage.getItem(CHAVE_NAVE_EQUIPADA) || "Pioneira";
  return naveEstaComprada(nome) && NAVES[nome] ? nome : "Pioneira";
}

function tipoModuloValido(tipo) {
  return TIPOS_MODULOS_NAVE.some((item) => item.id === tipo);
}

function obterNomeTipoModulo(tipo) {
  return TIPOS_MODULOS_NAVE.find((item) => item.id === tipo)?.nome || "Módulo";
}

function criarSlotsModulosVazios() {
  return TIPOS_MODULOS_NAVE.reduce((slots, tipo) => {
    slots[tipo.id] = null;
    return slots;
  }, {});
}

function normalizarBonusModuloNave(bonus) {
  const normalizado = {};

  if (!bonus || typeof bonus !== "object") return normalizado;

  ATRIBUTOS_NUMERICOS_NAVE.forEach((atributo) => {
    const valor = Number(bonus[atributo]);

    if (Number.isFinite(valor) && valor !== 0) {
      normalizado[atributo] = valor;
    }
  });

  return normalizado;
}

function normalizarModuloNave(modulo) {
  if (!modulo || typeof modulo !== "object") return null;

  const tipo = String(modulo.tipo || modulo.slot || "");
  if (!tipoModuloValido(tipo)) return null;

  const nomePadrao = obterNomeTipoModulo(tipo);
  const nome = String(modulo.nome || nomePadrao);
  const idBase = `${tipo}_${nome.toLowerCase().replace(/[^a-z0-9]+/gi, "_")}`;

  return {
    id: String(modulo.id || idBase),
    nome,
    tipo,
    bonus: normalizarBonusModuloNave(modulo.bonus || modulo.bonusAtributos)
  };
}

function chaveModulosEquipadosNave(nomeNave = naveSelecionadaAtual) {
  return `${CHAVE_MODULOS_EQUIPADOS_NAVE}_${nomeNave}`;
}

function carregarModulosEquipadosNave(nomeNave = naveSelecionadaAtual) {
  const chave = chaveModulosEquipadosNave(nomeNave);
  const salvo = localStorage.getItem(chave);
  const modulos = criarSlotsModulosVazios();

  if (salvo) {
    try {
      const dados = JSON.parse(salvo);

      TIPOS_MODULOS_NAVE.forEach((tipo) => {
        modulos[tipo.id] = normalizarModuloNave(dados?.[tipo.id]);
      });
    } catch {
      localStorage.removeItem(chave);
    }
  }

  localStorage.setItem(chave, JSON.stringify(modulos));
  return modulos;
}

function salvarModulosEquipadosNave(nomeNave, modulos) {
  const normalizados = criarSlotsModulosVazios();

  TIPOS_MODULOS_NAVE.forEach((tipo) => {
    normalizados[tipo.id] = normalizarModuloNave(modulos?.[tipo.id]);
  });

  localStorage.setItem(chaveModulosEquipadosNave(nomeNave), JSON.stringify(normalizados));
  return normalizados;
}

function carregarInventarioModulosNave() {
  const salvo = localStorage.getItem(CHAVE_INVENTARIO_MODULOS_NAVE);

  if (!salvo) {
    localStorage.setItem(CHAVE_INVENTARIO_MODULOS_NAVE, JSON.stringify([]));
    return [];
  }

  try {
    const inventario = JSON.parse(salvo);
    const normalizado = Array.isArray(inventario)
      ? inventario.map(normalizarModuloNave).filter(Boolean)
      : [];

    localStorage.setItem(CHAVE_INVENTARIO_MODULOS_NAVE, JSON.stringify(normalizado));
    return normalizado;
  } catch {
    localStorage.setItem(CHAVE_INVENTARIO_MODULOS_NAVE, JSON.stringify([]));
    return [];
  }
}

function salvarInventarioModulosNave(inventario) {
  const normalizado = Array.isArray(inventario)
    ? inventario.map(normalizarModuloNave).filter(Boolean)
    : [];

  localStorage.setItem(CHAVE_INVENTARIO_MODULOS_NAVE, JSON.stringify(normalizado));
  return normalizado;
}

function calcularBonusModulosNave(nomeNave) {
  const modulos = carregarModulosEquipadosNave(nomeNave);

  return Object.values(modulos).reduce((bonusTotal, modulo) => {
    if (!modulo?.bonus) return bonusTotal;

    Object.entries(modulo.bonus).forEach(([atributo, valor]) => {
      bonusTotal[atributo] = (bonusTotal[atributo] || 0) + valor;
    });

    return bonusTotal;
  }, {});
}

function obterNaveComModulos(nomeNave) {
  const base = NAVES[nomeNave] || NAVES.Pioneira;
  const bonus = calcularBonusModulosNave(base.nome);
  const nave = { ...base, bonusModulos: bonus };

  ATRIBUTOS_NUMERICOS_NAVE.forEach((atributo) => {
    if (typeof base[atributo] !== "number") return;

    const valor = base[atributo] + (bonus[atributo] || 0);
    nave[atributo] = Math.max(0, Math.floor(valor));
  });

  return nave;
}

function calcularVelocidadeRealNave(nave) {
  const velocidadeRealPioneira = DISTANCIA_TERRA_MARTE_KM / TEMPO_PIONEIRA_TERRA_MARTE_SEGUNDOS;
  return velocidadeRealPioneira * (nave.velocidade / NAVES.Pioneira.velocidade);
}

function formatarKm(valor) {
  return Math.round(valor).toLocaleString("pt-BR");
}

function atualizarAcaoNave() {
  if (!botaoAcaoNave) return;

  const nomeEquipado = obterNomeNaveEquipada();
  const nave = NAVES[naveSelecionadaAtual] || NAVES.Pioneira;
  const comprada = naveEstaComprada(nave.nome);

  botaoAcaoNave.disabled = false;

  if (nomeEquipado === nave.nome) {
    botaoAcaoNave.textContent = "Equipada";
    botaoAcaoNave.disabled = true;
    return;
  }

  if (comprada) {
    botaoAcaoNave.textContent = "Equipar";
    return;
  }

  botaoAcaoNave.textContent = `Comprar ${formatarCreditos(nave.custo)} créditos`;
}

function aplicarNaveSelecionada(nomeNave) {
  const nave = obterNaveComModulos(nomeNave);
  const naveEquipada = obterNaveComModulos(obterNomeNaveEquipada());
  naveSelecionadaAtual = nave.nome;

  nomeNaveSelecionada.textContent = nave.nome;
  imagemNaveSelecionada.src = nave.imagem;

  nomeNaveEquipadaPerfil.textContent = naveEquipada.nome;
  imagemNaveEquipadaPerfil.src = naveEquipada.imagem;

  const tripulacaoNave = document.getElementById("tripulacaoNave");
  const poderNave = document.getElementById("poderNave");

  if (velocidadeNave) {
    velocidadeNave.textContent = `${nave.velocidade} km/s`;
  }

  if (velocidadeRealNave) {
    velocidadeRealNave.textContent = `${formatarKm(calcularVelocidadeRealNave(nave))} km/s`;
  }

  if (tripulacaoNave) {
    tripulacaoNave.textContent = String(nave.capacidadeTripulacao);
  }

  if (poderNave) {
    poderNave.textContent = String(nave.poder);
  }

  if (hpNave) hpNave.textContent = String(nave.hp);
  if (ataqueNave) ataqueNave.textContent = String(nave.ataque);
  if (inventarioNave) inventarioNave.textContent = String(nave.inventario);
  if (tipoCombustivelNave) tipoCombustivelNave.textContent = nave.combustivel;
  if (capacidadeCombustivelNave) capacidadeCombustivelNave.textContent = `${nave.capacidadeCombustivel} unidades`;
  if (capacidadeUsoNave) capacidadeUsoNave.textContent = `${nave.capacidadeUso} pontos`;
  if (custoNave) custoNave.textContent = nave.custo > 0 ? `${formatarCreditos(nave.custo)} créditos` : "Inicial";

  itensNave.forEach((item) => {
    const nomeItem = item.dataset.nave;
    const naveItem = NAVES[nomeItem];
    const comprada = naveEstaComprada(nomeItem);
    const status = item.querySelector(".item-nave-texto span");

    item.classList.toggle("ativo", nomeItem === nave.nome);
    item.classList.toggle("comprada", comprada);
    item.classList.toggle("equipada", nomeItem === naveEquipada.nome);

    if (status && naveItem) {
      if (nomeItem === naveEquipada.nome) {
        status.textContent = "Equipada";
      } else if (comprada) {
        status.textContent = "Comprada";
      } else {
        status.textContent = `${formatarCreditos(naveItem.custo)} créditos`;
      }
    }
  });

  atualizarAcaoNave();

  if (modalModulosNave?.classList.contains("ativo")) {
    renderizarModulosNave();
  }
}

function equiparNave(nomeNave) {
  const nave = NAVES[nomeNave];
  if (!nave || !naveEstaComprada(nomeNave)) return;

  localStorage.setItem(CHAVE_NAVE_EQUIPADA, nomeNave);
  aplicarNaveSelecionada(nomeNave);

  if (typeof aplicarEstadoPioneira === "function") aplicarEstadoPioneira();
  if (typeof renderizarInventarioPioneira === "function") renderizarInventarioPioneira();
  if (typeof renderizarInventarioNaveMae === "function") renderizarInventarioNaveMae();
  if (typeof atualizarSistemaTripulacao === "function") atualizarSistemaTripulacao();
}

function comprarOuEquiparNaveSelecionada() {
  const nave = NAVES[naveSelecionadaAtual] || NAVES.Pioneira;

  if (naveEstaComprada(nave.nome)) {
    equiparNave(nave.nome);
    return;
  }

  if (!gastarCreditos(nave.custo)) return;

  salvarNavesCompradas([...carregarNavesCompradas(), nave.nome]);
  equiparNave(nave.nome);
}

function formatarBonusModuloNave(modulo) {
  const bonus = modulo?.bonus || {};
  const entradas = Object.entries(bonus).filter(([, valor]) => Number(valor) !== 0);

  if (!entradas.length) return "Sem bônus de atributo";

  return entradas
    .map(([atributo, valor]) => {
      const sinal = valor > 0 ? "+" : "";
      return `${sinal}${valor} ${ROTULOS_BONUS_MODULO_NAVE[atributo] || atributo}`;
    })
    .join(" • ");
}

function limparSelecaoModuloNave() {
  selecaoModuloNave = null;
  renderizarModulosNave();
}

function selecionarModuloInventario(indice) {
  selecaoModuloNave = { origem: "inventario", indice };
  renderizarModulosNave();
}

function selecionarModuloEquipado(tipo) {
  selecaoModuloNave = { origem: "equipado", tipo };
  renderizarModulosNave();
}

function atualizarBotoesModulosNave() {
  if (botaoEquiparModuloNave) {
    botaoEquiparModuloNave.disabled = selecaoModuloNave?.origem !== "inventario";
  }

  if (botaoDesequiparModuloNave) {
    botaoDesequiparModuloNave.disabled = selecaoModuloNave?.origem !== "equipado";
  }
}

function renderizarModulosNave() {
  if (!modulosEquipadosGrade || !modulosInventarioLista) return;

  const nomeNave = naveSelecionadaAtual;
  const modulosEquipados = carregarModulosEquipadosNave(nomeNave);
  const inventarioModulos = carregarInventarioModulosNave();

  if (nomeNaveModulos) {
    nomeNaveModulos.textContent = nomeNave;
  }

  modulosEquipadosGrade.innerHTML = "";

  TIPOS_MODULOS_NAVE.forEach((tipo) => {
    const modulo = modulosEquipados[tipo.id];
    const slot = document.createElement("button");
    const rotulo = document.createElement("span");
    const nome = document.createElement("strong");
    const detalhe = document.createElement("small");

    slot.type = "button";
    slot.className = "slot-modulo-nave";
    slot.dataset.tipoModulo = tipo.id;

    rotulo.textContent = tipo.nome;
    nome.textContent = modulo ? modulo.nome : "Vazio";
    detalhe.textContent = modulo ? formatarBonusModuloNave(modulo) : "Sem melhoria equipada";

    if (modulo) {
      slot.classList.add("preenchido");
      slot.setAttribute("aria-label", `${tipo.nome}: ${modulo.nome}`);
      slot.addEventListener("click", () => selecionarModuloEquipado(tipo.id));
    } else {
      slot.classList.add("vazio");
      slot.setAttribute("aria-label", `${tipo.nome}: Vazio`);
      slot.addEventListener("click", limparSelecaoModuloNave);
    }

    if (selecaoModuloNave?.origem === "equipado" && selecaoModuloNave.tipo === tipo.id) {
      slot.classList.add("selecionado");
    }

    slot.append(rotulo, nome, detalhe);
    modulosEquipadosGrade.appendChild(slot);
  });

  modulosInventarioLista.innerHTML = "";

  if (!inventarioModulos.length) {
    const vazio = document.createElement("p");
    vazio.className = "modulos-inventario-vazio";
    vazio.textContent = "Nenhum módulo no inventário.";
    modulosInventarioLista.appendChild(vazio);
  } else {
    inventarioModulos.forEach((modulo, indice) => {
      const item = document.createElement("button");
      const tipo = document.createElement("span");
      const nome = document.createElement("strong");
      const detalhe = document.createElement("small");

      item.type = "button";
      item.className = "modulo-inventario-item";
      item.dataset.indiceModulo = String(indice);
      item.setAttribute("aria-label", `${modulo.nome}, ${obterNomeTipoModulo(modulo.tipo)}`);

      tipo.textContent = obterNomeTipoModulo(modulo.tipo);
      nome.textContent = modulo.nome;
      detalhe.textContent = formatarBonusModuloNave(modulo);

      if (selecaoModuloNave?.origem === "inventario" && selecaoModuloNave.indice === indice) {
        item.classList.add("selecionado");
      }

      item.addEventListener("click", () => selecionarModuloInventario(indice));
      item.append(tipo, nome, detalhe);
      modulosInventarioLista.appendChild(item);
    });
  }

  atualizarBotoesModulosNave();
}

function atualizarNaveDepoisDeModulo(nomeNave) {
  aplicarNaveSelecionada(naveSelecionadaAtual);

  if (obterNomeNaveEquipada() !== nomeNave) return;

  if (typeof aplicarEstadoPioneira === "function") aplicarEstadoPioneira();
  if (typeof renderizarInventarioPioneira === "function") renderizarInventarioPioneira();
  if (typeof renderizarInventarioNaveMae === "function") renderizarInventarioNaveMae();
  if (typeof atualizarSistemaTripulacao === "function") atualizarSistemaTripulacao();
}

function equiparModuloSelecionado() {
  if (selecaoModuloNave?.origem !== "inventario") return;

  const nomeNave = naveSelecionadaAtual;
  const inventarioModulos = carregarInventarioModulosNave();
  const moduloSelecionado = normalizarModuloNave(inventarioModulos[selecaoModuloNave.indice]);

  if (!moduloSelecionado) {
    limparSelecaoModuloNave();
    return;
  }

  const modulosEquipados = carregarModulosEquipadosNave(nomeNave);
  const moduloAntigo = modulosEquipados[moduloSelecionado.tipo];

  modulosEquipados[moduloSelecionado.tipo] = moduloSelecionado;
  inventarioModulos.splice(selecaoModuloNave.indice, 1);

  if (moduloAntigo) {
    inventarioModulos.push(moduloAntigo);
  }

  salvarModulosEquipadosNave(nomeNave, modulosEquipados);
  salvarInventarioModulosNave(inventarioModulos);

  selecaoModuloNave = null;
  atualizarNaveDepoisDeModulo(nomeNave);
  renderizarModulosNave();
}

function desequiparModuloSelecionado() {
  if (selecaoModuloNave?.origem !== "equipado") return;

  const nomeNave = naveSelecionadaAtual;
  const modulosEquipados = carregarModulosEquipadosNave(nomeNave);
  const moduloSelecionado = normalizarModuloNave(modulosEquipados[selecaoModuloNave.tipo]);

  if (!moduloSelecionado) {
    limparSelecaoModuloNave();
    return;
  }

  const inventarioModulos = carregarInventarioModulosNave();
  modulosEquipados[selecaoModuloNave.tipo] = null;
  inventarioModulos.push(moduloSelecionado);

  salvarModulosEquipadosNave(nomeNave, modulosEquipados);
  salvarInventarioModulosNave(inventarioModulos);

  selecaoModuloNave = null;
  atualizarNaveDepoisDeModulo(nomeNave);
  renderizarModulosNave();
}

function abrirModalModulosNave() {
  selecaoModuloNave = null;
  renderizarModulosNave();
  modalModulosNave?.classList.add("ativo");
  modalModulosNave?.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-aberto");
}

function fecharJanelaModulosNave() {
  modalModulosNave?.classList.remove("ativo");
  modalModulosNave?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-aberto");
  selecaoModuloNave = null;
}

itensNave.forEach((item) => {
  item.addEventListener("click", () => {
    aplicarNaveSelecionada(item.dataset.nave);
  });
});

botaoAcaoNave?.addEventListener("click", comprarOuEquiparNaveSelecionada);
botaoAbrirModulosNave?.addEventListener("click", abrirModalModulosNave);
fecharModalModulosNave?.addEventListener("click", fecharJanelaModulosNave);
botaoEquiparModuloNave?.addEventListener("click", equiparModuloSelecionado);
botaoDesequiparModuloNave?.addEventListener("click", desequiparModuloSelecionado);

modalModulosNave?.addEventListener("click", (evento) => {
  if (evento.target === modalModulosNave) fecharJanelaModulosNave();
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && modalModulosNave?.classList.contains("ativo")) {
    fecharJanelaModulosNave();
  }
});

const naveEquipadaSalva =
  obterNomeNaveEquipada();

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

function chaveEstadoNaveAtual() {
  const nome = obterNomeNaveEquipada();
  return nome === "Pioneira" ? CHAVE_ESTADO_PIONEIRA : `${CHAVE_ESTADO_PIONEIRA}_${nome}`;
}

function carregarEstadoPioneira() {
  const nave = naveEquipadaAtual();
  const capacidadeCombustivel = nave.capacidadeCombustivel;
  const capacidadeUso = nave.capacidadeUso;
  const chave = chaveEstadoNaveAtual();
  const salvo = localStorage.getItem(chave);

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
      localStorage.removeItem(chave);
    }
  }

  localStorage.setItem(chave, JSON.stringify(estado));
  return estado;
}

function aplicarEstadoPioneira(estadoRecebido = null) {
  const estado = estadoRecebido || carregarEstadoPioneira();

  const combustivelTexto = document.getElementById("combustivelNaveTexto");
  const combustivelBarra = document.getElementById("combustivelNaveBarra");
  const combustivelLocalizacaoTexto = document.getElementById("combustivelLocalizacaoTexto");
  const combustivelLocalizacaoBarra = document.getElementById("combustivelLocalizacaoBarra");
  const combustivelLocalViajandoTexto = document.getElementById("combustivelLocalViajandoTexto");
  const combustivelLocalViajandoBarra = document.getElementById("combustivelLocalViajandoBarra");
  const usoTexto = document.getElementById("usoNaveTexto");
  const usoBarra = document.getElementById("usoNaveBarra");
  const usoLocalizacaoTexto = document.getElementById("usoLocalizacaoTexto");
  const usoLocalizacaoBarra = document.getElementById("usoLocalizacaoBarra");
  const usoLocalViajandoTexto = document.getElementById("usoLocalViajandoTexto");
  const usoLocalViajandoBarra = document.getElementById("usoLocalViajandoBarra");

  const nave = naveEquipadaAtual();
  const capacidadeCombustivel = estado.capacidadeCombustivel || nave.capacidadeCombustivel;
  const capacidadeUso = estado.capacidadeUso || nave.capacidadeUso;

  const combustivel = Math.max(0, Math.min(capacidadeCombustivel, estado.combustivel));
  const uso = Math.max(0, Math.min(capacidadeUso, estado.uso));

  const percentualCombustivel = (combustivel / capacidadeCombustivel) * 100;
  const percentualUso = (uso / capacidadeUso) * 100;

  const textoCombustivel = `${Number.isInteger(combustivel) ? combustivel : combustivel.toFixed(1)} / ${capacidadeCombustivel}`;
  const textoUso = `${Number.isInteger(uso) ? uso : uso.toFixed(1)} / ${capacidadeUso}`;

  [combustivelTexto, combustivelLocalizacaoTexto, combustivelLocalViajandoTexto].forEach((elemento) => {
    if (elemento) elemento.textContent = textoCombustivel;
  });

  [combustivelBarra, combustivelLocalizacaoBarra, combustivelLocalViajandoBarra].forEach((elemento) => {
    if (elemento) elemento.style.width = `${percentualCombustivel}%`;
  });

  [usoTexto, usoLocalizacaoTexto, usoLocalViajandoTexto].forEach((elemento) => {
    if (elemento) elemento.textContent = textoUso;
  });

  [usoBarra, usoLocalizacaoBarra, usoLocalViajandoBarra].forEach((elemento) => {
    if (elemento) elemento.style.width = `${percentualUso}%`;
  });
}

aplicarEstadoPioneira();


// ===== CONSUMO DE COMBUSTÍVEL E INTEGRIDADE DURANTE A VIAGEM =====
function salvarEstadoPioneira(estado) {
  const nave = naveEquipadaAtual();
  const capacidadeCombustivel = nave.capacidadeCombustivel;
  const capacidadeUso = nave.capacidadeUso;
  const normalizado = {
    combustivel: Math.max(0, Math.min(capacidadeCombustivel, estado.combustivel)),
    capacidadeCombustivel,
    uso: Math.max(0, Math.min(capacidadeUso, estado.uso)),
    capacidadeUso
  };

  localStorage.setItem(chaveEstadoNaveAtual(), JSON.stringify(normalizado));
  aplicarEstadoPioneira(normalizado);
  return normalizado;
}

function podeIniciarViagem(duracaoSegundos) {
  const estado = carregarEstadoPioneira();
  const combustivelNecessario = calcularConsumoCombustivelViagem(duracaoSegundos);
  const usoNecessario = calcularConsumoIntegridadeViagem(duracaoSegundos);

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
    alert(`A ${naveEquipadaAtual().nome} não possui Xenônio-9 ou integridade suficiente para esta viagem.`);
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
atualizarAbaPlaneta(localStorage.getItem(CHAVE_PLANETA) || PLANETA_INICIAL);


// ===== MINERAÇÃO DE OURO E INVENTÁRIO DA PIONEIRA =====
const botaoMinerar = document.getElementById("botaoMinerar");
const botaoColetarOuro = document.getElementById("botaoColetarOuro");
const barraMineracaoPreenchida = document.getElementById("barraMineracaoPreenchida");
const textoMineracao = document.getElementById("textoMineracao");
const tempoMineracao = document.getElementById("tempoMineracao");
const inventarioNaveGrade = document.getElementById("inventarioNaveGrade");
let slotsInventario = document.querySelectorAll(".slot-inventario");

const CHAVE_INVENTARIO_PIONEIRA = "cronicas_do_vazio_inventario_pioneira";
const CHAVE_MINERACAO_OURO = "cronicas_do_vazio_mineracao_ouro";
const MAX_ITENS_POR_SLOT = 10;

let mineracaoEmAndamento = false;
let ouroProntoParaColeta = false;
let animacaoMineracao = null;

function normalizarItemInventario(item) {
  if (!item) return null;

  if (item.id === "ouro") {
    return {
      ...item,
      id: "minerio_ouro",
      nome: "Minério de Ouro",
      imagem: IMAGEM_MINERIO_OURO
    };
  }

  if (item.id === "minerio_ouro") {
    return {
      ...item,
      nome: item.nome || "Minério de Ouro",
      imagem: IMAGEM_MINERIO_OURO
    };
  }

  if (item.id === "minerio_cobre") {
    return {
      ...item,
      nome: item.nome || "Minério de Cobre",
      imagem: IMAGEM_MINERIO_COBRE
    };
  }

  if (item.id === "barra_ouro") {
    return {
      ...item,
      nome: item.nome || "Barra de Ouro",
      imagem: IMAGEM_BARRA_OURO,
      preco: item.preco || 20
    };
  }

  if (item.id === "barra_cobre") {
    return {
      ...item,
      nome: item.nome || "Barra de Cobre",
      imagem: IMAGEM_BARRA_COBRE
    };
  }

  return item;
}

function capacidadeInventarioNaveAtual() {
  return naveEquipadaAtual().inventario || 5;
}

function chaveInventarioNaveAtual() {
  const nome = obterNomeNaveEquipada();
  return nome === "Pioneira" ? CHAVE_INVENTARIO_PIONEIRA : `${CHAVE_INVENTARIO_PIONEIRA}_${nome}`;
}

function garantirSlotsInventario(capacidade) {
  if (!inventarioNaveGrade) return;

  while (inventarioNaveGrade.children.length < capacidade) {
    const indice = inventarioNaveGrade.children.length;
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = "slot-inventario";
    slot.dataset.slot = String(indice);
    slot.setAttribute("aria-label", `Espaço de inventário ${indice + 1}`);
    inventarioNaveGrade.appendChild(slot);
  }

  while (inventarioNaveGrade.children.length > capacidade) {
    inventarioNaveGrade.lastElementChild?.remove();
  }

  slotsInventario = document.querySelectorAll(".slot-inventario");
}

function normalizarPilhasInventario(inventario, capacidade = capacidadeInventarioNaveAtual()) {
  const normalizado = Array(capacidade).fill(null);
  let proximoSlot = 0;

  inventario.forEach((itemOriginal) => {
    const item = normalizarItemInventario(itemOriginal);
    if (!item || proximoSlot >= normalizado.length) return;

    let restante = Math.max(0, Math.floor(Number(item.quantidade) || 0));

    while (restante > 0 && proximoSlot < normalizado.length) {
      const quantidade = Math.min(MAX_ITENS_POR_SLOT, restante);
      normalizado[proximoSlot] = {
        ...item,
        quantidade
      };
      restante -= quantidade;
      proximoSlot += 1;
    }
  });

  return normalizado;
}

function carregarInventarioPioneira() {
  const capacidade = capacidadeInventarioNaveAtual();
  const chave = chaveInventarioNaveAtual();
  const salvo = localStorage.getItem(chave);

  if (!salvo) {
    const vazio = Array(capacidade).fill(null);
    localStorage.setItem(chave, JSON.stringify(vazio));
    return vazio;
  }

  try {
    const inventario = JSON.parse(salvo);
    const normalizado = normalizarPilhasInventario(
      Array.from({ length: capacidade }, (_, i) => inventario[i] || null),
      capacidade
    );
    localStorage.setItem(chave, JSON.stringify(normalizado));
    return normalizado;
  } catch {
    const vazio = Array(capacidade).fill(null);
    localStorage.setItem(chave, JSON.stringify(vazio));
    return vazio;
  }
}

function salvarInventarioPioneira(inventario) {
  const normalizado = normalizarPilhasInventario(inventario, capacidadeInventarioNaveAtual());
  localStorage.setItem(chaveInventarioNaveAtual(), JSON.stringify(normalizado));
  renderizarInventarioPioneira();
}

function renderizarInventarioPioneira() {
  garantirSlotsInventario(capacidadeInventarioNaveAtual());

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
      imagem.src = IMAGEM_MINERIO_OURO;
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
  return adicionarItemAoInventario({
    id: "minerio_ouro",
    nome: "Minério de Ouro",
    imagem: IMAGEM_MINERIO_OURO
  }, quantidade);
}

function atualizarEstadoVisualMineracao() {
  botaoMinerar.hidden = mineracaoEmAndamento || ouroProntoParaColeta;
  botaoColetarOuro.hidden = !ouroProntoParaColeta;
}

function iniciarMineracaoOuro() {
  abrirModalMineracao("ouro");
}

function coletarOuroMinerado() {
  if (!ouroProntoParaColeta) return;

  const adicionado = adicionarOuroAoInventario(10);
  if (!adicionado) return;

  adicionarXP(1);

  ouroProntoParaColeta = false;
  localStorage.removeItem(CHAVE_MINERACAO_OURO);

  textoMineracao.textContent = "Pronto para minerar";
  tempoMineracao.textContent = "10min";
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

function calcularDistanciaViagem(origem, destino) {
  if (origem === destino) return 0;

  const rota = [origem, destino].sort().join(">");

  if (rota === ["Nave Mãe", "Terra"].sort().join(">")) {
    return DISTANCIA_TERRA_MARTE_KM / 2;
  }

  if (rota === ["Marte", "Nave Mãe"].sort().join(">")) {
    return DISTANCIA_TERRA_MARTE_KM / 2;
  }

  if (rota === ["Marte", "Terra"].sort().join(">")) {
    return DISTANCIA_TERRA_MARTE_KM;
  }

  return DISTANCIA_TERRA_MARTE_KM / 2;
}

function calcularTempoViagem(origem, destino, nave = naveEquipadaAtual()) {
  const distancia = calcularDistanciaViagem(origem, destino);
  if (distancia <= 0) return 0;

  return Math.max(1, Math.round(distancia / calcularVelocidadeRealNave(nave)));
}

function calcularConsumoCombustivelViagem(duracaoSegundos) {
  return Math.max(1, Math.ceil(duracaoSegundos / SEGUNDOS_POR_MINUTO));
}

function calcularConsumoIntegridadeViagem(duracaoSegundos) {
  return calcularConsumoCombustivelViagem(duracaoSegundos) * 0.5;
}

function formatarNumeroRecurso(valor) {
  return Number.isInteger(valor) ? String(valor) : valor.toFixed(1).replace(".", ",");
}

function calcularConsumoAtividade(duracaoSegundos) {
  return {
    combustivel: calcularConsumoCombustivelViagem(duracaoSegundos),
    uso: calcularConsumoIntegridadeViagem(duracaoSegundos)
  };
}

function temRecursosPioneiraParaAtividade(duracaoSegundos) {
  const estado = carregarEstadoPioneira();
  const consumo = calcularConsumoAtividade(duracaoSegundos);

  return (
    estado.combustivel >= consumo.combustivel &&
    estado.uso >= consumo.uso
  );
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

  if (painelLocalViajando) {
    painelLocalViajando.hidden = true;
  }

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

  const origem = localStorage.getItem(CHAVE_PLANETA) || PLANETA_INICIAL;
  if (destino === origem) return;

  const nave = naveEquipadaAtual();
  const distanciaKm = calcularDistanciaViagem(origem, destino);
  const tempoSegundos = calcularTempoViagem(origem, destino);
  const consumoCombustivel = calcularConsumoCombustivelViagem(tempoSegundos);
  const consumoUso = calcularConsumoIntegridadeViagem(tempoSegundos);

  destinoSelecionado = destino;

  tituloModalViagem.textContent = `Viajar para ${destino}?`;
  descricaoModalViagem.textContent =
    `A viagem de ${origem} até ${destino} percorre ${formatarKm(distanciaKm)} km ` +
    `e demora ${formatarDuracao(tempoSegundos)} com a ${nave.nome}.`;

  resumoTempoViagem.textContent = formatarDuracao(tempoSegundos);
  resumoCombustivelViagem.textContent = `${consumoCombustivel} unidades`;
  resumoUsoViagem.textContent =
    `${Number.isInteger(consumoUso) ? consumoUso : consumoUso.toFixed(1)} pontos`;

  modalViagem.classList.add("ativo");
  modalViagem.setAttribute("aria-hidden", "false");
};

function atualizarPainelLocalViajando(destino, restanteSegundos) {
  if (!painelLocalViajando) return;

  const nave = naveEquipadaAtual();
  painelLocalViajando.hidden = false;

  if (tituloLocalViajando) {
    tituloLocalViajando.textContent = "Aguarde, viajando no momento";
  }

  if (textoLocalViajando) {
    textoLocalViajando.textContent = `A ${nave.nome} está em rota para ${destino}.`;
  }

  if (tempoLocalViajando) {
    tempoLocalViajando.textContent = formatarTempoCurto(restanteSegundos);
  }

  if (tituloPlanetaDetalhes) {
    tituloPlanetaDetalhes.textContent = "Em viagem";
  }

  if (imagemPlanetaDetalhes) {
    imagemPlanetaDetalhes.src = IMAGEM_VIAJANDO;
    imagemPlanetaDetalhes.alt = "Nave em viagem";
  }

  if (conteudoPlanetaNormal) conteudoPlanetaNormal.hidden = true;
  if (painelNaveMae) painelNaveMae.hidden = true;
}

iniciarViagem = function(destino) {
  if (!destino || viagemEmAndamento) return;

  const origem = localStorage.getItem(CHAVE_PLANETA) || PLANETA_INICIAL;
  const duracaoSegundos = calcularTempoViagem(origem, destino);
  const consumoCombustivelTotal = calcularConsumoCombustivelViagem(duracaoSegundos);
  const consumoUsoTotal = calcularConsumoIntegridadeViagem(duracaoSegundos);

  if (!podeIniciarViagem(duracaoSegundos)) {
    alert(`A ${naveEquipadaAtual().nome} não possui Xenônio-9 ou integridade suficiente.`);
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
  let ultimoSegundoAtualizado = -1;

  nomePlanetaLocalizacao.textContent = `Viajando para ${destino}`;
  imagemPlanetaAtual.src = IMAGEM_VIAJANDO;
  textoViagem.textContent = "Tempo restante";
  tempoViagem.textContent = formatarTempoCurto(duracaoSegundos);
  barraViagemPreenchida.style.width = "0%";
  atualizarPainelLocalViajando(destino, duracaoSegundos);

  function atualizar(agora) {
    const decorrido = agora - inicio;
    const progresso = Math.min(decorrido / duracao, 1);
    const segundos = Math.min(duracaoSegundos, Math.floor(decorrido / 1000));
    const restante = Math.max(0, Math.ceil((duracao - decorrido) / 1000));

    if (segundos !== ultimoSegundoAtualizado || progresso >= 1) {
      ultimoSegundoAtualizado = segundos;
      salvarEstadoPioneira({
        combustivel: estadoInicial.combustivel - (consumoCombustivelTotal * progresso),
        uso: estadoInicial.uso - (consumoUsoTotal * progresso)
      });
    }

    barraViagemPreenchida.style.width = `${progresso * 100}%`;
    tempoViagem.textContent = formatarTempoCurto(restante);
    atualizarPainelLocalViajando(destino, restante);

    if (progresso < 1) {
      timerViagem = requestAnimationFrame(atualizar);
      return;
    }

    salvarEstadoPioneira({
      combustivel: estadoInicial.combustivel - consumoCombustivelTotal,
      uso: estadoInicial.uso - consumoUsoTotal
    });

    viagemEmAndamento = false;
    definirBloqueioCards(false);
    atualizarPlanetaDaConta(destino);
    atualizarInterfaceLocalizacao(destino);
    if (destino === "Terra") concluirMissao("viajar_terra");

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
    `Escolha a quantidade para vender. Você possui ${quantidade}.`;
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

  if (idItemVenda === "barra_ouro" && quantidadeVendida > 0) {
    concluirMissao("vender_barra_ouro");
  }

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
  localStorage.getItem(CHAVE_PLANETA) || PLANETA_INICIAL
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
  const local = localAtual || localStorage.getItem(CHAVE_PLANETA) || PLANETA_INICIAL;
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
    const nave = naveEquipadaAtual();
    const estado = carregarEstadoPioneira();

    if (estado.combustivel >= nave.capacidadeCombustivel) {
      alert("O tanque já está em 100%.");
      concluirMissao("reabastecer_nave");
      return;
    }

    if (!gastarCreditos(10)) return;

    salvarEstadoPioneira({
      combustivel: nave.capacidadeCombustivel,
      uso: estado.uso
    });

    alert("Tanque cheio.");
    concluirMissao("reabastecer_nave");
  };
}

if (botaoReparar) {
  botaoReparar.onclick = () => {
    const nave = naveEquipadaAtual();
    const estado = carregarEstadoPioneira();

    if (estado.uso >= nave.capacidadeUso) {
      alert("A integridade já está em 100%.");
      return;
    }

    if (!gastarCreditos(10)) return;

    salvarEstadoPioneira({
      combustivel: estado.combustivel,
      uso: nave.capacidadeUso
    });

    alert(`${nave.nome} consertada.`);
  };
}

// Sempre sincroniza a aba Local com a localização atual.
const atualizarPlanetaDaContaOriginal = atualizarPlanetaDaConta;
atualizarPlanetaDaConta = function(local) {
  atualizarPlanetaDaContaOriginal(local);
  atualizarAbaLocal(local);
};

atualizarCreditosEmTodaInterface();
atualizarAbaLocal(localStorage.getItem(CHAVE_PLANETA) || PLANETA_INICIAL);


// ===== TRIPULACAO, PODER, XP E FABRICA =====
const CHAVE_XP_JOGADOR = "cronicas_do_vazio_xp_jogador";
const CHAVE_ENERGIA_FABRICA = "cronicas_do_vazio_energia_fabrica";
const CHAVE_ENERGIA_FABRICA_ATUALIZADA_EM = "cronicas_do_vazio_energia_fabrica_atualizada_em";
const CHAVE_FABRICACAO_BARRA_OURO = "cronicas_do_vazio_fabricacao_barra_ouro";
const CHAVE_FABRICACAO_ATUAL = "cronicas_do_vazio_fabricacao_atual";
const CHAVE_MINERACAO_PRONTA = "cronicas_do_vazio_mineracao_pronta";
const CHAVE_MISSAO_ATUAL = "cronicas_do_vazio_missao_atual";
const CHAVE_MISSOES_CONCLUIDAS = "cronicas_do_vazio_missoes_concluidas";

const ITEM_MINERIO_OURO = {
  id: "minerio_ouro",
  nome: "Minério de Ouro",
  imagem: IMAGEM_MINERIO_OURO
};

const ITEM_MINERIO_COBRE = {
  id: "minerio_cobre",
  nome: "Minério de Cobre",
  imagem: IMAGEM_MINERIO_COBRE
};

const ITEM_BARRA_OURO = {
  id: "barra_ouro",
  nome: "Barra de Ouro",
  imagem: IMAGEM_BARRA_OURO,
  preco: 20
};

const ITEM_BARRA_COBRE = {
  id: "barra_cobre",
  nome: "Barra de Cobre",
  imagem: IMAGEM_BARRA_COBRE
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
const botoesCategoriaFabrica = document.querySelectorAll(".fabrica-categoria");
const fabricaPainelMinerios = document.getElementById("fabricaPainelMinerios");
const fabricaPainelArmas = document.getElementById("fabricaPainelArmas");
const botoesIniciarReceitaFabrica = document.querySelectorAll("[data-iniciar-receita]");
const botoesColetarReceitaFabrica = document.querySelectorAll("[data-coletar-receita]");
const estoquesReceitaFabrica = document.querySelectorAll("[data-estoque]");
const modalMineracao = document.getElementById("modalMineracao");
const tituloModalMineracao = document.getElementById("tituloModalMineracao");
const imagemModalMineracao = document.getElementById("imagemModalMineracao");
const tempoModalMineracao = document.getElementById("tempoModalMineracao");
const requisitoModalMineracao = document.getElementById("requisitoModalMineracao");
const recompensaModalMineracao = document.getElementById("recompensaModalMineracao");
const textoModalMineracao = document.getElementById("textoModalMineracao");
const tempoRestanteModalMineracao = document.getElementById("tempoRestanteModalMineracao");
const barraModalMineracao = document.getElementById("barraModalMineracao");
const iniciarModalMineracao = document.getElementById("iniciarModalMineracao");
const sairModalMineracao = document.getElementById("sairModalMineracao");
const coletarModalMineracao = document.getElementById("coletarModalMineracao");
const botoesMineracao = document.querySelectorAll(".botao-minerar[data-mineracao]");

let energiaFabrica = carregarEnergiaFabrica();
let ultimoRenderEnergiaFabrica = 0;
let fabricacaoEmAndamento = false;
let fabricacaoAtual = null;
let fabricacaoPronta = false;
let mineracaoSelecionada = null;
let mineracaoPronta = null;

const RECEITAS_FABRICA = {
  barra_ouro: {
    id: "barra_ouro",
    nome: "Barra de Ouro",
    entrada: ITEM_MINERIO_OURO,
    quantidadeEntrada: 10,
    saida: ITEM_BARRA_OURO,
    duracaoSegundos: TEMPO_FABRICACAO_SEGUNDOS,
    energiaNecessaria: 10
  },
  barra_cobre: {
    id: "barra_cobre",
    nome: "Barra de Cobre",
    entrada: ITEM_MINERIO_COBRE,
    quantidadeEntrada: 10,
    saida: ITEM_BARRA_COBRE,
    duracaoSegundos: TEMPO_FABRICACAO_SEGUNDOS,
    energiaNecessaria: 10
  }
};

fabricacaoAtual = carregarFabricacaoAtual();
fabricacaoPronta = !!fabricacaoAtual && Date.now() >= fabricacaoAtual.fim;

const MINERACOES = {
  ouro: {
    id: "ouro",
    titulo: "Mineração de Minério de Ouro",
    imagem: IMAGEM_EVENTO_OURO,
    tempoSegundos: TEMPO_MINERACAO_SEGUNDOS,
    poderNecessario: 10,
    recompensaQuantidade: 10,
    xp: 1,
    item: ITEM_MINERIO_OURO
  },
  cobre: {
    id: "cobre",
    titulo: "Mineração de Minério de Cobre",
    imagem: IMAGEM_EVENTO_COBRE,
    tempoSegundos: TEMPO_MINERACAO_SEGUNDOS,
    poderNecessario: 15,
    recompensaQuantidade: 10,
    xp: 1,
    item: ITEM_MINERIO_COBRE
  }
};

mineracaoPronta = carregarMineracaoPronta();
ouroProntoParaColeta = !!mineracaoPronta;

if (imagemResultadoFabrica) {
  imagemResultadoFabrica.addEventListener("error", () => {
    imagemResultadoFabrica.src = ITEM_MINERIO_OURO.imagem;
  }, { once: true });
}

function naveEquipadaAtual() {
  const nome = obterNomeNaveEquipada();
  return obterNaveComModulos(nome);
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
  const imagemCapitao = TRIPULANTES.lian.imagem;

  if (imagemPerfil) {
    if (imagemPerfil.getAttribute("src") !== imagemCapitao) {
      imagemPerfil.src = imagemCapitao;
    }
  }

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

const MISSOES_IA = [
  {
    conclusao: "viajar_terra",
    etiqueta: "Treinamento de Viajante",
    titulo: "Rota inicial para a Terra",
    texto:
      "Piloto, eu sou a IA de bordo da Nave Mãe. Antes de iniciar qualquer coleta, confirme que sabe usar o mapa de rotas e alcançar a Terra sem perder o controle da nave.",
    objetivo: "Clique na aba Localização viaja até a Terra"
  },
  {
    conclusao: "coletar_ouro",
    etiqueta: "Primeira Coleta",
    titulo: "Ouro sob a crosta",
    texto:
      "A Terra ainda guarda veios antigos de ouro entre ruínas, crateras e poeira magnética. Aproxime a nave de uma zona segura e traga o primeiro minério bruto para o inventário.",
    objetivo: "Agora na aba Local colete minério de ouro"
  },
  {
    conclusao: "fabricar_barra_ouro",
    etiqueta: "Forja Inicial",
    titulo: "Transforme minério em valor",
    texto:
      "Excelente coleta. Minério bruto ocupa espaço e ainda não revela todo o seu valor. Use a Fábrica para fundir o ouro e abrir sua primeira rota de comércio. Enquanto as máquinas trabalham, sua nave pode continuar buscando mais minério.",
    objetivo: "Clique na aba Fabrica e transforme seus minérios de ouro em barra de ouro, enquanto fabrica é opcional você pode estar coletando mais minério"
  },
  {
    conclusao: "vender_barra_ouro",
    etiqueta: "Primeiro Comércio",
    titulo: "Venda a primeira barra de ouro",
    texto:
      "Com a barra pronta, retorne para a Nave Mãe. O mercado da estação reconhece metal refinado como carga comercial, e essa venda registra sua primeira operação completa de coleta, fabricação e comércio.",
    objetivo: "Volte para a nave mãe na aba Localização, e venda sua barra de ouro na aba Local"
  },
  {
    conclusao: "reabastecer_nave",
    etiqueta: "Manutenção de Rota",
    titulo: "Prepare o próximo salto",
    texto:
      "Toda rota deixa marcas no casco e no tanque. Antes que a IA libere contratos maiores, garanta que a nave esteja abastecida para não ficar presa longe da estação.",
    objetivo: "Não esqueça que tem que reabastecer a nave, na aba Local na Nave mãe clique em Encher o tanque de Xenônio-9"
  }
];

function carregarIndiceMissaoAtual() {
  const indice = Number(localStorage.getItem(CHAVE_MISSAO_ATUAL) || "0");
  return Number.isFinite(indice) && indice >= 0 ? Math.floor(indice) : 0;
}

function carregarTotalMissoesConcluidas() {
  const total = Number(localStorage.getItem(CHAVE_MISSOES_CONCLUIDAS) || "0");
  return Number.isFinite(total) && total >= 0 ? Math.floor(total) : 0;
}

function salvarEstadoMissoes(indice, concluidas) {
  localStorage.setItem(CHAVE_MISSAO_ATUAL, String(Math.max(0, Math.floor(indice))));
  localStorage.setItem(CHAVE_MISSOES_CONCLUIDAS, String(Math.max(0, Math.floor(concluidas))));
}

function atualizarMissoes() {
  const indice = carregarIndiceMissaoAtual();
  const concluidas = carregarTotalMissoesConcluidas();
  const missao = MISSOES_IA[indice];

  if (missoesConcluidasPerfil) missoesConcluidasPerfil.textContent = String(concluidas);
  if (missoesConcluidasAba) missoesConcluidasAba.textContent = String(concluidas);

  if (missao?.conclusao === "viajar_terra" && localStorage.getItem(CHAVE_PLANETA) === "Terra") {
    concluirMissao("viajar_terra");
    return;
  }

  if (!missao) {
    if (etiquetaMissaoAtual) etiquetaMissaoAtual.textContent = "Continuação";
    if (tituloMissaoAtual) tituloMissaoAtual.textContent = "Continuação em BREVE";
    if (textoMissaoAtual) {
      textoMissaoAtual.textContent =
        "Treinamento concluído com sucesso. A IA da Nave Mãe está preparando novos contratos, novas rotas e desafios mais profundos pelo vazio.";
    }
    if (objetivoMissaoAtual) objetivoMissaoAtual.textContent = "Aguarde novas ordens da IA.";
    return;
  }

  if (etiquetaMissaoAtual) etiquetaMissaoAtual.textContent = missao.etiqueta;
  if (tituloMissaoAtual) tituloMissaoAtual.textContent = missao.titulo;
  if (textoMissaoAtual) textoMissaoAtual.textContent = missao.texto;
  if (objetivoMissaoAtual) objetivoMissaoAtual.textContent = missao.objetivo;
}

function concluirMissao(tipoConclusao) {
  const indice = carregarIndiceMissaoAtual();
  const missao = MISSOES_IA[indice];

  if (!missao || missao.conclusao !== tipoConclusao) return;

  salvarEstadoMissoes(indice + 1, carregarTotalMissoesConcluidas() + 1);
  atualizarMissoes();
}

if (imagemIaMissoes) {
  imagemIaMissoes.addEventListener("error", () => {
    imagemIaMissoes.src = "imagens/personagens/lian.png";
  }, { once: true });
}

function carregarMineracaoPronta() {
  const salvo = localStorage.getItem(CHAVE_MINERACAO_PRONTA);

  if (salvo) {
    try {
      const dados = JSON.parse(salvo);
      return MINERACOES[dados.tipo] || null;
    } catch {
      localStorage.removeItem(CHAVE_MINERACAO_PRONTA);
    }
  }

  if (localStorage.getItem(CHAVE_MINERACAO_OURO) === "pronto") {
    return MINERACOES.ouro;
  }

  return null;
}

function salvarMineracaoPronta(mineracao) {
  mineracaoPronta = mineracao;
  ouroProntoParaColeta = !!mineracao;

  if (mineracao) {
    localStorage.setItem(CHAVE_MINERACAO_PRONTA, JSON.stringify({ tipo: mineracao.id }));
    localStorage.setItem(CHAVE_MINERACAO_OURO, "pronto");
  } else {
    localStorage.removeItem(CHAVE_MINERACAO_PRONTA);
    localStorage.removeItem(CHAVE_MINERACAO_OURO);
  }

  atualizarEstadoVisualMineracao();
}

function podeAdicionarItemAoInventario(itemBase, quantidade) {
  const inventario = carregarInventarioPioneira();
  let restante = Math.max(0, Math.floor(Number(quantidade) || 0));

  inventario.forEach((item) => {
    if (!item || item.id !== itemBase.id || restante <= 0) return;
    restante -= Math.min(MAX_ITENS_POR_SLOT - item.quantidade, restante);
  });

  inventario.forEach((item) => {
    if (item || restante <= 0) return;
    restante -= Math.min(MAX_ITENS_POR_SLOT, restante);
  });

  return restante <= 0;
}

function preencherModalMineracao(mineracao) {
  if (!mineracao) return;

  if (tituloModalMineracao) tituloModalMineracao.textContent = mineracao.titulo;
  if (imagemModalMineracao) {
    imagemModalMineracao.src = mineracao.imagem;
    imagemModalMineracao.alt = mineracao.titulo;
  }
  if (tempoModalMineracao) tempoModalMineracao.textContent = `Tempo: ${formatarDuracao(mineracao.tempoSegundos)}`;
  if (requisitoModalMineracao) {
    const consumo = calcularConsumoAtividade(mineracao.tempoSegundos);

    requisitoModalMineracao.textContent =
      `Requisito: ${mineracao.poderNecessario} poder, ` +
      `${consumo.combustivel} Xenônio-9 e ${formatarNumeroRecurso(consumo.uso)} integridade`;
  }
  if (recompensaModalMineracao) {
    recompensaModalMineracao.textContent =
      `Recompensa: ${mineracao.recompensaQuantidade} ${mineracao.item.nome.toLowerCase()} + ${mineracao.xp} XP`;
  }
  if (textoModalMineracao) textoModalMineracao.textContent = "Aguardando início";
  if (tempoRestanteModalMineracao) tempoRestanteModalMineracao.textContent = formatarTempoCurto(mineracao.tempoSegundos);
  if (barraModalMineracao) barraModalMineracao.style.width = "0%";
  if (iniciarModalMineracao) {
    iniciarModalMineracao.hidden = !!mineracaoPronta;
    iniciarModalMineracao.disabled = false;
  }
  if (sairModalMineracao) {
    sairModalMineracao.hidden = false;
    sairModalMineracao.disabled = false;
  }
  if (coletarModalMineracao) {
    coletarModalMineracao.hidden = !mineracaoPronta;
    coletarModalMineracao.textContent = `Coletar ${mineracao.recompensaQuantidade} ${mineracao.item.nome.toLowerCase()}`;
  }
}

function abrirModalMineracao(tipo) {
  if (mineracaoEmAndamento) return;

  const mineracao = mineracaoPronta || MINERACOES[tipo];
  if (!mineracao) return;

  if (!mineracaoPronta && calcularPoderTotal() < mineracao.poderNecessario) {
    alert(`A nave equipada precisa de ${mineracao.poderNecessario} de poder para iniciar esta mineração.`);
    return;
  }

  if (!mineracaoPronta && !podeAdicionarItemAoInventario(mineracao.item, mineracao.recompensaQuantidade)) {
    alert("O inventário da nave equipada não possui espaço para esta recompensa.");
    return;
  }

  mineracaoSelecionada = mineracao;
  preencherModalMineracao(mineracao);
  modalMineracao?.classList.add("ativo");
  modalMineracao?.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-mineracao-travada");
}

function fecharModalMineracao() {
  modalMineracao?.classList.remove("ativo");
  modalMineracao?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-mineracao-travada");
  mineracaoSelecionada = null;
}

function iniciarMineracaoSelecionada() {
  const mineracao = mineracaoSelecionada;
  if (!mineracao || mineracaoEmAndamento || mineracaoPronta) return;

  if (calcularPoderTotal() < mineracao.poderNecessario) {
    alert(`A nave equipada precisa de ${mineracao.poderNecessario} de poder para iniciar esta mineração.`);
    return;
  }

  if (!temRecursosPioneiraParaAtividade(mineracao.tempoSegundos)) {
    const consumo = calcularConsumoAtividade(mineracao.tempoSegundos);

    alert(
      `A nave equipada precisa de ${consumo.combustivel} Xenônio-9 e ` +
      `${formatarNumeroRecurso(consumo.uso)} de integridade para iniciar esta mineração.`
    );
    return;
  }

  mineracaoEmAndamento = true;
  atualizarEstadoVisualMineracao();

  if (iniciarModalMineracao) iniciarModalMineracao.hidden = true;
  if (coletarModalMineracao) coletarModalMineracao.hidden = true;
  if (textoModalMineracao) textoModalMineracao.textContent = "Minerando";
  if (tempoRestanteModalMineracao) tempoRestanteModalMineracao.textContent = formatarTempoCurto(mineracao.tempoSegundos);
  if (barraModalMineracao) barraModalMineracao.style.width = "0%";
  if (sairModalMineracao) sairModalMineracao.disabled = true;

  const duracao = mineracao.tempoSegundos * 1000;
  const inicio = performance.now();
  const estadoInicial = carregarEstadoPioneira();
  const consumo = calcularConsumoAtividade(mineracao.tempoSegundos);
  let ultimoSegundoAtualizado = -1;

  function atualizar(agora) {
    const decorrido = agora - inicio;
    const progresso = Math.min(decorrido / duracao, 1);
    const segundos = Math.min(mineracao.tempoSegundos, Math.floor(decorrido / 1000));
    const restante = Math.max(0, Math.ceil((duracao - decorrido) / 1000));

    if (segundos !== ultimoSegundoAtualizado || progresso >= 1) {
      ultimoSegundoAtualizado = segundos;
      salvarEstadoPioneira({
        combustivel: estadoInicial.combustivel - (consumo.combustivel * progresso),
        uso: estadoInicial.uso - (consumo.uso * progresso)
      });
    }

    if (barraModalMineracao) barraModalMineracao.style.width = `${progresso * 100}%`;
    if (tempoRestanteModalMineracao) tempoRestanteModalMineracao.textContent = formatarTempoCurto(restante);

    if (progresso < 1) {
      animacaoMineracao = requestAnimationFrame(atualizar);
      return;
    }

    mineracaoEmAndamento = false;
    salvarEstadoPioneira({
      combustivel: estadoInicial.combustivel - consumo.combustivel,
      uso: estadoInicial.uso - consumo.uso
    });
    salvarMineracaoPronta(mineracao);

    if (textoModalMineracao) textoModalMineracao.textContent = "Mineração concluída";
    if (tempoRestanteModalMineracao) tempoRestanteModalMineracao.textContent = "Pronto";
    if (barraModalMineracao) barraModalMineracao.style.width = "100%";
    if (sairModalMineracao) sairModalMineracao.disabled = false;
    if (coletarModalMineracao) {
      coletarModalMineracao.hidden = false;
      coletarModalMineracao.textContent = `Coletar ${mineracao.recompensaQuantidade} ${mineracao.item.nome.toLowerCase()}`;
    }
  }

  animacaoMineracao = requestAnimationFrame(atualizar);
}

function coletarMineracaoSelecionada() {
  const mineracao = mineracaoPronta || mineracaoSelecionada;
  if (!mineracao || mineracaoEmAndamento) return;

  if (!adicionarItemAoInventario(mineracao.item, mineracao.recompensaQuantidade)) return;

  adicionarXP(mineracao.xp);
  if (mineracao.item.id === "minerio_ouro") {
    concluirMissao("coletar_ouro");
  }
  salvarMineracaoPronta(null);
  fecharModalMineracao();
}

function contarItemInventario(idItem) {
  return carregarInventarioPioneira()
    .filter((item) => item?.id === idItem)
    .reduce((total, item) => total + item.quantidade, 0);
}

function adicionarItemAoInventario(itemBase, quantidade) {
  const inventario = carregarInventarioPioneira();
  let restante = Math.max(0, Math.floor(Number(quantidade) || 0));

  if (restante <= 0) return true;

  inventario.forEach((item) => {
    if (!item || item.id !== itemBase.id || restante <= 0) return;

    const espaco = MAX_ITENS_POR_SLOT - item.quantidade;
    if (espaco <= 0) return;

    const adicionar = Math.min(espaco, restante);
    item.quantidade += adicionar;
    restante -= adicionar;
  });

  while (restante > 0) {
    const slotLivre = inventario.findIndex((item) => item === null);

    if (slotLivre < 0) {
      alert("O inventário da nave equipada está cheio.");
      return false;
    }

    const adicionar = Math.min(MAX_ITENS_POR_SLOT, restante);
    inventario[slotLivre] = {
      id: itemBase.id,
      nome: itemBase.nome,
      quantidade: adicionar,
      imagem: itemBase.imagem,
      preco: itemBase.preco
    };
    restante -= adicionar;
  }

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
  const salvo = localStorage.getItem(CHAVE_ENERGIA_FABRICA);
  const energia = Number(salvo);

  if (salvo === null || !Number.isFinite(energia)) {
    localStorage.setItem(CHAVE_ENERGIA_FABRICA, "100");
    localStorage.setItem(CHAVE_ENERGIA_FABRICA_ATUALIZADA_EM, String(Date.now()));
    return 100;
  }

  return Math.max(0, Math.min(100, energia));
}

function salvarEnergiaFabrica(valor, atualizadoEm = Date.now()) {
  energiaFabrica = Math.max(0, Math.min(100, Math.floor(valor)));
  localStorage.setItem(CHAVE_ENERGIA_FABRICA, String(Math.floor(energiaFabrica)));
  localStorage.setItem(CHAVE_ENERGIA_FABRICA_ATUALIZADA_EM, String(atualizadoEm));
}

function carregarAtualizacaoEnergiaFabrica() {
  const salvo = Number(localStorage.getItem(CHAVE_ENERGIA_FABRICA_ATUALIZADA_EM));

  if (!Number.isFinite(salvo) || salvo <= 0) {
    const agora = Date.now();
    localStorage.setItem(CHAVE_ENERGIA_FABRICA_ATUALIZADA_EM, String(agora));
    return agora;
  }

  return salvo;
}

function carregarFabricacaoAtual() {
  const salvo = localStorage.getItem(CHAVE_FABRICACAO_ATUAL);

  if (salvo) {
    try {
      const fabricacao = JSON.parse(salvo);
      if (fabricacao?.tipo && RECEITAS_FABRICA[fabricacao.tipo]) {
        return fabricacao;
      }
    } catch {
      localStorage.removeItem(CHAVE_FABRICACAO_ATUAL);
    }
  }

  if (localStorage.getItem(CHAVE_FABRICACAO_BARRA_OURO) === "pronto") {
    const agora = Date.now();
    return {
      tipo: "barra_ouro",
      inicio: agora - (TEMPO_FABRICACAO_SEGUNDOS * 1000),
      fim: agora - 1000
    };
  }

  return null;
}

function salvarFabricacaoAtual(fabricacao) {
  fabricacaoAtual = fabricacao;
  fabricacaoEmAndamento = !!fabricacao && Date.now() < fabricacao.fim;
  fabricacaoPronta = !!fabricacao && Date.now() >= fabricacao.fim;

  if (fabricacao) {
    localStorage.setItem(CHAVE_FABRICACAO_ATUAL, JSON.stringify(fabricacao));
  } else {
    localStorage.removeItem(CHAVE_FABRICACAO_ATUAL);
    localStorage.removeItem(CHAVE_FABRICACAO_BARRA_OURO);
  }
}

function sincronizarEnergiaFabrica() {
  let atualizadoEm = carregarAtualizacaoEnergiaFabrica();
  const agora = Date.now();
  const fabricacao = fabricacaoAtual;

  if (atualizadoEm > agora) atualizadoEm = agora;

  const minutosPassados = Math.floor((agora - atualizadoEm) / 60000);

  if (minutosPassados <= 0) {
    salvarEnergiaFabrica(energiaFabrica, atualizadoEm);
    return;
  }

  let minutosFabricando = 0;

  if (fabricacao) {
    const primeiroMinuto = Math.max(
      1,
      Math.floor((fabricacao.inicio - atualizadoEm) / 60000) + 1
    );
    const ultimoMinuto = Math.min(
      minutosPassados,
      Math.floor((fabricacao.fim - atualizadoEm) / 60000)
    );

    minutosFabricando = Math.max(0, ultimoMinuto - primeiroMinuto + 1);
  }

  const minutosCarregando = minutosPassados - minutosFabricando;
  energiaFabrica += minutosCarregando - minutosFabricando;
  energiaFabrica = Math.max(0, Math.min(100, energiaFabrica));
  atualizadoEm += minutosPassados * 60000;

  salvarEnergiaFabrica(energiaFabrica, atualizadoEm);
}

function atualizarCategoriaFabrica(categoria) {
  const mostrarMinerios = categoria !== "armas";

  botoesCategoriaFabrica.forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.fabricaCategoria === (mostrarMinerios ? "minerios" : "armas"));
  });

  if (fabricaPainelMinerios) fabricaPainelMinerios.hidden = !mostrarMinerios;
  if (fabricaPainelArmas) fabricaPainelArmas.hidden = mostrarMinerios;
}

function estadoFabricacaoAtual() {
  if (!fabricacaoAtual) {
    fabricacaoEmAndamento = false;
    fabricacaoPronta = false;
    return null;
  }

  const receita = RECEITAS_FABRICA[fabricacaoAtual.tipo];

  if (!receita) {
    salvarFabricacaoAtual(null);
    return null;
  }

  const agora = Date.now();
  const duracao = Math.max(1, fabricacaoAtual.fim - fabricacaoAtual.inicio);
  const progresso = Math.min(Math.max((agora - fabricacaoAtual.inicio) / duracao, 0), 1);
  const pronta = agora >= fabricacaoAtual.fim;

  fabricacaoEmAndamento = !pronta;
  fabricacaoPronta = pronta;

  return {
    receita,
    progresso,
    pronta,
    restanteSegundos: Math.max(0, Math.ceil((fabricacaoAtual.fim - agora) / 1000))
  };
}

function atualizarInterfaceFabrica() {
  sincronizarEnergiaFabrica();

  const estado = estadoFabricacaoAtual();
  const receitaAtiva = estado?.receita || null;

  if (quantidadeMinerioFabrica) {
    quantidadeMinerioFabrica.textContent = String(contarItemInventario(ITEM_MINERIO_OURO.id));
  }

  estoquesReceitaFabrica.forEach((elemento) => {
    const quantidade = contarItemInventario(elemento.dataset.estoque);
    elemento.textContent = `Minérios: ${quantidade}`;
  });

  if (energiaFabricaTexto) {
    energiaFabricaTexto.textContent = `${Math.floor(energiaFabrica)} / 100`;
  }

  if (barraEnergiaFabrica) {
    barraEnergiaFabrica.style.width = `${energiaFabrica}%`;
  }

  Object.values(RECEITAS_FABRICA).forEach((receita) => {
    const estoqueEntrada = contarItemInventario(receita.entrada.id);
    const status = document.querySelector(`[data-status-receita="${receita.id}"]`);
    const tempo = document.querySelector(`[data-tempo-receita="${receita.id}"]`);
    const barra = document.querySelector(`[data-barra-receita="${receita.id}"]`);
    const botaoIniciar = document.querySelector(`[data-iniciar-receita="${receita.id}"]`);
    const botaoColetar = document.querySelector(`[data-coletar-receita="${receita.id}"]`);
    const ehReceitaAtiva = receitaAtiva?.id === receita.id;
    const fabricaOcupada = !!receitaAtiva;

    if (ehReceitaAtiva && estado.pronta) {
      if (status) status.textContent = "Fabricação concluída";
      if (tempo) tempo.textContent = "Pronto";
      if (barra) barra.style.width = "100%";
      if (botaoIniciar) {
        botaoIniciar.disabled = true;
        botaoIniciar.textContent = "Pronto";
      }
      if (botaoColetar) {
        botaoColetar.hidden = false;
        botaoColetar.textContent = `Coletar ${receita.saida.nome.toLowerCase()}`;
      }
      return;
    }

    if (ehReceitaAtiva) {
      if (status) status.textContent = "Fabricando";
      if (tempo) tempo.textContent = formatarTempoCurto(estado.restanteSegundos);
      if (barra) barra.style.width = `${estado.progresso * 100}%`;
      if (botaoIniciar) {
        botaoIniciar.disabled = true;
        botaoIniciar.textContent = "Fabricando";
      }
      if (botaoColetar) botaoColetar.hidden = true;
      return;
    }

    if (status) status.textContent = fabricaOcupada ? "Fábrica ocupada" : "Pronto para fabricar";
    if (tempo) tempo.textContent = formatarTempoCurto(receita.duracaoSegundos);
    if (barra) barra.style.width = "0%";
    if (botaoIniciar) {
      botaoIniciar.disabled =
        fabricaOcupada ||
        estoqueEntrada < receita.quantidadeEntrada ||
        energiaFabrica < receita.energiaNecessaria;
      botaoIniciar.textContent = "Fabricar";
    }
    if (botaoColetar) botaoColetar.hidden = true;
  });
}

function iniciarFabricacao(tipoReceita) {
  const receita = RECEITAS_FABRICA[tipoReceita];
  if (!receita || fabricacaoAtual) return;

  if (contarItemInventario(receita.entrada.id) < receita.quantidadeEntrada) {
    alert(`Você precisa de ${receita.quantidadeEntrada} ${receita.entrada.nome.toLowerCase()}.`);
    return;
  }

  if (energiaFabrica < receita.energiaNecessaria) {
    alert(`A fábrica precisa de ${receita.energiaNecessaria} de energia.`);
    return;
  }

  if (!removerItemDoInventario(receita.entrada.id, receita.quantidadeEntrada)) return;

  const agora = Date.now();
  salvarEnergiaFabrica(energiaFabrica, agora);
  salvarFabricacaoAtual({
    tipo: receita.id,
    inicio: agora,
    fim: agora + (receita.duracaoSegundos * 1000)
  });

  if (receita.id === "barra_ouro") {
    concluirMissao("fabricar_barra_ouro");
  }

  atualizarInterfaceFabrica();
}

function iniciarFabricacaoBarraOuro() {
  iniciarFabricacao("barra_ouro");
}

function coletarFabricacao(tipoReceita) {
  const estado = estadoFabricacaoAtual();
  if (!estado?.pronta || estado.receita.id !== tipoReceita) return;

  if (!adicionarItemAoInventario(estado.receita.saida, 1)) return;

  salvarFabricacaoAtual(null);
  atualizarInterfaceFabrica();
}

function coletarFabricacaoBarraOuro() {
  coletarFabricacao("barra_ouro");
}

function atualizarEnergiaFabrica(agora) {
  if (!ultimoRenderEnergiaFabrica || agora - ultimoRenderEnergiaFabrica >= 1000) {
    ultimoRenderEnergiaFabrica = agora;
    atualizarInterfaceFabrica();
  }
  requestAnimationFrame(atualizarEnergiaFabrica);
}

function renderizarTripulacaoERecursos() {
  atualizarSistemaTripulacao();
  atualizarXPJogador();
  atualizarInterfaceFabrica();
  atualizarMissoes();
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
  const poderTotal = calcularPoderTotal();

  if (botaoColetarOuro) {
    botaoColetarOuro.hidden = true;
  }

  botoesMineracao.forEach((botao) => {
    const mineracao = MINERACOES[botao.dataset.mineracao];
    if (!mineracao) return;

    botao.hidden = false;

    if (mineracaoPronta) {
      const ehPendente = mineracaoPronta.id === mineracao.id;
      botao.disabled = !ehPendente;
      botao.textContent = ehPendente ? "Coletar" : "Coleta pendente";
      return;
    }

    botao.disabled = mineracaoEmAndamento || poderTotal < mineracao.poderNecessario;
    botao.textContent = "Minerar";
  });

  if (textoMineracao) {
    if (mineracaoEmAndamento) {
      textoMineracao.textContent = "Minerando";
    } else if (mineracaoPronta) {
      textoMineracao.textContent = "Coleta pendente";
    } else {
      textoMineracao.textContent = "Pronto para minerar";
    }
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

botoesCategoriaFabrica.forEach((botao) => {
  botao.addEventListener("click", () => atualizarCategoriaFabrica(botao.dataset.fabricaCategoria));
});

botoesIniciarReceitaFabrica.forEach((botao) => {
  botao.addEventListener("click", () => iniciarFabricacao(botao.dataset.iniciarReceita));
});

botoesColetarReceitaFabrica.forEach((botao) => {
  botao.addEventListener("click", () => coletarFabricacao(botao.dataset.coletarReceita));
});

botoesMineracao.forEach((botao) => {
  if (botao === botaoMinerar) return;
  botao.addEventListener("click", () => abrirModalMineracao(botao.dataset.mineracao));
});

iniciarModalMineracao?.addEventListener("click", iniciarMineracaoSelecionada);
sairModalMineracao?.addEventListener("click", () => {
  if (!mineracaoEmAndamento) fecharModalMineracao();
});
coletarModalMineracao?.addEventListener("click", coletarMineracaoSelecionada);

window.addEventListener("keydown", (evento) => {
  if (modalMineracao?.classList.contains("ativo") && evento.key === "Escape") {
    evento.preventDefault();
    evento.stopPropagation();

    if (!mineracaoEmAndamento) {
      fecharModalMineracao();
    }
  }
}, true);

if (fabricacaoPronta) {
  if (textoFabricacao) textoFabricacao.textContent = "Fabricação concluída";
  if (tempoFabricacao) tempoFabricacao.textContent = "Pronto";
  if (barraFabricacaoPreenchida) barraFabricacaoPreenchida.style.width = "100%";
}

renderizarTripulacaoERecursos();
requestAnimationFrame(atualizarEnergiaFabrica);

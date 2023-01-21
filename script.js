const btnNuevoJuego = document.querySelector("#btnNuevoJuego"),
  btnPedirCarta = document.querySelector("#btnPedirCarta"),
  btnDetener = document.querySelector("#btnDeneter"),
  turnoHTML = document.querySelector("#turno"),
  puntosHTML = document.querySelectorAll("small"),
  jugadoresCartas = document.querySelectorAll(".cards");

// Variables
let baraja = [],
  jugadoresPuntos = [],
  turno = 0;
/**
 * C = Treboles
 * D = Diamantes
 * H = Corazones
 * S = Espadas
 */

const tipos = ["C", "D", "H", "S"],
  especiales = ["A", "J", "Q", "K"];

/** Inicializa la app */
const init = (cantidadJugadores = 3) => {
  baraja = crearBaraja();
  jugadoresPuntos = [];
  turno = 0

  for (let i = 0; i < cantidadJugadores; i++) jugadoresPuntos.push(0);

  for (let jugadorPuntos in jugadoresPuntos) {
    puntosHTML[jugadorPuntos].textContent = 0;
    jugadoresCartas[jugadorPuntos].textContent = "";
  }

  habilitarBotones();
};

const habilitarBotones = () => {
  btnPedirCarta.disabled = false;
  btnDetener.disabled = false;
};

const deshabilitarBotones = () => {
  btnPedirCarta.disabled = true;
  btnDetener.disabled = true;
};

/** Se encarga de crear la baraja */
const crearBaraja = () => {
  baraja = [];

  for (let tipo of tipos) {
    for (let i = 2; i <= 10; i++) {
      baraja.push(i + tipo);
    }

    for (let especial of especiales) baraja.push(especial + tipo);
  }

  return _.shuffle(baraja);
};

/** Se encarga de obtener una carta */
const obtenerCarta = () => {
  if (baraja.length <= 0) throw "No hay cartas en la baraja";

  return baraja.pop();
};

/**
 * - Obtener valor de la carta
 * - Acumular puntos
 *
 *
 */
const obtenerValorDeCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return !isNaN(valor) ? valor * 1 : valor === "A" ? 11 : 10;
};

const acumularPuntos = ({ carta, turno }) => {
  jugadoresPuntos[turno] += obtenerValorDeCarta(carta);
  puntosHTML[turno].textContent = jugadoresPuntos[turno];

  return jugadoresPuntos[turno];
};


const crearCarta = ({ carta, turno }) => {
  const imagen = document.createElement("img");
  imagen.src = `assets/${carta}.png`;
  imagen.classList.add("carta");
  jugadoresCartas[turno].append(imagen);
};

const turnoComputadora = (puntosMinimos) => {
  let computadoraPuntos = 0;

  do {
    const carta = obtenerCarta();
    computadoraPuntos = acumularPuntos({
      carta,
      turno: jugadoresPuntos.length - 1,
    });
    crearCarta({ carta, turno: jugadoresPuntos.length - 1 });
  } while (computadoraPuntos < puntosMinimos && puntosMinimos <= 21);

  determinarGanador(jugadoresPuntos);
};

const determinarGanador = ([jugadorPuntos, jugador2Puntos, computadoraPuntos]) => {
  setTimeout(() => {

    
  if(jugador2Puntos > jugadorPuntos && jugador2Puntos > computadoraPuntos && jugador2Puntos <= 21){
    alert("jugador 2 gana")
    return
}
    if(jugadorPuntos > 21 && jugador2Puntos >21){
      alert("computadora gana")
      return
  }

  if(computadoraPuntos > 21 && jugador2Puntos >21){
      alert("jugador gana")
      return
  }

  if(jugadorPuntos > 21 && computadoraPuntos > 21){
      alert("jugador 2 gana")
      return
  }

  if(jugadorPuntos === jugador2Puntos && jugadorPuntos === computadoraPuntos){
      alert("nadie gana")
      return
  }

  if(jugadorPuntos > computadoraPuntos && jugadorPuntos > jugador2Puntos && jugadorPuntos <= 21){
      alert("jugador gana")
      return
  }

  if(computadoraPuntos > jugadorPuntos && computadoraPuntos > jugador2Puntos && computadoraPuntos <=21){
      alert("computadora gana")
      return
  }

  }, 400);
};

const siguienteTurno = () => {
  turno = turno + 1
}

const ultimoTurno = () => {
  return turno === jugadoresPuntos.length - 2;
}

// Eventos;
btnNuevoJuego.addEventListener("click", () => {
  init();
});

btnPedirCarta.addEventListener("click", () => {
  const carta = obtenerCarta();
  const jugadorPuntos = acumularPuntos({ carta, turno });
  crearCarta({ carta, turno });

  if (jugadorPuntos < 21) return;
  if(!ultimoTurno()){
    siguienteTurno();
    return
  }

  deshabilitarBotones()
  turnoComputadora(jugadoresPuntos[0])

});

btnDetener.addEventListener("click", () => {

  if(!ultimoTurno()){
    siguienteTurno();
    return
  }
  deshabilitarBotones();
  turnoComputadora(jugadoresPuntos[0]);
});

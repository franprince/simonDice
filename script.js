const $cuadro = document.querySelectorAll(".cuadrado"),
    $botonEmpezar = document.querySelector("#boton-empezar"),
    $mostrarPlayer = document.querySelector(".anuncios h2"),
    $mostrarRonda = document.querySelector(".anuncios h3");

const colores = [
    "amarillo",
    "azul",
    "verde",
    "rojo"
];

let secuenciaComputadora = [],

    secuenciaUsuario = [],

    ronda = 0;

function obtenerCuadroAleatorio() {
    const indice = Math.floor(Math.random() * colores.length);
    return colores[indice];
};

function anunciarJugador(jugador) {
    $mostrarPlayer.textContent = `Juega ${jugador}`;
};

function anunciarRonda(ronda) {
    $mostrarRonda.textContent = `Ronda: ${ronda}`;
};

function resaltar(color) {
    document.querySelector("#" + color).classList.add("destacar");
    setTimeout(() => document.querySelector("#" + color).classList.remove("destacar"), 300);
};

function desbloquearUsuario() {
    $cuadro.forEach((e) => {
        e.onclick = function () {
            const $color = e.id;
            manejarInputUsuario($color);
        };
    });
};

function manejarInputUsuario(color) {
    resaltar(color);
    console.log(color)
    secuenciaUsuario.push(color);
    checkUserInput();

    if (secuenciaUsuario.length === secuenciaComputadora.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    };
};

function checkUserInput() {
    const i = ronda - 1;
    if (secuenciaComputadora[i] !== secuenciaUsuario[i]) {
        gameOver();
    };
};

function bloquearInputUsuario() {
    $cuadro.forEach((cuadrito) => {
        cuadrito.onclick = function () { };
    });
};

function manejarRonda() {
    anunciarRonda(ronda);

    anunciarJugador("computadora");

    bloquearInputUsuario();

    const $nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaComputadora.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaComputadora.length + 1) * 1000;

    secuenciaComputadora.forEach(function ($cuadro, index) {
        const RETRASO_MS = (index + 1) * 1000;
        setTimeout(function () {
            resaltar($cuadro);
        }, RETRASO_MS);
    });

    setTimeout(function () {
        anunciarJugador("usuario");
        desbloquearUsuario();
    }, RETRASO_TURNO_JUGADOR);

    secuenciaUsuario = [];
    ronda++;
    anunciarRonda(ronda);
};

function reset() {
    secuenciaUsuario = [];
    secuenciaComputadora = [];
    ronda = 0;
};

function iniciarJuego() {
    reset();
    manejarRonda();
};

function gameOver(){

    Swal.fire({
        icon: 'error',
        title: 'Fin del juego',
        text:  `Perdiste en la ronda ${ronda}.`,
        footer: '<a href>Volver a jugar</a>'
      });
      Swal.fire.footer.onclick = reset;
}

$botonEmpezar.onclick = iniciarJuego;
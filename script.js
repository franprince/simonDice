const   $cuadro         = document.querySelectorAll(".cuadrado"),
        $botonEmpezar   = document.querySelector("#boton-empezar"),
        $mostrarPlayer  = document.querySelector(".anuncios h2"),
        $mostrarRonda   = document.querySelector(".anuncios h3"),
        $segundos       = document.querySelector("#segundos"),
        $minutos        = document.querySelector("#minutos");

const colores = [
    "amarillo",
    "azul",
    "verde",
    "rojo"
];

let segundos    = 0,
    minutos     = 0,
    horas       = 0;

let secuenciaComputadora = [],

    secuenciaUsuario = [],

    ronda = 0,

    cronometro;

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
    if (checkUserInput === "error") {
        console.log("fin del juego")
        return false;
    };

    if (secuenciaUsuario.length === secuenciaComputadora.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    };

    function checkUserInput() {
        const i = secuenciaUsuario.length - 1;
        if (secuenciaComputadora[i] !== secuenciaUsuario[i]) {
            gameOver();
            bloquearInputUsuario();
            return "error";
        };
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
    segundos = 0;
    minutos = 0;
    horas = 0;
};

function iniciarJuego() {
    clearInterval(cronometro);
    cronometro = setInterval(mostrarCronometro, 1000);
    $botonEmpezar.textContent = "Reiniciar";
    reset();
    manejarRonda();
};

function gameOver() {
    clearInterval(cronometro);
    Swal.fire({
        icon: 'error',
        title: 'Fin del juego',
        text: `Perdiste en la ronda ${ronda}.`,
        footer: '<a href>Volver a jugar</a>'
    });
}

function tiempoTranscurrido() {
    const inicio = new Date().getTime();
    const transcurrido = new Date().getTime() - inicio;
    const segundosTranscurridos = transcurrido / 1000;
    return segundosTranscurridos;
}

$botonEmpezar.onclick = iniciarJuego;

function mostrarCronometro() {
    if (segundos === 59) {
        segundos = 0;
        minutos = minutos + 1;
    };
    segundos++;
    $segundos.textContent = segundos;
    $minutos.textContent = minutos;
};

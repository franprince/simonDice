const   $cuadro         = document.querySelectorAll(".cuadrado"),
        $botonEmpezar   = document.querySelector("#boton-empezar"),
        $mostrarPlayer  = document.querySelector(".anuncios h2"),
        $mostrarRonda   = document.querySelector(".anuncios h3");

const colores = [
    "amarillo",
    "azul",
    "verde",
    "rojo"
];

let secuenciaComputadora    = [],

    secuenciaUsuario        = [],

    ronda                   = 1;

function obtenerCuadroAleatorio() {
    const indice = Math.floor(Math.random() * colores.length);
    return colores[indice];
};

function anunciarJugador(jugador){
    $mostrarPlayer.textContent = `Juega ${jugador}`;
}
function anunciarRonda(ronda){
    $mostrarRonda.textContent = `Ronda: ${ronda}`;
}

function resaltar(color){
    document.querySelector("#"+color).classList.add("destacar");
    setTimeout(()=>document.querySelector("#"+color).classList.remove("destacar"), 1000);
};

function desbloquearUsuario(){
    $cuadro.forEach((element)=>{
        element.addEventListener("click", function(){
            resaltar(element.id);
            secuenciaUsuario.push(element.id);
            checkUserInput();
        });
    });
};

function checkUserInput(){
    if(secuenciaComputadora[ronda] === secuenciaUsuario[ronda]){
        manejarRonda()
    }else{
        console.log("tequivocastes");
        return false;
    };
};

function bloquearInputUsuario() {
   $cuadro.onclick = function(){};
};

function manejarRonda(){

    anunciarRonda(ronda);

    anunciarJugador("computadora");

    bloquearInputUsuario();

    const $nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaComputadora.push($nuevoCuadro);

    const RETRASO_TURNO_JUGADOR = (secuenciaComputadora.length + 1) * 1000;

    secuenciaComputadora.forEach(function($cuadro, index) {
        const RETRASO_MS = (index + 1) * 1000;
        setTimeout(function() {
          resaltar($cuadro);
        }, RETRASO_MS);
      });

      setTimeout(function(){
        anunciarJugador("usuario");
        desbloquearUsuario();
      }, RETRASO_TURNO_JUGADOR);

      secuenciaUsuario = [];
      ronda++;
      anunciarRonda(ronda);
};

function iniciarJuego(){
    secuenciaComputadora    = [];
    secuenciaUsuario        = [];
    manejarRonda();
};

$botonEmpezar.onclick = iniciarJuego();
// Variables 
var numeroAleatorio;
var intentos;
var limiteIntentos;
var minNum;
var maxNum;
var resultados = [];
var usuario={};


async function obtenerCanciones() {
  const respuesta = await fetch("canciones.json");
  const canciones = await respuesta.json();
  return canciones;
}

async function reproducirCanciones() {
  const canciones = await obtenerCanciones();
  const reproductor = document.getElementById("reproductor");

  for (const cancion of canciones.canciones) {
    const boton = document.createElement("button");
    boton.className= "botonmusica";
    boton.innerHTML = cancion.titulo;
    boton.addEventListener("click", () => {
      reproductor.src = cancion.link;
      reproductor.play();
    });
    document.body.appendChild(boton);
  }
}

document.addEventListener("DOMContentLoaded", reproducirCanciones);

//Calcular mejor partida
document.getElementById("avanzar").addEventListener("click", function() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var apodo = document.getElementById("apodo").value;

  var resultado = {
    nombre: nombre,
    apellido: apellido,
    apodo: apodo,
    numeroAleatorio: numeroAleatorio,
    intentos: intentos
  };

  resultados.push(resultado);
  localStorage.setItem("resultados", JSON.stringify(resultados));
});


//Generar Num
function generarNumeroAleatorio() {
  numeroAleatorio = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

//Verificar número 
function verificarNumero() {
  var numeroIngresado = document.getElementById("numeroIngresado").value;
  var resultadoDiv = document.getElementById("resultado");
  if (!validarNumero(numeroIngresado)) {
    return;
  }

  if (numeroIngresado == numeroAleatorio) {
    resultadoDiv.innerHTML = "¡Felicidades, adivinaste el número! Utilizaste " + intentos + " intentos.";
    guardarResultado(numeroAleatorio, intentos);
    iniciarJuego();
    mostrarTabla();
  } else if (numeroIngresado > numeroAleatorio) {
    resultadoDiv.innerHTML = "El número es menor.";
    intentos++;
  } else {
    resultadoDiv.innerHTML = "El número es mayor.";
    intentos++;
  }
  if (intentos >= limiteIntentos) {
    resultadoDiv.innerHTML = "Se acabaron tus intentos, el numero era: " + numeroAleatorio;
    guardarResultado(numeroAleatorio,intentos);
    mostrarTabla();
  }
  document.getElementById("contadorIntentos").innerHTML = "Intentos: " + intentos;
}

function validarNumero(numero) {
    if (isNaN(numero) || numero < minNum || numero > maxNum) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Ingresa un número válido entre ' + minNum + ' y ' + maxNum,
      })
      return false;
    }
    return true;
  }

  //Iniciar juego
function iniciarJuego() {
    var dificultad = document.getElementById("dificultad").value;
    switch (dificultad) {
      case "facil":
        minNum = 1;
        maxNum = 50;
        limiteIntentos = 10;
        generarNumeroAleatorio();
        console.log(numeroAleatorio);
       break;
      case "normal":
        minNum = 1;
        maxNum = 100;
        limiteIntentos = 10;
        generarNumeroAleatorio();
        console.log(numeroAleatorio);
        break;
        case "dificil":
        minNum = 1;
        maxNum = 300;
        limiteIntentos = 5;
        generarNumeroAleatorio();
        console.log(numeroAleatorio);
        break;
    }
    intentos = 0;
    document.getElementById("adivinar").addEventListener("click", verificarNumero);
    }

// Guardar el resultado del juego
function guardarResultado(numeroAleatorio, intentos) {
  var resultado = {numeroAleatorio: numeroAleatorio, intentos: intentos};
  resultados.push(resultado);
  resultados.sort(function(a, b) {
  return a.intentos - b.intentos;
  });
  usuario = {nombre: localStorage.getItem("nombre"), apellido: localStorage.getItem("apellido"), apodo: document.getElementById("apodo").value};
  mostrarTabla(usuario);
  }

// Mostrar los resultados en la tabla
function mostrarTabla() {
  var tablaResultadosBody = document.getElementById("tablaResultadosBody");
  tablaResultadosBody.innerHTML = "";

  for (var i = 0; i < resultados.length; i++) {
    var resultado = resultados[i];
    var tr = document.createElement("tr");

    var tdApodo = document.createElement("td");
    tdApodo.innerHTML = usuario.apodo;
    tr.appendChild(tdApodo);

    var tdNumeroAleatorio = document.createElement("td");
    tdNumeroAleatorio.innerHTML = resultado.numeroAleatorio;
    tr.appendChild(tdNumeroAleatorio);

    var tdIntentos = document.createElement("td");
    tdIntentos.innerHTML = resultado.intentos;
    tr.appendChild(tdIntentos);

    tablaResultadosBody.appendChild(tr);
  }
}



//ayudas
document.getElementById("consejonum").addEventListener("click", aconsejar);
  function aconsejar() {
    if (numeroAleatorio % 2 == 0) {
      document.getElementById("darconsejo").innerHTML = "El número es par";
      console.log("par");
    } else {
      document.getElementById("darconsejo").innerHTML = "El número es impar";
      console.log("impar");
    }
  }






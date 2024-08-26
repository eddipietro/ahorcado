// Fondo de Estrellas
// Generate a random number within a range
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Create stars and add them to the DOM
function createStars(numStars) {
    const container = document.querySelector('.stars-container');
    container.innerHTML = ''; // Clear previous stars
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        let size = getRandom(1, 3); // Size between 1px and 3px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${getRandom(0, window.innerWidth)}px`;
        star.style.top = `${getRandom(0, window.innerHeight)}px`;
        container.appendChild(star);
    }
}

// Initialize the star field
function init() {
    createStars(350); // Number of stars
}

window.onload = init;

const links = document.querySelectorAll(".neon-button");

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.classList.add("active");
    setTimeout(() => {
      event.target.classList.remove("active");
    }, 500);
  });
});

// Lista de palabras posibles
const palabras = ["ejemplo", "programacion", "javascript", "desarrollo", "web"];

// Función para seleccionar una palabra aleatoria de la lista
const obtenerPalabraAleatoria = () => {
    const indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice];
};

// Almacenará las letras ingresadas por el usuario
const letrasIngresadas = [];
// Número máximo de intentos permitidos
const maxIntentos = 6; // Cambiado a 6 para coincidir con el número de imágenes
// Contador de intentos actuales
let intentos = 0;
// Palabra a adivinar (se obtiene aleatoriamente)
let palabraAdivinar = obtenerPalabraAleatoria();
// Palabra oculta con guiones bajos para mostrar al usuario
let palabraOculta = "_ ".repeat(palabraAdivinar.length).trim();

// Función para manejar la entrada de letra
const solicitarLetra = () => {
    let letraUsuario = prompt("Por favor, ingresa una letra:");

    // Validar si es una única letra alfabética y no está repetida
    while (!letraUsuario || letraUsuario.length !== 1 || !/[a-zA-Z]/.test(letraUsuario) || letrasIngresadas.includes(letraUsuario.toLowerCase())) {
        if (!letraUsuario) {
            alert("Por favor, ingresa una letra.");
        } else if (letraUsuario.length !== 1 || !/[a-zA-Z]/.test(letraUsuario)) {
            alert("Debes ingresar una única letra alfabética.");
        } else if (letrasIngresadas.includes(letraUsuario.toLowerCase())) {
            alert("Esta letra ya ha sido ingresada. Intenta con otra.");
        }

        letraUsuario = prompt("Por favor, ingresa una letra:");
    }

    // Convertir a minúscula para estandarizar y evitar problemas con mayúsculas/minúsculas
    letrasIngresadas.push(letraUsuario.toLowerCase());

    return letraUsuario.toLowerCase();
};

// Función para actualizar la visualización de letras ingresadas
const actualizarLetrasIngresadas = () => {
    document.getElementById('letras-ingresadas').innerText = `Letras ingresadas: ${letrasIngresadas.join(', ')}`;
};

// Función para actualizar la imagen del hombre ahorcado
const actualizarImagenAhorcado = () => {
    const imagen = document.getElementById('imagen-ahorcado');
    imagen.src = `./assets/${intentos}.jpg`;
};

// Función que inicia o continúa el juego
const start = () => {
    if (intentos < maxIntentos) {
        // Solicitar la letra al usuario
        const letraIngresada = solicitarLetra();

        // Verificar si la letra ingresada está en la palabra
        let letraEncontrada = false;
        palabraOculta = palabraOculta.split(" ").map((char, index) => {
            if (palabraAdivinar[index] === letraIngresada) {
                letraEncontrada = true;
                return letraIngresada;
            }
            return char;
        }).join(" ");

        // Si la letra no se encuentra en la palabra, incrementamos los intentos
        if (!letraEncontrada) {
            intentos++;
            actualizarImagenAhorcado(); // Actualizar imagen con el nuevo número de intentos
            alert(`La letra "${letraIngresada}" no está en la palabra.`);
        }

        // Mostrar la palabra actualizada y los intentos restantes
        document.getElementById('letra').innerText = `Palabra: ${palabraOculta}`;
        document.getElementById('intentos').innerText = `Intentos restantes: ${maxIntentos - intentos}`;
        
        // Actualizar letras ingresadas
        actualizarLetrasIngresadas();
        
        // Verificar si el juego ha terminado
        if (!palabraOculta.includes("_")) {
            alert("¡Felicidades! Has adivinado la palabra.");
            resetGame();
        } else if (intentos >= maxIntentos) {
            alert(`¡Se acabaron los intentos! La palabra era: "${palabraAdivinar}".`);
            resetGame();
        }
    } else {
        alert("El juego ha terminado. Reinicia la página para jugar de nuevo.");
    }
};

// Función para resetear el juego
const resetGame = () => {
    letrasIngresadas.length = 0; // Limpiar letras ingresadas
    intentos = 0; // Reiniciar contador de intentos
    palabraAdivinar = obtenerPalabraAleatoria(); // Seleccionar nueva palabra aleatoria
    palabraOculta = "_ ".repeat(palabraAdivinar.length).trim(); // Reiniciar palabra oculta
    document.getElementById('letra').innerText = `Palabra: ${palabraOculta}`;
    document.getElementById('intentos').innerText = `Intentos restantes: ${maxIntentos}`;
    document.getElementById('letras-ingresadas').innerText = `Letras ingresadas: `;
    document.getElementById('imagen-ahorcado').src = './assets/0.jpg'; // Reiniciar imagen del ahorcado
};

// Manejo del botón de inicio
const handleButtonStart = () => {
    // Llama a la función start
    start();
};

// Asignar el controlador de eventos al botón
document.getElementById('start').onclick = handleButtonStart;

// Inicializar la pantalla con los valores iniciales
document.getElementById('letra').innerText = `Palabra: ${palabraOculta}`;
document.getElementById('intentos').innerText = `Intentos restantes: ${maxIntentos}`;
document.getElementById('letras-ingresadas').innerText = `Letras ingresadas: `;
document.getElementById('imagen-ahorcado').src = './assets/0.jpg'; // Inicializar imagen del ahorcado

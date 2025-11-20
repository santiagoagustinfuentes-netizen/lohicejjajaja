const container = document.getElementById('emojiContainer');
const subtitleElement = document.getElementById('subtitle');
const secretMessage = document.getElementById('secretMessage');
const photoAlbum = document.getElementById('photoAlbum');
const gallery = photoAlbum.querySelector('.gallery'); 

const emojis = ['❤️', '😘', '💕', '💘', '💖', '🥰', '🌹', '💋', '✨', '💍', '🌟'];
const emojisPerClick = 20; 

let clickCounter = 0; 
const specialPhrase = "Giovanna sos el amor de mi vida 💍"; 
const clickThresholdForSpecialPhrase = 5; 
const clickThresholdForAlbum = 10; 

const lovePhrases = [
    "Felices 5 meses mi amor, sos la mejor ❤️",
    "Eres mi persona favorita en el mundo ✨ y mi mayor bendición",
    "Gracias por cada momento, sos mi sol 🌹",
    "Mi vida es mejor contigo, ¡siempre! 💋 (Te doy mil besos)",
    "Te elijo hoy y todos los días, mi reina 🥰"
];

let phraseIndex = 0; 

// Array con los nombres de archivo de las imágenes
const finalPhotoUrls = [
    "WhatsApp Image 2025-11-19 at 19.57.19 (2).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.19 (3).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.20.jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.20 (1).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.20 (2).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.20 (3).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.21.jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.21 (1).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.21 (2).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.21 (3).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.22 (1).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.23.jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.23 (1).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.24.jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.24 (1).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.25.jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.25 (1).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.25 (2).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.26.jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.26 (1).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.27.jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.27 (1).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.27 (2).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.27 (3).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.27 (4).jpeg",
    "WhatsApp Image 2025-11-19 at 19.57.28.jpeg"
];

/**
 * Función para cargar las imágenes en el álbum.
 */
function loadPhotos() {
    gallery.innerHTML = ''; 
    finalPhotoUrls.forEach(fileName => {
        // Crear un contenedor para la imagen y el nombre
        const photoWrapper = document.createElement('div');
        photoWrapper.classList.add('photo-item'); // Clase CSS para el wrapper (ver sección CSS)
        
        // 1. Crear el elemento de la imagen
        const img = document.createElement('img');
        // CLAVE 1: Ruta modificada para la carpeta 'imagenes'
        img.src = `imagenes/${fileName}`; 
        img.alt = "Momento especial con Giovanna";
        img.loading = "lazy";
        
        // 2. Crear el elemento para el nombre de la imagen
        const caption = document.createElement('p');
        caption.classList.add('photo-caption'); // Clase CSS para el nombre (ver sección CSS)
        caption.textContent = fileName;
        
        // Añadir la imagen y el nombre al contenedor
        photoWrapper.appendChild(img);
        photoWrapper.appendChild(caption);

        // Añadir el contenedor a la galería
        gallery.appendChild(photoWrapper);
    });
    photoAlbum.classList.add('show-album'); 
    console.log(`Se cargaron ${finalPhotoUrls.length} fotos en el álbum.`);
}

/**
 * Función para generar un único emoji cayendo.
 */
function createFallingEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('falling-emoji');
    
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    emoji.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 6 + 4; 
    const delay = Math.random() * 1.5; 

    emoji.style.animationDuration = duration + 's';
    emoji.style.animationDelay = delay + 's';
    
    emoji.style.fontSize = Math.random() * 25 + 18 + 'px';

    container.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, (duration + delay) * 1000);
}

/**
 * Función para alternar el texto del subtítulo.
 */
function updateSubtitle() {
    if (clickCounter % clickThresholdForSpecialPhrase === 0 && clickCounter !== 0) {
        subtitleElement.textContent = specialPhrase;
        subtitleElement.classList.add('special-phrase');
    } else {
        subtitleElement.classList.remove('special-phrase');
        subtitleElement.textContent = lovePhrases[phraseIndex];
        phraseIndex = (phraseIndex + 1) % lovePhrases.length;
    }
}

/**
 * Función que se llama al hacer click en el botón.
 */
function handleButtonClick() {
    clickCounter++; 

    // 1. Alterna el subtítulo y maneja la frase especial
    updateSubtitle();

    // 2. Genera la lluvia de emojis
    for (let i = 0; i < emojisPerClick; i++) {
        createFallingEmoji();
    }

    // 3. Verifica si es momento de mostrar el álbum de fotos (después de 10 clics)
    if (clickCounter === clickThresholdForAlbum) {
        loadPhotos(); 
    }
}

// --- Mensaje Secreto - Se revela después de 8 segundos ---
setTimeout(() => {
    secretMessage.classList.add('show-message');
}, 8000);
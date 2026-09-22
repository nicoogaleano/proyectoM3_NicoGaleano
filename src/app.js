// src/app.js

// 1. Definición de las vistas de la aplicación
const views = {
    '/home': `
        <div class="home-view">
            <h2>Elige tu facción</h2>
            <div class="gallery-grid">
                <div class="character-card ct" onclick="selectCharacter('gign')">
                    <img src="../assets/GIGN.png" alt="GIGN">
                    <h3>GIGN (Counter-Terrorist)</h3>
                    <p>Operador antiterrorista francés de élite. Preciso y táctico.</p>
                </div>

                <div class="character-card t" onclick="selectCharacter('phoenix')">
                    <img src="../assets/Phoenix.png" alt="Phoenix Faction">
                    <h3>Phoenix Faction (Terrorist)</h3>
                    <p>Experto en explosivos. Su lema: ¡Rushear B y no parar!</p>
                </div>
                
                <div class="character-card t" onclick="selectCharacter('guerrilla')">
                    <img src="../assets/Guerrilla.png" alt="Guerrilla Warfare">
                    <h3>Guerrilla Warfare (Terrorist)</h3>
                    <p>Combatiente urbano. Duro, astuto y maestro de la emboscada.</p>
                </div>
            </div>
        </div>
    `,
    '/chat': `
        <div class="chat-box">
            <div class="chat-header">
                <h3 id="chat-title">Canal de Radio</h3>
                <div>
                    <button onclick="clearChatHistory()" style="margin-right: 0.5rem;">Borrar Historial</button>
                    <button onclick="navigate('/home')">Cambiar Facción</button>
                </div>
            </div>
            <div id="chat-messages" class="chat-messages"></div>
            <div id="typing-indicator" class="typing-indicator">Transmitiendo señal de radio...</div>
            <form id="chat-form" class="chat-input-area" onsubmit="handleSendMessage(event)">
                <input type="text" id="user-input" placeholder="Escribe un mensaje de radio..." autocomplete="off" required>
                <button type="submit">Enviar</button>
            </form>
        </div>
    `,
    '/about': `
        <div class="about-view">
            <h2>SOBRE EL PROYECTO</h2>
            <div class="about-card">
                <h3>CS 1.6 IA CHAT</h3>
                <p class="about-desc">
                    Aplicación web interactiva Single Page Application (SPA) que recrea la interfaz táctica VGUI y el sistema de comunicaciones por radio de <strong>Counter-Strike 1.6</strong>, potenciada por la API de Google Gemini.
                </p>

                <div class="developer-info">
                    <p><strong>Desarrollador:</strong> Nico Galeano</p>
                    <p><strong>Proyecto:</strong> Proyecto Integrador 3</p>
                    <p><strong>Tecnologías:</strong> HTML5, CSS3, JavaScript (ES Modules), Vercel Serverless, Gemini API, Vitest</p>
                </div>

                <a href="https://github.com/nicoogaleano/proyectoM3_NicoGaleano" target="_blank" rel="noopener noreferrer" class="github-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>Ver Repositorio GitHub</span>
                </a>
            </div>
        </div>
    `,
}

// 2. Función de renderizado de vistas
function render(path) {
    const appDiv = document.getElementById('app');
    if (!appDiv) return;

    // Cargar la vista solicitada o por defecto '/home'
    appDiv.innerHTML = views[path] || views['/home'];

    // Lógica específica para la vista de chat
    if (path === '/chat') {
        const selected = localStorage.getItem('selectedCharacter');

        // Si no hay personaje seleccionado, redirige al inicio
        if (!selected) {
            navigate('/home');
            return;
        }

        // Actualizar el título con la facción activa
        const titleElement = document.getElementById('chat-title');
        if (titleElement) {
            const titles = {
                'gign': 'Canal de Radio: GIGN (CT)',
                'phoenix': 'Canal de Radio: Phoenix Faction (T)',
                'guerrilla': 'Canal de Radio: Guerrilla Warfare (T)'
            };
            titleElement.textContent = titles[selected] || 'Canal de Radio';
        }

        // Inicializar el chat si la función existe en chat.js
        if (window.initChat) {
            setTimeout(window.initChat, 50);
        }
    }
}

// 3. Selección de personaje
window.selectCharacter = function(characterId) {
    localStorage.setItem('selectedCharacter', characterId);
    navigate('/chat');
};

// 4. Función global de navegación
window.navigate = function(path) {
    window.history.pushState({}, '', path);
    render(path);
};

// 5. Manejo de botones Atrás / Adelante del navegador
window.addEventListener('popstate', () => {
    render(window.location.pathname);
});

// 6. Carga inicial de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    const initialPath = window.location.pathname === '/' ? '/home' : window.location.pathname;
    render(initialPath);
});


document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-music');
    
    // Configura el volumen (0.0 es silencio, 1.0 es el máximo)
    bgMusic.volume = 0.4; 

    // Función para intentar reproducir la música
    const playAudio = () => {
        bgMusic.play().then(() => {
            // Se reprodujo con éxito, eliminamos los listeners de interacción
            document.removeEventListener('click', playAudio);
            document.removeEventListener('keydown', playAudio);
        }).catch(error => {
            console.log("El navegador bloqueó el autoplay. Esperando interacción del usuario...");
        });
    };

    // Intentar reproducir automáticamente de inmediato
    playAudio();

    // Si el navegador lo bloqueó, reproducir al primer clic o tecla presionada
    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
});

const soundBtn = document.getElementById('toggle-sound');
const bgMusic = document.getElementById('bg-music');

// Iconos SVG en formato texto (encendido y muteado)
const iconSoundOn = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
`;

const iconSoundOff = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
    </svg>
`;

// Establecer icono inicial
if (soundBtn) {
    soundBtn.innerHTML = iconSoundOn;

    soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bgMusic.paused) {
            bgMusic.play();
            soundBtn.innerHTML = iconSoundOn;
        } else {
            bgMusic.pause();
            soundBtn.innerHTML = iconSoundOff;
        }
    });
}

// Cargar audios desde la carpeta assets
const soundClick = new Audio('assets/buttonclick.wav');
const soundHover = new Audio('assets/buttonrollover.wav');
const soundGoGoGo = new Audio('assets/com_go.wav');
const soundRoger = new Audio('assets/roger.wav'); //

// Configuración de volúmenes
soundClick.volume = 0.5;
soundHover.volume = 0.3;
soundGoGoGo.volume = 0.8;
soundRoger.volume = 0.8;

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sonido "Roger that" al hacer clic en Borrar Historial / Limpiar Chat
    document.addEventListener('click', (e) => {
        // Busca el botón por su ID (#clear-chat) o por alguna clase (.clear-btn)
        const clearBtn = e.target.closest('#clearChatHistory');
        if (clearBtn) {
            soundRoger.currentTime = 0;
            soundRoger.play().catch(err => console.log("Error de reproducción:", err));
        }
    });

    // 2. Sonido "Go! Go! Go!" al hacer clic en tarjeta de personaje
    document.addEventListener('click', (e) => {
        const characterCard = e.target.closest('.character-card');
        if (characterCard) {
            soundGoGoGo.currentTime = 0;
            soundGoGoGo.play().catch(err => console.log("Error de reproducción:", err));
        }
    });

    // 3. Sonido de Clic estándar en el resto de los botones
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button, .navbar button');
        // Excluimos el botón de borrar para que solo suene "Roger that"
        const isClearBtn = e.target.closest('#clear-chat, .clear-btn, #clear-history');
        
        if (button && !isClearBtn) {
            soundClick.currentTime = 0;
            soundClick.play().catch(err => console.log("Error de reproducción:", err));
        }
    });

    // 4. Sonido Hover al pasar el cursor por los botones
    document.addEventListener('mouseover', (e) => {
        const button = e.target.closest('button, .navbar button');
        if (button && !button.dataset.hovered) {
            button.dataset.hovered = "true";
            soundHover.currentTime = 0;
            soundHover.play().catch(err => console.log("Error de reproducción:", err));
        }
    });

    document.addEventListener('mouseout', (e) => {
        const button = e.target.closest('button, .navbar button');
        if (button) {
            delete button.dataset.hovered;
        }
    });

});


    
